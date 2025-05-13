import { AvertLocation, AvertRecord, AvertRecordData } from "@/schema/avert";
import { PowerPlantClass } from "@/schema/egrid";
import { AppErrorCode } from "@/schema/error";
import { AppError, transformError } from "@/utils/errors";
import { sanitizeNumberValue } from "@/utils/fetch-utils";
import axios from "axios";
import * as XLSX from "xlsx";
import { z } from "zod";

// intermediate structures to store and decode AVERT data
const CapacityFactorsDataMap = z.record(AvertLocation, z.record(PowerPlantClass, z.union([z.number(), z.null()])));
type CapacityFactorsDataMap = z.infer<typeof CapacityFactorsDataMap>;

const EmissionRatesDataMap = z.record(
  AvertLocation,
  z.record(
    z.enum(Object.keys(AvertRecordData.shape) as [keyof typeof AvertRecordData.shape]),
    z.record(PowerPlantClass, z.union([z.number(), z.null()])),
  ),
);
type EmissionRatesDataMap = z.infer<typeof EmissionRatesDataMap>;

//route that contains AVERT data file
const AVERT_URL = "https://www.epa.gov/system/files/documents/2024-04/avert_emission_rates_04-11-24_0.xlsx";

//fetch and transform the AVERT Excel file from EPA website
export const fetchAndTransformAvertData = async (): Promise<AvertRecord[]> => {
  try {
    const response = await axios.get(AVERT_URL, { responseType: "arraybuffer" });
    //load the workbook
    const workbook = XLSX.read(response.data, { type: "buffer", sheets: ["Capacity factors", "2023"] });

    //extract sheets from workbook
    const capacityFactorSheet = workbook.Sheets["Capacity factors"];
    const emissionRatesSheet = workbook.Sheets["2023"];

    //extract capacity factors and emission rates
    const capacityFactors = extractCapacityFactors(capacityFactorSheet);
    const emissionRates = extractEmissionRates(emissionRatesSheet);

    //combine and convert to AvertRecord objects
    const avertRecords = combineData(capacityFactors, emissionRates, 2023);

    return avertRecords;
  } catch (error) {
    return Promise.reject(transformError(error, AppErrorCode.enum.SERVICE_ERROR, "Failed to fetch AVERT data"));
  }
};

const extractCapacityFactors = (sheet: XLSX.WorkSheet): CapacityFactorsDataMap => {
  try {
    //convert to array format
    const jsonData: (string | number)[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    //create empty object to store extracted data
    const capacityData: Record<string, Record<string, number | null | undefined>> = {};

    //remove first two rows (headers)
    jsonData.slice(2).forEach((row: (string | number)[], index: number, array: (string | number)[][]) => {
      let location = typeof row[0] === "string" ? row[0].trim() : ""; //extract location from column A
      //set location to US for national average
      if (index === array.length - 4) {
        location = "US";
      }

      //create entry for location and extract capacity factor values from respective columns
      if (location !== "") {
        capacityData[location] = {
          OnshoreWind: sanitizeNumberValue(row[1]), //column B
          OffshoreWind: sanitizeNumberValue(row[2]), //column C
          UtilityPV: sanitizeNumberValue(row[3]), //column D
          DistributedPV: sanitizeNumberValue(row[4]), //column E
        };
      }
    });

    return CapacityFactorsDataMap.parse(capacityData);
  } catch (error) {
    throw new AppError(AppErrorCode.enum.SERVICE_ERROR, "Failed to parse AVERT capacity factors data", {
      error,
    });
  }
};

const extractEmissionRates = (sheet: XLSX.WorkSheet) => {
  try {
    //convert sheet to an array
    const jsonData: (string | number)[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    //create an empty object to store emissions
    const emissionRatesData: Record<string, Record<string, Record<string, number | null | undefined>>> = {};

    //extract national emission rate data
    for (let rowIndex = 6; rowIndex <= 11; rowIndex++) {
      const row = jsonData[rowIndex];
      const emissionType = typeof row[0] === "string" ? getEmissionType(row[0].trim()) : "";
      processEmissionData(row, emissionRatesData, emissionType, "US", 0);
    }

    let emissionTypeLeft = "";
    let emissionTypeRight = "";
    //process headers & data
    jsonData.slice(16).forEach((row: (string | number)[], index: number) => {
      //get emission types based on row
      if ([0, 18, 36].includes(index) && typeof row[0] === "string" && typeof row[10] === "string") {
        emissionTypeLeft = getEmissionType(row[0].trim());
        emissionTypeRight = getEmissionType(row[10].trim());
      }
      //parse rows with location names
      if (![0, 1, 18, 19, 36, 37].includes(index) && typeof row[0] === "string" && typeof row[10] === "string") {
        const location = row[0].trim();
        processEmissionData(row, emissionRatesData, emissionTypeLeft, location, 0);
        processEmissionData(row, emissionRatesData, emissionTypeRight, location, 10);
      }
    });

    return EmissionRatesDataMap.parse(emissionRatesData);
  } catch (error) {
    throw new AppError(AppErrorCode.enum.SERVICE_ERROR, "Failed to parse AVERT emission rates data", {
      error,
    });
  }
};

//parse the columns in the location rows that represent the powerplant class
function processEmissionData(
  row: (string | number)[],
  emissionRatesData: Record<string, Record<string, Record<string, number | null | undefined>>>,
  emissionType: string,
  location: string,
  colStart: number,
) {
  //initialize entries
  if (!emissionRatesData[location]) {
    emissionRatesData[location] = {};
  }
  if (!emissionRatesData[location][emissionType]) {
    emissionRatesData[location][emissionType] = {};
  }

  //populate data
  emissionRatesData[location][emissionType] = {
    OnshoreWind: sanitizeNumberValue(row[colStart + 1]),
    OffshoreWind: sanitizeNumberValue(row[colStart + 2]),
    UtilityPV: sanitizeNumberValue(row[colStart + 3]),
    DistributedPV: sanitizeNumberValue(row[colStart + 4]),
    PortfolioEE: sanitizeNumberValue(row[colStart + 7]),
    UniformEE: sanitizeNumberValue(row[colStart + 8]),
  };
}

//map an emission rate header to its corresponding field name
function getEmissionType(header: string): string {
  if (header.includes("Avoided CO2 Rate")) return "avoidedCo2EmissionRateLbMwh";
  if (header.includes("Avoided SO2 Rate")) return "avoidedSo2EmissionRateLbMwh";
  if (header.includes("Avoided VOC Rate")) return "avoidedVocEmissionRateLbMwh";
  if (header.includes("Avoided NOx Rate")) return "avoidedNoxEmissionRateLbMwh";
  if (header.includes("Avoided PM2.5 Rate")) return "avoidedPm2_5EmissionRateLbMwh";
  if (header.includes("Avoided NH3 Rate")) return "avoidedNh3EmissionRateLbMwh";
  throw new AppError(
    AppErrorCode.enum.SERVICE_ERROR,
    `Failed to parse AVERT emission rates data: unknown emission rate header ${header}`,
  );
}

const combineData = (capacityFactors: XLSX.WorkSheet, emissionRates: XLSX.WorkSheet, year: number): AvertRecord[] => {
  try {
    const finalDocuments: Record<string, unknown>[] = [];

    //iterate over all locations found in either dataset
    const allLocations = new Set([...Object.keys(capacityFactors), ...Object.keys(emissionRates)]);

    allLocations.forEach((location) => {
      //extract power plant classes from capacityFactors
      const capacityPlantClasses = capacityFactors[location] ? Object.keys(capacityFactors[location]) : [];

      //extract emission types and their power plant classes
      const emissionTypes = emissionRates[location] ? Object.keys(emissionRates[location]) : [];
      const emissionPlantClasses = new Set<string>();

      emissionTypes.forEach((emissionType) => {
        if (emissionRates[location][emissionType]) {
          Object.keys(emissionRates[location][emissionType]).forEach((plantClass) => {
            emissionPlantClasses.add(plantClass);
          });
        }
      });

      //merge power plant classes from both datasets
      const allPlantClasses = new Set([...capacityPlantClasses, ...Array.from(emissionPlantClasses)]);

      //iterate through each power plant class and construct the final document
      allPlantClasses.forEach((powerPlantClass) => {
        const doc: Record<string, unknown> = {
          year,
          location,
          powerPlantClass,
          capacityFactorPercent: capacityFactors[location]?.[powerPlantClass] ?? 0,
        };

        //populate emission rates based on emission type
        emissionTypes.forEach((emissionType) => {
          doc[emissionType] = emissionRates[location]?.[emissionType]?.[powerPlantClass] ?? 0;
        });

        finalDocuments.push(doc);
      });
    });

    return finalDocuments.map((doc) => AvertRecord.parse(doc));
  } catch (error) {
    throw new AppError(AppErrorCode.enum.SERVICE_ERROR, "Failed to combine AVERT data", {
      error,
    });
  }
};

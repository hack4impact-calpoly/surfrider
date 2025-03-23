import { AvertRecord } from "@/schema/avert";
import axios from "axios";
import * as XLSX from "xlsx";

//route that contains AVERT data file
const AVERT_URL = "https://www.epa.gov/system/files/documents/2024-04/avert_emission_rates_04-11-24_0.xlsx";

//fetch the AVERT Excel file from EPA website
export const fetchAvertData = async (): Promise<Buffer> => {
  //fetch spreadsheet as a binary buffer
  const response = await axios.get(AVERT_URL, { responseType: "arraybuffer" });
  return response.data;
};

export const transformAvertData = (fileBuffer: Buffer): AvertRecord[] => {
  //load the workbook
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });

  //extract sheets from workbook
  const capacityFactorSheet = workbook.Sheets["Capacity factors"];
  const emissionRatesSheet = workbook.Sheets["2023"];

  //extract capacity factors and emission rates
  const capacityFactors = extractCapacityFactors(capacityFactorSheet);
  const emissionRates = extractEmissionRates(emissionRatesSheet);

  //combine data
  const transformedData = combineData(capacityFactors, emissionRates, 2023);
  //convert to AvertRecord objects
  const avertRecords = transformedData.map((record) => {
    return AvertRecord.parse(record); //will throw error if record doesn't match schema
  });

  return avertRecords;
};

const extractCapacityFactors = (sheet: XLSX.WorkSheet) => {
  //convert to array format
  const jsonData: (string | number)[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  //create empty object to store extracted data
  const capacityData: Record<string, Record<string, number | string>> = {};

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
        OnshoreWind: sanitizeValue(row[1]), //column B
        OffshoreWind: sanitizeValue(row[2]), //column C
        UtilityPV: sanitizeValue(row[3]), //column D
        DistributedPV: sanitizeValue(row[4]), //column E
      };
    }
  });

  return capacityData;
};

const extractEmissionRates = (sheet: XLSX.WorkSheet) => {
  //convert sheet to an array
  const jsonData: (string | number)[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  //create an empty object to store emissions
  const emissionRatesData: Record<string, Record<string, Record<string, number | string>>> = {};

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

  return emissionRatesData;
};

//parse the columns in the location rows that represent the powerplant class
function processEmissionData(
  row: (string | number)[],
  emissionRatesData: Record<string, Record<string, Record<string, number | string>>>,
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
    OnshoreWind: sanitizeValue(row[colStart + 1]),
    OffshoreWind: sanitizeValue(row[colStart + 2]),
    UtilityPV: sanitizeValue(row[colStart + 3]),
    DistributedPV: sanitizeValue(row[colStart + 4]),
    PortfolioEE: sanitizeValue(row[colStart + 7]),
    UniformEE: sanitizeValue(row[colStart + 8]),
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
  return "";
}

const combineData = (capacityFactors: XLSX.WorkSheet, emissionRates: XLSX.WorkSheet, year: number) => {
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

  return finalDocuments;
};

function sanitizeValue(value: string | number | undefined): number {
  if (value === "-" || value === undefined || value === null) return 0;
  if (typeof value === "number") return value;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

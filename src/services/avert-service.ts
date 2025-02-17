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

export const transformAvertData = (fileBuffer: Buffer): unknown => {
  //load the workbook
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });

  //extract sheets from workbook
  const capacityFactorSheet = workbook.Sheets["Capacity factors"];
  //const emissionRatesSheet = workbook.Sheets["2023"];

  //extract capacity factors and emission rates
  const capacityFactors = extractCapacityFactors(capacityFactorSheet);
  //const emissionRates = extractEmissionRates(emissionRatesSheet);

  //combine data
  //const transformedData = combineData(capacityFactors, emissionRates);

  return capacityFactors;
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
    if (!location) return;

    //create entry for location and extract capacity factor values from respective columns
    capacityData[location] = {
      OnshoreWind: row[1], //column B
      OffshoreWind: row[2], //column C
      UtilityPV: row[3], //column D
      DistributedPV: row[4], //column E
    };
  });

  return capacityData;
};

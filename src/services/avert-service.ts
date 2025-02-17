import axios from "axios";

//route that contains AVERT data file
const AVERT_URL = "https://www.epa.gov/system/files/documents/2024-04/avert_emission_rates_04-11-24_0.xlsx";

//fetch the AVERT Excel file from EPA website
export const fetchAvertData = async (): Promise<Buffer> => {
  //fetch spreadsheet as a binary buffer
  const response = await axios.get(AVERT_URL, { responseType: "arraybuffer" });
  return response.data;
};

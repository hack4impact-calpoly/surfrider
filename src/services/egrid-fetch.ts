import axios from "axios";
import * as XLSX from "xlsx";

const EGRID_URL = "https://www.epa.gov/system/files/documents/2024-01/egrid2022_data.xlsx";
export const fetchEgridData = async (): Promise<Buffer> => {
  const response = await axios.get(EGRID_URL, { responseType: "arraybuffer" });
  return response.data;
};

export const transformEgridData = (fileBuffer: Buffer): unknown => {
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });

  const sheets = ["US22", "SRL22", "ST22"];
  const transformedData: Record<string, unknown[]> = {};

  console.log(transformedData);

  sheets.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    let data = XLSX.utils.sheet_to_json(sheet);

    // remove row 2 (subheaders from data)
    if (data.length > 1) {
      data = data.slice(1);
    }

    transformedData[sheetName] = data;
  });

  return transformedData;
};

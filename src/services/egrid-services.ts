import { EgridRecord } from "../schema/egrid";
import { EgridModel } from "../database/egrid-schema";

export async function addEgridRecord(egridRecord: EgridRecord): Promise<void> {
  try {
    EgridRecord.parse(egridRecord); // Runtime validation using Zod
    const record = new EgridModel(egridRecord);
    await record.save();
  } catch (error) {
    throw new Error(`Failed to add Egrid record: ${error}`);
  }
}

export async function getEgridRecordByYearAndLocation(year: number, location: string): Promise<EgridRecord> {
  try {
    const result = await EgridModel.findOne({ year, location }).lean();
    if (!result) {
      throw new Error("Record not found");
    }
    return EgridRecord.parse(result);
  } catch (error) {
    throw new Error(`Failed to fetch Egrid record: ${error}`);
  }
}

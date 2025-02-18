import { AvertRecord } from "@/schema/avert";
import { AvertModel } from "@/database/avert-model";
import { Location, PowerPlantClass } from "@/schema/egrid";
import { Error } from "@/schema/error";

export async function addAvertRecord(record: AvertRecord): Promise<void> {
  try {
    await AvertModel.create(record);
  } catch (error) {
    console.error("", error); // still need this for eslint requirements
    throw {
      code: "SERVICE_ERROR",
      message: "Service Error with Avert",
    } as Error;
  }
}

// thanks chatgpt #transparency
export async function getAvertRecordByKey(
  year: number,
  location: Location,
  powerPlantClass: PowerPlantClass,
): Promise<AvertRecord> {
  try {
    const doc = await AvertModel.findOne({ year, location, powerPlantClass }).exec();
    if (!doc) {
      return Promise.reject(new Error("Avert record not found"));
    }
    const plainObj = doc.toObject();
    return AvertRecord.parse(plainObj);
  } catch (error) {
    return Promise.reject(error);
  }
}

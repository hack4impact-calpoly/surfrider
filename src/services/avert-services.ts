import { AvertRecord } from "@/schema/avert";
import { AvertModel } from "@/database/avert-model";
import { Location, PowerPlantClass } from "@/schema/egrid";
import { Error as CustomError } from "@/schema/error";

export async function addAvertRecord(record: AvertRecord): Promise<void> {
  try {
    await AvertModel.create(record);
  } catch (err) {
    console.error("", err);
    throw {
      code: "SERVICE_ERROR",
      message: "Service Error with Avert",
    } as CustomError;
  }
}

export async function getAvertRecordByKey(
  year: number,
  location: Location,
  powerPlantClass: PowerPlantClass,
): Promise<AvertRecord> {
  try {
    const doc = await AvertModel.findOne({ year, location, powerPlantClass }).exec();
    if (!doc) {
      return Promise.reject(new globalThis.Error("Avert record not found"));
    }
    const plainObj = doc.toObject();
    return AvertRecord.parse(plainObj);
  } catch (error) {
    return Promise.reject(error);
  }
}

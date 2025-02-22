import { AvertRecord } from "@/schema/avert";
import { AvertModel } from "@/database/avert-model";
import { Location, PowerPlantClass } from "@/schema/egrid";
import { Error as CustomError } from "@/schema/error";
import { z } from "zod";

export async function addAvertRecord(record: AvertRecord): Promise<void | CustomError> {
  try {
    const validatedRecord = AvertRecord.parse(record);

    const existingRecord = await AvertModel.findOne({
      year: validatedRecord.year,
      location: validatedRecord.location,
      powerPlantClass: validatedRecord.powerPlantClass,
    }).lean();

    if (existingRecord) {
      return Promise.reject({
        code: "SERVICE_ERROR",
        message: `Record already exists for year ${validatedRecord.year}, location ${validatedRecord.location}, and power plant class ${validatedRecord.powerPlantClass}`,
      } as CustomError);
    }

    const newRecord = new AvertModel(validatedRecord);
    await newRecord.save();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        code: "SERVICE_ERROR",
        message: `Validation failed: ${error.errors.map((e) => e.message).join("; ")}`,
      };
    }

    if (CustomError.safeParse(error).success) {
      // If error already follows the new Error schema, propagate it
      throw error;
    }

    return {
      code: "SERVICE_ERROR",
      message: `Failed to add AVERT record: ${error && typeof error === "object" && "message" in error ? error.message : String(error)}`,
    };
  }
}

export async function getAvertRecordByKey(
  year: number,
  location: Location,
  powerPlantClass: PowerPlantClass,
): Promise<AvertRecord | CustomError> {
  try {
    const validYear = AvertRecord.shape.year.parse(year);
    const validLocation = AvertRecord.shape.location.parse(location);
    const validPowerPlantClass = AvertRecord.shape.powerPlantClass.parse(powerPlantClass);

    const result = await AvertModel.findOne({
      year: validYear,
      location: validLocation,
      powerPlantClass: validPowerPlantClass,
    }).lean();

    if (!result) {
      return Promise.reject({
        code: "SERVICE_ERROR",
        message: `No AVERT record found for year ${year}, location ${location}, and power plant class ${powerPlantClass}`,
      } as CustomError);
    }

    return AvertRecord.parse(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        code: "SERVICE_ERROR",
        message: `Validation failed: ${error.errors.map((e) => e.message).join("; ")}`,
      };
    }
    if (CustomError.safeParse(error).success) {
      // If error already follows the new Error schema, propagate it
      throw error;
    }

    return {
      code: "SERVICE_ERROR",
      message: `Failed to fetch AVERT record: ${error && typeof error === "object" && "message" in error ? error.message : String(error)}`,
    };
  }
}

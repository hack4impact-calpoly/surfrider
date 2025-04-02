import { AvertRecord, AvertLocation } from "@/schema/avert";
import { AvertModel } from "@/database/avert-model";
import { PowerPlantClass } from "@/schema/egrid";
import { AppError, transformError } from "@/utils/errors";
import { AppErrorCode } from "@/schema/error";
import connectDB from "@/database/db";

export async function addAvertRecord(record: AvertRecord): Promise<void> {
  try {
    await connectDB();
    const validatedRecord = AvertRecord.parse(record);

    // Upsert record
    await AvertModel.findOneAndUpdate(
      {
        year: validatedRecord.year,
        location: validatedRecord.location,
        powerPlantClass: validatedRecord.powerPlantClass,
      },
      validatedRecord,
      {
        upsert: true,
      },
    );
  } catch (error) {
    return Promise.reject(transformError(error, AppErrorCode.enum.SERVICE_ERROR, "Failed to add AVERT record"));
  }
}

export async function getAvertRecordByKey(
  year: number,
  location: AvertLocation,
  powerPlantClass: PowerPlantClass,
): Promise<AvertRecord> {
  try {
    await connectDB();
    const validYear = AvertRecord.shape.year.parse(year);
    const validLocation = AvertRecord.shape.location.parse(location);
    const validPowerPlantClass = AvertRecord.shape.powerPlantClass.parse(powerPlantClass);

    const result = await AvertModel.findOne({
      year: validYear,
      location: validLocation,
      powerPlantClass: validPowerPlantClass,
    }).lean();

    if (!result) {
      return Promise.reject(
        new AppError(
          AppErrorCode.enum.SERVICE_ERROR,
          `No AVERT record found for year ${year}, location ${location}, and power plant class ${powerPlantClass}`,
        ),
      );
    }

    return AvertRecord.parse(result);
  } catch (error) {
    return Promise.reject(transformError(error, AppErrorCode.enum.SERVICE_ERROR, "Failed to fetch AVERT record"));
  }
}

// src/services/egrid-service.ts
import { EgridRecord, EgridLocation } from "@/schema/egrid";
import { EgridModel } from "@/database/egrid-model";
import { AppErrorCode } from "@/schema/error";
import { AppError, transformError } from "@/utils/errors";
import connectDB from "@/database/db";

/**
 * Add a new eGRID record to the database
 * @param egridRecord The record to add
 * @returns Error if validation fails or database operation fails
 */
export async function addEgridRecord(egridRecord: EgridRecord): Promise<void> {
  try {
    await connectDB();
    // Validate the input using Zod schema
    const validatedRecord = EgridRecord.parse(egridRecord);

    // Upsert record
    await EgridModel.findOneAndUpdate(
      {
        year: validatedRecord.year,
        location: validatedRecord.location,
      },
      validatedRecord,
      {
        upsert: true,
      },
    );
  } catch (error) {
    return Promise.reject(transformError(error, AppErrorCode.enum.SERVICE_ERROR, "Failed to add eGRID record"));
  }
}

/**
 * Retrieve an eGRID record by year and location
 * @param year The year to query for
 * @param location The location code to query for
 * @returns The matching eGRID record
 * @returns Error if record not found or database operation fails
 */
export async function getEgridRecordByKey(year: number, location: EgridLocation): Promise<EgridRecord> {
  try {
    await connectDB();
    // Validate input parameters
    const validYear = EgridRecord.shape.year.parse(year);
    const validLocation = EgridRecord.shape.location.parse(location);

    // Query the database
    const result = await EgridModel.findOne({
      year: validYear,
      location: validLocation,
    }).lean();

    if (!result) {
      return Promise.reject(
        new AppError(
          AppErrorCode.enum.SERVICE_ERROR,
          `No eGRID record found for year ${year} and location ${location}`,
        ),
      );
    }

    // Validate and return the result
    return EgridRecord.parse(result);
  } catch (error) {
    return Promise.reject(transformError(error, AppErrorCode.enum.SERVICE_ERROR, "Failed to fetch eGRID record"));
  }
}

/**
 * Helper function to check if a record exists
 * @param year The year to check
 * @param location The location to check
 * @returns True if the record exists, false otherwise
 * @returns Error if record not found or database operation fails
 */
export async function doesRecordExist(year: number, location: EgridLocation): Promise<boolean> {
  try {
    await connectDB();
    const result = await EgridModel.exists({
      year,
      location,
    });
    return result !== null;
  } catch (error) {
    return Promise.reject(transformError(error, AppErrorCode.enum.SERVICE_ERROR, "Failed to check record existence"));
  }
}

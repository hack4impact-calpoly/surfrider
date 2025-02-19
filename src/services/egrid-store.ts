// src/services/egrid-service.ts
import { z } from "zod";
import { EgridRecord, Location } from "@/schema/egrid";
import { EgridModel } from "@/database/egrid-model";
import { Error } from "@/schema/error";

/**
 * Add a new eGRID record to the database
 * @param egridRecord The record to add
 * @returns Error if validation fails or database operation fails
 */
export async function addEgridRecord(egridRecord: EgridRecord): Promise<void | Error> {
  try {
    // Validate the input using Zod schema
    const validatedRecord = EgridRecord.parse(egridRecord);

    // Check if record already exists
    const existingRecord = await EgridModel.findOne({
      year: validatedRecord.year,
      location: validatedRecord.location,
    }).lean();

    if (existingRecord) {
      return {
        code: "SERVICE_ERROR",
        message: `Record already exists for year ${validatedRecord.year} and location ${validatedRecord.location}`,
      };
    }

    // Create and save new record
    const record = new EgridModel(validatedRecord);
    await record.save();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        code: "SERVICE_ERROR",
        message: `Validation failed: ${error.errors.map((e) => e.message).join("; ")}`,
      };
    }

    if (Error.safeParse(error).success) {
      // If error already follows the new Error schema, propagate it
      throw error;
    }

    return {
      code: "SERVICE_ERROR",
      message: `Failed to add eGRID record: ${error && typeof error === "object" && "message" in error ? error.message : String(error)}`,
    };
  }
}

/**
 * Retrieve an eGRID record by year and location
 * @param year The year to query for
 * @param location The location code to query for
 * @returns The matching eGRID record
 * @returns Error if record not found or database operation fails
 */
export async function getEgridRecordByYearAndLocation(year: number, location: Location): Promise<EgridRecord | Error> {
  try {
    // Validate input parameters
    const validYear = EgridRecord.shape.year.parse(year);
    const validLocation = EgridRecord.shape.location.parse(location);

    // Query the database
    const result = await EgridModel.findOne({
      year: validYear,
      location: validLocation,
    }).lean();

    if (!result) {
      return {
        code: "SERVICE_ERROR",
        message: `No eGRID record found for year ${year} and location ${location}`,
      };
    }

    // Validate and return the result
    return EgridRecord.parse(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        code: "SERVICE_ERROR",
        message: `Validation failed: ${error.errors.map((e) => e.message).join("; ")}`,
      };
    }
    if (Error.safeParse(error).success) {
      // If error already follows the new Error schema, propagate it
      throw error;
    }

    return {
      code: "SERVICE_ERROR",
      message: `Failed to fetch eGRID record: ${error && typeof error === "object" && "message" in error ? error.message : String(error)}`,
    };
  }
}

/**
 * Helper function to check if a record exists
 * @param year The year to check
 * @param location The location to check
 * @returns True if the record exists, false otherwise
 * @returns Error if record not found or database operation fails
 */
export async function doesRecordExist(year: number, location: Location): Promise<boolean | Error> {
  try {
    const result = await EgridModel.exists({
      year,
      location,
    });
    return result !== null;
  } catch (error) {
    return {
      code: "SERVICE_ERROR",
      message: `Failed to check record existence: ${error && typeof error === "object" && "message" in error ? error.message : String(error)}`,
    };
  }
}

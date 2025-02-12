// src/services/egrid-service.ts
import { z } from "zod";
import { EgridRecord, Location } from "@/schema/egrid";
import { EgridModel } from "@/database/egrid-model";

/**
 * Custom error class for eGRID service errors
 */
export class EgridServiceError extends Error {
  constructor(
    message: string,
    public cause?: unknown,
  ) {
    super(message);
    this.name = "EgridServiceError";
  }
}

/**
 * Add a new eGRID record to the database
 * @param egridRecord The record to add
 * @throws EgridServiceError if validation fails or database operation fails
 */
export async function addEgridRecord(egridRecord: EgridRecord): Promise<void> {
  try {
    // Validate the input using Zod schema
    const validatedRecord = EgridRecord.parse(egridRecord);

    // Check if record already exists
    const existingRecord = await EgridModel.findOne({
      year: validatedRecord.year,
      location: validatedRecord.location,
    }).lean();

    if (existingRecord) {
      throw new EgridServiceError(
        `Record already exists for year ${validatedRecord.year} and location ${validatedRecord.location}`,
      );
    }

    // Create and save new record
    const record = new EgridModel(validatedRecord);
    await record.save();
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new EgridServiceError(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`, error);
    }
    if (error instanceof EgridServiceError) {
      throw error;
    }
    throw new EgridServiceError(
      `Failed to add eGRID record: ${error instanceof Error ? error.message : String(error)}`,
      error,
    );
  }
}

/**
 * Retrieve an eGRID record by year and location
 * @param year The year to query for
 * @param location The location code to query for
 * @returns The matching eGRID record
 * @throws EgridServiceError if record not found or database operation fails
 */
export async function getEgridRecordByYearAndLocation(year: number, location: Location): Promise<EgridRecord> {
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
      throw new EgridServiceError(`No eGRID record found for year ${year} and location ${location}`);
    }

    // Validate and return the result
    return EgridRecord.parse(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new EgridServiceError(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`, error);
    }
    if (error instanceof EgridServiceError) {
      throw error;
    }
    throw new EgridServiceError(
      `Failed to fetch eGRID record: ${error instanceof Error ? error.message : String(error)}`,
      error,
    );
  }
}

/**
 * Helper function to check if a record exists
 * @param year The year to check
 * @param location The location to check
 * @returns True if the record exists, false otherwise
 */
export async function doesRecordExist(year: number, location: Location): Promise<boolean> {
  try {
    const result = await EgridModel.exists({
      year,
      location,
    });
    return result !== null;
  } catch (error) {
    throw new EgridServiceError(
      `Failed to check record existence: ${error instanceof Error ? error.message : String(error)}`,
      error,
    );
  }
}

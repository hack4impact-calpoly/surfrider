import { NextResponse } from "next/server";
import { fetchEgridData, transformEgridData,} from "@/services/egrid-fetch";
import { addEgridRecord, transformEgridRecord } from "@/services/egrid-store";
import { AppError, apiErrorHandler } from "@/utils/errors";
import {AppErrorCode } from "@/schema/error";
/**
 * Route to fetch the egrid data
 * TODO: Implement the route
 * TODO: Add authorization to restrict access to scheduled cron job
 */
export async function POST() {
  return NextResponse.json({ message: "Hello from the egrid API!" });
}

export const GET = async () => {
  try {
    const fileBuffer = await fetchEgridData();
    const transformedData = transformEgridData(fileBuffer);

    if (!Array.isArray(transformedData)) {
      throw new AppError(AppErrorCode.enum.API_ERROR, "transformedData needs to be an array");
    }

    for (const record of transformedData) {
      const egridRecord = transformEgridRecord(record);
      try {
        await addEgridRecord(egridRecord);
      } catch (error) {
        console.error("Error adding eGRID record:", error);
        throw new AppError(AppErrorCode.enum.API_ERROR, `Error uploading record with year ${egridRecord.year} and location ${egridRecord.location}}`
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "All records uploaded successfully.",
    });

  } catch (error) {
    return apiErrorHandler(error);}
};

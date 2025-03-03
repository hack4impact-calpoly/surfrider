import { NextResponse } from "next/server";
import { fetchEgridData, transformEgridData } from "@/services/egrid-fetch";
import { addEgridRecord, transformEgridRecord } from "@/services/egrid-store";

export async function POST() {
  try {
    const fileBuffer = await fetchEgridData();
    const transformedData = transformEgridData(fileBuffer);

    if (!Array.isArray(transformedData)) {
      return NextResponse.json({
        success: false,
        error: {
          code: "CLIENT_ERROR",
          message: "transformedData needs to be an array",
        },
      });
    }

    for (const record of transformedData) {
      try {
        const egridRecord = transformEgridRecord(record);
        const result = await addEgridRecord(egridRecord);

        if (result && "code" in result) {
          return NextResponse.json({
            success: false,
            error: {
              code: result.code || "SERVICE_ERROR",
              message: `Error uploading record with a year ${egridRecord.year} and location ${egridRecord.location}: ${result.message}`,
            },
          });
        }
      } catch (error) {
        console.error("Error adding eGRID record:", error);
        return NextResponse.json({
          success: false,
          error: {
            code: "SERVICE_ERROR",
            message: "Failed to add eGRID record",
          },
        });
      }
    } // End of for-loop; semicolon added to explicitly terminate the block.
    return NextResponse.json({
      success: true,
      message: "All records uploaded successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "API_ERROR",
          message: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
        },
      },
      { status: 500 },
    );
  }
}

/**
 * Route to fetch the eGRID data.
 * TODO: Implement additional authorization to restrict access (e.g., to a scheduled cron job)
 */
export const GET = async () => {
  const fileBuffer = await fetchEgridData();
  const transformedData = transformEgridData(fileBuffer);
  return NextResponse.json({ success: true, data: transformedData });
};

import { NextResponse } from "next/server";
import { fetchAvertData, transformAvertData } from "@/services/avert-fetch";
import { apiErrorHandler } from "@/utils/errors";

export async function GET() {
  try {
    const fileBuffer = await fetchAvertData();
    const transformedData = transformAvertData(fileBuffer);
    console.log("Cron Job Happened: api/avert");
    return NextResponse.json({ message: "Cron job executed", success: true, data: transformedData });
  } catch (error) {
    return apiErrorHandler(error); //errors are caught and passed here for consistent error response
  }
}

import { NextResponse } from "next/server";
import { fetchAvertData, transformAvertData } from "@/services/avert-fetch";
import { addAvertRecord } from "@/services/avert-store";
import { apiErrorHandler } from "@/utils/errors";
import connectDB from "@/database/db";

export async function GET() {
  await connectDB();
  try {
    const fileBuffer = await fetchAvertData();
    const transformedData = transformAvertData(fileBuffer);
    //iterate over the AvertRecord objects and add them to the database
    for (const record of transformedData) {
      await addAvertRecord(record);
    }
    console.log("Cron Job Happened: api/avert");
    return NextResponse.json({ message: "Cron job executed", success: true, data: "successful upload" });
  } catch (error) {
    return apiErrorHandler(error); //errors are caught and passed here for consistent error response
  }
}

import { fetchAndTransformAvertData } from "@/services/avert-fetch";
import { addAvertRecord } from "@/services/avert-store";
import { apiErrorHandler } from "@/utils/errors";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const records = await fetchAndTransformAvertData();
    //iterate over the AvertRecord objects and add them to the database
    await Promise.all(records.map(addAvertRecord));
    return NextResponse.json(records.length);
  } catch (error) {
    return apiErrorHandler(error); //errors are caught and passed here for consistent error response
  }
}

import { fetchAndTransformAvertData } from "@/services/avert-fetch";
import { addAvertRecord } from "@/services/avert-store";
import { apiErrorHandler } from "@/utils/errors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const records = await fetchAndTransformAvertData();
    //iterate over the AvertRecord objects and add them to the database
    await Promise.all(records.map(addAvertRecord));
    return NextResponse.json(records.length);
  } catch (error) {
    return apiErrorHandler(error); //errors are caught and passed here for consistent error response
  }
}

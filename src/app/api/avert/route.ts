import { NextResponse } from "next/server";
import { fetchAvertData, transformAvertData } from "@/services/avert-fetch";

export async function GET() {
  const fileBuffer = await fetchAvertData();
  const transformedData = transformAvertData(fileBuffer);
  console.log("Cron Job Happened: api/avert");
  return NextResponse.json({ message: "Cron job executed", success: true, data: transformedData });
}

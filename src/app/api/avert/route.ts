import { NextResponse } from "next/server";

export async function GET() {
  console.log("Cron Job Happened: api/avert");
  return NextResponse.json({ message: "Cron job executed" });
}

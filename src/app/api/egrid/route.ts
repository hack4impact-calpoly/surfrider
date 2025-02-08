import { NextResponse } from "next/server";
import { fetchEgridData, transformEgridData } from "@/services/egrid-service";

/**
 * Route to fetch the egrid data
 * TODO: Implement the route
 * TODO: Add authorization to restrict access to scheduled cron job
 */
export async function POST() {
  return NextResponse.json({ message: "Hello from the egrid API!" });
}

export const GET = async () => {
  const fileBuffer = await fetchEgridData();
  const transformedData = transformEgridData(fileBuffer);
  return NextResponse.json({ success: true, data: transformedData });
};

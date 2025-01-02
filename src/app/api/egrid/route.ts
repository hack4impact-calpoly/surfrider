import { NextResponse } from "next/server";

/**
 * Route to fetch the egrid data
 * TODO: Implement the route
 * TODO: Add authorization to restrict access to scheduled cron job
 */
export async function POST() {
  return NextResponse.json({ message: "Hello from the egrid API!" });
}

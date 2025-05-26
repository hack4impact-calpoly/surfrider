import { fetchAndTransformEgridData } from "@/services/egrid-fetch";
import { addEgridRecord } from "@/services/egrid-store";
import { apiErrorHandler } from "@/utils/errors";
import { NextRequest, NextResponse } from "next/server";

/**
 * Route to fetch the egrid data
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const records = await fetchAndTransformEgridData();
    await Promise.all(records.map(addEgridRecord));
    return NextResponse.json(records.length);
  } catch (error) {
    return apiErrorHandler(error);
  }
}

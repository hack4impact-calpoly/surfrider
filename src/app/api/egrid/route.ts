import { fetchAndTransformEgridData } from "@/services/egrid-fetch";
import { addEgridRecord } from "@/services/egrid-store";
import { apiErrorHandler } from "@/utils/errors";
import { NextResponse } from "next/server";

/**
 * Route to fetch the egrid data
 * TODO: Add authorization to restrict access to scheduled cron job
 */
export const GET = async () => {
  try {
    const records = await fetchAndTransformEgridData();
    await Promise.all(records.map(addEgridRecord));
    return NextResponse.json(records.length);
  } catch (error) {
    return apiErrorHandler(error);
  }
};

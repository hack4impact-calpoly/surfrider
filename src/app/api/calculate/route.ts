import { FormulaParser } from "@/utils/formula-parser";
import { apiErrorHandler } from "@/utils/errors";
import { CalculateInput } from "@/schema/api";
import { NextRequest, NextResponse } from "next/server";
import { getEgridRecordByKey } from "@/services/egrid-store";
import { getAvertRecordByKey } from "@/services/avert-store";
import { EgridRecordData } from "@/schema/egrid";
import { AvertRecordData } from "@/schema/avert";

function extractNumericFields(obj: Record<string, unknown>): Record<string, number> {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => typeof value === "number")) as Record<
    string,
    number
  >;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const inputData = CalculateInput.parse(body);

    const { yearOfStudy, egridLocation, avertLocation, powerPlantClass, ...inputVariables } = inputData;
    console.log("year: " + yearOfStudy);
    console.log("egrid location: " + egridLocation);
    console.log("avert location: " + avertLocation);
    console.log("power plant class: " + powerPlantClass);

    const egridRecord = getEgridRecordByKey(yearOfStudy, egridLocation);
    const avertRecord = getAvertRecordByKey(yearOfStudy, avertLocation, powerPlantClass);

    const egridRecordData = extractNumericFields(EgridRecordData.parse(egridRecord));
    const avertRecordData = extractNumericFields(AvertRecordData.parse(avertRecord));

    const formulaParser = new FormulaParser({
      ...inputVariables,
      ...egridRecordData,
      ...avertRecordData,
    });
    const result = formulaParser.evaluate();

    return NextResponse.json(result);
  } catch (error) {
    return apiErrorHandler(error);
  }
}

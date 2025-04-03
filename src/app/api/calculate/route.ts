import { FormulaParser } from "@/utils/formula-parser";
import { formulas } from "@/utils/formula-collection";
import { apiErrorHandler } from "@/utils/errors";
import { CalculateInput } from "@/schema/api";
import { getEgridRecordByKey } from "@/services/egrid-store";
import { getAvertRecordByKey } from "@/services/avert-store";
import { EgridRecordData, powerPlantClassToIndex } from "@/schema/egrid";
import { AvertRecordData, egridToAvertLocations } from "@/schema/avert";
import { NextRequest, NextResponse } from "next/server";

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

    const { location, powerPlantClass, ...inputVariables } = inputData;

    // fetch eGRID and AVERT records
    // TODO: sync up eGRID and AVERT records to the same year
    const egridRecord = await getEgridRecordByKey(2022, location);
    const avertRecord = await getAvertRecordByKey(2023, egridToAvertLocations[location], powerPlantClass);

    const egridRecordData = extractNumericFields(EgridRecordData.parse(egridRecord));
    const avertRecordData = extractNumericFields(AvertRecordData.parse(avertRecord));

    // instantiate FormulaParser and add formulas
    const formulaParser = new FormulaParser({
      ...inputVariables,
      ...egridRecordData,
      ...avertRecordData,
      powerPlantClass: powerPlantClassToIndex[powerPlantClass],
    });
    formulas.forEach((formula) => formulaParser.addFormula(formula));

    const result = formulaParser.evaluate();

    return NextResponse.json(result);
  } catch (error) {
    return apiErrorHandler(error);
  }
}

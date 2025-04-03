import { FormulaParser } from "@/utils/formula-parser";
import { formulas } from "@/utils/formula-collection";
import { apiErrorHandler } from "@/utils/errors";
import { CalculateInput } from "@/schema/api";
import { FormulaId } from "@/schema/formula";
import { getEgridRecordByKey } from "@/services/egrid-store";
import { getAvertRecordByKey } from "@/services/avert-store";
import { EgridRecordData, powerPlantClassToIndex } from "@/schema/egrid";
import { AvertRecordData, egridToAvertLocations } from "@/schema/avert";
import { NextRequest, NextResponse } from "next/server";

/**
 * Extracts the numeric fields from an object and returns a new object with only the numeric fields.
 * @param obj - The object from which to extract the numeric fields.
 * @returns A new object with only the numeric fields.
 */
function extractNumericFields(obj: Record<string, unknown>): Record<string, number> {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => typeof value === "number")) as Record<
    string,
    number
  >;
}

/**
 * Filters the results map based on a set of valid formula IDs.
 * @param results - The map of formula results.
 * @returns The filtered results as a record of formula IDs and corresponding values.
 */
function filterFormulaResults(results: Map<string, number>): Record<string, number> {
  const validResults = new Set(FormulaId.options);

  return Object.fromEntries(Array.from(results.entries()).filter(([key]) => validResults.has(key as FormulaId)));
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

    formulaParser.evaluate();
    const result = filterFormulaResults(formulaParser.getAllVariables());

    return NextResponse.json(result);
  } catch (error) {
    return apiErrorHandler(error);
  }
}

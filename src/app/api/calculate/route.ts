import { FormulaParser } from "@/utils/formula-parser";
import { apiErrorHandler } from "@/utils/errors";
import { CalculateInput } from "@/schema/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const inputData = CalculateInput.parse(body);

    const { location, powerPlantClass, ...inputVariables } = inputData;
    console.log("location: " + location);
    console.log("power plant class: " + powerPlantClass);
    const formulaParser = new FormulaParser(inputVariables);
    const result = formulaParser.evaluate();

    return NextResponse.json(result);
  } catch (error) {
    return apiErrorHandler(error);
  }
}

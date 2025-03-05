import { FormulaParser } from "@/utils/formula-parser";
import { apiErrorHandler } from "@/utils/errors";
import { CalculateInput } from "@/schema/api";
import { NextResponse } from "next/server";
import { NextApiResponse } from "next";

export async function POST(req: Request, res: NextApiResponse) {
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
    return apiErrorHandler(error, res);
  }
}

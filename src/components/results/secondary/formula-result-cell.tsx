import { formulaMap } from "@/formulas/formula-collection";
import { CalculateResult } from "@/schema/api";
import { FormulaId } from "@/schema/formula-id";
import { ResultCell } from "./result-cell";
import { TableCell } from "../../ui/table";

interface FormulaResultCellProps {
  results: CalculateResult;
  formulaId: FormulaId | null;
}

export const FormulaResultCell = (props: FormulaResultCellProps) => {
  const { results, formulaId } = props;

  if (!formulaId || !results || !results[formulaId]) {
    return <TableCell className="text-end font-bold green-cell">N/A</TableCell>;
  }
  const formula = formulaMap[formulaId];
  const formulaValue = results[formulaId];

  return (
    <ResultCell
      value={formulaValue}
      name={formula.name}
      explanation={formula.explanation}
      expression={formula.expression}
    />
  );
};

import { formulaMap } from "@/formulas/formula-collection";
import { CalculateResult } from "@/schema/api";
import { FormulaId } from "@/schema/formula-id";
import { TooltipPortal } from "@radix-ui/react-tooltip";
import { TableCell } from "./ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface FormulaResultCellProps {
  results: CalculateResult;
  formulaId: FormulaId | null;
}

export const FormulaResultCell = (props: React.PropsWithChildren<FormulaResultCellProps>) => {
  const { results, formulaId } = props;

  if (!formulaId || !results || !results[formulaId]) {
    return <TableCell className="text-end font-bold green-cell">N/A</TableCell>;
  }
  const formula = formulaMap[formulaId];
  const formulaValue = results[formulaId];

  return (
    <TableCell className="text-end font-bold green-cell">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>{formulaValue.toLocaleString()}</span>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent className="max-w-sm flex flex-col items-start text-start text-slate-900 space-y-1">
              <h1 className="font-bold text-base pb-1">{formula.name}</h1>
              <p className="font-normal text-sm">{formula.explanation}</p>
              <p className="font-normal font-mono text-sm text-slate-500 italic">
                <code>{formula.expression}</code>
              </p>
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      </TooltipProvider>
    </TableCell>
  );
};

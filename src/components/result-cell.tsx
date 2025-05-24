import { TableCell } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipPortal } from "@radix-ui/react-tooltip";

interface ResultCellProps {
  value?: number;
  name: string;
  explanation: string;
  expression?: string;
}

export const ResultCell = (props: ResultCellProps) => {
  const { value, name, explanation, expression } = props;

  if (!value) {
    return <TableCell className="text-end font-bold green-cell">N/A</TableCell>;
  }

  return (
    <TableCell className="text-end font-bold green-cell">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>{value.toLocaleString()}</span>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent className="max-w-sm flex flex-col items-start text-start text-slate-900 space-y-1">
              <h1 className="font-bold text-base pb-1">{name}</h1>
              <p className="font-normal text-sm">{explanation}</p>
              {expression && (
                <p className="font-normal font-mono text-sm text-slate-500 italic">
                  <code>{expression}</code>
                </p>
              )}
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      </TooltipProvider>
    </TableCell>
  );
};

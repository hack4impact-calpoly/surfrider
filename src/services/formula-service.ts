import { parser, Parser } from "mathjs";

// TODO: replace with formula schema type
type Formula = {
  id: string;
  name: string;
  explanation: string;
  assumptions: string[];
  sources: string[];
  expression: string;
  unit: string;
  setupScope: () => void;
  dependencies: string[];
};

export class FormulaParser {
  private parser: Parser;

  constructor() {
    this.parser = parser();
  }
}

import { parser, Parser } from "mathjs";

// TODO: replace with formula schema types
type FormulaId = string;

type Formula = {
  id: FormulaId;
  name: string;
  explanation: string;
  assumptions: string[];
  sources: string[];
  expression: string;
  unit: string;
  setupScope: (formulaParser: FormulaParser) => void;
  dependencies: string[];
};

// TODO: replace with API input type
type Input = {
  installedCapacity: number;
  // TODO: replace with PowerPlantClass enum once defined
  powerPlantClass: number;
  // TODO: replace with eGRID Location enum once defined
  location: number;
  capacityFactor: number;
  population2070: number;
  startYear: number;
  lifetimeYears: number;
  yearOfStudy: number;
};

export class FormulaParser {
  private formulas: Map<FormulaId, Formula>;
  private formulaAdj: Map<FormulaId, FormulaId[]>;
  private formulaInDeg: Map<FormulaId, number>;
  private parser: Parser;

  constructor(input: Input) {
    this.formulas = new Map();
    this.formulaAdj = new Map();
    this.formulaInDeg = new Map();
    this.parser = parser();

    Object.keys(input).forEach((key) => {
      this.addVariable(key, input[key as keyof Input]);
    });
  }

  private buildTopologicalOrder(): Formula[] {
    const formulaOrder: Formula[] = [];
    const queue: FormulaId[] = [];

    // add formulas with no dependencies to the queue
    this.formulas.forEach((formula) => {
      if (!this.formulaInDeg.has(formula.id)) {
        queue.push(formula.id);
      }
    });

    // perform topological sort
    while (queue.length > 0) {
      const formulaId = queue.shift() as FormulaId;
      formulaOrder.push(this.formulas.get(formulaId) as Formula);

      if (this.formulaAdj.has(formulaId)) {
        this.formulaAdj.get(formulaId)?.forEach((adjFormulaId) => {
          const inDeg = (this.formulaInDeg.get(adjFormulaId) as number) - 1;
          this.formulaInDeg.set(adjFormulaId, inDeg);

          if (inDeg === 0) {
            queue.push(adjFormulaId);
          }
        });
      }
    }

    // check for cycles
    if (formulaOrder.length !== this.formulas.size) {
      throw new Error("Cyclic dependency detected");
    }

    return formulaOrder;
  }

  parse(): number {
    const formulaOrder = this.buildTopologicalOrder();

    // setup scope and evaluate formulas in topological order
    formulaOrder.forEach((formula) => {
      formula.setupScope(this);
      const value = this.parser.evaluate(formula.expression);
      this.addVariable(formula.id, value);
    });

    // return last formula value
    return this.getVariable(formulaOrder[formulaOrder.length - 1].id);
  }

  addFormula(formula: Formula): void {
    this.formulas.set(formula.id, formula);

    // update adjacency list and in-degrees
    formula.dependencies.forEach((dependency) => {
      if (!this.formulaAdj.has(dependency)) {
        this.formulaAdj.set(dependency, []);
      }
      this.formulaAdj.get(dependency)?.push(formula.id);
      this.formulaInDeg.set(formula.id, (this.formulaInDeg.get(formula.id) || 0) + 1);
    });
  }

  getFormula(id: FormulaId): Formula | undefined {
    return this.formulas.get(id);
  }

  getFormulas(): Formula[] {
    return Array.from(this.formulas.values());
  }

  addVariable(name: string, value: number): void {
    this.parser.set(name, value);
  }

  addCallbackVariable(name: string, callback: () => number): void {
    this.parser.set(name, callback);
  }

  getVariable(name: string): number {
    return this.parser.get(name);
  }

  getVariables(): Map<string, number> {
    return this.parser.getAllAsMap();
  }
}

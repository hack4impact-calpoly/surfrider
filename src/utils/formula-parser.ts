import { parser, Parser } from "mathjs";

// TODO: replace with formula schema types
type FormulaId = string;

export type Formula = {
  id: FormulaId;
  name: string;
  explanation: string;
  assumptions: string[];
  sources: string[];
  expression: string;
  unit: string;
  setupScope(addVariable: (name: string, value: number | (() => number)) => void): void;
  dependencies: string[];
};

export class FormulaParser<T extends Record<string, number>> {
  // map of formula id to formula object
  private formulas: Map<FormulaId, Formula>;
  // map of formula id to list of formula ids that depend on it
  private formulaAdj: Map<FormulaId, FormulaId[]>;
  // map of formula id to number of formulas it depends on
  private formulaInDeg: Map<FormulaId, number>;
  private parser: Parser;

  constructor(inputVariables: T) {
    this.formulas = new Map();
    this.formulaAdj = new Map();
    this.formulaInDeg = new Map();
    this.parser = parser();

    // initialize input variables in the parser
    Object.keys(inputVariables).forEach((key) => {
      this.addVariable(key, inputVariables[key as keyof T]);
    });
  }

  private validateFormulaDependencies(): boolean {
    const inputVariables = this.getAllVariables();
    return Array.from(this.formulas.values()).every((formula) =>
      formula.dependencies.every((dependency) => this.formulas.has(dependency) || inputVariables.has(dependency)),
    );
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

  evaluate(): number {
    if (this.formulas.size === 0) {
      throw new Error("No formulas to evaluate");
    }

    if (!this.validateFormulaDependencies()) {
      throw new Error("Invalid formula dependencies detected");
    }

    const formulaOrder = this.buildTopologicalOrder();

    // setup scope and evaluate formulas in topological order
    formulaOrder.forEach((formula) => {
      formula.setupScope(this.addVariable.bind(this));
      const value = this.parser.evaluate(formula.expression);
      this.addVariable(formula.id, value);
    });

    // return last formula value
    return this.getVariable(formulaOrder[formulaOrder.length - 1].id);
  }

  addFormula(formula: Formula): void {
    if (this.formulas.has(formula.id)) {
      throw new Error(`Formula with id ${formula.id} already exists`);
    }

    this.formulas.set(formula.id, formula);

    // update adjacency list and in-degrees
    formula.dependencies.forEach((dependency) => {
      // at this point, getAllVariables only includes the input variables, as we don't add formulas as variables until evaluation
      // If the dependency is an input variable, don't include it in our adjacency graph
      if (this.getAllVariables().has(dependency)) {
        return;
      }

      if (!this.formulaAdj.has(dependency)) {
        this.formulaAdj.set(dependency, []);
      }
      this.formulaAdj.get(dependency)?.push(formula.id);
      this.formulaInDeg.set(formula.id, (this.formulaInDeg.get(formula.id) || 0) + 1);
    });
  }

  getFormula(id: FormulaId): Formula {
    const formula = this.formulas.get(id);
    if (!formula) {
      throw new Error(`Formula with id ${id} not found`);
    }

    return formula;
  }

  getAllFormulas(): Formula[] {
    return Array.from(this.formulas.values());
  }

  addVariable(name: string, value: number | (() => number)): void {
    if (!!this.parser.get(name)) {
      throw new Error(`Variable with name ${name} already exists`);
    }

    this.parser.set(name, value);
  }

  getVariable(name: string): number {
    const value = this.parser.get(name);
    if (!value) {
      throw new Error(`Variable with name ${name} not found`);
    }

    return this.parser.get(name);
  }

  getAllVariables(): Map<string, number> {
    return this.parser.getAllAsMap();
  }
}

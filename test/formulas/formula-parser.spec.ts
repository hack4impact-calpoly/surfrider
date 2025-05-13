import { FormulaParser } from "@/formulas/formula-parser";
import { mocked } from "jest-mock";
import { Parser, parser } from "mathjs";
import {
  MOCK_FORMULAS,
  MOCK_FORMULAS_EXTENDED,
  MOCK_FORMULAS_WITH_CYCLE,
  MOCK_FORMULAS_WITH_SCOPE_CALLBACK,
  MOCK_FORMULAS_WITH_UNKNOWN_DEPENDENCY,
  MOCK_INPUT_VARIABLES,
} from "../mocks/formula-mocks";

const testParser: Parser = jest.requireActual("mathjs").parser();
const testParserEvaluate = jest.spyOn(testParser, "evaluate");
const testParserSet = jest.spyOn(testParser, "set");

jest.mock("mathjs");
const mockedParser = mocked(parser);
mockedParser.mockReturnValue(testParser as unknown as Parser);

describe("Formula parser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    testParser.clear();
  });

  describe("constructor", () => {
    it("should create a new instance", () => {
      const parser = new FormulaParser(MOCK_INPUT_VARIABLES);

      expect(parser).toBeInstanceOf(FormulaParser);
    });

    it("should add input variables", () => {
      new FormulaParser(MOCK_INPUT_VARIABLES);

      expect(testParserSet).toHaveBeenCalledTimes(3);
      expect(testParserSet).toHaveBeenCalledWith("a", 3);
      expect(testParserSet).toHaveBeenCalledWith("b", 7);
      expect(testParserSet).toHaveBeenCalledWith("c", 10);
    });

    it("should not add input variables if empty", () => {
      new FormulaParser({});

      expect(testParserSet).not.toHaveBeenCalled();
    });
  });

  describe("formulas", () => {
    it("should add and get single formula", () => {
      const parser = new FormulaParser(MOCK_INPUT_VARIABLES);
      parser.addFormula(MOCK_FORMULAS[0]);

      expect(parser.getFormula("formula_1")).toEqual(MOCK_FORMULAS[0]);
    });

    it("should add and get multiple formulas", () => {
      const parser = new FormulaParser(MOCK_INPUT_VARIABLES);
      MOCK_FORMULAS.forEach((formula) => parser.addFormula(formula));

      expect(parser.getAllFormulas().sort()).toEqual(MOCK_FORMULAS.sort());
    });

    it("should throw if formula is not found", () => {
      const parser = new FormulaParser(MOCK_INPUT_VARIABLES);

      expect(() => parser.getFormula("unknown")).toThrow();
    });

    it("should throw if formula already exists", () => {
      const parser = new FormulaParser(MOCK_INPUT_VARIABLES);
      parser.addFormula(MOCK_FORMULAS[0]);

      expect(() => parser.addFormula(MOCK_FORMULAS[0])).toThrow();
    });
  });

  describe("variables", () => {
    it("should add and get single variable", () => {
      const parser = new FormulaParser(MOCK_INPUT_VARIABLES);
      parser.addVariable("test", 5);

      expect(parser.getVariable("test")).toEqual(5);
    });

    it("should add and get multiple variables", () => {
      const parser = new FormulaParser(MOCK_INPUT_VARIABLES);
      parser.addVariable("test1", 5);
      parser.addVariable("test2", 10);

      expect(parser.getAllVariables()).toEqual(
        new Map([
          ["a", 3],
          ["b", 7],
          ["c", 10],
          ["test1", 5],
          ["test2", 10],
        ]),
      );
    });

    it("should throw if variable is not found", () => {
      const parser = new FormulaParser(MOCK_INPUT_VARIABLES);

      expect(() => parser.getVariable("unknown")).toThrow();
    });

    it("should throw if variable already exists", () => {
      const parser = new FormulaParser(MOCK_INPUT_VARIABLES);
      parser.addVariable("test", 5);

      expect(() => parser.addVariable("test", 10)).toThrow();
    });
  });

  describe("evaluation", () => {
    it("should evaluate formula", () => {
      const parser = new FormulaParser(MOCK_INPUT_VARIABLES);
      MOCK_FORMULAS.forEach((formula) => parser.addFormula(formula));

      const result = parser.evaluate();

      expect(testParserEvaluate).toHaveBeenCalledTimes(3);
      expect(testParserEvaluate).toHaveBeenCalledWith("a + b");
      expect(testParserEvaluate).toHaveBeenCalledWith("a * b + c");
      expect(testParserEvaluate).toHaveBeenCalledWith("formula_2 + formula_3");
      expect(result).toEqual(41);
    });

    it("should evaluate formula with extended topological order", () => {
      const parser = new FormulaParser(MOCK_INPUT_VARIABLES);
      MOCK_FORMULAS_EXTENDED.forEach((formula) => parser.addFormula(formula));

      const result = parser.evaluate();

      expect(result).toEqual(351);
    });

    it("should evaluate formula with scope callback", () => {
      const parser = new FormulaParser(MOCK_INPUT_VARIABLES);
      MOCK_FORMULAS_WITH_SCOPE_CALLBACK.forEach((formula) => parser.addFormula(formula));

      const result = parser.evaluate();

      expect(result).toEqual(46);
    });

    it("should throw if no formulas are added", () => {
      const parser = new FormulaParser(MOCK_INPUT_VARIABLES);

      expect(() => parser.evaluate()).toThrow();
    });

    it("should throw if formula has unknown dependency", () => {
      const parser = new FormulaParser(MOCK_INPUT_VARIABLES);
      MOCK_FORMULAS_WITH_UNKNOWN_DEPENDENCY.forEach((formula) => parser.addFormula(formula));

      expect(() => parser.evaluate()).toThrow();
    });

    it("should throw if cycle is detected", () => {
      const parser = new FormulaParser(MOCK_INPUT_VARIABLES);
      MOCK_FORMULAS_WITH_CYCLE.forEach((formula) => parser.addFormula(formula));

      expect(() => parser.evaluate()).toThrow();
    });
  });
});

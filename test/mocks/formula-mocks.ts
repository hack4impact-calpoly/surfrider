import { Formula } from "@/utils/formula_parser";

export const MOCK_INPUT_VARIABLES = {
  a: 3,
  b: 7,
  c: 10,
};

export const MOCK_FORMULAS = [
  {
    id: "formula_1",
    name: "Test formula 1",
    expression: "formula_2 + formula_3",
    setupScope: jest.fn(),
    dependencies: ["formula_2", "formula_3"],
  },
  {
    id: "formula_2",
    name: "Test formula 2",
    expression: "a * b + c",
    setupScope: jest.fn(),
    dependencies: [],
  },
  {
    id: "formula_3",
    name: "Test formula 3",
    expression: "a + b",
    setupScope: jest.fn(),
    dependencies: [],
  },
] as unknown as Formula[];

export const MOCK_FORMULAS_EXTENDED = [
  ...MOCK_FORMULAS,
  {
    id: "formula_4",
    name: "Test formula 4",
    expression: "formula_1 + formula_5",
    setupScope: jest.fn(),
    dependencies: ["formula_1", "formula_5"],
  },
  {
    id: "formula_5",
    name: "Test formula 5",
    expression: "formula_2 * formula_3",
    setupScope: jest.fn(),
    dependencies: [],
  },
] as unknown as Formula[];

export const MOCK_FORMULAS_WITH_UNKNOWN_DEPENDENCY = [
  {
    id: "formula_1",
    name: "Test formula 1",
    expression: "a + b",
    setupScope: jest.fn(),
    dependencies: ["unknown"],
  },
] as unknown as Formula[];

export const MOCK_FORMULAS_WITH_CYCLE = [
  {
    id: "formula_1",
    name: "Test formula 1",
    expression: "a + b",
    setupScope: jest.fn(),
    dependencies: ["formula_2"],
  },
  {
    id: "formula_2",
    name: "Test formula 2",
    expression: "a * b + c",
    setupScope: jest.fn(),
    dependencies: ["formula_1"],
  },
] as unknown as Formula[];

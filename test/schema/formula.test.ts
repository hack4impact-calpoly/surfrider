import { Formula } from "@/schema/formula";

describe("Formula schema", () => {
  it("should validate a correct formula object", () => {
    const validFormula = {
      id: "1",
      name: "Test Formula",
      explanation: "This is a test formula",
      assumptions: ["Assumption 1", "Assumption 2"],
      sources: ["Source 1", "Source 2"],
      expression: "x + y",
      unit: "m",
      setupScope: () => {},
      dependencies: ["x", "y"],
    };

    expect(() => Formula.parse(validFormula)).not.toThrow();
  });

  it("should invalidate an incorrect formula object", () => {
    const invalidFormula = {
      id: 1, // id should be a string
      name: "Test Formula",
      explanation: "This is a test formula",
      assumptions: ["Assumption 1", "Assumption 2"],
      sources: ["Source 1", "Source 2"],
      expression: "x + y",
      unit: "m",
      setupScope: () => {},
      dependencies: ["x", "y"],
    };

    expect(() => Formula.parse(invalidFormula)).toThrow();
  });

  it("should invalidate a formula object with missing fields", () => {
    const invalidFormula = {
      id: "1",
      name: "Test Formula",
      explanation: "This is a test formula",
      assumptions: ["Assumption 1", "Assumption 2"],
      sources: ["Source 1", "Source 2"],
      expression: "x + y",
      unit: "m",
      // setupScope is missing
      dependencies: ["x", "y"],
    };

    expect(() => Formula.parse(invalidFormula)).toThrow();
  });
});

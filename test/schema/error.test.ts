import { Error, ErrorCode } from "@/schema/error";

describe("ErrorCode schema", () => {
  it("should validate valid error codes", () => {
    expect(ErrorCode.parse("CLIENT_ERROR")).toBe("CLIENT_ERROR");
    expect(ErrorCode.parse("API_ERROR")).toBe("API_ERROR");
    expect(ErrorCode.parse("SERVICE_ERROR")).toBe("SERVICE_ERROR");
  });

  it("should invalidate invalid error codes", () => {
    expect(() => ErrorCode.parse("INVALID_ERROR")).toThrow();
  });
});

describe("Error schema", () => {
  it("should validate a valid error object", () => {
    const validError = {
      code: "CLIENT_ERROR",
      message: "A client error occurred",
    };

    expect(Error.parse(validError)).toEqual(validError);
  });

  it("should invalidate an error object with an invalid code", () => {
    const invalidError = {
      code: "INVALID_ERROR",
      message: "An invalid error occurred",
    };

    expect(() => Error.parse(invalidError)).toThrow();
  });

  it("should invalidate an error object with a missing message", () => {
    const invalidError = {
      code: "CLIENT_ERROR",
    };

    expect(() => Error.parse(invalidError)).toThrow();
  });

  it("should invalidate an error object with a non-string message", () => {
    const invalidError = {
      code: "CLIENT_ERROR",
      message: 123,
    };

    expect(() => Error.parse(invalidError)).toThrow();
  });
});

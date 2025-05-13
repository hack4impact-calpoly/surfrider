import { AppErrorType, AppErrorCode } from "@/schema/error";

describe("ErrorCode schema", () => {
  it("should validate valid error codes", () => {
    expect(AppErrorCode.parse("CLIENT_ERROR")).toBe("CLIENT_ERROR");
    expect(AppErrorCode.parse("API_ERROR")).toBe("API_ERROR");
    expect(AppErrorCode.parse("SERVICE_ERROR")).toBe("SERVICE_ERROR");
    expect(AppErrorCode.parse("OTHER_ERROR")).toBe("OTHER_ERROR");
  });

  it("should invalidate invalid error codes", () => {
    expect(() => AppErrorCode.parse("INVALID_ERROR")).toThrow();
  });
});

describe("Error schema", () => {
  it("should validate a valid error object", () => {
    const validError = {
      code: "CLIENT_ERROR",
      message: "A client error occurred",
      context: { key: "value" },
    };

    expect(AppErrorType.parse(validError)).toEqual(validError);
  });

  it("should invalidate an error object with an invalid code", () => {
    const invalidError = {
      code: "INVALID_ERROR",
      message: "An invalid error occurred",
    };

    expect(() => AppErrorType.parse(invalidError)).toThrow();
  });

  it("should invalidate an error object with a missing message", () => {
    const invalidError = {
      code: "CLIENT_ERROR",
    };

    expect(() => AppErrorType.parse(invalidError)).toThrow();
  });

  it("should invalidate an error object with a non-string message", () => {
    const invalidError = {
      code: "CLIENT_ERROR",
      message: 123,
    };

    expect(() => AppErrorType.parse(invalidError)).toThrow();
  });
});

import { AppErrorCode } from "@/schema/error";
import { apiErrorHandler, AppError, transformError } from "@/utils/errors";
import { MongooseError } from "mongoose";
import { NextApiResponse } from "next";
import { z } from "zod";

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as NextApiResponse;

describe("AppError", () => {
  it("should create an instance of AppError", () => {
    const error = new AppError(AppErrorCode.enum.CLIENT_ERROR, "Client error occurred");
    expect(error).toBeInstanceOf(AppError);
    expect(error.code).toBe(AppErrorCode.enum.CLIENT_ERROR);
    expect(error.message).toBe("Client error occurred");
  });
});

describe("transformError", () => {
  it("should transform a string error", () => {
    const error = "Some error";
    const transformedError = transformError(error);
    expect(transformedError).toBeInstanceOf(AppError);
    expect(transformedError.message).toBe("Some error");
  });

  it("should transform an instance of AppError", () => {
    const error = new AppError(AppErrorCode.enum.CLIENT_ERROR, "Client error occurred");
    const transformedError = transformError(error);
    expect(transformedError).toEqual(error);
  });

  it("should transform an AppErrorType object", () => {
    const error = {
      code: "CLIENT_ERROR",
      message: "Client error occurred",
      context: { key: "value" },
    };
    const transformedError = transformError(error);
    expect(transformedError).toBeInstanceOf(AppError);
    expect(transformedError.code).toBe(AppErrorCode.enum.CLIENT_ERROR);
    expect(transformedError.message).toBe("Client error occurred");
    expect(transformedError.context).toEqual({ key: "value" });
  });

  it("should transform a ZodError", () => {
    const error = new z.ZodError([
      { message: "Error 1" } as unknown as z.ZodIssue,
      { message: "Error 2" } as unknown as z.ZodIssue,
    ]);
    const transformedError = transformError(error);
    expect(transformedError).toBeInstanceOf(AppError);
    expect(transformedError.code).toBe(AppErrorCode.enum.VALIDATION_ERROR);
    expect(transformedError.message).toBe("Validation failed: Error 1; Error 2");
  });

  it("should transform a MongooseError", () => {
    const error = new MongooseError("Mongoose error occurred");
    const transformedError = transformError(error);
    expect(transformedError).toBeInstanceOf(AppError);
    expect(transformedError.code).toBe(AppErrorCode.enum.DATABASE_ERROR);
    expect(transformedError.message).toBe("Mongoose error occurred");
  });

  it("should transform a generic Error", () => {
    const error = new Error("Generic error occurred");
    const transformedError = transformError(error);
    expect(transformedError).toBeInstanceOf(AppError);
    expect(transformedError.message).toBe("Generic error occurred");
  });

  it("should return default error for unknown error type", () => {
    const error = { unknown: "error" };
    const transformedError = transformError(error);
    expect(transformedError).toBeInstanceOf(AppError);
    expect(transformedError.message).toBe("An unknown error occurred");
  });
});

describe("apiErrorHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle CLIENT_ERROR", () => {
    const error = new AppError(AppErrorCode.enum.CLIENT_ERROR, "Client error occurred");
    apiErrorHandler(error, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      code: AppErrorCode.enum.CLIENT_ERROR,
      message: "Client error occurred",
      context: undefined,
    });
  });

  it("should handle other errors as 500", () => {
    const error = new Error("Server error occurred");
    apiErrorHandler(error, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: AppErrorCode.enum.OTHER_ERROR,
      message: "Server error occurred",
      context: { error },
    });
  });
});

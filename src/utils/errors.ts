import { AppErrorCode, AppErrorType } from "@/schema/error";
import { MongooseError } from "mongoose";
import { NextApiResponse } from "next";
import { z } from "zod";

export class AppError extends Error {
  code: AppErrorCode;
  context?: Record<string, unknown>;

  constructor(code: AppErrorCode, message: string, context?: Record<string, unknown>) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.context = context;
  }
}

export const transformError = (
  error: unknown,
  defaultCode: AppErrorCode = AppErrorCode.enum.OTHER_ERROR,
  defaultMessage: string = "An unknown error occurred",
): AppError => {
  const parsedError = AppErrorType.safeParse(error);
  if (parsedError.success) {
    return new AppError(parsedError.data.code, parsedError.data.message, parsedError.data.context);
  } else if (error instanceof z.ZodError) {
    return new AppError(
      AppErrorCode.enum.VALIDATION_ERROR,
      `Validation failed: ${error.errors.map((e) => e.message).join("; ")}`,
    );
  } else if (error instanceof MongooseError) {
    return new AppError(AppErrorCode.enum.DATABASE_ERROR, error.message, { error });
  } else if (typeof error === "string") {
    return new AppError(defaultCode, error);
  } else if (error instanceof Error) {
    return new AppError(defaultCode, error.message, { error });
  }
  return new AppError(defaultCode, defaultMessage, { error });
};

export const apiErrorHandler = (error: unknown, res: NextApiResponse) => {
  const { code, message, context } = transformError(error);
  switch (code) {
    case AppErrorCode.enum.CLIENT_ERROR:
      return res.status(400).json({ code, message, context } as AppErrorType);
    default:
      return res.status(500).json({ code, message, context } as AppErrorType);
  }
};

import { z } from "zod";

//errorCode Zod schema
export const AppErrorCode = z.enum([
  "CLIENT_ERROR",
  "API_ERROR",
  "SERVICE_ERROR",
  "VALIDATION_ERROR",
  "DATABASE_ERROR",
  "OTHER_ERROR",
]);

//equivalent TypeScript type
export type AppErrorCode = z.infer<typeof AppErrorCode>;

//error Zod schema
export const AppErrorType = z.object({
  code: AppErrorCode,
  message: z.string(),
  context: z.record(z.unknown()).optional(),
});

//equivalent TypeScript type
export type AppErrorType = z.infer<typeof AppErrorType>;

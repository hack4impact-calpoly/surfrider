import { z } from "zod";

//errorCode Zod schema
export const ErrorCode = z.enum(["CLIENT_ERROR", "API_ERROR", "SERVICE_ERROR"]);

//equivalent TypeScript type
export type ErrorCode = z.infer<typeof ErrorCode>;

//error Zod schema
export const Error = z.object({
  code: ErrorCode,
  message: z.string(),
});

//equivalent TypeScript type
export type Error = z.infer<typeof Error>;

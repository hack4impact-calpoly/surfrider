import { z } from "zod";

//errorCode Zod schema
export const ErrorCodeSchema = z.enum(["CLIENT_ERROR", "API_ERROR", "SERVICE_ERROR"]);

//equivalent TypeScript type
export type ErrorCode = z.infer<typeof ErrorCodeSchema>;

//error Zod schema
export const ErrorSchema = z.object({
  code: ErrorCodeSchema,
  message: z.string(),
});

//equivalent TypeScript type
export type Error = z.infer<typeof ErrorSchema>;

/**
 * Sanitizes the provided value by converting it to a number if possible.
 *
 * @param value - The value to be sanitized.
 * @returns A number if conversion is successful, `null` for invalid numbers, or `undefined` if the input is `undefined`.
 */
export const sanitizeNumberValue = (value: unknown): number | null | undefined => {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value === "number") return value;
  const parsed = parseFloat(String(value));
  return isNaN(parsed) ? null : parsed;
};

/**
 * Sanitizes the provided value by converting it to a string if possible.
 *
 * @param value  - The value to be sanitized.
 * @returns A trimmed string if conversion is successful, `null` for null values, or `undefined` if the input is `undefined`.
 */
export const sanitizeStringValue = (value: unknown): string | null | undefined => {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value === "string") return value.trim();
  return String(value).trim();
};

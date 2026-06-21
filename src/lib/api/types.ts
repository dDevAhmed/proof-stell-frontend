/**
 * Standardised API response envelope used across all Next.js API routes.
 */

export type ApiError = {
  code: string;
  message: string;
};

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError };

/**
 * Well-known error codes returned by the API layer.
 */
export const API_ERROR_CODES = {
  INTERNAL_ERROR: "INTERNAL_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
  NOT_FOUND: "NOT_FOUND",
} as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];

import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

import { logError, logRequest } from "./logger";
import { API_ERROR_CODES, type ApiResponse } from "./types";

/**
 * Higher-order function that wraps a Next.js API handler with:
 *  - Request logging
 *  - Centralised try/catch error handling
 *  - Consistent `ApiResponse` error envelope on failure
 *
 * Usage:
 *   export default withErrorHandling(async (req, res) => { ... });
 */
export function withErrorHandling<T>(
  handler: NextApiHandler<ApiResponse<T>>,
): NextApiHandler<ApiResponse<T>> {
  return async (req: NextApiRequest, res: NextApiResponse<ApiResponse<T>>) => {
    logRequest(req);

    try {
      await handler(req, res);
    } catch (error) {
      logError(error, req);

      // ZodError → 422 Validation Error
      if (error instanceof ZodError) {
        return res.status(422).json({
          success: false,
          error: {
            code: API_ERROR_CODES.VALIDATION_ERROR,
            message: error.errors
              .map((e) => `${e.path.join(".")}: ${e.message}`)
              .join("; "),
          },
        });
      }

      // Generic → 500 Internal Error
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({
        success: false,
        error: {
          code: API_ERROR_CODES.INTERNAL_ERROR,
          message,
        },
      });
    }
  };
}

/**
 * Sends a 405 Method Not Allowed response with an Allow header.
 */
export function methodNotAllowed(
  res: NextApiResponse<ApiResponse<never>>,
  allowed: string[],
): void {
  res.setHeader("Allow", allowed);
  res.status(405).json({
    success: false,
    error: {
      code: API_ERROR_CODES.METHOD_NOT_ALLOWED,
      message: `Method not allowed. Accepted: ${allowed.join(", ")}`,
    },
  });
}

import type { NextApiRequest } from "next";

/**
 * Lightweight request / error logger.
 *
 * In production you would swap the console calls for a structured logging
 * library (e.g. pino, winston).  The interface is intentionally thin so the
 * swap is mechanical.
 */

export function logRequest(req: NextApiRequest): void {
  const { method, url, headers } = req;
  console.info(
    JSON.stringify({
      type: "request",
      method,
      url,
      userAgent: headers["user-agent"] ?? null,
      timestamp: new Date().toISOString(),
    }),
  );
}

export function logError(error: unknown, req: NextApiRequest): void {
  const { method, url } = req;
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;

  console.error(
    JSON.stringify({
      type: "error",
      method,
      url,
      message,
      stack: stack ?? null,
      timestamp: new Date().toISOString(),
    }),
  );
}

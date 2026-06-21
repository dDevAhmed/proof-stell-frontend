// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { methodNotAllowed, withErrorHandling } from "@/lib/api/errorHandler";
import type { ApiResponse } from "@/lib/api/types";

type HelloData = {
  name: string;
};

const querySchema = z.object({
  name: z.string().min(1).max(100).optional(),
});

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<HelloData>>,
) {
  if (req.method !== "GET") {
    return methodNotAllowed(res, ["GET"]);
  }

  const { name } = querySchema.parse(req.query);

  return res.status(200).json({
    success: true,
    data: { name: name ?? "John Doe" },
  });
}

export default withErrorHandling(handler);

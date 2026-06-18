import type { NextConfig } from "next";
import { validateEnv } from "./src/config/environment";

// Validate environment at build time — will throw if required vars are missing
try {
  validateEnv();
} catch (err) {
  // eslint-disable-next-line no-console
  console.error("Environment validation failed:", err);
  throw err;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;

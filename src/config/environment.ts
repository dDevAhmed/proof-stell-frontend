import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SOROBAN_RPC_URL: z.string().url(),
  NEXT_PUBLIC_SOROBAN_NETWORK_PASSPHRASE: z.string(),
  NEXT_PUBLIC_STELLAR_HORIZON_URL: z.string().url(),

  NEXT_PUBLIC_PROOFSTELL_CONTRACT_ID: z.string().min(1),
  NEXT_PUBLIC_ISSUER_CONTRACT_ID: z.string().optional(),

  NEXT_PUBLIC_WALLET_PROVIDERS: z.string().optional(),

  NEXT_PUBLIC_API_BASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_API_KEY: z.string().optional(),

  NEXT_PUBLIC_APP_ENV: z.enum(["development", "staging", "production"]).optional(),
  NEXT_PUBLIC_LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).optional(),
});

export function validateEnv() {
  return envSchema.parse(process.env);
}

export const env = validateEnv();

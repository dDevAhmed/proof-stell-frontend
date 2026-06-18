import { env } from "../config/environment";

export type WalletProviderName = string;

export function getConfiguredProviders(): WalletProviderName[] {
  const raw = env.NEXT_PUBLIC_WALLET_PROVIDERS || "";
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

export async function connectToProvider(name: WalletProviderName): Promise<any> {
  if (typeof window === "undefined") throw new Error("Wallets are only available in the browser");

  const win: any = window as any;

  // Freighter is commonly injected as `window.freighter` or `window.freighterApi` depending on SDK
  if (name === "freighter") {
    const freighter = win.freighter || win.freighterApi || (win.freighterClient && win.freighterClient);
    if (!freighter) throw new Error("Freighter wallet not available in this browser");
    // minimal adapter: many Freighter APIs are async
    if (typeof freighter.connect === "function") return freighter.connect();
    return freighter;
  }

  // xBull / other wallets: try direct window lookup by name
  const providerKey = name.replace(/[^a-z0-9]/gi, "");
  const provider = win[providerKey];
  if (provider) return provider;

  throw new Error(`Wallet provider '${name}' not available`);
}

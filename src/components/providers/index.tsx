"use client";

import { AuthProvider } from "./auth-provider";
import { ThemeStoreProvider } from "./theme-store-provider";
import { TRPCProvider } from "./trpc-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider>
      <AuthProvider>
        <ThemeStoreProvider>{children}</ThemeStoreProvider>
      </AuthProvider>
    </TRPCProvider>
  );
}

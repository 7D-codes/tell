"use client";

import { useAuth } from "./providers/auth-provider";

export function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex w-full items-center justify-between">
            <div>Logo</div>
            <div>
              {user ? (
                <div>Logged in as {user.email}</div>
              ) : (
                <div>Not logged in</div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

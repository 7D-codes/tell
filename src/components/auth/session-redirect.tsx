"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "~/components/providers/auth-provider";

export function SessionRedirect() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/timeline");
    }
  }, [user, router]);

  return null;
}

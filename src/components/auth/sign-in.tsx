"use client";

import { Github, Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { supabase } from "~/lib/supabase";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  async function signInWithGoogle() {
    try {
      setIsLoading(true);
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      onClick={signInWithGoogle}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? (
        <Loader className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Github className="mr-2 h-4 w-4" />
      )}
      Continue with Google
    </Button>
  );
}

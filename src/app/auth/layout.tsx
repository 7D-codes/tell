import { MessageCircle } from "lucide-react";
import * as React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative min-h-screen">
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex items-center justify-center gap-2 text-lg">
              <MessageCircle className="h-6 w-6" strokeWidth={2.5} />
              <span className="font-semibold">Tell</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Your anonymous messaging platform
            </p>
          </div>

          <div className="mx-auto w-full sm:w-[350px]">{children}</div>

          <p className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams.error ?? "An unknown error occurred";

  return (
    <div className="container flex h-[calc(100vh-4rem)] items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="rounded-full bg-red-100 p-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Authentication Error
            </h1>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/">Go Home</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-in">Try Again</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";

import { Breadcrumb } from "~/components/breadcrumb";
import { InfiniteTells } from "~/components/tell/infinite-tell-list";
import { Button } from "~/components/ui/button";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <div className="mx-auto w-full max-w-[600px] px-4">
      {session ? <AuthenticatedFeed /> : <UnauthenticatedFeed />}
    </div>
  );
}

function UnauthenticatedFeed() {
  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center gap-8 py-20">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
          Send anonymous messages
          <br />
          <span className="bg-gradient-to-r from-primary/50 to-primary bg-clip-text text-transparent">
            to friends.
          </span>
        </h1>

        <p className="mx-auto max-w-[600px] text-base text-muted-foreground sm:text-lg">
          Connect with others through meaningful conversations.
          <br />
          Share your thoughts anonymously with the world.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button size="lg" className="h-11 px-8" asChild>
          <Link href="/auth/sign-in">Get Started</Link>
        </Button>
        <p className="text-sm text-muted-foreground">
          No credit card required.
        </p>
      </div>
    </div>
  );
}

function AuthenticatedFeed() {
  return (
    <div className="space-y-8 py-8">
      <Breadcrumb />
      <InfiniteTells />
    </div>
  );
}

import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";

import { Breadcrumb } from "~/components/breadcrumb";
import { InfiniteTells } from "~/components/tell/infinite-tell-list";

export default async function TimelinePage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/auth/sign-in");
  }

  return (
    <div className="mx-auto w-full max-w-[600px] px-4">
      <div className="space-y-8 py-8">
        <Breadcrumb />
        <InfiniteTells />
      </div>
    </div>
  );
}

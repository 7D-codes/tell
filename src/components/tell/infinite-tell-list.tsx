"use client";

import { Loader as LoaderIcon } from "lucide-react";
import { Suspense } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { api } from "~/trpc/react";

import type { Tell } from "~/types";

import { TellCardProvider } from "~/components/tell/tell-card";
import { Skeleton } from "~/components/ui/skeleton";

type InfiniteTellListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  tells: Tell[] | undefined;
  fetchMoreTells: () => Promise<unknown>;
};

export function InfiniteTells() {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    api.tell.infiniteTells.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialPageParam: undefined,
      },
    );

  const tells = data?.pages?.flatMap((page) => page.tells) ?? [];

  return (
    <InfiniteTellList
      tells={tells}
      isError={isError}
      isLoading={isLoading}
      hasMore={hasNextPage ?? false}
      fetchMoreTells={fetchNextPage}
    />
  );
}

export function InfiniteTellList({
  tells,
  isLoading,
  isError,
  hasMore,
  fetchMoreTells,
}: InfiniteTellListProps) {
  if (isError) {
    return <InfiniteTellListError />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (tells === undefined || tells?.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-xl font-medium text-muted-foreground">
          No Tells yet
        </p>
        <p className="text-sm text-muted-foreground">
          Follow some friends to see their Tells here
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<InfiniteTellListLoadingSkeleton />}>
      <InfiniteScroll
        next={fetchMoreTells}
        hasMore={hasMore}
        loader={<Loader />}
        dataLength={tells.length}
        endMessage={
          <p className="py-8 text-center text-sm text-muted-foreground">
            You've caught up! No more Tells to show.
          </p>
        }
      >
        <div className="w-full space-y-6">
          {tells.map((tell) => (
            <TellCardProvider
              key={tell.tellId}
              tell={tell}
              userInfo={
                tell.reply
                  ? {
                      id: tell.reply.replyAuthorId,
                      username: tell.reply.replyAuthorUsername,
                      name: tell.reply.replyAuthorName,
                      image: tell.reply.replyAuthorImage,
                    }
                  : {
                      id: tell.tellAuthorId ?? "anonymous",
                      username: tell.tellAuthorUsername ?? "anonymous",
                      name: tell.tellAuthorUsername ?? "Anonymous",
                      image: null,
                    }
              }
            />
          ))}
        </div>
      </InfiniteScroll>
    </Suspense>
  );
}

function InfiniteTellListError() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <p className="text-xl font-medium text-destructive">
        Something went wrong
      </p>
      <p className="text-sm text-muted-foreground">
        Please try refreshing the page
      </p>
    </div>
  );
}

function InfiniteTellListLoadingSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <Skeleton className="h-[200px] w-full rounded-lg" />
    </div>
  );
}

function Loader() {
  return (
    <div className="flex w-full items-center justify-center py-8">
      <LoaderIcon className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}

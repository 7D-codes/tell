import { protectedProcedure } from "~/server/api/trpc";

import { formatTellList } from "~/server/api/utils/helpers";
import { InfiniteTellsSchema } from "~/validators";

export const infiniteTellsProcedure = protectedProcedure
  .input(InfiniteTellsSchema)
  .query(async ({ ctx, input: { limit = 20, cursor } }) => {
    const tells = await ctx.db.tell.findMany({
      take: limit + 1,
      cursor: cursor
        ? {
            tellId_tellCreatedAt: {
              tellId: cursor.id,
              tellCreatedAt: cursor.createdAt,
            },
          }
        : undefined,
      where: {
        recipient: {
          followers: {
            some: {
              id: ctx.session.user.id,
            },
          },
        },
      },
      orderBy: [{ tellCreatedAt: "desc" }, { tellId: "desc" }],
      include: {
        reply: {
          include: {
            author: true,
          },
        },
      },
    });

    let nextCursor: typeof cursor | undefined;

    if (tells.length > limit) {
      const lastTell = tells.pop();

      if (lastTell) {
        nextCursor = {
          id: lastTell.tellId,
          createdAt: lastTell.tellCreatedAt,
        };
      }
    }

    return {
      tells: formatTellList(tells),
      nextCursor,
    };
  });

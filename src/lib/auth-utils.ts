import { type User } from "@supabase/supabase-js";
import { getRandomUsername } from "~/server/auth";
import { db } from "~/server/db";

export async function syncSupabaseUser(user: User) {
  const existingUser = await db.user.findUnique({
    where: { id: user.id },
  });

  if (!existingUser) {
    const username = await generateUniqueUsername(user.user_metadata.full_name);

    return await db.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.user_metadata.full_name,
        username,
        image: user.user_metadata.avatar_url,
      },
    });
  }

  return existingUser;
}

async function generateUniqueUsername(name: string): Promise<string> {
  let username = getRandomUsername(name);
  let exists = await db.user.findUnique({ where: { username } });

  while (exists) {
    username = getRandomUsername(name);
    exists = await db.user.findUnique({ where: { username } });
  }

  return username;
}

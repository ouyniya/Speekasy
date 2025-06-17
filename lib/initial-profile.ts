import { auth, clerkClient } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const initialProfile = async () => {
  const { userId } = await auth();
  // 🔍 Fetch user info from Clerk
  const client = await clerkClient();

  if (!userId) {
    return redirect('/');
  }
  
  const user = await client.users?.getUser(userId);

  const profile = await db.profile.findUnique({
    where: { userId },
  });

  // if existing
  if (profile) return profile;

  //   if not existing >> create new one
  const newProfile = await db.profile.create({
    data: {
      userId,
      name: `${user.firstName} ${user.lastName}` || "User",
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0]?.emailAddress || "",
    },
  });

  return newProfile;
};

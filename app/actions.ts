import { NextAuthOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";

export async function getUserDetailsFromEmailId(email: string | undefined) {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function isAuthenticated() {
  try {
    const session = await getServerSession(NextAuthOptions);
    if (session?.user?.email) {
      return session.user.email;
    }
  } catch (error) {
    return undefined;
  }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "@/lib/authOptions";
import db from "@/lib/db";
export async function PUT(req: Request) {
  const body = await req.json();

  const session = await getServerSession(NextAuthOptions);

  if (!session || !session.user) {
    return NextResponse.redirect("/api/auth/signin");
  }

  const email = session.user.email;

  if (!email) {
    return NextResponse.json({ message: "error" });
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "error" });
  }

  await db.user.update({
    where: {
      email,
    },
    data: {
      name: body.name,
    },
  });

  return NextResponse.json({ message: "success" });
}

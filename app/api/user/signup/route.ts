import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcrypt";
export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Please fill in all fields" },
      { status: 400 }
    );
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      email,
      hashedPassword,
    },
  });

  return NextResponse.json({ message: "User created" });
}

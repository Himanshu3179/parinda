import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserEmail } from "@/app/actions";

export async function GET(req: Request) {
  const email = await getUserEmail();
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

  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  try {
    const email = await getUserEmail();
    if (!email) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 400 }
      );
    }
    const body = await req.json();
    const { name, contact, address } = body;

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updatedUser = await db.user.update({
      where: {
        email,
      },
      data: {
        name: name || user.name,
        contact: contact || user.contact,
        address: address || user.address,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

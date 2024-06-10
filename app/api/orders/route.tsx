import { NextResponse } from "next/server";

import db from "@/lib/db";
import { getUserEmail } from "@/app/actions";

export async function GET(req: Request) {
  try {
    const email = await getUserEmail();
    if (!email) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: {
        email,
      },
      include: {
        orders: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.orders);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

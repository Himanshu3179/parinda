import { NextResponse } from "next/server";
import db from "@/lib/db";
import { isAdmin } from "@/app/actions";

export async function GET(req: Request) {
  try {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) {
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }

    const orders = await db.order.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            address: true,
            contact: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

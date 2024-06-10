import { getUserId } from "@/app/actions";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 400 }
      );
    }
    const { productId } = await req.json();
    // decrement quantity

    const existingCart = await db.cart.findFirst({
      where: { userId },
    });

    if (!existingCart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const cartItem = await db.cartItem.findFirst({
      where: { cartId: existingCart.id, productId },
    });

    if (!cartItem) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      );
    }

    if (cartItem.quantity <= 1) {
      await db.cartItem.delete({
        where: { id: cartItem.id },
      });

      return NextResponse.json({ message: "Cart item removed" });
    }

    await db.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: cartItem.quantity - 1 },
    });
    return NextResponse.json({ message: "Item quantity decremented" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

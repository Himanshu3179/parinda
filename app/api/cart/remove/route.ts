// app/api/cart/remove/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserId } from "@/app/actions";

export async function POST(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 400 });
  }
  const { productId } = await request.json();
  
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

  await db.cartItem.delete({
    where: { id: cartItem.id },
  });

  return NextResponse.json({ message: "Item removed from cart" });
}

// app/api/cart/add/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserId } from "@/app/actions";

export async function POST(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 400 });
  }
  
  const { productId, quantity } = await request.json();

  const existingCart = await db.cart.findFirst({
    where: { userId },
  });

  if (!existingCart) {
    const newCart = await db.cart.create({
      data: {
        userId,
        items: {
          create: {
            productId,
            quantity,
          },
        },
      },
    });
    return NextResponse.json(newCart);
  }

  const cartItem = await db.cartItem.findFirst({
    where: { cartId: existingCart.id, productId },
  });

  if (cartItem) {
    const updatedItem = await db.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: cartItem.quantity + quantity },
    });
    return NextResponse.json(updatedItem);
  } else {
    const newItem = await db.cartItem.create({
      data: {
        cartId: existingCart.id,
        productId,
        quantity,
      },
    });
    return NextResponse.json(newItem);
  }
}

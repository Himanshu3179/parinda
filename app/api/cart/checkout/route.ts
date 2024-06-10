import {
  getTotalAmount,
  getUserCompleteDetails,
  getUserId,
  isAllDetailsFilled,
} from "@/app/actions";
import { NextResponse } from "next/server";
import db from "@/lib/db";
export async function GET(request: Request) {
  const totalAmount = await getTotalAmount();
  return NextResponse.json({ totalAmount });
}

export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 400 }
      );
    }
    1;

    const isFilled = await isAllDetailsFilled();
    console.log("is filled ...", isFilled);

    if (!isFilled) {
      return NextResponse.json(
        { message: "Please complete your profile" },
        { status: 400 }
      );
    }

    const existingCart = await db.cart.findFirst({
      where: { userId },
    });

    if (!existingCart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const cartItems = await db.cartItem.findMany({
      where: { cartId: existingCart.id },
      include: { product: true },
    });

    if (!cartItems.length) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 404 });
    }

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    // create order

    const order = await db.order.create({
      data: {
        userId,
        total: totalAmount,
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    });

    await db.cartItem.deleteMany({
      where: { cartId: existingCart.id },
    });

    return NextResponse.json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

// model User {
//   id                String    @id @default(auto()) @map("_id") @db.ObjectId
//   name              String?
//   email             String    @unique
//   emailVerified     DateTime?
//   image             String?
//   contact           String?
//   hashedPassword    String?
//   resetToken        String?
//   resetTokenExpires DateTime?
//   createdAt         DateTime  @default(now())
//   updatedAt         DateTime  @updatedAt
//   accounts          Account[]
//   sessions          Session[]
//   carts             Cart[]    @relation("UserCarts")
//   latitude          Float?
//   longitude         Float?
//   address           String?
//   orders            Order[]   @relation("UserOrders")
// }

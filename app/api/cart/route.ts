import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserId } from "@/app/actions";

// app/api/cart/route.ts

export async function GET(request: NextRequest) {
    try {
        const userId = await getUserId();

        if (!userId) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 400 });
        }

        const cart = await db.cart.findFirst({
            where: { userId },
            include: { items: { include: { product: true } } },
        });

        if (!cart) {
            return NextResponse.json({ message: "Cart not found" }, { status: 404 });
        }

        return NextResponse.json(cart);
    } catch (error) {
        // Handle the error here
        console.error(error);
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
}

import { getParticularProductQuantity } from "@/app/actions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { productId } = await request.json();
  const total = await getParticularProductQuantity(productId);
  return NextResponse.json({ total });
}
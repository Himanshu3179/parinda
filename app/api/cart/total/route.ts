import { countCartItems } from "@/app/actions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const total = await countCartItems();
  return NextResponse.json({ total });
}

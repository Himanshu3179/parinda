// app/api/locations/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const locations = await db.location.findMany();
  return NextResponse.json(locations);
}

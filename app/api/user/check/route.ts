import { getUserEmail, isAllDetailsFilled } from "@/app/actions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = await getUserEmail();
  if (!userId) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isFilled = await isAllDetailsFilled();
  console.log("is filled ...", isFilled);

  return NextResponse.json({ isFilled });
}

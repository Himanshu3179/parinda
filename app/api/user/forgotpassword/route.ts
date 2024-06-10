import { NextResponse } from "next/server";
import db from "@/lib/db";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;
    if (!email) {
      return NextResponse.json(
        { message: "Please provide an email address" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpires = Date.now() + 3600000;

    await db.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpires: new Date(resetTokenExpires),
      },
    });

    const appUrl = process.env.APP_URL;
    await sendPasswordResetEmail(email, `${appUrl}/reset?token=${resetToken}`);

    return NextResponse.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

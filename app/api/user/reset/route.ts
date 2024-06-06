import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
  try {
    const token = new URL(req.url).searchParams.get("token");

    console.log(token);

    if (!token) {
      return NextResponse.json(
        { message: "Please provide a reset token" },
        { status: 400 }
      );
    }

    const user = await db.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gte: new Date(Date.now()),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired reset token" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Valid reset token" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { message: "Please provide a reset token and a new password" },
        { status: 400 }
      );
    }

    const user = await db.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gte: new Date(Date.now()),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired reset token" },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.user.update({
      where: { email: user.email },
      data: {
        hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    return NextResponse.json({ message: "Password has been reset" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}

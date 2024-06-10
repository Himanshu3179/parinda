import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getUserEmail } from "@/app/actions";

export async function POST(request: Request) {
  const email = await getUserEmail();
  if (!email) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 400 });
  }
  const { latitude, longitude } = await request.json();

  const user = await prisma.user.update({
    where: { email },
    data: { latitude, longitude },
  });

  const users = await prisma.user.findMany({
    select: {
      latitude: true,
      longitude: true,
    },
  });

  return NextResponse.json(
    users.map((user) => ({
      lat: user.latitude,
      lng: user.longitude,
    }))
  );
}

export async function PUT(request: Request) {
  const email = await getUserEmail();
  if (!email) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 400 });
  }

  const { latitude, longitude } = await request.json();

  const user = await prisma.user.update({
    where: { email },
    data: { latitude, longitude },
  });

  const users = await prisma.user.findMany({
    select: {
      latitude: true,
      longitude: true,
    },
  });

  return NextResponse.json(
    users.map((user) => ({
      lat: user.latitude,
      lng: user.longitude,
    }))
  );
}

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      latitude: true,
      longitude: true,
    },
  });

  return NextResponse.json(
    users.map((user) => ({
      lat: user.latitude,
      lng: user.longitude,
    }))
  );
}

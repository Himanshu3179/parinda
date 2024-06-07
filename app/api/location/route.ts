// const response = await fetch('http://localhost:5000/api/location', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(loc),
//             });

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const loc = await req.json();
  console.log(loc);

  return NextResponse.json({ message: "success" });
}

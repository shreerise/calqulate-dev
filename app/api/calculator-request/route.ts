import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { request, page } = await req.json();

    console.log("Calculator request:", request);
    console.log("From page:", page);

    // Later store in database

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
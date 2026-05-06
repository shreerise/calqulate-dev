import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { request, page } = await req.json();

    // Validation
    if (!request?.trim()) {
      return NextResponse.json(
        { success: false, error: "Request is required" },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { error } = await supabase
      .from("calculator_requests")
      .insert([
        {
          request: request.trim(),
          page_url: page,
        },
      ]);

    if (error) {
      console.error("Supabase Error:", error);

      return NextResponse.json(
        { success: false },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
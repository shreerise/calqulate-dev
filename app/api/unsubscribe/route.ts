import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function unsubscribe(email: string) {
  const admin = createAdminClient();
  // Upsert so repeated clicks are idempotent.
  return admin.from("email_unsubscribes").upsert({ email }, { onConflict: "email" });
}

/** RFC 8058 one-click unsubscribe (mail clients POST here). */
export async function POST(req: Request) {
  let email = new URL(req.url).searchParams.get("email") ?? "";
  if (!email) {
    const body = await req.json().catch(() => ({}));
    email = String(body.email ?? "");
  }
  email = email.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
  }
  const { error } = await unsubscribe(email);
  if (error) {
    console.error("[unsubscribe] failed:", error);
    return NextResponse.json({ ok: false, error: "Could not unsubscribe." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

/** A plain browser visit to the List-Unsubscribe URL → friendly confirm page. */
export async function GET(req: Request) {
  const email = new URL(req.url).searchParams.get("email") ?? "";
  const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  return NextResponse.redirect(`${site}/unsubscribe?email=${encodeURIComponent(email)}`);
}

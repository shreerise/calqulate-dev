import { NextResponse } from "next/server";
import { createAdminClient, createClient } from "@/lib/supabase/server";
import { sendWelcomeEmail, welcomeEmailConfigured } from "@/lib/email/welcomeMailer";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body.email ?? "").trim().toLowerCase();
    const message = String(body.message ?? "").trim();
    // Honeypot: real users never fill this hidden field.
    const honeypot = String(body.company ?? "").trim();
    const sourceUrl = String(body.sourceUrl ?? "").slice(0, 500);

    if (honeypot) {
      // Silently accept to avoid tipping off bots.
      return NextResponse.json({ ok: true });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }
    if (message.length < 2) {
      return NextResponse.json({ ok: false, error: "Please share a little feedback." }, { status: 400 });
    }
    if (message.length > 4000) {
      return NextResponse.json({ ok: false, error: "Feedback is too long." }, { status: 400 });
    }

    // Attach the user id if they happen to be logged in (optional).
    let userId: string | null = null;
    try {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();
      userId = data.user?.id ?? null;
    } catch {
      // anonymous visitor — fine
    }

    const userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;

    // Fire the welcome email first so we can record whether it succeeded.
    let emailSent = false;
    if (welcomeEmailConfigured()) {
      try {
        await sendWelcomeEmail(email);
        emailSent = true;
      } catch (err) {
        console.error("[feedback] welcome email failed:", err);
      }
    }

    const admin = createAdminClient();
    const { error } = await admin.from("feedback").insert({
      email,
      message,
      source_url: sourceUrl || null,
      user_agent: userAgent,
      user_id: userId,
      welcome_email_sent: emailSent,
    });

    if (error) {
      console.error("[feedback] insert failed:", error);
      return NextResponse.json({ ok: false, error: "Could not save your feedback. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[feedback] unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}

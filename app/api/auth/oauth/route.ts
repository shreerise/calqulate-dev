import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Starts an OAuth flow (Google or Azure/Outlook) and returns the provider URL.
 * Provider apps are configured in the Supabase dashboard (Authentication ->
 * Providers). Bots are mitigated by the identity provider itself.
 */
export async function POST(req: Request) {
  const { provider, next } = (await req.json()) as {
    provider: "google" | "azure";
    next?: string;
  };
  if (provider !== "google" && provider !== "azure") {
    return NextResponse.json({ error: "Unsupported provider" }, { status: 400 });
  }

  const supabase = await createClient();
  const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://calqulate.net"}/auth/callback?next=${encodeURIComponent(next ?? "/dashboard")}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      scopes: provider === "azure" ? "email openid profile" : "email profile",
    },
  });

  if (error || !data.url) {
    return NextResponse.json({ error: error?.message ?? "OAuth init failed" }, { status: 400 });
  }
  return NextResponse.json({ url: data.url });
}

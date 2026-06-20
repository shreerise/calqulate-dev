import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Scoped to the Calqulate Vitals product surfaces ONLY, so the rest of
  // calqulate.net (and its AdSense / GTM / Clarity scripts) is unaffected.
  // The Stripe webhook is intentionally excluded so signature verification
  // works (no session/header rewriting on that request).
  matcher: [
    "/dashboard/:path*",
    "/service/:path*",
    "/login",
    "/signup",
    "/auth/:path*",
  ],
};

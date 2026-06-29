import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 301 redirect old /service/* URLs to /product/*
  if (pathname === "/service" || pathname.startsWith("/service/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/service/, "/product");
    return NextResponse.redirect(url, { status: 301 });
  }

  return await updateSession(request);
}

export const config = {
  // Scoped to the Calqulate Vitals product surfaces ONLY, so the rest of
  // calqulate.net (and its AdSense / GTM / Clarity scripts) is unaffected.
  // The Stripe webhook is intentionally excluded so signature verification
  // works (no session/header rewriting on that request).
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/product/:path*",
    "/service/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/auth/:path*",
  ],
};

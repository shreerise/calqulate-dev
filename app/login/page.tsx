import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Sign in | Calqulate Vitals",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <main id="main" className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-12">
      <Suspense fallback={null}>
        <AuthForm mode="login" />
      </Suspense>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { WifiOff } from "lucide-react";

export const metadata: Metadata = {
  title: "You're offline — Calqulate",
  description: "You are currently offline. Please check your internet connection and try again.",
  robots: "noindex",
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <div className="rounded-full bg-emerald-100 p-4">
        <WifiOff className="h-10 w-10 text-emerald-600" />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-gray-900">You&apos;re offline</h1>
      <p className="mt-3 max-w-md text-gray-600">
        It looks like you&apos;ve lost your internet connection. Don&apos;t worry — once you&apos;re back online,
        you can pick up right where you left off.
      </p>
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
        <span className="inline-block h-2 w-2 rounded-full bg-red-400" />
        No internet connection
      </div>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
      >
        Try again
      </Link>
    </div>
  );
}

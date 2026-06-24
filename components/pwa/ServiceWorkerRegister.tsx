"use client";
import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("serviceWorker" in navigator) {
      window.addEventListener("online", () => {
        window.location.reload();
      });
    }
  }, []);
  return null;
}

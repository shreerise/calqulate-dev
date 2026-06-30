"use client"

import { usePathname } from "next/navigation"
import FeedbackPopup from "@/components/feedback/FeedbackPopup"
import { ChatWidget } from "@/components/chat/ChatWidget"
import { InstallBanner } from "@/components/pwa/InstallBanner"

/**
 * Site-wide floating chrome (chat, feedback, install prompt). Hidden on /embed/*
 * routes so it never leaks into a third-party iframe and breaks the widget.
 */
export function NonEmbedChrome() {
  const pathname = usePathname()
  if (pathname?.startsWith("/embed")) return null

  return (
    <>
      <FeedbackPopup />
      <ChatWidget />
      <InstallBanner />
    </>
  )
}

import type { Metadata } from "next";
import { HelpGuide } from "@/components/vitals/HelpGuide";

export const metadata: Metadata = {
  title: "Help Guide | Calqulate Vitals",
  description:
    "Step-by-step guide to using Calqulate Vitals: how to start, what to log and when, with a worked example — from your first dose to reaching your goal weight.",
};

export default function GuidePage() {
  return <HelpGuide />;
}

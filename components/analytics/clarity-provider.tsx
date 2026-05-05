"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityProvider() {
  useEffect(() => {
    Clarity.init("wlnxn3d7oz");
  }, []);

  return null;
}
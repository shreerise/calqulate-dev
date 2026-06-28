"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Undo2, Loader2 } from "lucide-react";
import { deleteRecord, restoreRecord } from "@/lib/glp1/client";
import type { Glp1EntityName } from "@/lib/glp1/schemas";

/**
 * Soft-delete a log row with an inline UNDO. Nothing is destroyed — delete sets
 * `deleted_at` and undo calls the restore endpoint, honoring the "your data is
 * recoverable" guarantee right in the UI.
 */
export function DeleteEntryButton({ entity, id }: { entity: Glp1EntityName; id: string }) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "deleting" | "deleted" | "restoring">("idle");

  async function onDelete() {
    setState("deleting");
    try {
      await deleteRecord(entity, id);
      setState("deleted");
      router.refresh();
    } catch {
      setState("idle");
    }
  }

  async function onUndo() {
    setState("restoring");
    try {
      await restoreRecord(entity, id);
      router.refresh();
    } finally {
      setState("idle");
    }
  }

  if (state === "deleted") {
    return (
      <button onClick={onUndo} className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700">
        <Undo2 className="h-3.5 w-3.5" /> Undo
      </button>
    );
  }

  return (
    <button
      onClick={onDelete}
      disabled={state === "deleting"}
      aria-label="Delete entry"
      className="inline-flex items-center text-gray-400 hover:text-red-600 disabled:opacity-50"
    >
      {state === "deleting" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </button>
  );
}

/**
 * GLP-1 tracker client API helper (browser-safe).
 *
 * Thin wrapper over the durable `/api/glp1/*` routes. Every mutating call AWAITS
 * the server's persisted row before resolving, so UI can show "Saved" only after
 * the write is durable — the foundation of the "never lose your data" promise on
 * the client side. No server-only imports here, so it is safe in client bundles.
 */

import type { Glp1EntityName } from "./schemas";

export class ApiError extends Error {
  constructor(
    msg: string,
    public status: number,
    public issues?: unknown,
  ) {
    super(msg);
    this.name = "ApiError";
  }
}

async function parse<T>(res: Response): Promise<T> {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(
      (json as { error?: string }).error ?? `Request failed (${res.status})`,
      res.status,
      (json as { issues?: unknown }).issues,
    );
  }
  return json as T;
}

export async function createRecord<T = Record<string, unknown>>(
  entity: Glp1EntityName,
  input: unknown,
): Promise<T> {
  const res = await fetch(`/api/glp1/${entity}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const { record } = await parse<{ record: T }>(res);
  return record;
}

export async function listRecords<T = Record<string, unknown>>(
  entity: Glp1EntityName,
  opts: { limit?: number; since?: string; includeDeleted?: boolean } = {},
): Promise<T[]> {
  const qs = new URLSearchParams();
  if (opts.limit) qs.set("limit", String(opts.limit));
  if (opts.since) qs.set("since", opts.since);
  if (opts.includeDeleted) qs.set("includeDeleted", "1");
  const res = await fetch(`/api/glp1/${entity}?${qs.toString()}`, { cache: "no-store" });
  const { records } = await parse<{ records: T[] }>(res);
  return records;
}

export async function updateRecord<T = Record<string, unknown>>(
  entity: Glp1EntityName,
  id: string,
  patch: unknown,
  expectedVersion?: number,
): Promise<T> {
  const res = await fetch(`/api/glp1/${entity}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ patch, expectedVersion }),
  });
  const { record } = await parse<{ record: T }>(res);
  return record;
}

export async function deleteRecord(entity: Glp1EntityName, id: string): Promise<void> {
  const res = await fetch(`/api/glp1/${entity}/${id}`, { method: "DELETE" });
  await parse<{ ok: true }>(res);
}

export async function restoreRecord<T = Record<string, unknown>>(
  entity: Glp1EntityName,
  id: string,
): Promise<T> {
  const res = await fetch(`/api/glp1/${entity}/${id}/restore`, { method: "POST" });
  const { record } = await parse<{ record: T }>(res);
  return record;
}

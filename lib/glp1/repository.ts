/**
 * GLP-1 tracker durable persistence layer (SERVER ONLY).
 *
 * This is the foundation of the product's #1 differentiator — "never lose your
 * data". Every write is:
 *   • validated through the shared zod schema (no malformed rows, ever),
 *   • awaited and returned as the persisted row (the API confirms to the client
 *     only after the DB write succeeds — durable, not optimistic-only),
 *   • versioned + soft-deleted (a DB trigger bumps `version`/`updated_at`; deletes
 *     set `deleted_at` so nothing is destroyed and a restore flow can recover it).
 *
 * Business logic lives here behind a stable API, so the future React Native /
 * Flutter clients reuse the exact same persistence contract.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import { GLP1_ENTITIES, type Glp1EntityName } from "./schemas";

export class ConflictError extends Error {
  constructor(msg = "This record changed since you loaded it. Reload and retry.") {
    super(msg);
    this.name = "ConflictError";
  }
}
export class ValidationError extends Error {
  constructor(public issues: unknown, msg = "Invalid input.") {
    super(msg);
    this.name = "ValidationError";
  }
}
export class NotFoundError extends Error {
  constructor(msg = "Record not found.") {
    super(msg);
    this.name = "NotFoundError";
  }
}

type Db = SupabaseClient<any, any, any>;

// ─── key-case conversion (camelCase TS ↔ snake_case columns) ──────────────────
const toSnake = (s: string) => s.replace(/[A-Z]/g, (m) => "_" + m.toLowerCase());
const toCamel = (s: string) => s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

function rowToSnake(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) out[toSnake(k)] = v;
  return out;
}
function rowToCamel<T = Record<string, unknown>>(row: Record<string, unknown> | null): T | null {
  if (!row) return null;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) out[toCamel(k)] = v;
  return out as T;
}

/** Columns the DB/trigger owns — clients may never set them directly. */
const SERVER_COLUMNS = new Set(["id", "user_id", "created_at", "updated_at", "version", "deleted_at"]);
function stripServerColumns(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) if (!SERVER_COLUMNS.has(k)) out[k] = v;
  return out;
}

// ─── CRUD ─────────────────────────────────────────────────────────────────────

/**
 * Validate + durably insert one record. Returns the persisted row (camelCase),
 * including server-assigned id/version — the caller confirms its optimistic UI
 * against THIS, guaranteeing the data is saved before the user sees success.
 */
export async function createRecord<T = Record<string, unknown>>(
  db: Db,
  entity: Glp1EntityName,
  userId: string,
  input: unknown,
): Promise<T> {
  const { table, schema } = GLP1_ENTITIES[entity];
  const parsed = schema.safeParse(input);
  if (!parsed.success) throw new ValidationError(parsed.error.flatten());

  const row = { ...rowToSnake(parsed.data as Record<string, unknown>), user_id: userId };
  const { data, error } = await db.from(table).insert(row).select("*").single();
  if (error) throw new Error(error.message);
  return rowToCamel<T>(data)!;
}

/**
 * Validate + update one owned record with OPTIMISTIC CONCURRENCY. When
 * `expectedVersion` is supplied, the write only applies if the row is still at
 * that version (a DB trigger then bumps it) — otherwise a ConflictError is thrown
 * so a stale client can never silently clobber a newer value.
 */
export async function updateRecord<T = Record<string, unknown>>(
  db: Db,
  entity: Glp1EntityName,
  userId: string,
  id: string,
  patch: unknown,
  expectedVersion?: number,
): Promise<T> {
  const { table, schema } = GLP1_ENTITIES[entity];
  // Partial validation: only the provided client fields. Unwrap refined schemas
  // (ZodEffects) so partial patches don't trip whole-object cross-field rules.
  const anySchema = schema as any;
  const base = typeof anySchema.partial === "function" ? anySchema : anySchema._def?.schema;
  const partial = base && typeof base.partial === "function" ? base.partial() : schema;
  const parsed = partial.safeParse(patch);
  if (!parsed.success) throw new ValidationError(parsed.error.flatten());

  const update = stripServerColumns(rowToSnake(parsed.data as Record<string, unknown>));
  if (Object.keys(update).length === 0) throw new ValidationError(null, "Nothing to update.");

  let q = db.from(table).update(update).eq("id", id).eq("user_id", userId).is("deleted_at", null);
  if (typeof expectedVersion === "number") q = q.eq("version", expectedVersion);

  const { data, error } = await q.select("*").maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) {
    if (typeof expectedVersion === "number") throw new ConflictError();
    throw new NotFoundError();
  }
  return rowToCamel<T>(data)!;
}

/** Soft-delete (recoverable). Bumps version via trigger; data is never destroyed. */
export async function softDeleteRecord(
  db: Db,
  entity: Glp1EntityName,
  userId: string,
  id: string,
): Promise<void> {
  const { table } = GLP1_ENTITIES[entity];
  const { data, error } = await db
    .from(table)
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", userId)
    .is("deleted_at", null)
    .select("id")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new NotFoundError();
}

/** Restore a soft-deleted record — the user-facing "undo / recover" path. */
export async function restoreRecord<T = Record<string, unknown>>(
  db: Db,
  entity: Glp1EntityName,
  userId: string,
  id: string,
): Promise<T> {
  const { table } = GLP1_ENTITIES[entity];
  const { data, error } = await db
    .from(table)
    .update({ deleted_at: null })
    .eq("id", id)
    .eq("user_id", userId)
    .not("deleted_at", "is", null)
    .select("*")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new NotFoundError();
  return rowToCamel<T>(data)!;
}

export interface ListOptions {
  includeDeleted?: boolean;
  limit?: number;
  /** ISO datetime lower bound on created_at, for incremental sync. */
  since?: string;
}

/** List one entity for a user, newest first. Excludes soft-deleted by default. */
export async function listRecords<T = Record<string, unknown>>(
  db: Db,
  entity: Glp1EntityName,
  userId: string,
  opts: ListOptions = {},
): Promise<T[]> {
  const { table } = GLP1_ENTITIES[entity];
  let q = db.from(table).select("*").eq("user_id", userId).order("created_at", { ascending: false });
  if (!opts.includeDeleted) q = q.is("deleted_at", null);
  if (opts.since) q = q.gte("created_at", opts.since);
  if (opts.limit) q = q.limit(opts.limit);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return (data ?? []).map((r: Record<string, unknown>) => rowToCamel<T>(r)!);
}

/**
 * Export EVERY GLP-1 record for a user (including soft-deleted), for the
 * "export all my data" guarantee. Returns a plain object keyed by entity.
 */
export async function exportAllGlp1Data(
  db: Db,
  userId: string,
): Promise<{ exportedAt: string; userId: string; data: Record<string, unknown[]> }> {
  const entities = Object.keys(GLP1_ENTITIES) as Glp1EntityName[];
  const results = await Promise.all(
    entities.map((e) => listRecords(db, e, userId, { includeDeleted: true })),
  );
  const data: Record<string, unknown[]> = {};
  entities.forEach((e, i) => (data[e] = results[i]));
  return { exportedAt: new Date().toISOString(), userId, data };
}

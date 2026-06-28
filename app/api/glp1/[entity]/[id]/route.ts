import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAccess } from "@/lib/auth";
import { GLP1_ENTITIES, type Glp1EntityName } from "@/lib/glp1/schemas";
import {
  updateRecord,
  softDeleteRecord,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "@/lib/glp1/repository";

export const dynamic = "force-dynamic";

function resolveEntity(entity: string): Glp1EntityName | null {
  return entity in GLP1_ENTITIES ? (entity as Glp1EntityName) : null;
}

/**
 * PATCH /api/glp1/:entity/:id — durable, version-checked update.
 * Send `expectedVersion` to opt into optimistic-concurrency conflict detection.
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ entity: string; id: string }> },
) {
  const { entity: raw, id } = await params;
  const entity = resolveEntity(raw);
  if (!entity) return NextResponse.json({ error: "Unknown entity" }, { status: 404 });

  const access = await getAccess();
  if (!access.userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  let body: { patch?: unknown; expectedVersion?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const supabase = await createClient();
  try {
    const record = await updateRecord(
      supabase,
      entity,
      access.userId,
      id,
      body.patch ?? body,
      body.expectedVersion,
    );
    return NextResponse.json({ record });
  } catch (e) {
    if (e instanceof ConflictError) return NextResponse.json({ error: e.message }, { status: 409 });
    if (e instanceof NotFoundError) return NextResponse.json({ error: e.message }, { status: 404 });
    if (e instanceof ValidationError) {
      return NextResponse.json({ error: "Invalid input", issues: e.issues }, { status: 422 });
    }
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

/** DELETE /api/glp1/:entity/:id — SOFT delete (recoverable via the restore route). */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ entity: string; id: string }> },
) {
  const { entity: raw, id } = await params;
  const entity = resolveEntity(raw);
  if (!entity) return NextResponse.json({ error: "Unknown entity" }, { status: 404 });

  const access = await getAccess();
  if (!access.userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const supabase = await createClient();
  try {
    await softDeleteRecord(supabase, entity, access.userId, id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof NotFoundError) return NextResponse.json({ error: e.message }, { status: 404 });
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

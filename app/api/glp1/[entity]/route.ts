import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAccess } from "@/lib/auth";
import { GLP1_ENTITIES, type Glp1EntityName } from "@/lib/glp1/schemas";
import {
  createRecord,
  listRecords,
  ValidationError,
} from "@/lib/glp1/repository";

export const dynamic = "force-dynamic";

/** Guard the URL `:entity` segment against the known registry. */
function resolveEntity(entity: string): Glp1EntityName | null {
  return entity in GLP1_ENTITIES ? (entity as Glp1EntityName) : null;
}

/** GET /api/glp1/:entity — list the signed-in user's records (newest first). */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ entity: string }> },
) {
  const { entity: raw } = await params;
  const entity = resolveEntity(raw);
  if (!entity) return NextResponse.json({ error: "Unknown entity" }, { status: 404 });

  const access = await getAccess();
  if (!access.userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const url = new URL(req.url);
  const limit = url.searchParams.get("limit");
  const since = url.searchParams.get("since") ?? undefined;
  const includeDeleted = url.searchParams.get("includeDeleted") === "1";

  const supabase = await createClient();
  try {
    const records = await listRecords(supabase, entity, access.userId, {
      includeDeleted,
      since,
      limit: limit ? Math.min(500, Math.max(1, Number(limit))) : undefined,
    });
    return NextResponse.json({ records });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

/** POST /api/glp1/:entity — durably create one record; returns the persisted row. */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ entity: string }> },
) {
  const { entity: raw } = await params;
  const entity = resolveEntity(raw);
  if (!entity) return NextResponse.json({ error: "Unknown entity" }, { status: 404 });

  const access = await getAccess();
  if (!access.userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const supabase = await createClient();
  try {
    const record = await createRecord(supabase, entity, access.userId, body);
    return NextResponse.json({ record }, { status: 201 });
  } catch (e) {
    if (e instanceof ValidationError) {
      return NextResponse.json({ error: "Invalid input", issues: e.issues }, { status: 422 });
    }
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

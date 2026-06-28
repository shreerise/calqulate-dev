import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAccess } from "@/lib/auth";
import { GLP1_ENTITIES, type Glp1EntityName } from "@/lib/glp1/schemas";
import { restoreRecord, NotFoundError } from "@/lib/glp1/repository";

export const dynamic = "force-dynamic";

/** POST /api/glp1/:entity/:id/restore — undo a soft delete. */
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ entity: string; id: string }> },
) {
  const { entity: raw, id } = await params;
  const entity = raw in GLP1_ENTITIES ? (raw as Glp1EntityName) : null;
  if (!entity) return NextResponse.json({ error: "Unknown entity" }, { status: 404 });

  const access = await getAccess();
  if (!access.userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const supabase = await createClient();
  try {
    const record = await restoreRecord(supabase, entity, access.userId, id);
    return NextResponse.json({ record });
  } catch (e) {
    if (e instanceof NotFoundError) return NextResponse.json({ error: e.message }, { status: 404 });
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

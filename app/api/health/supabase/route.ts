import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;

  const authorization = request.headers.get("authorization");
  return authorization === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const db = getSupabaseClient();
  if (!db) {
    return NextResponse.json(
      { ok: false, error: "Supabase not configured" },
      { status: 503 }
    );
  }

  const startedAt = Date.now();
  const { error } = await db
    .from("produtos")
    .select("slug")
    .limit(1);

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    service: "supabase",
    latencyMs: Date.now() - startedAt,
    checkedAt: new Date().toISOString(),
  });
}

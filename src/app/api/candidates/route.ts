import { listCandidateDashboardEntries } from "@/lib/reviewStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const entries = await listCandidateDashboardEntries();

  return Response.json({
    ok: true,
    entries,
    updatedAt: new Date().toISOString(),
  });
}

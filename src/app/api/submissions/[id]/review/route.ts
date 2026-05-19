import { parseReviewStatus } from "@/lib/review";
import { updateReviewStatus } from "@/lib/reviewStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function hasReviewAccess(request: Request) {
  const token = process.env.WAKILKITA_REVIEW_TOKEN;
  if (!token) return false;
  return request.headers.get("x-wakilkita-review-token") === token;
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!hasReviewAccess(request)) {
    return Response.json({ ok: false, message: "Review token required." }, { status: 401 });
  }

  const { id } = await context.params;
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid review payload." }, { status: 400 });
  }

  const body = typeof payload === "object" && payload !== null ? (payload as Record<string, unknown>) : {};
  const status = parseReviewStatus(body.status);
  const note = typeof body.note === "string" ? body.note : undefined;

  if (!status) {
    return Response.json({ ok: false, message: "Valid review status is required." }, { status: 422 });
  }

  const result = await updateReviewStatus(id, status, note);
  if (!result.ok) {
    return Response.json({ ok: false, message: result.message }, { status: result.status });
  }

  return Response.json({ ok: true, entry: result.entry });
}

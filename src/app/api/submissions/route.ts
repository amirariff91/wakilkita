import { appendRejectedValidationAudit, appendReviewEntry, listReviewEntries } from "@/lib/reviewStore";
import { validateIntakePayload } from "@/lib/review";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function hasReviewAccess(request: Request) {
  const token = process.env.WAKILKITA_REVIEW_TOKEN;
  if (!token) return false;
  return request.headers.get("x-wakilkita-review-token") === token;
}

export async function GET(request: Request) {
  if (!hasReviewAccess(request)) {
    return Response.json({ ok: false, message: "Private review access is not configured." }, { status: 403 });
  }

  const entries = await listReviewEntries();

  return Response.json({
    ok: true,
    entries,
  });
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    await appendRejectedValidationAudit("Invalid JSON payload.");
    return Response.json({ ok: false, issues: [{ field: "form", message: "Invalid submission payload." }] }, { status: 400 });
  }

  const result = validateIntakePayload(payload);
  if (!result.draft) {
    await appendRejectedValidationAudit(result.rejectedAuditDetail ?? "Submission failed validation.");
    return Response.json({ ok: false, issues: result.issues }, { status: 422 });
  }

  const entry = await appendReviewEntry(result.draft);

  return Response.json({ ok: true, entry }, { status: 201 });
}

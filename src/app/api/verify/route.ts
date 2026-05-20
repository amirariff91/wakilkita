import { createVerification, validateIC, validatePhone } from "@/lib/verificationStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { ok: false, message: "Format permintaan tidak sah." },
      { status: 400 }
    );
  }

  if (typeof payload !== "object" || payload === null) {
    return Response.json({ ok: false, message: "Data tidak lengkap." }, { status: 400 });
  }

  const { ic, phone } = payload as Record<string, unknown>;

  const icStr = typeof ic === "string" ? ic.replace(/[-\s]/g, "").trim() : "";
  const phoneStr = typeof phone === "string" ? phone.trim() : "";

  const icCheck = validateIC(icStr);
  if (!icCheck.ok) {
    return Response.json({ ok: false, field: "ic", message: icCheck.message }, { status: 422 });
  }

  const phoneCheck = validatePhone(phoneStr);
  if (!phoneCheck.ok) {
    return Response.json({ ok: false, field: "phone", message: phoneCheck.message }, { status: 422 });
  }

  const { token } = await createVerification(icStr, phoneStr);

  return Response.json({ ok: true, token }, { status: 200 });
}

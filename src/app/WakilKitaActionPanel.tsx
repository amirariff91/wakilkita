"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { cleanReviewText, type IntakeType } from "@/lib/review";

// ─── Types ───────────────────────────────────────────────────────────────────

type VerifyResponse = {
  ok?: boolean;
  token?: string;
  field?: string;
  message?: string;
};

type SubmitResponse = {
  ok?: boolean;
  issues?: { field?: string; message?: string }[];
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const defaultIssues = [
  "Mendengar sebelum membuat keputusan",
  "Bantu susulan isu setempat",
  "Faham Petaling Jaya",
  "Dipercayai merentas komuniti",
  "Telus dan bertanggungjawab",
  "Lain-lain",
];

function cleanText(value: string, maxLength: number) {
  return cleanReviewText(value, maxLength);
}

function formatMissingFields(fields: string[]): string {
  if (fields.length === 0) return "";
  if (fields.length === 1) return fields[0];
  if (fields.length === 2) return `${fields[0]} dan ${fields[1]}`;
  return `${fields[0]}, ${fields[1]}, dan ${fields[2]}`;
}

// ─── Step 1: eKYC Verification ───────────────────────────────────────────────

function EkycStep({
  onVerified,
}: {
  onVerified: (token: string) => void;
}) {
  const [ic, setIc] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleVerify(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ic: ic.replace(/[-\s]/g, ""), phone }),
      });

      const data = (await res.json().catch(() => null)) as VerifyResponse | null;

      if (!res.ok || !data?.ok || !data.token) {
        setError(data?.message ?? "Pengesahan tidak berjaya. Sila semak maklumat anda.");
        return;
      }

      onVerified(data.token);
    } catch {
      setError("Masalah sambungan. Sila cuba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const isReady = ic.replace(/[-\s]/g, "").length === 12 && phone.length >= 10;

  return (
    <div className="border border-[var(--line)] bg-[var(--soft)] p-5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
        Langkah 1 daripada 2
      </p>
      <h3 className="mt-3 text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">
        Sahkan identiti anda dahulu
      </h3>
      <p className="mt-2 text-sm leading-6 text-[var(--slate)]">
        Masukkan nombor IC dan nombor telefon anda. Maklumat ini direkodkan secara berasingan daripada cadangan — tidak dipaparkan kepada umum dan tidak dikaitkan dengan nama calon.
      </p>

      <form onSubmit={handleVerify} className="mt-5 space-y-4">
        <div>
          <label className="block text-sm font-bold text-[var(--ink)]" htmlFor="ekyc-ic">
            Nombor IC (MyKad) <span className="text-[var(--amber-text)]">*</span>
          </label>
          <input
            id="ekyc-ic"
            type="text"
            inputMode="numeric"
            value={ic}
            onChange={(e) => setIc(e.target.value)}
            maxLength={14}
            placeholder="cth: 900101-14-5678"
            required
            className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
          />
          <p className="mt-1 text-xs text-[var(--slate)]">12 digit tanpa sempang, atau dalam format XXXXXX-XX-XXXX.</p>
        </div>

        <div>
          <label className="block text-sm font-bold text-[var(--ink)]" htmlFor="ekyc-phone">
            Nombor telefon Malaysia <span className="text-[var(--amber-text)]">*</span>
          </label>
          <input
            id="ekyc-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={15}
            placeholder="cth: 011-12345678"
            required
            className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
          />
        </div>

        {error && (
          <div className="border border-[var(--amber)] bg-white p-3" aria-live="assertive">
            <p className="text-sm font-bold text-[var(--amber-text)]">{error}</p>
          </div>
        )}

        <div className="border border-[var(--line)] bg-white px-4 py-3">
          <p className="text-xs font-semibold text-[var(--slate)]">
            Nombor IC disimpan sebagai cincang kriptografi sahaja — bukan teks asal. Ia tidak akan dipaparkan, dikongsi, atau dikaitkan dengan nama calon anda.
          </p>
        </div>

        <button
          type="submit"
          disabled={!isReady || isSubmitting}
          className="w-full bg-[var(--civic)] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-[rgba(38,58,79,0.35)]"
        >
          {isSubmitting ? "Mengesahkan..." : "Sahkan identiti saya"}
        </button>
      </form>
    </div>
  );
}

// ─── Step 2: Nomination Form ──────────────────────────────────────────────────

function NominationStep({
  verificationToken,
  onSuccess,
}: {
  verificationToken: string;
  onSuccess: () => void;
}) {
  const [constituency, setConstituency] = useState("P105 Petaling Jaya");
  const intakeType: IntakeType = "Cadangkan nama untuk semakan";
  const [personName, setPersonName] = useState("");
  const [issue, setIssue] = useState(defaultIssues[0]);
  const [reason, setReason] = useState("");
  const [contact, setContact] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reasonLength = cleanText(reason, 420).length;
  const reasonMinReached = reasonLength > 12;

  const isReady = useMemo(() => (
    cleanText(constituency, 80).length > 2 &&
    cleanText(personName, 80).length > 2 &&
    cleanText(reason, 420).length > 12
  ), [constituency, personName, reason]);

  const missingFields = useMemo(() => {
    const fields = [
      cleanText(constituency, 80).length > 2 ? null : "kawasan Parlimen",
      cleanText(personName, 80).length > 2 ? null : "nama orang yang dicadangkan",
      cleanText(reason, 420).length > 12 ? null : "sebab cadangan yang jelas",
    ].filter(Boolean) as string[];
    return formatMissingFields(fields);
  }, [constituency, personName, reason]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intakeType,
          constituency: cleanText(constituency, 80),
          nameOrRole: cleanText(personName, 80),
          priorityArea: issue,
          reason: cleanText(reason, 420),
          replyContact: cleanText(contact, 120),
          verificationToken,
        }),
      });

      const data = (await res.json().catch(() => null)) as SubmitResponse | null;

      if (!res.ok) {
        const msg = data?.issues?.[0]?.message ?? "Cadangan belum dapat dihantar. Sila cuba lagi.";
        setSubmitError(msg);
        return;
      }

      onSuccess();
    } catch {
      setSubmitError("Masalah sambungan. Sila cuba sekali lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="border border-[var(--line)] bg-[var(--soft)] p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 border border-green-300 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
          ✓ Identiti disahkan
        </span>
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
          Langkah 2 daripada 2
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
          Cadangan anda
        </p>

        <div>
          <label className="block text-sm font-bold" htmlFor="constituency">
            Kawasan Parlimen anda <span className="text-[var(--amber-text)]">*</span>
          </label>
          <input
            id="constituency"
            value={constituency}
            onChange={(e) => setConstituency(e.target.value)}
            maxLength={80}
            required
            placeholder="Contoh: P105 Petaling Jaya"
            className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
          />
          <p className="mt-1 text-xs text-[var(--slate)]">
            Kawasan pertama yang dibuka ialah P105 Petaling Jaya. Jika anda berada di luar kawasan ini, nyatakan kawasan sebenar anda.
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold" htmlFor="person-name">
            Nama orang yang anda cadangkan <span className="text-[var(--amber-text)]">*</span>
          </label>
          <input
            id="person-name"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            maxLength={80}
            required
            placeholder="Nama penuh atau nama yang dikenali umum"
            className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
          />
          <p className="mt-1 text-xs text-[var(--slate)]">
            Jangan masukkan nombor telefon, alamat, atau nombor IC orang tersebut.
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold" htmlFor="priority-area">
            Kenapa mereka wajar dipertimbangkan?
          </label>
          <select
            id="priority-area"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[var(--civic)]"
          >
            {defaultIssues.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold" htmlFor="reason">
            Sebab cadangan anda <span className="text-[var(--amber-text)]">*</span>
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            maxLength={420}
            required
            rows={5}
            placeholder="Contoh: Beliau sering membantu penduduk SS2 membuat susulan isu longkang dan parkir, menerangkan proses dengan jelas, dan mudah dihubungi oleh komuniti setempat."
            className="mt-2 w-full resize-none border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
          />
          <div className="mt-1 flex items-center justify-between gap-4">
            <p className="text-xs text-[var(--slate)]">
              Tulis secara khusus dan hormat. Ceritakan apa yang pernah mereka lakukan. Elakkan tuduhan yang tidak disahkan.
            </p>
            <p className="shrink-0 text-xs tabular-nums text-[var(--slate)]">
              {reasonMinReached && <span className="mr-2 text-[var(--civic)]">Minimum cukup ·</span>}
              {reasonLength} / 420
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold" htmlFor="contact">
            Cara untuk kami hubungi anda jika perlu
          </label>
          <input
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            maxLength={120}
            placeholder="Emel atau nombor telefon (pilihan)"
            className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
          />
          <p className="mt-1 text-xs text-[var(--slate)]">
            Tidak wajib. Digunakan untuk semakan atau pertanyaan lanjut sahaja. Tidak dipaparkan kepada umum.
          </p>
        </div>

        <div className="border border-[var(--line)] bg-white px-4 py-3" aria-live="polite">
          <p className="text-xs font-semibold text-[var(--slate)]">
            {isReady
              ? "Cadangan ini sedia dihantar untuk semakan."
              : missingFields
                ? `Masih diperlukan: ${missingFields}.`
                : "Lengkapkan medan wajib untuk teruskan."}
          </p>
        </div>

        <button
          type="submit"
          disabled={!isReady || isSubmitting}
          className="w-full bg-[var(--civic)] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-[rgba(38,58,79,0.35)]"
        >
          {isSubmitting ? "Menghantar cadangan..." : "Hantar cadangan"}
        </button>

        {submitError && (
          <div className="border border-[var(--amber)] bg-white p-4" aria-live="assertive">
            <p className="text-sm font-bold text-[var(--amber-text)]">{submitError}</p>
          </div>
        )}
      </form>
    </div>
  );
}

// ─── Step 3: Success ──────────────────────────────────────────────────────────

function SuccessStep() {
  return (
    <div className="border border-[var(--line)] bg-white p-8 text-center">
      <p className="text-3xl font-bold tracking-[-0.04em] text-[var(--ink)]">Terima kasih.</p>
      <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[var(--slate)]">
        Cadangan anda sudah kami terima dan akan disemak sebelum masuk ke peringkat pengundian komuniti.
      </p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link href="/dashboard" className="bg-[var(--ink)] px-6 py-4 text-sm font-bold text-[var(--mint)]">
          Lihat calon yang dicadangkan
        </Link>
        <Link href="/#take-part" className="border border-[var(--line)] bg-white px-6 py-4 text-sm font-bold text-[var(--ink)]">
          Hantar cadangan lain
        </Link>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function WakilKitaActionPanel() {
  const [step, setStep] = useState<"ekyc" | "nominate" | "done">("ekyc");
  const [verificationToken, setVerificationToken] = useState("");

  return (
    <section id="take-part" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="border border-[var(--line)] bg-white p-5 text-[var(--ink)] shadow-[0_1px_3px_rgba(0,0,0,0.08)] sm:p-7 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="inline-flex bg-[var(--soft)] px-3 py-2 text-xs font-bold tracking-[0.08em] text-[var(--civic)]">
              Cadangkan nama
            </p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Kenali seseorang yang layak dipercayai?
            </h2>
            <p className="mt-4 text-base leading-7 text-[var(--slate)] sm:text-lg">
              Cadangkan nama mereka dan ceritakan sebabnya. Selepas seminggu, nama yang diluluskan akan dibuka untuk pengundian komuniti.
            </p>
            <div className="mt-6 border border-[var(--ink)] bg-[var(--ink)] p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--mint)]">
                Pengesahan eKYC diperlukan
              </p>
              <p className="mt-3 text-sm leading-7 text-white/90">
                Melalui sistem eKYC yang disahkan, setiap individu yang sah boleh mencalon, memilih dan mengundi calon pilihan mereka secara terus di platform ini — tanpa perlu menjadi ahli parti atau ahli mana-mana organisasi politik.
              </p>
            </div>
            {step === "nominate" && (
              <div className="mt-4 flex items-center gap-2 border border-green-300 bg-green-50 px-4 py-3">
                <span className="text-base">✓</span>
                <p className="text-sm font-bold text-green-700">
                  Identiti disahkan. Sila isi cadangan anda.
                </p>
              </div>
            )}
          </div>

          <div>
            {step === "ekyc" && (
              <EkycStep
                onVerified={(token) => {
                  setVerificationToken(token);
                  setStep("nominate");
                }}
              />
            )}
            {step === "nominate" && (
              <NominationStep
                verificationToken={verificationToken}
                onSuccess={() => setStep("done")}
              />
            )}
            {step === "done" && <SuccessStep />}
          </div>
        </div>
      </div>
    </section>
  );
}

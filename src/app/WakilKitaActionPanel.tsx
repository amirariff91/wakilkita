"use client";

import { FormEvent, useMemo, useState } from "react";
import { cleanReviewText, type IntakeType } from "@/lib/review";

const defaultIssues = [
  "Clean governance",
  "Council follow-up",
  "Walkability and crossings",
  "Transit and access",
  "Local facilities",
  "Cost pressure",
];

function cleanText(value: string, maxLength: number) {
  return cleanReviewText(value, maxLength);
}

function formatMissingFields(fields: string[]): string {
  if (fields.length === 0) return "";
  if (fields.length === 1) return fields[0];
  if (fields.length === 2) return `${fields[0]} and ${fields[1]}`;
  return `${fields[0]}, ${fields[1]}, and ${fields[2]}`;
}

export function WakilKitaActionPanel() {
  const [constituency, setConstituency] = useState("P105 Petaling Jaya");
  const intakeType: IntakeType = "Nominate a representative";
  const [personName, setPersonName] = useState("");
  const [issue, setIssue] = useState(defaultIssues[0]);
  const [reason, setReason] = useState("");
  const [contact, setContact] = useState("");
  const [saved, setSaved] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isReady = useMemo(() => {
    return (
      cleanText(constituency, 80).length > 2 &&
      cleanText(personName, 80).length > 2 &&
      cleanText(reason, 420).length > 12
    );
  }, [constituency, personName, reason]);

  const missingFields = useMemo(() => {
    const fields = [
      cleanText(constituency, 80).length > 2 ? null : "your constituency",
      cleanText(personName, 80).length > 2 ? null : "a name, representative, or issue area",
      cleanText(reason, 420).length > 12 ? null : "a short reason",
    ].filter(Boolean) as string[];
    return formatMissingFields(fields);
  }, [constituency, personName, reason]);

  const reasonLength = cleanText(reason, 420).length;
  const reasonMinReached = reasonLength > 12;

  async function submitIntake(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const safeConstituency = cleanText(constituency, 80);
    const safeName = cleanText(personName, 80);
    const safeReason = cleanText(reason, 420);
    const safeContact = cleanText(contact, 120);

    if (!safeConstituency || !safeName || !safeReason || isSubmitting) return;

    setSubmitError("");
    setSaved(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intakeType,
          constituency: safeConstituency,
          nameOrRole: safeName,
          priorityArea: issue,
          reason: safeReason,
          replyContact: safeContact,
        }),
      });

      const result = await response.json().catch(() => null) as { issues?: { message?: string }[] } | null;
      if (!response.ok) {
        const message = result?.issues?.[0]?.message ?? "Submission could not be saved. Please review the form and try again.";
        setSubmitError(message);
        return;
      }

      setSaved(true);
      setPersonName("");
      setReason("");
      setContact("");
    } catch {
      setSubmitError("Submission could not reach the private review queue. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="take-part" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="border border-[var(--line)] bg-white p-5 text-[var(--ink)] shadow-[0_1px_3px_rgba(0,0,0,0.08)] sm:p-7 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="inline-flex bg-[var(--soft)] px-3 py-2 text-xs font-bold tracking-[0.08em] text-[var(--civic)]">
              Step 1 · nominate your rep
            </p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Nominate one Petaling Jaya representative.
            </h2>
            <p className="mt-4 text-base leading-7 text-[var(--slate)] sm:text-lg">
              Simple flow: verify with eKYC, nominate a rep, then live polling opens after the first week.
            </p>
            <div className="mt-6 border border-[var(--line)] bg-[var(--soft)] p-4 text-sm font-medium leading-6 text-[var(--slate)]">
              eKYC is required for nomination and voting, but IC and identity data must stay in a separate verification system — not in this public reason form.
            </div>
          </div>

          <form
            onSubmit={submitIntake}
            className="border border-[var(--line)] bg-[var(--soft)] p-5 text-[var(--ink)] sm:p-6"
          >
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
              Petaling Jaya rep nomination
            </p>

            <label className="mt-5 block text-sm font-bold" htmlFor="constituency">
              Your constituency <span className="text-[var(--amber-text)]">*</span>
            </label>
            <input
              id="constituency"
              value={constituency}
              onChange={(event) => setConstituency(event.target.value)}
              maxLength={80}
              required
              aria-describedby="constituency-help"
              placeholder="e.g. P105 Petaling Jaya"
              className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
            />
            <p id="constituency-help" className="mt-2 text-xs font-semibold leading-5 text-[var(--slate)]">
              Keep this tied to your parliamentary area. P105 Petaling Jaya is the active first constituency.
            </p>

            <label className="mt-4 block text-sm font-bold" htmlFor="person-name">
              Who do you nominate? <span className="text-[var(--amber-text)]">*</span>
            </label>
            <input
              id="person-name"
              value={personName}
              onChange={(event) => setPersonName(event.target.value)}
              maxLength={80}
              required
              aria-describedby="person-name-help"
              placeholder="Full public name or known public role"
              className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
            />
            <p id="person-name-help" className="mt-2 text-xs font-semibold leading-5 text-[var(--slate)]">
              Use a public name only. The nominee is reviewed before appearing in the poll list.
            </p>

            <label className="mt-4 block text-sm font-bold" htmlFor="priority-area">
              What should this rep focus on?
            </label>
            <select
              id="priority-area"
              value={issue}
              onChange={(event) => setIssue(event.target.value)}
              className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[var(--civic)]"
            >
              {defaultIssues.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <label className="mt-4 block text-sm font-bold" htmlFor="reason">
              Why this person? <span className="text-[var(--amber-text)]">*</span>
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              maxLength={420}
              required
              aria-describedby="reason-help reason-count"
              rows={5}
              placeholder="Give one clear public reason. Keep it factual."
              className="mt-2 w-full resize-none border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
            />
            <div className="mt-1.5 flex items-center justify-between gap-4">
              <p id="reason-help" className="text-xs font-semibold leading-5 text-[var(--slate)]">
                Required. Keep it factual and safe for public review.
              </p>
              <p
                id="reason-count"
                className="shrink-0 text-xs font-semibold tabular-nums text-[var(--slate)]"
                aria-live="off"
              >
                {reasonMinReached && (
                  <span className="mr-2 text-[var(--civic)]">Minimum reached ·</span>
                )}
                {reasonLength} / 420
              </p>
            </div>

            <label className="mt-4 block text-sm font-bold" htmlFor="contact">
              Contact for eKYC follow-up
            </label>
            <input
              id="contact"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              maxLength={120}
              placeholder="Email or phone for verification follow-up"
              className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
            />

            <div className="mt-5 border border-[var(--line)] bg-white px-4 py-3">
              <p
                id="submit-readiness"
                className="text-xs font-semibold leading-5 text-[var(--slate)]"
                aria-live="polite"
              >
                {isReady
                  ? "Ready to submit nomination for eKYC and review."
                  : missingFields
                    ? `Still needed: ${missingFields}.`
                    : "Fill in the required fields to continue."}
              </p>
            </div>

            <button
              type="submit"
              disabled={!isReady || isSubmitting}
              aria-describedby="submit-readiness"
              className="mt-3 w-full bg-[var(--civic)] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-[rgba(38,58,79,0.35)]"
            >
              {isSubmitting ? "Saving nomination..." : "Submit nomination"}
            </button>

            {submitError && (
              <div className="mt-4 border border-[var(--amber)] bg-white p-4" aria-live="assertive">
                <p className="text-sm font-bold text-[var(--amber-text)]">{submitError}</p>
              </div>
            )}

            <div
              className={`mt-4 border border-[var(--line)] bg-[rgba(38,58,79,0.05)] p-4 ${saved ? "" : "sr-only"}`}
              aria-live="polite"
            >
              {saved && (
                <p className="text-sm font-bold text-[var(--civic-dark)]">
                  Nomination saved. Next step: eKYC verification before it can count.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

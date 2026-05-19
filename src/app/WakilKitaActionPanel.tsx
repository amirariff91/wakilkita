"use client";

import { FormEvent, useMemo, useState } from "react";

type IntakeType =
  | "Nominate a representative"
  | "Request to claim a representative profile"
  | "Submit a constituency issue priority";

const CONTACT_EMAIL = "miccy@arusdigital.com";
const STORAGE_KEY = "wakilkita_intake_v1";

const defaultIssues = [
  "Council follow-up",
  "Walkability and crossings",
  "Transit and access",
  "Local facilities",
  "Cost pressure",
  "Other local priority",
];

function cleanText(value: string, maxLength: number) {
  return value.replace(/[<>&"']/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function buildMailto(subject: string, body: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function formatMissingFields(fields: string[]): string {
  if (fields.length === 0) return "";
  if (fields.length === 1) return fields[0];
  if (fields.length === 2) return `${fields[0]} and ${fields[1]}`;
  return `${fields[0]}, ${fields[1]}, and ${fields[2]}`;
}

export function WakilKitaActionPanel() {
  const [constituency, setConstituency] = useState("P105 Petaling Jaya");
  const [intakeType, setIntakeType] = useState<IntakeType>("Nominate a representative");
  const [personName, setPersonName] = useState("");
  const [issue, setIssue] = useState(defaultIssues[0]);
  const [reason, setReason] = useState("");
  const [contact, setContact] = useState("");
  const [saved, setSaved] = useState(false);

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
      cleanText(personName, 80).length > 2 ? null : "a name or issue area",
      cleanText(reason, 420).length > 12 ? null : "a short reason",
    ].filter(Boolean) as string[];
    return formatMissingFields(fields);
  }, [constituency, personName, reason]);

  const reasonLength = cleanText(reason, 420).length;
  const reasonMinReached = reasonLength > 12;

  function submitIntake(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const safeConstituency = cleanText(constituency, 80);
    const safeName = cleanText(personName, 80);
    const safeReason = cleanText(reason, 420);
    const safeContact = cleanText(contact, 120);

    if (!safeConstituency || !safeName || !safeReason) return;

    const payload = {
      intakeType,
      constituency: safeConstituency,
      nameOrRole: safeName,
      priorityArea: issue,
      reason: safeReason,
      replyContact: safeContact || "Not provided",
      submittedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setSaved(true);

    const subject = `WakilKita: ${intakeType}`;
    const body = [
      "WakilKita constituency intake",
      "",
      `Request type: ${payload.intakeType}`,
      `Constituency: ${payload.constituency}`,
      `Nominee / profile / role: ${payload.nameOrRole}`,
      `Priority area: ${payload.priorityArea}`,
      "",
      "Why this matters:",
      payload.reason,
      "",
      `Reply contact: ${payload.replyContact}`,
      "",
      "Notes:",
      "- This is not a public authority process or binding civic decision.",
      "- Please do not include IC numbers, addresses, private allegations, or sensitive personal data.",
      "- WakilKita is independent and not SPR-affiliated.",
      "- A named person may be contacted before any public profile is considered and may request removal.",
    ].join("\n");

    window.location.href = buildMailto(subject, body);
  }

  return (
    <section id="take-part" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="border border-[var(--line)] bg-white p-5 text-[var(--ink)] shadow-[0_1px_3px_rgba(0,0,0,0.08)] sm:p-7 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="inline-flex bg-[var(--soft)] px-3 py-2 text-xs font-bold tracking-[0.08em] text-[var(--civic)]">
              Private intake · constituency-based
            </p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Send a P105 Petaling Jaya nomination or local issue for manual review.
            </h2>
            <p className="mt-4 text-base leading-7 text-[var(--slate)] sm:text-lg">
              Use this form to send a nomination, profile claim, or local issue for review. It opens an email draft and does not send anything to a WakilKita server. After you press submit, a copy may be saved in this browser.
            </p>
            <div className="mt-6 border-l-2 border-[var(--accent)] bg-[var(--soft)] p-4 text-sm font-medium leading-6 text-[var(--slate)]">
              Do not send IC numbers, home addresses, private allegations, or sensitive identity details. WakilKita is not collecting IC numbers, eKYC data, or supporter lists.
            </div>
          </div>

          <form
            onSubmit={submitIntake}
            className="border border-[var(--line)] bg-[var(--soft)] p-5 text-[var(--ink)] sm:p-6"
          >
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
              Petaling Jaya intake form
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
              Use the parliamentary code if you know it. If unsure, use the area name and we will review it manually.
            </p>

            <label className="mt-4 block text-sm font-bold" htmlFor="intake-type">
              What do you want to do?
            </label>
            <select
              id="intake-type"
              value={intakeType}
              onChange={(event) => setIntakeType(event.target.value as IntakeType)}
              className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[var(--civic)]"
            >
              <option>Nominate a representative</option>
              <option>Request to claim a representative profile</option>
              <option>Submit a constituency issue priority</option>
            </select>

            <label className="mt-4 block text-sm font-bold" htmlFor="person-name">
              Who or what are you submitting? <span className="text-[var(--amber-text)]">*</span>
            </label>
            <input
              id="person-name"
              value={personName}
              onChange={(event) => setPersonName(event.target.value)}
              maxLength={80}
              required
              aria-describedby="person-name-help"
              placeholder="Name, public role, or issue"
              className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
            />
            <p id="person-name-help" className="mt-2 text-xs font-semibold leading-5 text-[var(--slate)]">
              Use a public role or profile name. Do not enter IC, phone numbers, or addresses. Only request a profile claim for yourself or a team you are authorised to represent.
            </p>

            <label className="mt-4 block text-sm font-bold" htmlFor="priority-area">
              Which local priority does this relate to?
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
              Why should residents consider this? <span className="text-[var(--amber-text)]">*</span>
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              maxLength={420}
              required
              aria-describedby="reason-help reason-count"
              rows={5}
              placeholder="Give the public reason, affected area, and what a representative can do first."
              className="mt-2 w-full resize-none border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
            />
            <div className="mt-1.5 flex items-center justify-between gap-4">
              <p id="reason-help" className="text-xs font-semibold leading-5 text-[var(--slate)]">
                Required. Keep it factual and safe to review.
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
              Optional reply contact
            </label>
            <input
              id="contact"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              maxLength={120}
              placeholder="Email or public handle only"
              className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
            />

            <div className="mt-5 border border-[var(--line)] bg-white px-4 py-3">
              <p
                id="submit-readiness"
                className="text-xs font-semibold leading-5 text-[var(--slate)]"
                aria-live="polite"
              >
                {isReady
                  ? "Ready to open your email draft. You can review it before sending."
                  : missingFields
                    ? `Still needed: ${missingFields}.`
                    : "Fill in the required fields to continue."}
              </p>
            </div>

            <button
              type="submit"
              disabled={!isReady}
              aria-describedby="submit-readiness"
              className="mt-3 w-full bg-[var(--civic)] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-[rgba(38,58,79,0.35)]"
            >
              Prepare email submission
            </button>

            <div
              className={`mt-4 border border-[var(--line)] bg-[rgba(38,58,79,0.05)] p-4 ${saved ? "" : "sr-only"}`}
              aria-live="polite"
            >
              {saved && (
                <>
                  <p className="text-sm font-bold text-[var(--civic-dark)]">Email draft prepared</p>
                  <ul className="mt-2 space-y-1.5 text-sm leading-6 text-[var(--slate)]">
                    <li>A draft copy was saved in this browser.</li>
                    <li>On a shared device, clear browser storage after sending.</li>
                    <li>
                      If your email app did not open, email{" "}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="font-bold text-[var(--civic-dark)] underline"
                      >
                        {CONTACT_EMAIL}
                      </a>{" "}
                      with the same details.
                    </li>
                  </ul>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

"use client";

import { FormEvent, useMemo, useState } from "react";

type IntakeType = "Nominate a representative" | "Request to claim a representative profile" | "Submit a constituency issue priority";

const CONTACT_EMAIL = "miccy@arusdigital.com";
const STORAGE_KEY = "wakilkita_intake_v1";

const defaultIssues = [
  "High-density urban services",
  "Public transport and walkability",
  "Clinic, grocery, ATM and public facility access",
  "Youth, family and working-age needs",
  "Council response and maintenance",
  "Other local priority",
];

function cleanText(value: string, maxLength: number) {
  return value.replace(/[<>&"']/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function buildMailto(subject: string, body: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function WakilKitaActionPanel() {
  const [constituency, setConstituency] = useState("P100 Pandan");
  const [intakeType, setIntakeType] = useState<IntakeType>("Nominate a representative");
  const [personName, setPersonName] = useState("");
  const [issue, setIssue] = useState(defaultIssues[0]);
  const [reason, setReason] = useState("");
  const [contact, setContact] = useState("");
  const [saved, setSaved] = useState(false);

  const isReady = useMemo(() => {
    return cleanText(constituency, 80).length > 2 && cleanText(personName, 80).length > 2 && cleanText(reason, 420).length > 12;
  }, [constituency, personName, reason]);

  const missingFields = [
    cleanText(constituency, 80).length > 2 ? null : "your constituency",
    cleanText(personName, 80).length > 2 ? null : "a representative/profile name or issue area",
    cleanText(reason, 420).length > 12 ? null : "a short public reason",
  ].filter(Boolean).join(" and ");

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
      <div className="rounded-[2.4rem] border border-[var(--line)] bg-[rgba(7,22,19,0.96)] p-5 text-white shadow-[0_30px_100px_rgba(7,22,19,0.22)] sm:p-7 lg:p-9">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <p className="inline-flex rounded-full bg-[var(--mint)] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--civic-dark)]">
              Private intake · constituency-based
            </p>
            <h2 className="mt-5 font-serif text-4xl font-black tracking-[-0.06em] sm:text-5xl">
              Nominate a representative, request a profile claim review, or submit a priority for your constituency.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/72 sm:text-lg">
              This is the first usable flow: residents and community teams can send structured input without creating premature public profiles or aggregate summaries. Submissions open as an email draft; this page does not send anything to a WakilKita server. After you press submit, a copy may be saved in this browser.
            </p>
            <div className="mt-6 rounded-3xl border border-[rgba(255,250,241,0.2)] bg-[rgba(255,250,241,0.08)] p-4 text-sm font-bold leading-6 text-white/72">
              Do not send IC numbers, home addresses, private allegations, or sensitive identity details. Verification and eligibility checks must be handled only after published privacy and dispute policies exist.
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["Nominate", "Claim", "Prioritise"].map((item) => (
                <div key={item} className="rounded-3xl bg-white/8 p-4 ring-1 ring-white/10">
                  <p className="text-lg font-black tracking-[-0.04em] text-[var(--mint)]">{item}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-white/58">
                    {item === "Nominate" ? "Suggest a local profile" : item === "Claim" ? "Request ownership review" : "Submit an issue signal"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={submitIntake} className="rounded-[2rem] bg-[var(--paper)] p-5 text-[var(--ink)] sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--civic)]">Constituency intake form</p>

            <label className="mt-5 block text-sm font-black" htmlFor="constituency">
              Your constituency <span className="text-[var(--amber-text)]">*</span>
            </label>
            <input
              id="constituency"
              value={constituency}
              onChange={(event) => setConstituency(event.target.value)}
              maxLength={80}
              required
              aria-describedby="constituency-help"
              placeholder="e.g. P100 Pandan, P105 Petaling Jaya, P122 Seputeh"
              className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
            />
            <p id="constituency-help" className="mt-2 text-xs font-semibold leading-5 text-[var(--slate)]">Use the parliamentary code if you know it. If unsure, use the area name and we will review it manually.</p>

            <label className="mt-4 block text-sm font-black" htmlFor="intake-type">
              What do you want to do?
            </label>
            <select
              id="intake-type"
              value={intakeType}
              onChange={(event) => setIntakeType(event.target.value as IntakeType)}
              className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[var(--civic)]"
            >
              <option>Nominate a representative</option>
              <option>Request to claim a representative profile</option>
              <option>Submit a constituency issue priority</option>
            </select>

            <label className="mt-4 block text-sm font-black" htmlFor="person-name">
              Representative/profile name or issue area <span className="text-[var(--amber-text)]">*</span>
            </label>
            <input
              id="person-name"
              value={personName}
              onChange={(event) => setPersonName(event.target.value)}
              maxLength={80}
              required
              aria-describedby="person-name-help"
              placeholder="e.g. Community organiser for local flood response"
              className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
            />
            <p id="person-name-help" className="mt-2 text-xs font-semibold leading-5 text-[var(--slate)]">Required. Use a public role or profile name. Avoid IC, phone numbers, and addresses. Only request a profile claim for yourself or a team you are authorised to represent; claims are not approved automatically.</p>

            <label className="mt-4 block text-sm font-black" htmlFor="priority-area">
              Which local priority does this relate to?
            </label>
            <select
              id="priority-area"
              value={issue}
              onChange={(event) => setIssue(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[var(--civic)]"
            >
              {defaultIssues.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <label className="mt-4 block text-sm font-black" htmlFor="reason">
              Why should residents consider this? <span className="text-[var(--amber-text)]">*</span>
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              maxLength={420}
              required
              aria-describedby="reason-help"
              rows={5}
              placeholder="Give the public reason, affected area, and what a representative should do first."
              className="mt-2 w-full resize-none rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
            />
            <p id="reason-help" className="mt-2 text-xs font-semibold leading-5 text-[var(--slate)]">Required. Minimum 13 characters. Keep it factual and safe for public review.</p>

            <label className="mt-4 block text-sm font-black" htmlFor="contact">
              Optional reply contact
            </label>
            <input
              id="contact"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              maxLength={120}
              placeholder="Email or public handle only"
              className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
            />

            <button
              type="submit"
              disabled={!isReady}
              aria-describedby="submit-readiness"
              className="mt-5 w-full rounded-full bg-[var(--civic)] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white disabled:cursor-not-allowed disabled:bg-[rgba(15,107,77,0.42)]"
            >
              Prepare private intake email
            </button>

            <p id="submit-readiness" className="mt-2 text-xs font-semibold leading-5 text-[var(--slate)]" aria-live="polite">
              {isReady ? "Ready to prepare your email draft." : `Add ${missingFields} to prepare the email draft.`}
            </p>

            {saved && (
              <p className="mt-3 rounded-2xl bg-[rgba(15,107,77,0.08)] px-4 py-3 text-sm font-bold leading-6 text-[var(--civic-dark)]" aria-live="polite">
                Draft saved in this browser and email composer opened. If you are on a shared device, clear this draft/browser storage after sending. If your email app did not open, email {CONTACT_EMAIL} with the same details.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

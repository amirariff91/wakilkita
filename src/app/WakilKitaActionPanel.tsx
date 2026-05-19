"use client";

import { FormEvent, useMemo, useState } from "react";

type IntakeType = "Nominate a representative" | "Claim a representative profile" | "Submit a Pandan issue priority";

const CONTACT_EMAIL = "miccy@arusdigital.com";
const STORAGE_KEY = "wakilkita_pandan_intake_v1";

const pandanIssues = [
  "High-density urban services",
  "Public transport and walkability",
  "Clinic, grocery, ATM and public facility access",
  "Youth, family and working-age needs",
  "Council response and maintenance",
  "Other Pandan priority",
];

function cleanText(value: string, maxLength: number) {
  return value.replace(/[<>&"']/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function buildMailto(subject: string, body: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function WakilKitaActionPanel() {
  const [intakeType, setIntakeType] = useState<IntakeType>("Nominate a representative");
  const [personName, setPersonName] = useState("");
  const [issue, setIssue] = useState(pandanIssues[0]);
  const [reason, setReason] = useState("");
  const [contact, setContact] = useState("");
  const [saved, setSaved] = useState(false);

  const isReady = useMemo(() => {
    return cleanText(personName, 80).length > 2 && cleanText(reason, 420).length > 12;
  }, [personName, reason]);

  function submitIntake(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const safeName = cleanText(personName, 80);
    const safeReason = cleanText(reason, 420);
    const safeContact = cleanText(contact, 120);

    if (!safeName || !safeReason) return;

    const payload = {
      intakeType,
      constituency: "P100 Pandan, Selangor",
      nameOrRole: safeName,
      priorityArea: issue,
      reason: safeReason,
      replyContact: safeContact || "Not provided",
      submittedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setSaved(true);

    const subject = `WakilKita Pandan: ${intakeType}`;
    const body = [
      "WakilKita Pandan intake",
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
      "- This is not an official vote or election process.",
      "- Please do not include IC numbers, addresses, private allegations, or sensitive personal data.",
      "- WakilKita is independent and not SPR-affiliated.",
    ].join("\n");

    window.location.href = buildMailto(subject, body);
  }

  return (
    <section id="take-part" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="rounded-[2.4rem] border border-[var(--line)] bg-[rgba(7,22,19,0.96)] p-5 text-white shadow-[0_30px_100px_rgba(7,22,19,0.22)] sm:p-7 lg:p-9">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <p className="inline-flex rounded-full bg-[var(--mint)] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--civic-dark)]">
              Pandan intake · private by default
            </p>
            <h2 className="mt-5 font-serif text-4xl font-black tracking-[-0.06em] sm:text-5xl">
              Nominate, claim, or submit a priority for P100 Pandan.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/72 sm:text-lg">
              This is the first usable flow: residents and community teams can send structured input without creating premature public results. Submissions open as an email draft so nothing is silently collected in the background.
            </p>
            <div className="mt-6 rounded-3xl border border-[rgba(255,250,241,0.2)] bg-[rgba(255,250,241,0.08)] p-4 text-sm font-bold leading-6 text-white/72">
              Do not send IC numbers, home addresses, private allegations, or sensitive identity details. Verification and eligibility checks must be handled only after published privacy and dispute policies exist.
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["Nominate", "Claim", "Prioritise"].map((item) => (
                <div key={item} className="rounded-3xl bg-white/8 p-4 ring-1 ring-white/10">
                  <p className="text-lg font-black tracking-[-0.04em] text-[var(--mint)]">{item}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-white/58">
                    {item === "Nominate" ? "Suggest a local profile" : item === "Claim" ? "Start profile ownership" : "Submit an issue signal"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={submitIntake} className="rounded-[2rem] bg-[var(--paper)] p-5 text-[var(--ink)] sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--civic)]">P100 Pandan intake form</p>

            <label className="mt-5 block text-sm font-black" htmlFor="intake-type">
              What do you want to do?
            </label>
            <select
              id="intake-type"
              value={intakeType}
              onChange={(event) => setIntakeType(event.target.value as IntakeType)}
              className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[var(--civic)]"
            >
              <option>Nominate a representative</option>
              <option>Claim a representative profile</option>
              <option>Submit a Pandan issue priority</option>
            </select>

            <label className="mt-4 block text-sm font-black" htmlFor="person-name">
              Nominee, profile, or role name
            </label>
            <input
              id="person-name"
              value={personName}
              onChange={(event) => setPersonName(event.target.value)}
              maxLength={80}
              placeholder="e.g. Community organiser for Pandan Indah"
              className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
            />
            <p className="mt-2 text-xs font-semibold leading-5 text-[var(--slate)]">Use a public role or profile name. Avoid IC, phone numbers, and addresses.</p>

            <label className="mt-4 block text-sm font-black" htmlFor="priority-area">
              Priority area
            </label>
            <select
              id="priority-area"
              value={issue}
              onChange={(event) => setIssue(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[var(--civic)]"
            >
              {pandanIssues.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <label className="mt-4 block text-sm font-black" htmlFor="reason">
              Why should this be prioritised?
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              maxLength={420}
              rows={5}
              placeholder="Give the public reason, affected area, and what a representative should do first."
              className="mt-2 w-full resize-none rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
            />

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
              className="mt-5 w-full rounded-full bg-[var(--civic)] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white disabled:cursor-not-allowed disabled:bg-[rgba(15,107,77,0.42)]"
            >
              Prepare secure email intake
            </button>

            {saved && (
              <p className="mt-3 rounded-2xl bg-[rgba(15,107,77,0.08)] px-4 py-3 text-sm font-bold leading-6 text-[var(--civic-dark)]" aria-live="polite">
                Draft saved locally and email composer opened. If your email app did not open, email {CONTACT_EMAIL} with the same details.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

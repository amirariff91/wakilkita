"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { appendEntry, cleanQueueText, type IntakeType } from "@/lib/queue";

const defaultIssues = [
  "Council follow-up",
  "Walkability and crossings",
  "Transit and access",
  "Local facilities",
  "Cost pressure",
  "Other local priority",
];

function cleanText(value: string, maxLength: number) {
  return cleanQueueText(value, maxLength);
}

function formatMissingFields(fields: string[]): string {
  if (fields.length === 0) return "";
  if (fields.length === 1) return fields[0];
  if (fields.length === 2) return `${fields[0]} and ${fields[1]}`;
  return `${fields[0]}, ${fields[1]}, and ${fields[2]}`;
}

export function WakilKitaActionPanel() {
  const router = useRouter();
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
      cleanText(constituency, 80).length > 2 ? null : "your parliamentary constituency",
      cleanText(personName, 80).length > 2 ? null : "a nominee name",
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

    appendEntry({
      intakeType,
      constituency: safeConstituency,
      nameOrRole: safeName,
      priorityArea: issue,
      reason: safeReason,
      replyContact: safeContact,
    });

    setSaved(true);
    router.push("/dashboard");
  }

  return (
    <section id="take-part" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="border border-[var(--line)] bg-white p-5 text-[var(--ink)] shadow-[0_1px_3px_rgba(0,0,0,0.08)] sm:p-7 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="inline-flex bg-[var(--soft)] px-3 py-2 text-xs font-bold tracking-[0.08em] text-[var(--civic)]">
              Nomination intake · review queue
            </p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Nominate or endorse a P105 local representative.
            </h2>
            <p className="mt-4 text-base leading-7 text-[var(--slate)] sm:text-lg">
              Your submission enters the review queue first. Nothing becomes public until it passes basic checks for privacy, consent, and safety.
            </p>
            <div className="mt-6 border border-[var(--line)] bg-[var(--soft)] p-4 text-sm font-medium leading-6 text-[var(--slate)]">
              Do not enter IC numbers, home addresses, private allegations, or sensitive identity details. This form is for public reasons only.
            </div>
          </div>

          <form
            onSubmit={submitIntake}
            className="border border-[var(--line)] bg-[var(--soft)] p-5 text-[var(--ink)] sm:p-6"
          >
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
              P105 nomination form
            </p>

            <label className="mt-5 block text-sm font-bold" htmlFor="constituency">
              Parliamentary constituency <span className="text-[var(--amber-text)]">*</span>
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
              P105 Petaling Jaya is the active first constituency.
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
              <option>Endorse a representative</option>
              <option>Submit a constituency issue priority</option>
              <option>Request to claim a representative profile</option>
            </select>

            <label className="mt-4 block text-sm font-bold" htmlFor="person-name">
              Who are you nominating or endorsing? <span className="text-[var(--amber-text)]">*</span>
            </label>
            <input
              id="person-name"
              value={personName}
              onChange={(event) => setPersonName(event.target.value)}
              maxLength={80}
              required
              aria-describedby="person-name-help"
              placeholder="Name or public role"
              className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
            />
            <p id="person-name-help" className="mt-2 text-xs font-semibold leading-5 text-[var(--slate)]">
              Use a public name or role. A nominated person still needs consent or claim review before any public profile appears.
            </p>

            <label className="mt-4 block text-sm font-bold" htmlFor="priority-area">
              Which local priority is most relevant?
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
              Why should P105 residents consider this person? <span className="text-[var(--amber-text)]">*</span>
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              maxLength={420}
              required
              aria-describedby="reason-help reason-count"
              rows={5}
              placeholder="Share what they have done, where they are active, or why residents trust them."
              className="mt-2 w-full resize-none border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
            />
            <div className="mt-1.5 flex items-center justify-between gap-4">
              <p id="reason-help" className="text-xs font-semibold leading-5 text-[var(--slate)]">
                Keep it factual, public, and safe to review.
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
                  ? "Ready to send for review."
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
              Send for review
            </button>

            <div
              className={`mt-4 border border-[var(--line)] bg-[rgba(38,58,79,0.05)] p-4 ${saved ? "" : "sr-only"}`}
              aria-live="polite"
            >
              {saved && (
                <p className="text-sm font-bold text-[var(--civic-dark)]">
                  Submission saved. Opening the review queue now.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

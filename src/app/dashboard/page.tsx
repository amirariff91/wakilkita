"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { readQueue, type IntakeEntry, type ReviewStatus } from "@/lib/queue";

const statusLabels: Record<ReviewStatus, string> = {
  submitted: "Received",
  "needs-review": "Needs review",
  "duplicate-check": "Check duplicate",
  "consent-needed": "Needs consent",
  approved: "Approved",
  declined: "Declined",
};

const statusClasses: Record<ReviewStatus, string> = {
  submitted: "bg-[var(--civic)] text-white",
  "needs-review": "bg-[var(--amber)] text-white",
  "duplicate-check": "bg-[var(--soft)] text-[var(--ink)] border border-[var(--line)]",
  "consent-needed": "bg-[var(--ink)] text-[var(--mint)]",
  approved: "bg-[var(--success)] text-white",
  declined: "bg-[var(--slate)] text-white",
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";
  return new Intl.DateTimeFormat("en-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function IntakeEntryCard({ entry }: { entry: IntakeEntry }) {
  return (
    <article className="border border-[var(--line)] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
            {entry.constituency} · {entry.priorityArea}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[var(--ink)]">
            {entry.nameOrRole}
          </h2>
          <p className="mt-1 text-sm font-semibold text-[var(--slate)]">{entry.intakeType}</p>
        </div>
        <span className={`w-fit px-3 py-1.5 text-xs font-bold ${statusClasses[entry.status]}`}>
          {statusLabels[entry.status]}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-[var(--slate)]">{entry.reason}</p>

      <div className="mt-5 grid gap-3 border-t border-[var(--line)] pt-4 text-xs font-semibold text-[var(--slate)] sm:grid-cols-3">
        <p>
          <span className="block font-bold text-[var(--ink)]">Received</span>
          {formatDate(entry.submittedAt)}
        </p>
        <p>
          <span className="block font-bold text-[var(--ink)]">Reply contact</span>
          {entry.replyContact ? "Stored privately" : "Not provided"}
        </p>
        <p>
          <span className="block font-bold text-[var(--ink)]">Safety flags</span>
          {entry.riskFlags.length ? entry.riskFlags.join(", ") : "None detected"}
        </p>
      </div>
    </article>
  );
}

function subscribeToQueue(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

let queueCacheKey = "";
let queueCache: IntakeEntry[] = [];

function getQueueSnapshot() {
  const next = readQueue();
  const nextKey = JSON.stringify(next);
  if (nextKey !== queueCacheKey) {
    queueCacheKey = nextKey;
    queueCache = next;
  }
  return queueCache;
}

function getServerQueueSnapshot() {
  return [] as IntakeEntry[];
}

export default function DashboardPage() {
  const entries = useSyncExternalStore(subscribeToQueue, getQueueSnapshot, getServerQueueSnapshot);

  const totals = useMemo(() => {
    return {
      all: entries.length,
      nominations: entries.filter((entry) => entry.intakeType.includes("Nominate")).length,
      endorsements: entries.filter((entry) => entry.intakeType.includes("Endorse")).length,
      issues: entries.filter((entry) => entry.intakeType.includes("issue")).length,
    };
  }, [entries]);

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-6 text-[var(--ink)] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between border-b border-[var(--line)] bg-white px-4 py-3">
          <Link href="/" className="text-base font-bold tracking-[-0.03em] text-[var(--ink)]">
            WakilKita
          </Link>
          <div className="flex items-center gap-4 text-sm font-bold text-[var(--slate)]">
            <Link href="/#take-part">Nominate</Link>
            <Link href="/dashboard" className="text-[var(--civic)]">
              Review queue
            </Link>
          </div>
        </nav>

        <section className="grid gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:py-14">
          <div>
            <p className="inline-flex border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
              P105 Petaling Jaya · review queue
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl">
              New submissions enter review here first.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--slate)]">
              This queue shows what was submitted, what needs checking, and what must stay private before anything becomes public.
            </p>
            <div className="mt-6 border border-[var(--line)] bg-[var(--soft)] p-4 text-sm font-medium leading-6 text-[var(--slate)]">
              Reply contact details are not shown in the list. IC/eKYC is not collected here. Public tallies stay closed until verification, audit logs, and reviewer permissions are ready.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Total", totals.all],
              ["Nominations", totals.nominations],
              ["Endorsements", totals.endorsements],
              ["Issues", totals.issues],
            ].map(([label, value]) => (
              <div key={label} className="border border-[var(--line)] bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--slate)]">{label}</p>
                <p className="mt-3 text-4xl font-bold tracking-[-0.05em] text-[var(--ink)]">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-16" aria-labelledby="queue-heading">
          <div className="mb-4 flex flex-col gap-3 border-y border-[var(--line)] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Review queue</p>
              <h2 id="queue-heading" className="mt-1 text-xl font-bold tracking-[-0.03em]">
                Submissions waiting for review
              </h2>
            </div>
            <Link
              href="/#take-part"
              className="bg-[var(--civic)] px-4 py-3 text-center text-sm font-bold text-white"
            >
              Add another nomination
            </Link>
          </div>

          {entries.length === 0 && (
            <div className="border border-[var(--line)] bg-white p-8 text-center">
              <p className="text-2xl font-bold tracking-[-0.04em] text-[var(--ink)]">No submissions yet.</p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--slate)]">
                Submit a nomination, endorsement, or local issue from the homepage. It will appear here for review.
              </p>
              <Link
                href="/#take-part"
                className="mt-6 inline-flex bg-[var(--ink)] px-5 py-3 text-sm font-bold text-[var(--mint)]"
              >
                Start nomination
              </Link>
            </div>
          )}

          <div className="space-y-4">
            {entries.map((entry) => (
              <IntakeEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

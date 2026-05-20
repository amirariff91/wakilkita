"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { type PublicReviewRecord, type ReviewStatus } from "@/lib/review";

const statusLabels: Record<ReviewStatus, string> = {
  submitted: "Submitted",
  "needs-review": "Needs review",
  "duplicate-check": "Duplicate check",
  "consent-needed": "Consent needed",
  approved: "Approved privately",
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

type SubmissionsResponse = {
  entries?: PublicReviewRecord[];
  message?: string;
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";
  return new Intl.DateTimeFormat("en-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function DashboardEntryCard({ entry }: { entry: PublicReviewRecord }) {
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
          <span className="block font-bold text-[var(--ink)]">Contact</span>
          {entry.hasReplyContact ? "Stored privately" : "Not provided"}
        </p>
        <p>
          <span className="block font-bold text-[var(--ink)]">Risk flags</span>
          {entry.riskFlags.length ? entry.riskFlags.join(", ") : "None detected"}
        </p>
      </div>
    </article>
  );
}

export default function DashboardPage() {
  const [entries, setEntries] = useState<PublicReviewRecord[]>([]);
  const [reviewToken, setReviewToken] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.sessionStorage.getItem("wakilkita_review_token") ?? "";
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  const privateSummary = useMemo(() => {
    return `${entries.length} private item${entries.length === 1 ? "" : "s"} loaded for this reviewer session.`;
  }, [entries.length]);

  async function loadEntries(token: string) {
    setIsLoading(true);
    setLoadError("");

    try {
      const response = await fetch("/api/submissions", {
        cache: "no-store",
        headers: { "x-wakilkita-review-token": token },
      });
      const result = (await response.json().catch(() => null)) as SubmissionsResponse | null;
      if (!response.ok || !Array.isArray(result?.entries)) {
        throw new Error(result?.message ?? "Unable to load review queue.");
      }
      setEntries(result.entries);
      setIsUnlocked(true);
      window.sessionStorage.setItem("wakilkita_review_token", token);
    } catch (error) {
      setEntries([]);
      setIsUnlocked(false);
      setLoadError(error instanceof Error ? error.message : "The private review queue could not be loaded.");
    } finally {
      setIsLoading(false);
    }
  }

  function unlockDashboard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = reviewToken.trim();
    if (!token) {
      setLoadError("Enter the private review token to open the reviewer queue.");
      return;
    }
    void loadEntries(token);
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-[var(--background)] px-5 py-6 text-[var(--ink)] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between border-b border-[var(--line)] bg-white px-4 py-3">
          <Link href="/" className="text-base font-bold tracking-[-0.03em] text-[var(--ink)]">
            WakilKita
          </Link>
          <div className="flex items-center gap-4 text-sm font-bold text-[var(--slate)]">
            <Link href="/#take-part">Hantar cadangan</Link>
            <Link href="/ketelusan">Ketelusan</Link>
          </div>
        </nav>

        <section className="grid gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:py-14">
          <div>
            <p className="inline-flex border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
              P105 Petaling Jaya · private review desk
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl">
              Reviewer access is locked by default.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--slate)]">
              The intake queue contains named people, resident explanations, risk flags, and review state. It is not a public dashboard and it should not be indexed, copied, or shared.
            </p>
            <div className="mt-6 border border-[var(--line)] bg-[var(--soft)] p-4 text-sm font-medium leading-6 text-[var(--slate)]">
              Butiran hubungan disembunyikan dalam senarai ini. Pengesahan yang lebih kuat perlu berada dalam sistem berasingan sebelum sebarang maklum balas komuniti digunakan; rekod IC dan identiti mesti kekal berasingan.
            </div>
          </div>

          <form onSubmit={unlockDashboard} className="h-fit border border-[var(--line)] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Reviewer token</p>
            <label className="mt-4 block text-sm font-bold" htmlFor="review-token">
              Private review token
            </label>
            <input
              id="review-token"
              type="password"
              value={reviewToken}
              onChange={(event) => setReviewToken(event.target.value)}
              className="mt-2 w-full border border-[var(--line)] bg-[var(--soft)] px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full bg-[var(--ink)] px-5 py-3 text-sm font-bold text-[var(--mint)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Checking access..." : "Open private queue"}
            </button>
            {isUnlocked && <p className="mt-3 text-sm font-semibold text-[var(--success)]">{privateSummary}</p>}
            {loadError && <p className="mt-3 text-sm font-semibold text-[var(--amber-text)]">{loadError}</p>}
          </form>
        </section>

        <section className="pb-16" aria-labelledby="queue-heading">
          <div className="mb-4 flex flex-col gap-3 border-y border-[var(--line)] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Private reviewer queue</p>
              <h2 id="queue-heading" className="mt-1 text-xl font-bold tracking-[-0.03em]">
                Submissions awaiting review
              </h2>
            </div>
            <Link href="/#take-part" className="bg-[var(--civic)] px-4 py-3 text-center text-sm font-bold text-white">
              Add another submission
            </Link>
          </div>

          {!isUnlocked && !isLoading && (
            <div className="border border-[var(--line)] bg-white p-8 text-center">
              <p className="text-2xl font-bold tracking-[-0.04em] text-[var(--ink)]">Queue hidden.</p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--slate)]">
                Enter the review token above to load private submissions. Without a configured token, the backend fails closed.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="border border-[var(--line)] bg-white p-8 text-center">
              <p className="text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">Loading private review queue...</p>
            </div>
          )}

          {isUnlocked && entries.length === 0 && !isLoading && (
            <div className="border border-[var(--line)] bg-white p-8 text-center">
              <p className="text-2xl font-bold tracking-[-0.04em] text-[var(--ink)]">No submissions loaded.</p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--slate)]">
                New submissions will appear after the private backend store receives them.
              </p>
            </div>
          )}

          {isUnlocked && (
            <div className="space-y-4">
              {entries.map((entry) => (
                <DashboardEntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </section>
      </div>
      </main>
    </>
  );
}

"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type CandidateDashboardEntry } from "@/lib/review";

type CandidateResponse = {
  ok?: boolean;
  entries?: CandidateDashboardEntry[];
  updatedAt?: string;
  message?: string;
};

const stageClasses: Record<CandidateDashboardEntry["stage"], string> = {
  "Cadangan diterima": "border-[var(--line)] bg-white text-[var(--ink)]",
  "Dalam semakan": "border-[var(--amber)] bg-[rgba(212,139,44,0.12)] text-[var(--amber-text)]",
  "Diluluskan untuk polling": "border-[var(--success)] bg-[rgba(47,125,83,0.12)] text-[var(--success)]",
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Baru diterima";
  return new Intl.DateTimeFormat("ms-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function CandidateCard({ entry, index }: { entry: CandidateDashboardEntry; index: number }) {
  return (
    <article className="border border-[var(--line)] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
            Cadangan #{index + 1} · {entry.constituency}
          </p>
          <h2 className="mt-2 text-2xl font-bold leading-tight tracking-[-0.04em] text-[var(--ink)] sm:text-3xl">
            {entry.nameOrRole}
          </h2>
          <p className="mt-2 text-sm font-semibold text-[var(--slate)]">{entry.priorityArea}</p>
        </div>
        <span className={`w-fit border px-3 py-1.5 text-xs font-bold ${stageClasses[entry.stage]}`}>
          {entry.stage}
        </span>
      </div>

      <p className="mt-5 text-sm leading-6 text-[var(--slate)] sm:text-base sm:leading-7">{entry.reason}</p>

      <div className="mt-5 border-t border-[var(--line)] pt-4 text-xs font-semibold text-[var(--slate)]">
        Diterima: <span className="font-bold text-[var(--ink)]">{formatDate(entry.submittedAt)}</span>
      </div>
    </article>
  );
}

export default function DashboardPage() {
  const [entries, setEntries] = useState<CandidateDashboardEntry[]>([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const loadCandidates = useCallback(async () => {
    try {
      const response = await fetch("/api/candidates", { cache: "no-store" });
      const result = (await response.json().catch(() => null)) as CandidateResponse | null;

      if (!response.ok || !Array.isArray(result?.entries)) {
        throw new Error(result?.message ?? "Senarai calon belum dapat dimuatkan.");
      }

      setEntries(result.entries);
      setUpdatedAt(result.updatedAt ?? new Date().toISOString());
      setLoadError("");
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Senarai calon belum dapat dimuatkan.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const firstLoad = window.setTimeout(() => {
      void loadCandidates();
    }, 0);
    const timer = window.setInterval(() => {
      void loadCandidates();
    }, 5000);

    return () => {
      window.clearTimeout(firstLoad);
      window.clearInterval(timer);
    };
  }, [loadCandidates]);

  const summary = useMemo(() => {
    const approved = entries.filter((entry) => entry.stage === "Diluluskan untuk polling").length;
    const reviewing = entries.filter((entry) => entry.stage === "Dalam semakan").length;
    return { total: entries.length, approved, reviewing };
  }, [entries]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Langkau ke kandungan utama
      </a>
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-[var(--background)] px-5 py-6 text-[var(--ink)] sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center justify-between border-b border-[var(--line)] bg-white px-4 py-3">
            <Link href="/" className="text-base font-bold tracking-[-0.03em] text-[var(--ink)]">
              WakilKita
            </Link>
            <div className="flex items-center gap-4 text-sm font-bold text-[var(--slate)]">
              <Link href="/#take-part">Cadangkan nama</Link>
              <Link href="/ketelusan">Ketelusan</Link>
            </div>
          </nav>

          <section className="grid gap-8 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:py-14">
            <div>
              <p className="inline-flex border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
                Dashboard calon · P105 Petaling Jaya
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
                Nama yang dicadangkan, dikemas kini secara langsung.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--slate)]">
                Setiap cadangan baharu akan masuk ke sini selepas dihantar. Senarai ini membantu komuniti melihat siapa yang sedang dicadangkan sebelum proses semakan dan polling dibuka.
              </p>
              <div className="mt-6 border border-[var(--line)] bg-[var(--soft)] p-4 text-sm font-medium leading-6 text-[var(--slate)]">
                Paparan ini tidak menunjukkan nombor IC, rekod eKYC, butiran hubungan, atau senarai pengundi. Nama yang masuk ke polling masih perlu melalui semakan.
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:mt-8">
              <div className="border border-[var(--line)] bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Jumlah cadangan</p>
                <p className="mt-3 text-4xl font-bold tracking-[-0.05em]">{summary.total}</p>
              </div>
              <div className="border border-[var(--line)] bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Dalam semakan</p>
                <p className="mt-3 text-4xl font-bold tracking-[-0.05em]">{summary.reviewing}</p>
              </div>
              <div className="border border-[var(--line)] bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Untuk polling</p>
                <p className="mt-3 text-4xl font-bold tracking-[-0.05em]">{summary.approved}</p>
              </div>
              <div className="border border-[var(--line)] bg-white p-4 sm:col-span-3">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Live update</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[var(--slate)]">
                  Auto-refresh setiap 5 saat{updatedAt ? ` · terakhir dikemas kini ${formatDate(updatedAt)}` : ""}
                </p>
              </div>
            </div>
          </section>

          <section className="pb-16" aria-labelledby="candidate-list-heading">
            <div className="mb-4 flex flex-col gap-3 border-y border-[var(--line)] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Senarai calon dicadangkan</p>
                <h2 id="candidate-list-heading" className="mt-1 text-xl font-bold tracking-[-0.03em]">
                  Cadangan terkini komuniti
                </h2>
              </div>
              <Link href="/#take-part" className="bg-[var(--civic)] px-4 py-3 text-center text-sm font-bold text-white">
                Cadangkan nama
              </Link>
            </div>

            {isLoading && (
              <div className="border border-[var(--line)] bg-white p-8 text-center">
                <p className="text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">Memuatkan dashboard calon...</p>
              </div>
            )}

            {loadError && !isLoading && (
              <div className="border border-[var(--amber)] bg-white p-8 text-center">
                <p className="text-xl font-bold tracking-[-0.03em] text-[var(--amber-text)]">{loadError}</p>
                <button type="button" onClick={() => void loadCandidates()} className="mt-4 border border-[var(--line)] px-4 py-3 text-sm font-bold">
                  Cuba lagi
                </button>
              </div>
            )}

            {!isLoading && !loadError && entries.length === 0 && (
              <div className="border border-[var(--line)] bg-white p-8 text-center">
                <p className="text-2xl font-bold tracking-[-0.04em] text-[var(--ink)]">Belum ada nama dicadangkan.</p>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--slate)]">
                  Bila pengguna hantar cadangan, nama akan muncul di dashboard ini secara automatik.
                </p>
              </div>
            )}

            {!isLoading && !loadError && entries.length > 0 && (
              <div className="space-y-4">
                {entries.map((entry, index) => (
                  <CandidateCard key={entry.id} entry={entry} index={index} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

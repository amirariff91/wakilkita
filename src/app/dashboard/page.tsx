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

const statusWarna: Record<CandidateDashboardEntry["stage"], string> = {
  "Cadangan diterima": "border-[var(--line)] bg-white text-[var(--ink)]",
  "Dalam semakan": "border-[var(--amber)] bg-[rgba(212,139,44,0.12)] text-[var(--amber-text)]",
  "Diluluskan untuk pengundian": "border-[var(--success)] bg-[rgba(47,125,83,0.12)] text-[var(--success)]",
};

function formatTarikh(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Baru diterima";
  return new Intl.DateTimeFormat("ms-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function KadCadon({ entry, index }: { entry: CandidateDashboardEntry; index: number }) {
  return (
    <article className="border border-[var(--line)] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
            Cadangan {index + 1} · {entry.constituency}
          </p>
          <h2 className="mt-2 text-2xl font-bold leading-tight tracking-[-0.04em] text-[var(--ink)] sm:text-3xl">
            {entry.nameOrRole}
          </h2>
          <p className="mt-2 text-sm font-semibold text-[var(--slate)]">{entry.priorityArea}</p>
        </div>
        <span className={`w-fit border px-3 py-1.5 text-xs font-bold ${statusWarna[entry.stage]}`}>
          {entry.stage}
        </span>
      </div>

      <p className="mt-5 text-sm leading-7 text-[var(--slate)] sm:text-base">{entry.reason}</p>

      <div className="mt-5 border-t border-[var(--line)] pt-4 text-xs font-semibold text-[var(--slate)]">
        Diterima pada: <span className="font-bold text-[var(--ink)]">{formatTarikh(entry.submittedAt)}</span>
      </div>
    </article>
  );
}

export default function DashboardPage() {
  const [entries, setEntries] = useState<CandidateDashboardEntry[]>([]);
  const [kemasKiniPada, setKemasKiniPada] = useState("");
  const [sedangMuat, setSedangMuat] = useState(true);
  const [ralat, setRalat] = useState("");

  const muatCalon = useCallback(async () => {
    try {
      const response = await fetch("/api/candidates", { cache: "no-store" });
      const result = (await response.json().catch(() => null)) as CandidateResponse | null;

      if (!response.ok || !Array.isArray(result?.entries)) {
        throw new Error(result?.message ?? "Senarai calon tidak dapat dimuatkan. Cuba sebentar lagi.");
      }

      setEntries(result.entries);
      setKemasKiniPada(result.updatedAt ?? new Date().toISOString());
      setRalat("");
    } catch (error) {
      setRalat(error instanceof Error ? error.message : "Senarai calon tidak dapat dimuatkan. Cuba sebentar lagi.");
    } finally {
      setSedangMuat(false);
    }
  }, []);

  useEffect(() => {
    const muatPertama = window.setTimeout(() => {
      void muatCalon();
    }, 0);
    const pemasa = window.setInterval(() => {
      void muatCalon();
    }, 5000);

    return () => {
      window.clearTimeout(muatPertama);
      window.clearInterval(pemasa);
    };
  }, [muatCalon]);

  const ringkasan = useMemo(() => {
    const diluluskan = entries.filter((e) => e.stage === "Diluluskan untuk pengundian").length;
    const semakan = entries.filter((e) => e.stage === "Dalam semakan").length;
    return { jumlah: entries.length, diluluskan, semakan };
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
                Calon dicadangkan · P105 Petaling Jaya
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
                Siapa yang warga Petaling Jaya percaya?
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--slate)]">
                Setiap nama di bawah ini dicadangkan oleh warga sendiri. Senarai ini dikemas kini setiap kali ada cadangan baharu — lihat siapa yang komuniti percaya untuk mewakili mereka.
              </p>
              <div className="mt-6 border border-[var(--line)] bg-[var(--soft)] p-4 text-sm font-medium leading-6 text-[var(--slate)]">
                Nombor IC, rekod pengesahan, butiran hubungan, dan senarai pengundi tidak dipaparkan di sini. Nama yang layak diundi masih perlu melalui semakan terlebih dahulu.
              </div>
              <div className="mt-6">
                <Link href="/#take-part" className="inline-flex bg-[var(--ink)] px-6 py-4 text-sm font-bold text-[var(--mint)]">
                  Cadangkan nama anda
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:mt-8">
              <div className="border border-[var(--line)] bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Jumlah cadangan</p>
                <p className="mt-3 text-4xl font-bold tracking-[-0.05em]">{ringkasan.jumlah}</p>
              </div>
              <div className="border border-[var(--line)] bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Dalam semakan</p>
                <p className="mt-3 text-4xl font-bold tracking-[-0.05em]">{ringkasan.semakan}</p>
              </div>
              <div className="border border-[var(--line)] bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Layak diundi</p>
                <p className="mt-3 text-4xl font-bold tracking-[-0.05em]">{ringkasan.diluluskan}</p>
              </div>
              <div className="border border-[var(--line)] bg-white p-4 sm:col-span-3">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Kemas kini langsung</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[var(--slate)]">
                  Senarai ini dikemas kini setiap 5 saat{kemasKiniPada ? ` · terakhir dikemas kini ${formatTarikh(kemasKiniPada)}` : ""}
                </p>
              </div>
            </div>
          </section>

          <section className="pb-16" aria-labelledby="senarai-calon">
            <div className="mb-4 flex flex-col gap-3 border-y border-[var(--line)] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Nama dicadangkan komuniti</p>
                <h2 id="senarai-calon" className="mt-1 text-xl font-bold tracking-[-0.03em]">
                  Cadangan terkini warga PJ
                </h2>
              </div>
              <Link href="/#take-part" className="bg-[var(--civic)] px-4 py-3 text-center text-sm font-bold text-white">
                Cadangkan nama
              </Link>
            </div>

            {sedangMuat && (
              <div className="border border-[var(--line)] bg-white p-8 text-center">
                <p className="text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">Memuatkan senarai calon...</p>
              </div>
            )}

            {ralat && !sedangMuat && (
              <div className="border border-[var(--amber)] bg-white p-8 text-center">
                <p className="text-xl font-bold tracking-[-0.03em] text-[var(--amber-text)]">{ralat}</p>
                <button type="button" onClick={() => void muatCalon()} className="mt-4 border border-[var(--line)] px-4 py-3 text-sm font-bold">
                  Cuba lagi
                </button>
              </div>
            )}

            {!sedangMuat && !ralat && entries.length === 0 && (
              <div className="border border-[var(--line)] bg-white p-10 text-center">
                <p className="text-2xl font-bold tracking-[-0.04em] text-[var(--ink)]">Jadilah yang pertama mencadangkan nama.</p>
                <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-[var(--slate)]">
                  Belum ada cadangan lagi. Jika anda kenal seseorang yang layak mewakili Petaling Jaya, cadangkan mereka sekarang.
                </p>
                <Link href="/#take-part" className="mt-6 inline-flex bg-[var(--ink)] px-6 py-4 text-sm font-bold text-[var(--mint)]">
                  Cadangkan nama
                </Link>
              </div>
            )}

            {!sedangMuat && !ralat && entries.length > 0 && (
              <div className="space-y-4">
                {entries.map((entry, index) => (
                  <KadCadon key={entry.id} entry={entry} index={index} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

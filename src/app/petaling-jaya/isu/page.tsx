import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  p105AreaFacts,
  p105IssueCards,
  p105IssuePrinciples,
  p105Rubric,
  type IssueCard,
} from "@/lib/p105-issues";

export const metadata: Metadata = {
  title: "Keutamaan isu P105 Petaling Jaya — WakilKita",
  description:
    "Kad keutamaan isu P105 Petaling Jaya berasaskan data terbuka dengan batasan, keyakinan, bidang kuasa, soalan pengesahan penduduk, dan laluan tindakan wakil.",
};

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-bold text-[var(--civic-dark)]">
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">{children}</p>;
}

function IssueList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--slate)]">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-[var(--slate)]">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-[var(--civic)]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IssueCardView({ issue }: { issue: IssueCard }) {
  return (
    <article
      id={issue.slug}
      className="scroll-mt-6 border border-[var(--line)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
    >
      <div className="border-b border-[var(--line)] p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <Badge>{issue.scope}</Badge>
          <Badge>Keyakinan: {issue.confidence}</Badge>
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-[-0.04em] text-[var(--ink)] sm:text-3xl">
          {issue.title}
        </h2>
        <p className="mt-3 text-base leading-7 text-[var(--slate)]">{issue.residentFrame}</p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6 border-b border-[var(--line)] p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <div>
            <SectionLabel>Kenapa ini mungkin penting</SectionLabel>
            <p className="mt-3 text-sm leading-6 text-[var(--slate)]">{issue.whyItMatters}</p>
          </div>
          <IssueList title="Data terbuka atau tanda untuk disahkan" items={issue.localSignals} />
          <IssueList title="Batasan" items={issue.caveats} />
          <IssueList title="Bidang kuasa untuk diuji" items={issue.jurisdiction} />
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          <IssueList title="Lensa keutamaan" items={issue.prioritisationLens} />
          <IssueList title="Soalan pengesahan penduduk" items={issue.validationQuestions} />
          <IssueList title="Cadangan tindakan wakil" items={issue.representativeActions} />
          <div className="border border-[var(--line)] bg-[var(--soft)] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Nota sumber</p>
            <ul className="mt-2 space-y-1.5">
              {issue.sourceNotes.map((note) => (
                <li key={note} className="text-xs font-semibold leading-5 text-[var(--slate)]">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function PetalingJayaIssuesPage() {
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
            <Link href="/#take-part">Hantar cadangan</Link>
            <Link href="/petaling-jaya/isu" className="text-[var(--civic)]">
              Keutamaan isu
            </Link>
            <Link href="/ketelusan">Ketelusan</Link>
          </div>
        </nav>

        <section className="grid gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>P105 Petaling Jaya</Badge>
              <Badge>Isu dahulu</Badge>
              <Badge>Tiada kiraan atau ranking awam</Badge>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
              Kad isu data terbuka untuk membantu penduduk menentukan keutamaan.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--slate)] sm:text-xl">
              Halaman ini menukar kebimbangan P105 Petaling Jaya kepada kad isu yang boleh digunakan semula. Setiap kad membezakan apa yang diketahui, apa yang sekadar proksi daerah atau operasi, apa yang masih perlu disahkan penduduk, dan laluan tindakan praktikal yang boleh diusahakan wakil.
            </p>
            <div className="mt-6 border border-[var(--line)] bg-[var(--soft)] p-4 text-sm font-medium leading-6 text-[var(--slate)]">
              Had: ini bukan papan populariti awam. Ia tidak menerbitkan kiraan penduduk, menyusun isu mengikut ranking, mengenal pasti peserta, atau menganggap proksi data terbuka sebagai bukti khusus P105.
            </div>
          </div>

          <aside className="border border-[var(--line)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <div className="border-b border-[var(--line)] p-5">
              <SectionLabel>Konteks kawasan</SectionLabel>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[var(--ink)]">Fakta konteks yang digunakan di sini</h2>
            </div>
            <div className="divide-y divide-[var(--line)]">
              {p105AreaFacts.map((fact) => (
                <div key={fact.label} className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--slate)]">{fact.label}</p>
                  <p className="mt-1 text-2xl font-bold tracking-[-0.04em] text-[var(--ink)]">{fact.value}</p>
                  <p className="mt-1.5 text-sm leading-6 text-[var(--slate)]">{fact.note}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="pb-12" aria-labelledby="principles-heading">
          <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="border border-[var(--line)] bg-white p-5 sm:p-6">
              <SectionLabel>Peraturan rangka kerja</SectionLabel>
              <h2 id="principles-heading" className="mt-2 text-2xl font-bold tracking-[-0.04em]">
                Cara membaca kad isu
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {p105IssuePrinciples.map((principle) => (
                <div key={principle} className="border border-[var(--line)] bg-white p-5 text-sm font-semibold leading-6 text-[var(--slate)]">
                  {principle}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-12" aria-labelledby="rubric-heading">
          <div className="border border-[var(--line)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <div className="border-b border-[var(--line)] p-5 sm:p-6">
              <SectionLabel>Rubrik semakan, bukan pemarkahan awam</SectionLabel>
              <h2 id="rubric-heading" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
                Penyemak boleh membandingkan isu menggunakan lensa yang sama sebelum sebarang kaedah keutamaan awam wujud.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--slate)]">
                Rubrik ini dipaparkan supaya kriteria semakan jelas. Ia tidak mencipta ranking isu awam, jumlah penduduk, atau petunjuk populariti.
              </p>
            </div>
            <div className="grid divide-y divide-[var(--line)] md:grid-cols-5 md:divide-x md:divide-y-0">
              {p105Rubric.map((item) => (
                <div key={item.label} className="p-5">
                  <p className="text-base font-bold tracking-[-0.02em] text-[var(--ink)]">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--slate)]">{item.prompt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16" aria-labelledby="issue-cards-heading">
          <div className="mb-5 flex flex-col gap-4 border-y border-[var(--line)] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <SectionLabel>Kad isu boleh guna semula</SectionLabel>
              <h2 id="issue-cards-heading" className="mt-1 text-xl font-bold tracking-[-0.03em]">
                Permukaan isu awal P105
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {p105IssueCards.map((issue) => (
                <a
                  key={issue.slug}
                  href={`#${issue.slug}`}
                  className="border border-[var(--line)] bg-[var(--soft)] px-3 py-2 text-xs font-bold text-[var(--civic-dark)]"
                >
                  {issue.shortTitle}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {p105IssueCards.map((issue) => (
              <IssueCardView key={issue.slug} issue={issue} />
            ))}
          </div>
        </section>
      </div>
      </main>
    </>
  );
}

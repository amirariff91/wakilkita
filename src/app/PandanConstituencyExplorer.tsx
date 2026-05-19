"use client";

import { useMemo, useState } from "react";

type TabKey = "profile" | "electorate" | "economy" | "issues" | "gaps";

const tabs: { key: TabKey; label: string }[] = [
  { key: "profile", label: "Profile" },
  { key: "electorate", label: "Electorate" },
  { key: "economy", label: "Economy" },
  { key: "issues", label: "Issues" },
  { key: "gaps", label: "Data gaps" },
];

const headlineMetrics = [
  { label: "Population", value: "228,800", note: "DOSM parliamentary constituency table, 2022" },
  { label: "Registered electors", value: "148,730", note: "Public electoral baseline used for intake planning" },
  { label: "Elector / population ratio", value: "65.0%", note: "148,730 ÷ 228,800" },
  { label: "Citizenship coverage", value: "93.1%", note: "213,100 citizens; 15,700 non-citizens" },
];

const profileBreakdown = [
  { label: "Citizen population", value: 93.1, count: "213,100", tone: "bg-[var(--civic)]" },
  { label: "Non-citizen population", value: 6.9, count: "15,700", tone: "bg-[var(--amber)]" },
  { label: "Male", value: 53.6, count: "122,600", tone: "bg-[var(--ink)]" },
  { label: "Female", value: 46.4, count: "106,200", tone: "bg-[var(--mint)]" },
];

const electorateChecks = [
  { label: "Registered electors vs total population", value: "65.0%", detail: "Useful first health-check for participation ceilings and resident eligibility planning." },
  { label: "Registered electors vs citizens", value: "69.8%", detail: "Better proxy than total population, but still not an age/race breakdown." },
  { label: "Age-group elector split", value: "Source needed", detail: "Do not invent this. Requires SPR/open electoral roll aggregate by P100 + age band." },
  { label: "Race/ethnicity elector split", value: "Source needed", detail: "Current DOSM P100 table exposes citizen/non-citizen, not Malay/Chinese/Indian/Other by constituency." },
];

const economyMetrics = [
  { label: "Median household income", value: "RM10,846", note: "2024 DOSM HIES, P.100 Pandan" },
  { label: "Mean household income", value: "RM11,917", note: "2024 DOSM HIES, P.100 Pandan" },
  { label: "Mean household expenditure", value: "RM6,428", note: "2024 DOSM HIES, P.100 Pandan" },
  { label: "Unemployment rate", value: "3.2%", note: "2023 DOSM LFS, P.100 Pandan" },
  { label: "Labour participation", value: "80.1%", note: "2023 DOSM LFS, P.100 Pandan" },
  { label: "Poverty rate", value: "0.0%", note: "2024 DOSM poverty table; treat as survey estimate, not lived-experience proof" },
];

const issueSignals = [
  { label: "Dense urban service load", score: 88, evidence: "High population in a compact urban seat; service complaints should be geotagged by neighbourhood." },
  { label: "Mobility and walkability", score: 81, evidence: "Density makes transit access, last-mile safety, and parking friction politically important." },
  { label: "Maintenance response", score: 78, evidence: "Best measured through resident reports, council response time, and repeat-complaint clusters." },
  { label: "Household cost pressure", score: 72, evidence: "RM6,428 mean expenditure against RM10,846 median household income; segment by tenure/family type later." },
];

const sourceRows = [
  ["Population / sex / citizenship", "Available", "DOSM population_parlimen.csv"],
  ["Income / poverty / inequality / expenditure", "Available", "DOSM HIES parliament datasets"],
  ["Labour force", "Available", "DOSM lfs_parlimen.csv"],
  ["Registered electors total", "Baseline only", "Public electoral baseline, needs source page attached in product"],
  ["Registered electors by age band", "Missing", "Need SPR/open aggregate; do not infer from population"],
  ["Registered electors by race/ethnicity", "Missing", "Need authoritative aggregate; current DOSM P100 file does not provide it"],
];

function BarRow({ label, value, count, tone }: { label: string; value: number; count: string; tone: string }) {
  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white/66 p-4">
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-black text-[var(--ink)]">{label}</span>
        <span className="font-black text-[var(--civic-dark)]">{value.toFixed(1)}%</span>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-[rgba(15,107,77,0.1)]">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${value}%` }} />
      </div>
      <p className="mt-2 text-xs font-bold text-[var(--slate)]">{count} people</p>
    </div>
  );
}

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-5 shadow-[0_16px_50px_rgba(7,22,19,0.06)]">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--amber-text)]">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-0.05em] text-[var(--ink)]">{value}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-[var(--slate)]">{note}</p>
    </div>
  );
}

export function PandanConstituencyExplorer() {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const [selectedIssue, setSelectedIssue] = useState(issueSignals[0].label);
  const activeIssue = useMemo(() => issueSignals.find((item) => item.label === selectedIssue) ?? issueSignals[0], [selectedIssue]);

  return (
    <section id="constituency" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="rounded-[2.4rem] border border-[var(--line)] bg-[rgba(255,250,241,0.92)] p-5 shadow-[0_30px_100px_rgba(7,22,19,0.11)] sm:p-7 lg:p-9">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--civic)]">Pandan data context</p>
            <h2 className="mt-4 font-serif text-4xl font-black tracking-[-0.06em] text-[var(--ink)] sm:text-5xl">What Pandan nominees need to answer with evidence.</h2>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-[var(--slate)] sm:text-lg">
              Public datasets set the first questions for any representative profile: who lives here, what services are nearby, which gaps remain, and what proof residents need before they give support.
            </p>
          </div>
          <span className="w-fit rounded-full bg-[var(--mint)] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--civic-dark)]">Not live participation data</span>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {headlineMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto rounded-full border border-[var(--line)] bg-white/64 p-2" aria-label="Pandan data tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition ${activeTab === tab.key ? "bg-[var(--ink)] text-[var(--mint)]" : "text-[var(--slate)] hover:bg-[rgba(15,107,77,0.08)]"}`}
              aria-pressed={activeTab === tab.key}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-7">
          {activeTab === "profile" && (
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[2rem] bg-[var(--ink)] p-6 text-white">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--mint)]">Population profile</p>
                <h3 className="mt-3 text-3xl font-black tracking-[-0.05em]">Compact, citizen-heavy, slightly male-skewed.</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-white/68">
                  The available P100 data supports population, sex and citizenship views. It does not support race-level constituency claims yet.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {profileBreakdown.map((row) => (
                  <BarRow key={row.label} {...row} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "electorate" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {electorateChecks.map((item) => (
                <div key={item.label} className="rounded-3xl border border-[var(--line)] bg-white/68 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--amber-text)]">{item.label}</p>
                  <p className="mt-2 text-3xl font-black tracking-[-0.05em] text-[var(--ink)]">{item.value}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[var(--slate)]">{item.detail}</p>
                </div>
              ))}
              <div className="rounded-3xl bg-[rgba(15,107,77,0.09)] p-5 sm:col-span-2">
                <p className="text-base font-black leading-7 text-[var(--ink)]">
                  Rule: show age/race elector percentages only when the source exists. Until then, WakilKita marks them as missing data instead of filling the gap with estimates.
                </p>
              </div>
            </div>
          )}

          {activeTab === "economy" && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {economyMetrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>
          )}

          {activeTab === "issues" && (
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-3">
                {issueSignals.map((issue) => (
                  <button
                    type="button"
                    key={issue.label}
                    onClick={() => setSelectedIssue(issue.label)}
                    className={`w-full rounded-3xl border p-4 text-left transition ${selectedIssue === issue.label ? "border-[var(--civic)] bg-[rgba(15,107,77,0.1)]" : "border-[var(--line)] bg-white/68 hover:bg-white"}`}
                    aria-pressed={selectedIssue === issue.label}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-black text-[var(--ink)]">{issue.label}</span>
                      <span className="font-black text-[var(--civic-dark)]">Planning note</span>
                    </div>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-[rgba(15,107,77,0.1)]">
                      <div className="h-full rounded-full bg-[var(--civic)]" style={{ width: `${issue.score}%` }} />
                    </div>
                  </button>
                ))}
              </div>
              <div className="rounded-[2rem] bg-[var(--ink)] p-6 text-white">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--mint)]">Selected priority</p>
                <h3 className="mt-3 text-3xl font-black tracking-[-0.05em]">{activeIssue.label}</h3>
                <p className="mt-3 rounded-full bg-white/8 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--mint)]">Planning heuristic — not a resident count</p>
                <p className="mt-4 text-base font-semibold leading-7 text-white/72">{activeIssue.evidence}</p>
                <p className="mt-5 rounded-3xl border border-white/10 bg-white/8 p-4 text-sm font-bold leading-6 text-white/68">
                  Representative profiles need to answer four things: what will you fix first, which neighbourhoods are affected, what public dataset supports it, and how residents can judge progress?
                </p>
              </div>
            </div>
          )}

          {activeTab === "gaps" && (
            <div className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white/70">
              {sourceRows.map(([label, status, source]) => (
                <div key={label} className="grid gap-2 border-b border-[var(--line)] p-4 last:border-b-0 md:grid-cols-[1fr_0.55fr_1.2fr] md:items-center">
                  <p className="font-black text-[var(--ink)]">{label}</p>
                  <p className={`w-fit rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${status === "Available" ? "bg-[var(--mint)] text-[var(--civic-dark)]" : status === "Missing" ? "bg-[rgba(183,79,44,0.14)] text-[var(--amber-text)]" : "bg-[rgba(15,107,77,0.09)] text-[var(--civic-dark)]"}`}>{status}</p>
                  <p className="text-sm font-semibold leading-6 text-[var(--slate)]">{source}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

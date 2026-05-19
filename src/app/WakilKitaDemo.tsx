"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Issue = {
  label: string;
  score: number;
  source: string;
};

type Nominee = {
  id: string;
  name: string;
  focus: string;
  plan: string;
  supportCount: number;
  seeded: boolean;
};

type Constituency = {
  code: string;
  name: string;
  state: string;
  residentSignal: number;
  issues: Issue[];
  nominees: Nominee[];
};

type DemoState = Record<
  string,
  {
    nominees: Nominee[];
    supportedNomineeId: string | null;
    demoPassCreated: boolean;
    auditEvents: string[];
  }
>;

const STORAGE_KEY = "wakilkita_demo_v1";
const MAX_NOMINEES_PER_SEAT = 12;

const seedConstituencies: Constituency[] = [
  {
    code: "P105",
    name: "Petaling Jaya",
    state: "Selangor",
    residentSignal: 1284,
    issues: [
      { label: "Transit reliability", score: 84, source: "GTFS sample + resident priority" },
      { label: "Flood mitigation", score: 76, source: "NADMA sample + local reports" },
      { label: "Clinic access", score: 61, source: "OpenDOSM sample + facility distance" },
    ],
    nominees: [
      {
        id: "p105-a",
        name: "Illustrative community organiser",
        focus: "Transit reliability",
        plan: "Publish monthly bus punctuality scorecards and push council escalations for unreliable corridors.",
        supportCount: 487,
        seeded: true,
      },
      {
        id: "p105-b",
        name: "Illustrative neighbourhood chair",
        focus: "Flood mitigation",
        plan: "Prioritise drain desilting maps, hotspot reporting, and public SLA tracking before monsoon season.",
        supportCount: 391,
        seeded: true,
      },
      {
        id: "p105-c",
        name: "Illustrative service advocate",
        focus: "Clinic access",
        plan: "Track queue pressure and propose mobile clinic days for older residents in high-density zones.",
        supportCount: 262,
        seeded: true,
      },
    ],
  },
  {
    code: "P104",
    name: "Subang",
    state: "Selangor",
    residentSignal: 842,
    issues: [
      { label: "Flood mitigation", score: 82, source: "NADMA sample + resident reports" },
      { label: "Public transport gaps", score: 70, source: "GTFS sample + resident priority" },
      { label: "School density", score: 58, source: "MOE sample + population density" },
    ],
    nominees: [
      {
        id: "p104-a",
        name: "Illustrative flood-response volunteer",
        focus: "Flood mitigation",
        plan: "Coordinate public hotspot maps, response teams, and visible council follow-up after every incident.",
        supportCount: 311,
        seeded: true,
      },
      {
        id: "p104-b",
        name: "Illustrative mobility advocate",
        focus: "Public transport gaps",
        plan: "Use resident reports to push first-mile routes, pedestrian fixes, and safer late-evening access.",
        supportCount: 228,
        seeded: true,
      },
    ],
  },
  {
    code: "P121",
    name: "Lembah Pantai",
    state: "Kuala Lumpur",
    residentSignal: 517,
    issues: [
      { label: "Rental pressure", score: 79, source: "OpenDOSM sample + resident priority" },
      { label: "Clinic access", score: 66, source: "Facility distance sample" },
      { label: "School density", score: 63, source: "MOE sample + population density" },
    ],
    nominees: [
      {
        id: "p121-a",
        name: "Illustrative housing researcher",
        focus: "Rental pressure",
        plan: "Publish rent-pressure snapshots and coordinate tenant-help referrals with local NGOs.",
        supportCount: 207,
        seeded: true,
      },
      {
        id: "p121-b",
        name: "Illustrative public health organiser",
        focus: "Clinic access",
        plan: "Identify access gaps and advocate mobile screening days for flats and older resident clusters.",
        supportCount: 173,
        seeded: true,
      },
    ],
  },
];

function freshState(): DemoState {
  return Object.fromEntries(
    seedConstituencies.map((seat) => [
      seat.code,
      {
        nominees: seat.nominees,
        supportedNomineeId: null,
        demoPassCreated: false,
        auditEvents: [`Seeded illustrative data for ${seat.code}`],
      },
    ]),
  );
}

function cleanText(value: string, maxLength: number) {
  return value.replace(/[<>&"']/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function makeDemoId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `demo-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-MY").format(value);
}

function restoreState(saved: string | null): DemoState {
  const base = freshState();
  if (!saved) return base;

  try {
    const parsed = JSON.parse(saved) as Partial<DemoState>;

    return Object.fromEntries(
      Object.entries(base).map(([code, fallback]) => {
        const candidate = parsed[code];
        if (!candidate || !Array.isArray(candidate.nominees) || !Array.isArray(candidate.auditEvents)) {
          return [code, fallback];
        }

        return [
          code,
          {
            nominees: candidate.nominees,
            supportedNomineeId: typeof candidate.supportedNomineeId === "string" ? candidate.supportedNomineeId : null,
            demoPassCreated: Boolean(candidate.demoPassCreated),
            auditEvents: candidate.auditEvents,
          },
        ];
      }),
    );
  } catch {
    return base;
  }
}

export function WakilKitaDemo() {
  const [state, setState] = useState<DemoState>(() => {
    if (typeof window === "undefined") return freshState();
    return restoreState(window.localStorage.getItem(STORAGE_KEY));
  });
  const [selectedCode, setSelectedCode] = useState(seedConstituencies[0].code);
  const [name, setName] = useState("");
  const [focus, setFocus] = useState("");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const selectedSeat = seedConstituencies.find((seat) => seat.code === selectedCode) ?? seedConstituencies[0];
  const selectedState = state[selectedSeat.code] ?? freshState()[selectedSeat.code];

  const totalSupport = useMemo(
    () => selectedState.nominees.reduce((sum, nominee) => sum + nominee.supportCount, 0),
    [selectedState.nominees],
  );


  function createDemoPass() {
    const passId = makeDemoId().slice(0, 8).toUpperCase();
    setState((current) => ({
      ...current,
      [selectedSeat.code]: {
        ...current[selectedSeat.code],
        demoPassCreated: true,
        auditEvents: [`Demo verification pass ${passId} created locally`, ...current[selectedSeat.code].auditEvents].slice(0, 6),
      },
    }));
  }

  function supportNominee(nomineeId: string) {
    setState((current) => {
      const currentSeat = current[selectedSeat.code];

      if (!currentSeat.demoPassCreated || currentSeat.supportedNomineeId) {
        return current;
      }

      return {
        ...current,
        [selectedSeat.code]: {
          ...currentSeat,
          supportedNomineeId: nomineeId,
          nominees: currentSeat.nominees.map((nominee) =>
            nominee.id === nomineeId ? { ...nominee, supportCount: nominee.supportCount + 1 } : nominee,
          ),
          auditEvents: [
            `${new Date().toLocaleTimeString("en-MY", { hour: "2-digit", minute: "2-digit" })} · Local preference signal recorded`,
            ...currentSeat.auditEvents,
          ].slice(0, 6),
        },
      };
    });
  }

  function nominate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nomineeName = cleanText(name, 72);
    const nomineeFocus = cleanText(focus, 96);

    if (!nomineeName || !nomineeFocus) return;

    const nominee: Nominee = {
      id: makeDemoId(),
      name: nomineeName,
      focus: nomineeFocus,
      plan: `Demo entry focused on ${nomineeFocus.toLowerCase()}. In a real pilot, this profile would need verification, right of reply, and dispute handling before public display.`,
      supportCount: 0,
      seeded: false,
    };

    setState((current) => {
      const currentSeat = current[selectedSeat.code];

      if (currentSeat.nominees.length >= MAX_NOMINEES_PER_SEAT) {
        return current;
      }

      return {
        ...current,
        [selectedSeat.code]: {
          ...currentSeat,
          nominees: [...currentSeat.nominees, nominee],
          auditEvents: [
            `${new Date().toLocaleTimeString("en-MY", { hour: "2-digit", minute: "2-digit" })} · Local demo nomination added`,
            ...currentSeat.auditEvents,
          ].slice(0, 6),
        },
      };
    });
    setName("");
    setFocus("");
  }

  function resetDemo() {
    const next = freshState();
    window.localStorage.removeItem(STORAGE_KEY);
    setState(next);
    setName("");
    setFocus("");
  }

  return (
    <section id="demo" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="rounded-[2.4rem] border border-[var(--line)] bg-[rgba(7,22,19,0.96)] p-4 text-white shadow-[0_30px_100px_rgba(7,22,19,0.22)] sm:p-6 lg:p-8">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(221,247,232,0.12),rgba(255,250,241,0.04))] p-5 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full bg-[var(--mint)] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--civic-dark)]">
                Working demo · local browser only
              </p>
              <h2 className="mt-5 font-serif text-4xl font-black tracking-[-0.06em] sm:text-5xl">
                Try the preference signal without collecting real identity data.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/72 sm:text-lg">
                This sandbox lets you pick a constituency, create a local demo verification pass, nominate a rep profile, and support one preferred profile. Nothing is sent to a server.
              </p>
            </div>
            <button
              type="button"
              onClick={resetDemo}
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-[var(--mint)] transition hover:bg-white/10"
            >
              Reset demo
            </button>
          </div>

          <div className="mt-7 rounded-3xl border border-[rgba(221,247,232,0.24)] bg-[rgba(221,247,232,0.12)] p-4 text-sm font-bold leading-6 text-[var(--mint)]">
            DEMO MODE: all changes stay in this browser&apos;s localStorage. This is not an official vote, not SPR, not real civic data, and not proof of identity.
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="space-y-5">
              <div className="rounded-3xl bg-[var(--paper)] p-5 text-[var(--ink)]">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--civic)]">1 · Choose constituency</p>
                <div className="mt-4 grid gap-3">
                  {seedConstituencies.map((seat) => (
                    <button
                      key={seat.code}
                      type="button"
                      onClick={() => setSelectedCode(seat.code)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        selectedCode === seat.code
                          ? "border-[var(--civic)] bg-[var(--mint)] shadow-[0_12px_40px_rgba(15,107,77,0.14)]"
                          : "border-[var(--line)] bg-white hover:border-[var(--civic)]"
                      }`}
                    >
                      <span className="text-xs font-black uppercase tracking-[0.14em] text-[var(--amber-text)]">{seat.code}</span>
                      <span className="mt-1 block text-xl font-black tracking-[-0.04em]">{seat.name}</span>
                      <span className="mt-1 block text-sm font-bold text-[var(--slate)]">
                        {seat.state} · {formatNumber(seat.residentSignal)} seeded participant signals
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-[var(--paper)] p-5 text-[var(--ink)]">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--civic)]">2 · Demo verification</p>
                <h3 className="mt-3 text-2xl font-black tracking-[-0.05em]">Local pass for {selectedSeat.code}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--slate)]">
                  Real eKYC is intentionally not in this demo. Click once to simulate the point where a verified constituent would be allowed to support one profile.
                </p>
                <button
                  type="button"
                  onClick={createDemoPass}
                  disabled={selectedState.demoPassCreated}
                  className="mt-4 w-full rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-[var(--mint)] disabled:cursor-not-allowed disabled:bg-[var(--civic)]"
                >
                  {selectedState.demoPassCreated ? "Demo pass active" : "Create local demo pass"}
                </button>
              </div>

              <form onSubmit={nominate} className="rounded-3xl bg-[var(--paper)] p-5 text-[var(--ink)]">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--civic)]">3 · Nominate a profile</p>
                <p className="mt-3 text-sm leading-6 text-[var(--slate)]">
                  Add an illustrative rep profile. Do not enter IC, phone, address, private allegations, or sensitive identity details.
                </p>
                <label className="mt-4 block text-sm font-black" htmlFor="demo-nominee-name">
                  Display name
                </label>
                <input
                  id="demo-nominee-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={72}
                  placeholder="e.g. Illustrative community advocate"
                  className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
                />
                <label className="mt-4 block text-sm font-black" htmlFor="demo-focus">
                  Main issue focus
                </label>
                <input
                  id="demo-focus"
                  value={focus}
                  onChange={(event) => setFocus(event.target.value)}
                  maxLength={96}
                  placeholder="e.g. Flood mitigation"
                  className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--civic)]"
                />
                <button
                  type="submit"
                  disabled={!name.trim() || !focus.trim() || selectedState.nominees.length >= MAX_NOMINEES_PER_SEAT}
                  className="mt-4 w-full rounded-full bg-[var(--civic)] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white disabled:cursor-not-allowed disabled:bg-[rgba(15,107,77,0.42)]"
                >
                  Add local demo nomination
                </button>
              </form>
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl bg-[var(--paper)] p-5 text-[var(--ink)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--civic)]">4 · Support one profile</p>
                    <h3 className="mt-2 text-3xl font-black tracking-[-0.06em]">
                      {selectedSeat.code} {selectedSeat.name}
                    </h3>
                    <p className="mt-2 text-sm font-bold text-[var(--slate)]">
                      {selectedState.demoPassCreated ? "Demo pass active" : "Create a demo pass first"} · {formatNumber(totalSupport)} aggregate signals
                    </p>
                  </div>
                  <span className="rounded-full bg-[rgba(217,154,30,0.14)] px-3 py-2 text-xs font-black text-[var(--amber-text)]">
                    DEMO - NOT REAL DATA
                  </span>
                </div>

                <div className="mt-5 grid gap-3">
                  {selectedState.nominees.map((nominee) => {
                    const percent = totalSupport > 0 ? Math.round((nominee.supportCount / totalSupport) * 100) : 0;
                    const supported = selectedState.supportedNomineeId === nominee.id;
                    const locked = Boolean(selectedState.supportedNomineeId);

                    return (
                      <article key={nominee.id} className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-white p-4">
                        <div className="pointer-events-none absolute inset-x-0 top-5 rotate-[-10deg] text-center text-[11px] font-black uppercase tracking-[0.3em] text-[rgba(7,22,19,0.06)]">
                          Demo · not real data
                        </div>
                        <div className="relative">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="text-xl font-black tracking-[-0.04em]">{nominee.name}</h4>
                                {!nominee.seeded && (
                                  <span className="rounded-full bg-[var(--mint)] px-2 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[var(--civic-dark)]">
                                    local entry
                                  </span>
                                )}
                              </div>
                              <p className="mt-2 text-sm font-black text-[var(--civic-dark)]">Focus: {nominee.focus}</p>
                              <p className="mt-2 text-sm leading-6 text-[var(--slate)]">{nominee.plan}</p>
                            </div>
                            <div className="shrink-0 rounded-2xl bg-[var(--mint)] px-4 py-3 text-center">
                              <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[var(--civic-dark)]">Signal</p>
                              <p className="text-2xl font-black">{percent}%</p>
                            </div>
                          </div>
                          <div className="mt-4 h-3 overflow-hidden rounded-full bg-[rgba(7,22,19,0.09)]">
                            <div className="h-full rounded-full bg-[var(--civic)]" style={{ width: `${percent}%` }} />
                          </div>
                          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs font-bold text-[var(--slate)]">
                              {formatNumber(nominee.supportCount)} demo signals · aggregate only
                            </p>
                            <button
                              type="button"
                              onClick={() => supportNominee(nominee.id)}
                              disabled={!selectedState.demoPassCreated || locked}
                              className="rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-[var(--mint)] disabled:cursor-not-allowed disabled:bg-[rgba(7,22,19,0.34)]"
                            >
                              {supported ? "Supported" : locked ? "Signal used" : selectedState.demoPassCreated ? "Support" : "Need demo pass"}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {selectedState.supportedNomineeId && (
                  <p className="mt-4 rounded-2xl bg-[rgba(15,107,77,0.08)] px-4 py-3 text-sm font-bold leading-6 text-[var(--civic-dark)]">
                    You have signaled one local preference in this constituency. In a real system this would be backed by identity verification, eligibility checks, and a dispute process.
                  </p>
                )}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-3xl bg-[rgba(221,247,232,0.1)] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--mint)]">Issue priority board</p>
                  <div className="mt-5 space-y-4">
                    {selectedSeat.issues.map((issue) => (
                      <div key={issue.label}>
                        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                          <span className="font-bold">{issue.label}</span>
                          <span className="font-black text-[var(--mint)]">{issue.score}/100</span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-[var(--mint)]" style={{ width: `${issue.score}%` }} />
                        </div>
                        <p className="mt-2 text-xs font-semibold text-white/62">{issue.source}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-[rgba(221,247,232,0.1)] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--mint)]">Local audit trail</p>
                  <div className="mt-5 space-y-3" aria-live="polite" aria-atomic="false">
                    {selectedState.auditEvents.map((event, index) => (
                      <p key={`${index}-${event}`} className="rounded-2xl bg-white/8 px-4 py-3 text-sm font-bold leading-6 text-white/78 ring-1 ring-white/10">
                        {event}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <p className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm font-bold leading-6 text-white/70">
                Guardrail: this demo deliberately avoids real IC, phone, address, email, backend storage, supporter lists, and shareable leaderboards. It shows the product interaction model, not a production trust system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

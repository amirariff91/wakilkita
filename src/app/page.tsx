import { WakilKitaDemo } from "./WakilKitaDemo";

const pandanFacts = [
  ["Population", "227,413", "OpenDOSM Kawasanku, 2024"],
  ["Eligible voters", "148,730", "Public OpenDOSM/SPR-derived electoral baseline"],
  ["Density", "11,371/km²", "3rd highest among 222 parliamentary seats"],
  ["Area", "20 km²", "Highly compact urban seat"],
];

const pandanIssues = [
  {
    label: "High-density urban services",
    score: 88,
    source: "11,371 people/km² + compact 20km² constituency",
  },
  {
    label: "Public transport and walkability pressure",
    score: 81,
    source: "Urban density + resident priority input needed",
  },
  {
    label: "Clinic, grocery, ATM and public facility access",
    score: 74,
    source: "OpenDOSM public-service indicators show weaker per-capita density",
  },
  {
    label: "Youth, family and working-age needs",
    score: 71,
    source: "71.8% working-age population; 21.3% children",
  },
];

const safeguards = [
  "Production pilot would allow one Pandan resident account per identity check",
  "Constituency eligibility would be checked before a signal is counted",
  "Identity records must stay separated from preference records",
  "Public output must show aggregate participant signal only",
  "Every count-changing action should produce an audit event",
  "Dispute, impersonation, candidate-claim and takedown workflow from day one",
];

const pilotScope = [
  "P100 Pandan only — no national rollout claim",
  "Local demo pass now; real eKYC only after policy review",
  "Nominate, claim and verify community representative profiles",
  "Test one non-binding preference signal per demo participant",
  "Pandan issue board tied to OpenDOSM and resident priorities",
  "Public results only after privacy thresholds are met",
];

function TrustArchitectureDiagram() {
  const steps = [
    ["1", "Identity check", "In a production pilot, an IC/eKYC provider would verify the person. WakilKita should not expose this publicly."],
    ["2", "Eligibility token", "The system would confirm the participant belongs to P100 Pandan, then issue a one-use eligibility token."],
    ["3", "Preference record", "The token would record one signal. The signal table should not store IC or raw identity details."],
    ["4", "Aggregate result", "Only threshold-protected totals would be shown publicly, with audit events and dispute handling."],
  ];

  return (
    <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-5 shadow-[0_20px_70px_rgba(7,22,19,0.08)]">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--civic)]">Privacy architecture</p>
      <div className="mt-5 grid gap-3">
        {steps.map(([num, title, body]) => (
          <div key={title} className="grid gap-4 rounded-3xl border border-[var(--line)] bg-white/70 p-4 sm:grid-cols-[3rem_1fr]">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--ink)] text-sm font-black text-[var(--mint)]">{num}</span>
            <div>
              <h3 className="text-lg font-black tracking-[-0.04em] text-[var(--ink)]">{title}</h3>
              <p className="mt-1 text-sm font-semibold leading-6 text-[var(--slate)]">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductPreview() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[rgba(255,250,241,0.94)] p-4 shadow-[0_30px_100px_rgba(7,22,19,0.16)]">
      <div className="rounded-[1.6rem] bg-[var(--ink)] p-5 text-white">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--mint)]">Pandan pilot MVP</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.06em]">P100 Pandan</h2>
            <p className="mt-2 text-sm font-bold text-white/70">P100 Pandan, Selangor · compact urban constituency · demo mode</p>
          </div>
          <span className="rounded-full bg-[rgba(221,247,232,0.14)] px-3 py-2 text-xs font-black text-[var(--mint)]">demo example</span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {pandanFacts.map(([label, value, source]) => (
            <div key={label} className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-white/50">{label}</p>
              <p className="mt-2 text-2xl font-black tracking-[-0.04em]">{value}</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-white/54">{source}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-3xl bg-[var(--paper)] p-5 text-[var(--ink)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--civic)]">Sample participant signal</p>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.05em]">Community service profile</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--slate)]">Illustrative demo screen, not live public support data.</p>
            </div>
            <div className="rounded-2xl bg-[var(--mint)] px-4 py-3 text-center">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[var(--civic-dark)]">Seeded demo</p>
              <p className="text-2xl font-black">41%</p>
            </div>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-[rgba(7,22,19,0.1)]">
            <div className="h-full w-[41%] rounded-full bg-[var(--civic)]" />
          </div>
          <p className="mt-3 text-xs font-semibold text-[var(--slate)]">Demo example only — not real participant data. Public totals would require verification, minimum thresholds, and published privacy rules.</p>
        </div>
      </div>
    </div>
  );
}

function PandanEvidenceBoard() {
  return (
    <div className="rounded-[2rem] bg-[var(--ink)] p-5 text-white shadow-[0_24px_90px_rgba(7,22,19,0.2)] sm:p-6">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--mint)]">Pandan evidence board</p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.05em]">Issue ranking from public baseline data + resident priority input.</h2>
      <p className="mt-3 text-sm font-semibold leading-6 text-white/62">
        The first MVP should not pretend to know the whole constituency. It should show the source, ask residents to challenge it, and let nominees tie plans to evidence.
      </p>
      <div className="mt-6 space-y-4">
        {pandanIssues.map((issue) => (
          <div key={issue.label}>
            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
              <span className="font-bold">{issue.label}</span>
              <span className="font-black text-[var(--mint)]">{issue.score}/100</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[var(--mint)]" style={{ width: `${issue.score}%` }} />
            </div>
            <p className="mt-2 text-xs font-semibold text-white/56">{issue.source}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/6 p-4 text-sm font-bold leading-6 text-white/72">
        Source baseline: OpenDOSM Kawasanku for P.100 Pandan. Resident priority scoring is simulated until the pilot collects consented feedback.
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" tabIndex={-1} className="min-h-screen overflow-hidden">
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-5 py-6 sm:px-8 lg:px-10">
          <nav className="flex items-center justify-between rounded-full border border-[var(--line)] bg-[rgba(255,250,241,0.76)] px-4 py-3 shadow-[0_18px_80px_rgba(7,22,19,0.08)] backdrop-blur">
            <a href="#top" className="flex items-center gap-3" aria-label="WakilKita home">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--ink)] text-sm font-black text-[var(--mint)]">WK</span>
              <span>
                <span className="block text-base font-black tracking-[-0.03em] text-[var(--ink)]">WakilKita</span>
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--civic)]">Pandan pilot MVP</span>
              </span>
            </a>
            <div className="hidden items-center gap-6 text-sm font-semibold text-[var(--slate)] md:flex">
              <a href="#trust">Trust model</a>
              <a href="#constituency">Pandan data</a>
              <a href="#demo">Demo</a>
              <a href="#pilot">Pilot</a>
            </div>
            <a href="mailto:miccy@arusdigital.com?subject=Join%20WakilKita%20Pandan%20pilot" className="rounded-full bg-[var(--civic)] px-4 py-2 text-sm font-bold text-white shadow-[0_10px_30px_rgba(15,107,77,0.26)] transition hover:bg-[var(--civic-dark)]">
              Join pilot
            </a>
          </nav>

          <div id="top" className="grid items-center gap-10 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-14">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-[rgba(15,107,77,0.24)] bg-[rgba(221,247,232,0.72)] px-4 py-2 text-sm font-bold text-[var(--civic-dark)]">
                P100 Pandan pilot only. Not online voting. Not SPR-affiliated. Not a party tool.
              </div>
              <h1 className="max-w-4xl font-serif text-5xl font-black leading-[1.06] tracking-[-0.07em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
                A working civic preference MVP for Pandan.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--slate)] sm:text-xl">
                WakilKita now starts with one constituency: P100 Pandan. Residents can test the flow, complete a demo-only eligibility check, suggest community representative profiles, and submit one non-binding preference signal without sending real IC or identity data anywhere.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#demo" className="rounded-full bg-[var(--ink)] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.12em] text-[var(--mint)] shadow-[0_20px_60px_rgba(7,22,19,0.22)]">
                  Try Pandan demo
                </a>
                <a href="#constituency" className="rounded-full border border-[var(--line)] bg-[rgba(255,250,241,0.7)] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.12em] text-[var(--ink)]">
                  Review Pandan data
                </a>
              </div>
            </div>
            <ProductPreview />
          </div>
        </section>

        <section id="trust" className="border-y border-[var(--line)] bg-[rgba(255,250,241,0.58)] py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--civic)]">Trust before turnout</p>
              <h2 className="mt-4 font-serif text-4xl font-black tracking-[-0.06em] text-[var(--ink)] sm:text-5xl">Boring, auditable, explainable.</h2>
              <p className="mt-5 text-lg leading-8 text-[var(--slate)]">
                The MVP should win trust by being narrower, clearer, and less theatrical. No AI civic scenes, no blockchain theatre, no public supporter lists. Just a transparent Pandan pilot model with identity separation and aggregate-only output.
              </p>
              <div className="mt-7">
                <TrustArchitectureDiagram />
              </div>
            </div>
            <div className="grid content-start gap-3 sm:grid-cols-2">
              {safeguards.map((item, index) => (
                <div key={item} className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-5 shadow-[0_16px_50px_rgba(7,22,19,0.07)]">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--amber-text)]">0{index + 1}</span>
                  <p className="mt-3 text-base font-bold leading-6 text-[var(--ink)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="constituency" className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[0_24px_80px_rgba(7,22,19,0.1)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--civic)]">Pandan constituency page</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--ink)]">Public baseline before opinions.</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-[var(--slate)]">All figures below are baseline/context figures for product design, not live WakilKita participation data.</p>
              </div>
              <span className="rounded-full bg-[var(--mint)] px-3 py-2 text-xs font-black text-[var(--civic-dark)]">P.100 Pandan</span>
            </div>
            <div className="mt-6 space-y-3">
              {pandanFacts.map(([label, value, source]) => (
                <div key={label} className="rounded-3xl border border-[var(--line)] bg-white/60 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--amber-text)]">{label}</p>
                      <h3 className="mt-1 text-2xl font-black tracking-[-0.04em]">{value}</h3>
                    </div>
                    <p className="max-w-xs text-right text-sm font-bold leading-6 text-[var(--slate)]">{source}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <PandanEvidenceBoard />
        </section>

        <WakilKitaDemo />

        <section id="pilot" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
          <div className="rounded-[2.4rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[0_30px_100px_rgba(7,22,19,0.12)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--civic)]">MVP pilot scope</p>
                <h2 className="mt-4 font-serif text-4xl font-black tracking-[-0.06em] text-[var(--ink)] sm:text-5xl">Start small enough to be trusted.</h2>
                <p className="mt-5 text-lg leading-8 text-[var(--slate)]">
                  The useful first product is not a national platform. It is a Pandan-only pilot designed to test identity separation, resident eligibility, representative nominations, dispute workflow, and evidence-led priorities.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {pilotScope.map((item) => (
                  <div key={item} className="rounded-3xl bg-[rgba(15,107,77,0.08)] p-5">
                    <p className="text-base font-black leading-6 text-[var(--ink)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 rounded-3xl bg-[var(--ink)] p-5 text-white sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--mint)]">Positioning rule</p>
                <p className="mt-2 text-xl font-black tracking-[-0.03em]">One eligible Pandan resident would record one local preference signal in a real pilot. It is non-binding and not an official vote, candidacy decision, or election result.</p>
              </div>
              <a href="mailto:miccy@arusdigital.com?subject=Pilot%20WakilKita%20Pandan" className="mt-5 inline-flex rounded-full bg-[var(--mint)] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-[var(--civic-dark)] sm:mt-0">
                Request demo pilot review
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-[var(--line)] bg-[rgba(255,250,241,0.72)] px-5 py-8 text-sm leading-6 text-[var(--slate)] sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[1fr_1.4fr]">
            <p className="font-black text-[var(--ink)]">Independent Pandan civic prototype</p>
            <div className="space-y-2">
              <p>WakilKita is independent and is not affiliated with SPR, the Malaysian government, any political party, candidate, or election authority.</p>
              <p>This MVP does not ask for or transmit IC/eKYC data. Demo entries stay local to the browser and should not contain personal or sensitive details. Any real Pandan pilot must publish privacy, verification, dispute, retention, and deletion policies before collecting resident information.</p>
              <p>Individual preferences must never be public, sold, or shared as supporter lists. Public results should be aggregate-only and threshold-protected.</p>
              <p><a className="font-black text-[var(--civic-dark)] underline" href="mailto:miccy@arusdigital.com?subject=WakilKita%20Pandan%20report%20or%20takedown">Report impersonation, dispute a nomination, or request takedown.</a></p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

import Image from "next/image";
import { PandanConstituencyExplorer } from "./PandanConstituencyExplorer";
import { WakilKitaActionPanel } from "./WakilKitaActionPanel";

const pandanFacts = [
  ["Population", "228,800", "DOSM P.100 Pandan, 2022"],
  ["Registered electors", "148,730", "Public electoral baseline"],
  ["Density", "11,371/km²", "3rd highest among 222 parliamentary seats"],
  ["Area", "20 km²", "Highly compact urban seat"],
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
  "Structured intake now; real eKYC only after policy review",
  "Nominate, claim and verify community representative profiles",
  "Collect non-binding preference signals only after verification is ready",
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
            <p className="mt-2 text-sm font-bold text-white/70">P100 Pandan, Selangor · compact urban constituency · intake open</p>
          </div>
          <span className="rounded-full bg-[rgba(221,247,232,0.14)] px-3 py-2 text-xs font-black text-[var(--mint)]">private intake</span>
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
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--civic)]">Priority intake</p>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.05em]">Community service profile</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--slate)]">Public profile and issue submissions are collected privately first, then reviewed before anything becomes visible.</p>
            </div>
            <div className="rounded-2xl bg-[var(--mint)] px-4 py-3 text-center">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[var(--civic-dark)]">Status</p>
              <p className="text-lg font-black leading-tight">Private intake draft</p>
            </div>
          </div>
          <div className="mt-5 grid gap-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--civic-dark)] sm:grid-cols-3">
            <span className="rounded-full bg-[rgba(15,107,77,0.08)] px-3 py-2 text-center">Nominate</span>
            <span className="rounded-full bg-[rgba(15,107,77,0.08)] px-3 py-2 text-center">Claim</span>
            <span className="rounded-full bg-[rgba(15,107,77,0.08)] px-3 py-2 text-center">Prioritise</span>
          </div>
          <p className="mt-3 text-xs font-semibold text-[var(--slate)]">Public totals require verification, minimum thresholds, dispute handling, and published privacy rules.</p>
        </div>
      </div>
    </div>
  );
}

function VisualEvidencePanel() {
  const visuals = [
    {
      title: "Pandan data workbench visual",
      src: "/visuals/pandan-dashboard.svg",
      alt: "Illustrative WakilKita dashboard showing Pandan baseline data, issue priorities, source-needed labels, and trust notes.",
      note: "A product visual for the constituency workbench. It avoids fake citizens, ballot imagery, party symbols, and official-looking seals.",
    },
    {
      title: "Privacy flow visual",
      src: "/visuals/trust-flow.svg",
      alt: "Diagram showing identity check, eligibility token, preference record, and aggregate public output kept separate.",
      note: "A safer visual than civic crowd scenes: it explains identity separation without implying a live backend or official election process.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10" aria-labelledby="visual-evidence-heading">
      <div className="rounded-[2.4rem] border border-[var(--line)] bg-[rgba(255,250,241,0.8)] p-5 shadow-[0_24px_90px_rgba(7,22,19,0.08)] sm:p-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--civic)]">Generated site visuals</p>
            <h2 id="visual-evidence-heading" className="mt-3 font-serif text-3xl font-black tracking-[-0.06em] text-[var(--ink)] sm:text-4xl">Use product diagrams, not political theatre.</h2>
          </div>
          <p className="max-w-xl text-sm font-semibold leading-6 text-[var(--slate)]">
            These generated assets are intentionally illustrative product graphics. They are not photos from a pilot, not official election material, and not live participation data.
          </p>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {visuals.map((visual) => (
            <figure key={visual.src} className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white/72">
              <Image src={visual.src} alt={visual.alt} width={1440} height={960} loading="lazy" className="aspect-[3/2] w-full object-cover" />
              <figcaption className="border-t border-[var(--line)] p-4">
                <p className="font-black text-[var(--ink)]">{visual.title}</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-[var(--slate)]">{visual.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
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
              <a href="#take-part">Take part</a>
              <a href="#pilot">Pilot</a>
            </div>
            <a href="mailto:miccy@arusdigital.com?subject=Review%20WakilKita%20Pandan%20pilot" className="rounded-full bg-[var(--civic)] px-4 py-2 text-sm font-bold text-white shadow-[0_10px_30px_rgba(15,107,77,0.26)] transition hover:bg-[var(--civic-dark)]">
              Request review
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
                WakilKita now starts with one constituency: P100 Pandan. Residents and community teams can nominate representative profiles, claim profile ownership, and submit issue priorities without sending IC or eKYC data through the site.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#take-part" className="rounded-full bg-[var(--ink)] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.12em] text-[var(--mint)] shadow-[0_20px_60px_rgba(7,22,19,0.22)]">
                  Start Pandan intake
                </a>
                <a href="#constituency" className="rounded-full border border-[var(--line)] bg-[rgba(255,250,241,0.7)] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.12em] text-[var(--ink)]">
                  Review Pandan data
                </a>
              </div>
            </div>
            <ProductPreview />
          </div>
        </section>

        <VisualEvidencePanel />

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

        <PandanConstituencyExplorer />

        <WakilKitaActionPanel />

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
                Request pilot review
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-[var(--line)] bg-[rgba(255,250,241,0.72)] px-5 py-8 text-sm leading-6 text-[var(--slate)] sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[1fr_1.4fr]">
            <p className="font-black text-[var(--ink)]">Independent Pandan civic prototype</p>
            <div className="space-y-2">
              <p>WakilKita is independent and is not affiliated with SPR, the Malaysian government, any political party, candidate, or election authority.</p>
              <p>This MVP does not ask for or transmit IC/eKYC data through the site. Intake starts as a user-controlled email draft and should not contain personal or sensitive details. Any real Pandan pilot must publish privacy, verification, dispute, retention, and deletion policies before collecting resident information.</p>
              <p>Individual preferences must never be public, sold, or shared as supporter lists. Public results should be aggregate-only and threshold-protected.</p>
              <p><a className="font-black text-[var(--civic-dark)] underline" href="mailto:miccy@arusdigital.com?subject=WakilKita%20Pandan%20report%20or%20takedown">Report impersonation, dispute a nomination, or request takedown.</a></p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

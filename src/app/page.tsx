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
  "We do not collect IC numbers through this page",
  "We do not publish individual support choices or supporter lists",
  "Identity records must stay separated from support-signal records",
  "Verified backing is future pilot functionality, not live today",
  "Public totals require minimum thresholds and dispute rules",
  "Every count-changing admin action should produce an audit event",
];

const afterSubmitSteps = [
  ["1", "Review for Pandan relevance", "Next step: manually review whether the nomination, claim request, or issue priority clearly relates to P100 Pandan before anything public is considered."],
  ["2", "Remove sensitive details", "Private allegations, addresses, IC numbers, and unnecessary personal data should never become public profile material."],
  ["3", "Open verified backing later", "One verified private support signal per eligible resident comes only after privacy, dispute, and verification rules are published."],
];

const profilePromise = [
  "Public service profile with clear claimed/unclaimed status",
  "Priority issues the representative says they will address",
  "Evidence of community work, source notes, and correction path",
  "Aggregate participant support only when verification and thresholds are ready",
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
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--mint)]">Pandan private intake</p>
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
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--slate)]">Profile and issue submissions start as private intake. Nothing becomes public without manual review, consent checks where needed, and dispute handling.</p>
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
      note: "A product visual for Pandan data review. It avoids fake citizens, ballot imagery, party symbols, and official-looking seals.",
    },
    {
      title: "Privacy flow visual",
      src: "/visuals/trust-flow.svg",
      alt: "Diagram showing identity check, eligibility token, preference record, and aggregate public output kept separate.",
      note: "A safer visual than civic crowd scenes: it explains identity separation without implying a live backend or public authority process.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10" aria-labelledby="visual-evidence-heading">
      <div className="rounded-[2.4rem] border border-[var(--line)] bg-[rgba(255,250,241,0.8)] p-5 shadow-[0_24px_90px_rgba(7,22,19,0.08)] sm:p-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--civic)]">Trust model visuals</p>
            <h2 id="visual-evidence-heading" className="mt-3 font-serif text-3xl font-black tracking-[-0.06em] text-[var(--ink)] sm:text-4xl">Diagrams only after the resident action.</h2>
          </div>
          <p className="max-w-xl text-sm font-semibold leading-6 text-[var(--slate)]">
            These generated assets are intentionally illustrative product graphics. They are not photos from a pilot, not public authority material, and not live participation data.
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

function AfterSubmitSection() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10" aria-labelledby="after-submit-heading">
      <div className="rounded-[2.2rem] border border-[var(--line)] bg-[var(--paper)] p-5 shadow-[0_24px_90px_rgba(7,22,19,0.08)] sm:p-7">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--civic)]">After you submit</p>
          <h2 id="after-submit-heading" className="mt-3 font-serif text-3xl font-black tracking-[-0.06em] text-[var(--ink)] sm:text-4xl">Private intake first. Public signal later.</h2>
          <p className="mt-4 text-base font-semibold leading-7 text-[var(--slate)]">
            Submitting a nomination or priority does not create an instant public profile or count. The next job is manual review: keep private details out, confirm consent where needed, and prepare the rules for verified backing.
          </p>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {afterSubmitSteps.map(([num, title, body]) => (
            <article key={title} className="rounded-3xl border border-[var(--line)] bg-white/72 p-5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--ink)] text-sm font-black text-[var(--mint)]">{num}</span>
              <h3 className="mt-4 text-xl font-black tracking-[-0.04em] text-[var(--ink)]">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--slate)]">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RepresentativeProfilePromise() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10" aria-labelledby="profile-promise-heading">
      <div className="grid gap-5 rounded-[2.2rem] border border-[var(--line)] bg-[rgba(221,247,232,0.36)] p-5 shadow-[0_24px_90px_rgba(7,22,19,0.07)] sm:p-7 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--civic)]">Representative profiles</p>
          <h2 id="profile-promise-heading" className="mt-3 font-serif text-3xl font-black tracking-[-0.06em] text-[var(--ink)] sm:text-4xl">What a nomination can become.</h2>
          <p className="mt-4 text-base font-semibold leading-7 text-[var(--slate)]">
            A WakilKita representative is a community-nominated person who may agree to be listed with local priorities, public evidence, and later aggregate verified backing. It does not mean candidacy, party endorsement, or an official role.
          </p>
          <div className="mt-5 rounded-3xl bg-[var(--ink)] p-4 text-white">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--mint)]">Current public profile status</p>
            <p className="mt-2 text-lg font-black tracking-[-0.03em]">No public representative profiles yet. Nominate someone serving Pandan.</p>
          </div>
        </div>
        <div className="grid content-start gap-3 sm:grid-cols-2">
          {profilePromise.map((item) => (
            <div key={item} className="rounded-3xl border border-[rgba(15,107,77,0.18)] bg-[var(--paper)] p-5">
              <p className="text-base font-black leading-6 text-[var(--ink)]">{item}</p>
            </div>
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
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--civic)]">P100 Pandan intake</span>
              </span>
            </a>
            <div className="hidden items-center gap-6 text-sm font-semibold text-[var(--slate)] md:flex">
              <a href="#take-part">Nominate</a>
              <a href="#take-part">Submit priority</a>
              <a href="#how-it-works">How it works</a>
              <a href="#trust">Trust & privacy</a>
            </div>
            <a href="#take-part" className="rounded-full bg-[var(--civic)] px-4 py-2 text-sm font-bold text-white shadow-[0_10px_30px_rgba(15,107,77,0.26)] transition hover:bg-[var(--civic-dark)]">
              Nominate someone
            </a>
          </nav>

          <div id="top" className="grid items-center gap-10 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-14">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-[rgba(15,107,77,0.24)] bg-[rgba(221,247,232,0.72)] px-4 py-2 text-sm font-bold text-[var(--civic-dark)]">
                P100 Pandan only. Private intake first. No IC/eKYC collected here.
              </div>
              <h1 className="max-w-4xl font-serif text-5xl font-black leading-[1.06] tracking-[-0.07em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
                Nominate people serving P100 Pandan.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--slate)] sm:text-xl">
                Submit a local representative, request a profile claim review, or share the issue Pandan should prioritise first. WakilKita starts with private intake before verified resident support signals go live.
              </p>
              <p className="mt-4 max-w-2xl text-sm font-bold leading-6 text-[var(--civic-dark)]">
                Not online voting. Not SPR-affiliated. Not a party tool. No public supporter lists.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#take-part" className="rounded-full bg-[var(--ink)] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.12em] text-[var(--mint)] shadow-[0_20px_60px_rgba(7,22,19,0.22)]">
                  Nominate someone
                </a>
                <a href="#take-part" className="rounded-full border border-[var(--line)] bg-[rgba(255,250,241,0.7)] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.12em] text-[var(--ink)]">
                  Submit a priority
                </a>
              </div>
            </div>
            <ProductPreview />
          </div>
        </section>

        <WakilKitaActionPanel />

        <AfterSubmitSection />

        <RepresentativeProfilePromise />

        <section id="trust" className="border-y border-[var(--line)] bg-[rgba(255,250,241,0.58)] py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--civic)]">How trust works</p>
              <h2 className="mt-4 font-serif text-4xl font-black tracking-[-0.06em] text-[var(--ink)] sm:text-5xl">Simple rules before public counts.</h2>
              <p className="mt-5 text-lg leading-8 text-[var(--slate)]">
                WakilKita should earn trust by making the current state obvious: private intake is live, verified backing is not. No blockchain theatre, no public supporter lists, no hidden identity-to-support linkage.
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

        <VisualEvidencePanel />

        <footer className="border-t border-[var(--line)] bg-[rgba(255,250,241,0.72)] px-5 py-8 text-sm leading-6 text-[var(--slate)] sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[1fr_1.4fr]">
            <p className="font-black text-[var(--ink)]">Independent Pandan civic prototype</p>
            <div className="space-y-2">
              <p>WakilKita is independent and is not affiliated with SPR, the Malaysian government, any political party, candidate, or election authority.</p>
              <p>This site does not ask for or transmit IC/eKYC data through the page. Intake starts as a user-controlled email draft and should not contain personal or sensitive details. Any real Pandan pilot must publish privacy, verification, dispute, retention, and deletion policies before collecting resident information.</p>
              <p>Individual preferences must never be public, sold, or shared as supporter lists. Public aggregate output should be threshold-protected and never expose individual support choices.</p>
              <p><a className="font-black text-[var(--civic-dark)] underline" href="mailto:miccy@arusdigital.com?subject=WakilKita%20Pandan%20report%20or%20takedown">Report impersonation, dispute a nomination, or request takedown.</a></p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

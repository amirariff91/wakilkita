import Image from "next/image";
import { PandanConstituencyExplorer } from "./PandanConstituencyExplorer";
import { WakilKitaActionPanel } from "./WakilKitaActionPanel";

const pilotFacts = [
  ["Open now", "P100 Pandan", "Private nominations and issue submissions are open"],
  ["Interest open", "P105 Petaling Jaya", "Residents can submit nominations and local priorities"],
  ["Interest open", "P122 Seputeh", "Use the form to put a local name or issue on record"],
  ["Under review", "P120 Bukit Bintang", "Collecting local signals before opening a wider intake"],
];

const constituencyOptions = [
  {
    code: "P100",
    name: "Pandan",
    region: "Selangor",
    status: "Open now",
    note: "Submit a person, issue, or profile claim for manual review.",
  },
  {
    code: "P105",
    name: "Petaling Jaya",
    region: "Selangor",
    status: "Interest open",
    note: "Add local nominations and priorities so we can see where resident demand is real.",
  },
  {
    code: "P122",
    name: "Seputeh",
    region: "Kuala Lumpur",
    status: "Interest list",
    note: "Submit names and priorities before any public profile goes up.",
  },
  {
    code: "P120",
    name: "Bukit Bintang",
    region: "Kuala Lumpur",
    status: "Under review",
    note: "Open for issue submissions while we check residency and abuse risks.",
  },
];

const issuePriorityCards = [
  {
    title: "Mobility and walkability",
    body: "Nominate someone who can help with last-mile transit, safer crossings, parking pressure, or disabled access.",
  },
  {
    title: "Council response and maintenance",
    body: "Name the person or team who can push for faster fixes, cleaner reporting, and better contractor follow-through.",
  },
  {
    title: "Cost of living and local services",
    body: "Tell us which local services are getting harder to reach or afford, and who residents already trust to help.",
  },
  {
    title: "Youth and family needs",
    body: "Bring forward people already helping families, schools, youth groups, or local associations.",
  },
];

const safeguards = [
  "We do not collect IC numbers through this page",
  "We do not publish individual support choices or supporter lists",
  "Identity records must stay separated from support-signal records",
  "Verified backing opens only after privacy and dispute rules are published",
  "Public totals need minimum thresholds and dispute rules",
  "Every review decision needs an audit trail",
];

const afterSubmitSteps = [
  ["1", "Check the constituency", "We review whether the name, issue, or claim belongs to the submitted constituency."],
  ["2", "Clean the submission", "We remove addresses, IC numbers, private allegations, and unnecessary personal data before any public use."],
  ["3", "Contact before publishing", "Named people are contacted before a public profile appears. Verified backing comes only after the rules are published."],
];

type NomineePreviewStatus = "unclaimed" | "claimed" | "future";

const nomineePreviewCards: Array<{
  initials: string;
  label: string;
  constituency: string;
  status: NomineePreviewStatus;
  statusLabel: string;
  priorities: string[];
  evidenceNote: string;
  disclaimer: string;
}> = [
  {
    initials: "??",
    label: "New nomination",
    constituency: "P100 Pandan",
    status: "unclaimed",
    statusLabel: "In review",
    priorities: ["Mobility and walkability", "Council response time"],
    evidenceNote: "A resident has submitted this for review. The person has not been contacted yet.",
    disclaimer: "Example state. Real records stay private until review is complete.",
  },
  {
    initials: "WK",
    label: "Claimed profile",
    constituency: "P100 Pandan",
    status: "claimed",
    statusLabel: "Consent recorded",
    priorities: ["Mobility and walkability", "Cost of living and local services", "Youth and family needs"],
    evidenceNote: "The profile owner has named their priorities and provided source notes.",
    disclaimer: "Real profiles appear only after consent.",
  },
  {
    initials: "WK",
    label: "Verified backing",
    constituency: "P105 Petaling Jaya",
    status: "future",
    statusLabel: "Rules required",
    priorities: ["Council response and maintenance"],
    evidenceNote: "Aggregate backing is shown only after verification, thresholds, and dispute handling are ready.",
    disclaimer: "This opens only after verification rules are published.",
  },
];

const previewStatusStyles: Record<NomineePreviewStatus, { avatar: string; badge: string }> = {
  unclaimed: {
    avatar: "bg-[rgba(7,22,19,0.08)] text-[var(--slate)]",
    badge: "bg-[rgba(217,154,30,0.12)] text-[var(--amber-text)]",
  },
  claimed: {
    avatar: "bg-[var(--ink)] text-[var(--mint)]",
    badge: "bg-[rgba(15,107,77,0.09)] text-[var(--civic-dark)]",
  },
  future: {
    avatar: "bg-[var(--civic)] text-white",
    badge: "border border-dashed border-[rgba(51,65,61,0.32)] bg-[rgba(7,22,19,0.05)] text-[var(--slate)]",
  },
};

function TrustArchitectureDiagram() {
  const steps = [
    ["1", "Identity check", "When verification opens, an IC/eKYC provider checks eligibility. WakilKita keeps that identity check separate from public output."],
    ["2", "Eligibility token", "The system confirms the participant belongs to the constituency, then issues a one-use eligibility token."],
    ["3", "Support record", "The token records one support signal. The support table does not store IC or raw identity details."],
    ["4", "Public summary", "Only threshold-protected summaries are shown publicly, with audit logs and a dispute path."],
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
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--mint)]">Malaysia constituency intake</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.06em]">WakilKita</h2>
            <p className="mt-2 text-sm font-bold text-white/70">Choose a constituency · submit a name or issue · track what needs review</p>
          </div>
          <span className="rounded-full bg-[rgba(221,247,232,0.14)] px-3 py-2 text-xs font-black text-[var(--mint)]">private intake</span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {pilotFacts.map(([label, value, source]) => (
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
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--civic)]">Current intake flow</p>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.05em]">Start with the local problem.</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--slate)]">Submissions are open for local names, profile claims, and issue priorities. We review them before anything becomes public.</p>
            </div>
            <div className="rounded-2xl bg-[var(--mint)] px-4 py-3 text-center">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[var(--civic-dark)]">Public profiles</p>
              <p className="text-lg font-black leading-tight">need consent</p>
            </div>
          </div>
          <div className="mt-5 grid gap-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--civic-dark)] sm:grid-cols-3">
            <span className="rounded-full bg-[rgba(15,107,77,0.08)] px-3 py-2 text-center">Nominate</span>
            <span className="rounded-full bg-[rgba(15,107,77,0.08)] px-3 py-2 text-center">Review</span>
            <span className="rounded-full bg-[rgba(15,107,77,0.08)] px-3 py-2 text-center">Contact</span>
          </div>
          <p className="mt-3 text-xs font-semibold text-[var(--slate)]">No rankings, copied profiles, or public totals. Named people are contacted before a public profile goes up.</p>
        </div>
      </div>
    </div>
  );
}

function ConstituencySelector() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10" aria-labelledby="constituency-selector-heading">
      <div className="rounded-[2.4rem] border border-[var(--line)] bg-[rgba(255,250,241,0.86)] p-5 shadow-[0_24px_90px_rgba(7,22,19,0.08)] sm:p-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--civic)]">Constituencies</p>
            <h2 id="constituency-selector-heading" className="mt-3 font-serif text-3xl font-black tracking-[-0.06em] text-[var(--ink)] sm:text-4xl">Open constituencies and interest areas.</h2>
          </div>
          <p className="max-w-xl text-sm font-semibold leading-6 text-[var(--slate)]">
            Start with the seat, the issue, and the person residents already trust. Public profiles only appear after contact and consent.
          </p>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-4">
          {constituencyOptions.map((item) => (
            <article key={item.code} className="rounded-3xl border border-[var(--line)] bg-white/72 p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--amber-text)]">{item.code}</p>
                <span className="rounded-full bg-[rgba(15,107,77,0.09)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[var(--civic-dark)]">{item.status}</span>
              </div>
              <h3 className="mt-4 text-2xl font-black tracking-[-0.05em] text-[var(--ink)]">{item.name}</h3>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--civic)]">{item.region}</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-[var(--slate)]">{item.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function IssuePriorityCarousel() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10" aria-labelledby="issue-carousel-heading">
      <div className="rounded-[2.4rem] border border-[var(--line)] bg-[rgba(221,247,232,0.34)] p-5 shadow-[0_24px_90px_rgba(7,22,19,0.07)] sm:p-7">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--civic)]">Local priorities</p>
          <h2 id="issue-carousel-heading" className="mt-3 font-serif text-3xl font-black tracking-[-0.06em] text-[var(--ink)] sm:text-4xl">Tell us what needs fixing, then who can help.</h2>
          <p className="mt-4 text-base font-semibold leading-7 text-[var(--slate)]">
            Use these prompts to submit a name or issue. Named people stay private until we contact them and give them a correction path.
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Local priority cards">
          {issuePriorityCards.map((item) => (
            <article key={item.title} className="flex min-h-[20rem] flex-col rounded-3xl border border-[rgba(15,107,77,0.18)] bg-[var(--paper)] p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--amber-text)]">Local issue</p>
              <h3 className="mt-3 text-2xl font-black tracking-[-0.05em] text-[var(--ink)]">{item.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-[var(--slate)]">{item.body}</p>
              <a href="#take-part" className="mt-auto inline-flex rounded-full bg-[var(--ink)] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--mint)]">Nominate someone for this</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisualEvidencePanel() {
  const visuals = [
    {
      title: "Pandan intake view",
      src: "/visuals/generated/wakilkita-pandan-map-intake.webp",
      alt: "Abstract map of P100 Pandan with intake and local issue review cards.",
      note: "A neutral view of constituency intake. No real residents, party marks, government seals, or live participation data are shown.",
    },
    {
      title: "Privacy architecture",
      src: "/visuals/generated/wakilkita-privacy-architecture.webp",
      alt: "Abstract privacy architecture visual showing separated systems, token-like shapes, data stores, and aggregate chart blocks.",
      note: "Shows the separation between identity, eligibility, and aggregate signals.",
    },
    {
      title: "Evidence workspace",
      src: "/visuals/generated/wakilkita-evidence-workspace.webp",
      alt: "Workspace with blank priority cards, source notes, audit trail dots, and issue review blocks.",
      note: "Shows review work without inventing names, issues, or outcomes.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10" aria-labelledby="visual-evidence-heading">
      <div className="rounded-[2.4rem] border border-[var(--line)] bg-[rgba(255,250,241,0.8)] p-5 shadow-[0_24px_90px_rgba(7,22,19,0.08)] sm:p-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--civic)]">How submissions are handled</p>
            <h2 id="visual-evidence-heading" className="mt-3 font-serif text-3xl font-black tracking-[-0.06em] text-[var(--ink)] sm:text-4xl">Your submission stays private while we review it.</h2>
          </div>
          <p className="max-w-xl text-sm font-semibold leading-6 text-[var(--slate)]">
            These diagrams show the review workflow. They are not public authority material and they do not show live participation data.
          </p>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
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
          <h2 id="after-submit-heading" className="mt-3 font-serif text-3xl font-black tracking-[-0.06em] text-[var(--ink)] sm:text-4xl">First we review. Then we publish carefully.</h2>
          <p className="mt-4 text-base font-semibold leading-7 text-[var(--slate)]">
            Submitting a name or priority does not create an instant public profile or count. We review the details, remove sensitive information, and contact named people before anything public appears.
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
      <div className="rounded-[2.2rem] border border-[var(--line)] bg-[rgba(221,247,232,0.36)] p-5 shadow-[0_24px_90px_rgba(7,22,19,0.07)] sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--civic)]">Representative profile states</p>
            <h2 id="profile-promise-heading" className="mt-3 font-serif text-3xl font-black tracking-[-0.06em] text-[var(--ink)] sm:text-4xl">What a public profile can look like.</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-[var(--slate)]">
              These examples show the states a submission can move through. They use placeholders because real profiles require consent, source notes, and a correction path.
            </p>
          </div>
          <div className="rounded-3xl bg-[var(--ink)] p-4 text-white lg:max-w-xs">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--mint)]">Public profile status</p>
            <p className="mt-2 text-lg font-black tracking-[-0.03em]">No public representative profiles yet. Submit a name and we will review it.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {nomineePreviewCards.map((card) => {
            const style = previewStatusStyles[card.status];

            return (
              <article key={`${card.label}-${card.constituency}`} className="flex min-h-[31rem] flex-col rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[0_18px_60px_rgba(7,22,19,0.08)]">
                <div className={`mx-auto grid h-20 w-20 place-items-center rounded-full ${style.avatar}`} aria-hidden="true">
                  <span className="text-2xl font-black tracking-[-0.04em]">{card.initials}</span>
                </div>
                <span className={`mt-4 self-center rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] ${style.badge}`}>
                  {card.statusLabel}
                </span>
                <h3 className="mt-5 text-center text-2xl font-black tracking-[-0.05em] text-[var(--ink)]">{card.label}</h3>
                <p className="mt-1 text-center text-xs font-black uppercase tracking-[0.16em] text-[var(--civic)]">{card.constituency}</p>

                <div className="mt-5 flex flex-col gap-2">
                  {card.priorities.map((priority) => (
                    <span key={priority} className="rounded-2xl bg-[rgba(15,107,77,0.07)] px-4 py-2.5 text-sm font-bold leading-5 text-[var(--ink)]">
                      {priority}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm font-semibold leading-6 text-[var(--slate)]">{card.evidenceNote}</p>
                <p className="mt-auto pt-6 text-xs font-bold leading-5 text-[var(--slate)]">{card.disclaimer}</p>
              </article>
            );
          })}
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
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--civic)]">Constituency intake</span>
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
                Private intake is open. Do not enter IC/eKYC details here.
              </div>
              <h1 className="max-w-4xl font-serif text-5xl font-black leading-[1.06] tracking-[-0.07em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
                Nominate people serving your constituency.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--slate)] sm:text-xl">
                Submit a local representative, request a profile claim review, or record the issue your area should fix first. WakilKita starts with private review before any public support signal.
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

        <ConstituencySelector />

        <WakilKitaActionPanel />

        <IssuePriorityCarousel />

        <AfterSubmitSection />

        <RepresentativeProfilePromise />

        <section id="trust" className="border-y border-[var(--line)] bg-[rgba(255,250,241,0.58)] py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--civic)]">How trust works</p>
              <h2 className="mt-4 font-serif text-4xl font-black tracking-[-0.06em] text-[var(--ink)] sm:text-5xl">Simple rules before public counts.</h2>
              <p className="mt-5 text-lg leading-8 text-[var(--slate)]">
                Trust starts with clear limits. Intake is open. Verified backing opens only after the rules are published. No public supporter lists, no hidden identity-to-support linkage, and no blockchain claims.
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
            <p className="font-black text-[var(--ink)]">Independent civic intake</p>
            <div className="space-y-2">
              <p>WakilKita is independent and is not affiliated with SPR, the Malaysian government, any political party, candidate, or election authority.</p>
              <p>This site does not ask for or transmit IC/eKYC data through the page. Intake starts as a user-controlled email draft. It must not contain personal or sensitive details. WakilKita must publish privacy, verification, dispute, retention, and deletion policies before collecting resident information beyond this email-based intake.</p>
              <p>Individual preferences must never be public, sold, or shared as supporter lists. Public aggregate output needs threshold protection and must never expose individual support choices.</p>
              <p><a className="font-black text-[var(--civic-dark)] underline" href="mailto:miccy@arusdigital.com?subject=WakilKita%20report%20or%20takedown">Report impersonation, dispute a nomination, or request takedown.</a></p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

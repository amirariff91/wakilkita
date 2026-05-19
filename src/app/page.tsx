import { WakilKitaActionPanel } from "./WakilKitaActionPanel";
import { WakilKitaMark, P105LineMotif } from "./WakilKitaMark";

const boundaryChips = [
  "Not online voting",
  "Not SPR-affiliated",
  "Independent of parties",
  "Email-only intake",
  "No IC/eKYC here",
];

const intakeFacts = [
  {
    label: "Open now",
    value: "P105 Petaling Jaya",
    note: "Private nominations and local issue submissions are open",
  },
  {
    label: "Accepting",
    value: "Local nominations",
    note: "Submit one trusted person, one issue, and a factual reason",
  },
  {
    label: "Not collecting",
    value: "IC/eKYC data",
    note: "Do not send IC numbers, addresses, or sensitive details",
  },
];

const reviewSteps = [
  {
    n: "1",
    title: "Receive the draft",
    body: "Your email draft arrives as a standard email. No data is uploaded from this page to a WakilKita server.",
  },
  {
    n: "2",
    title: "Check constituency scope",
    body: "We confirm the name, issue, or claim belongs to P105 Petaling Jaya.",
  },
  {
    n: "3",
    title: "Remove unsafe or private details",
    body: "Addresses, IC numbers, private allegations, and unnecessary personal data are removed before any public use.",
  },
  {
    n: "4",
    title: "Contact before public profile",
    body: "Named people are contacted and may request correction or removal before any public profile is considered.",
  },
];

const privacyBlocks = [
  {
    heading: "Contact details stay private during review",
    body: "Your reply contact is used only to follow up on your submission. It is not published, not shared with named persons, and not visible publicly.",
  },
  {
    heading: "Individual submissions are not public",
    body: "Nothing is published automatically. Submissions remain private until manually reviewed.",
  },
  {
    heading: "No supporter lists sold or shared",
    body: "WakilKita does not sell, share, or transfer submission records to parties, candidates, employers, representative offices, or campaigns.",
  },
  {
    heading: "No public totals in this phase",
    body: "The current intake phase does not show counts, rankings, lists, or popularity indicators. The only action here is a private email draft for manual review.",
  },
];

function IntakeDeskPanel() {
  return (
    <aside
      className="border border-[var(--line)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      aria-label="Before submitting"
    >
      <div className="border-b border-[var(--line)] px-6 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
          P105 Petaling Jaya intake
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[var(--ink)]">
          Before you submit
        </h2>
      </div>
      <div className="divide-y divide-[var(--line)]">
        {intakeFacts.map(({ label, value, note }) => (
          <div key={label} className="flex gap-4 px-6 py-4">
            <span className="w-28 shrink-0 pt-0.5 text-xs font-bold uppercase tracking-[0.06em] text-[var(--accent)]">
              {label}
            </span>
            <div>
              <p className="text-base font-bold text-[var(--ink)]">{value}</p>
              <p className="mt-0.5 text-sm leading-5 text-[var(--slate)]">{note}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--line)] px-6 py-4">
        <p className="text-sm leading-6 text-[var(--slate)]">
          This page opens an email draft. You can review it before sending. Nothing is uploaded to a WakilKita server from this page.
        </p>
      </div>
      <div className="px-6 pb-4 text-[var(--civic)]">
        <P105LineMotif />
      </div>
    </aside>
  );
}

function WhatIsSection() {
  const isItems = [
    "Private P105 civic intake, manually reviewed",
    "A way to submit a name, correction, or local priority",
    "Independent from parties, candidates, government, and SPR",
    "Email-only intake — nothing automatic, nothing instant",
  ];

  const isNotItems = [
    "Not online voting",
    "Not IC/eKYC collection",
    "Not a public supporter list, ranking, or count",
  ];

  return (
    <section
      className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10"
      aria-labelledby="what-is-heading"
    >
      <div className="border border-[var(--line)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <div className="border-b border-[var(--line)] px-6 py-5">
          <h2
            id="what-is-heading"
            className="text-xl font-bold tracking-[-0.03em] text-[var(--ink)]"
          >
            What WakilKita is — and is not
          </h2>
        </div>
        <div className="grid divide-y divide-[var(--line)] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="px-6 py-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
              What this is
            </p>
            <ul className="space-y-3">
              {isItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--ink)]">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--civic)]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 py-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-[var(--slate)]">
              What this is not
            </p>
            <ul className="space-y-3">
              {isNotItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--slate)]">
                  <span
                    className="mt-1 shrink-0 font-bold leading-6 text-[var(--accent)]"
                    aria-hidden="true"
                  >
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewJourneySection() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10"
      aria-labelledby="review-journey-heading"
    >
      <div className="border border-[var(--line)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <div className="border-b border-[var(--line)] px-6 py-5 sm:px-7">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
            After you submit
          </p>
          <h2
            id="review-journey-heading"
            className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[var(--ink)] sm:text-3xl"
          >
            First we review. Then we act carefully.
          </h2>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-[var(--slate)]">
            Submitting does not create an instant public profile or count. We review details, remove sensitive information, and contact named people before anything public appears.
          </p>
        </div>
        <ol className="px-6 py-6 sm:px-7">
          {reviewSteps.map(({ n, title, body }, index) => (
            <li key={n} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="grid h-8 w-8 shrink-0 place-items-center bg-[var(--ink)] text-sm font-bold text-[var(--mint)]">
                  {n}
                </span>
                {index < reviewSteps.length - 1 && (
                  <div className="journey-connector" aria-hidden="true" />
                )}
              </div>
              <div className={index < reviewSteps.length - 1 ? "pb-6" : ""}>
                <h3 className="text-base font-bold tracking-[-0.02em] text-[var(--ink)]">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-[var(--slate)]">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PrivacyModelSection() {
  return (
    <section
      id="trust"
      className="border-y border-[var(--line)] bg-[var(--soft)] py-16"
      aria-labelledby="privacy-heading"
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
          Privacy model
        </p>
        <h2
          id="privacy-heading"
          className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl"
        >
          Plain rules before anything public.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--slate)]">
          Trust starts with a smaller promise: P105 email intake, manual review, no IC/eKYC collection on this page, and no public supporter lists. Verification and public counts are not open in the current phase.
        </p>
        <div className="mt-8 divide-y divide-[var(--line)] border border-[var(--line)] bg-white">
          {privacyBlocks.map(({ heading, body }) => (
            <div key={heading} className="px-6 py-5">
              <p className="text-sm font-bold text-[var(--ink)]">{heading}</p>
              <p className="mt-1.5 text-sm leading-6 text-[var(--slate)]">{body}</p>
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
          <nav className="flex items-center justify-between border-b border-[var(--line)] bg-white px-4 py-3">
            <a href="#top" className="flex items-center gap-3" aria-label="WakilKita home">
              <span className="grid h-10 w-10 shrink-0 place-items-center bg-[var(--ink)] text-[var(--mint)]">
                <WakilKitaMark size={28} />
              </span>
              <span>
                <span className="block text-base font-bold tracking-[-0.03em] text-[var(--ink)]">
                  WakilKita
                </span>
                <span className="block text-xs font-semibold text-[var(--civic)]">
                  P105 Petaling Jaya
                </span>
              </span>
            </a>
            <div className="hidden items-center gap-6 text-sm font-semibold text-[var(--slate)] md:flex">
              <a href="#take-part">Start intake</a>
              <a href="#how-it-works">Review process</a>
              <a href="#trust">Privacy model</a>
            </div>
            <a
              href="#take-part"
              className="bg-[var(--civic)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--civic-dark)]"
            >
              Start intake
            </a>
          </nav>

          <div
            id="top"
            className="grid items-start gap-10 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-14"
          >
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                {boundaryChips.map((chip) => (
                  <span
                    key={chip}
                    className="border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-bold text-[var(--civic-dark)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
                Submit a Petaling Jaya nomination or local issue for review.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slate)] sm:text-xl">
                For P105 residents: send a trusted local name, a profile correction, or a local priority. Nothing becomes public without manual review and consent.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#take-part"
                  className="bg-[var(--ink)] px-6 py-4 text-center text-sm font-bold text-[var(--mint)] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                >
                  Start private intake
                </a>
                <a
                  href="#take-part"
                  className="border border-[var(--line)] bg-white px-6 py-4 text-center text-sm font-bold text-[var(--ink)]"
                >
                  Submit local issue
                </a>
              </div>
            </div>
            <IntakeDeskPanel />
          </div>
        </section>

        <WakilKitaActionPanel />

        <WhatIsSection />

        <ReviewJourneySection />

        <PrivacyModelSection />

        <footer className="border-t border-[var(--line)] bg-[rgba(255,250,241,0.72)] px-5 py-10 text-sm leading-6 text-[var(--slate)] sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="font-bold text-[var(--ink)]">Independent civic intake</p>
              <p className="mt-1 text-xs text-[var(--slate)]">P105 Petaling Jaya · Email-only</p>
            </div>
            <div className="space-y-3">
              <p>
                WakilKita is independent and is not affiliated with SPR, the Malaysian government, any political party, candidate, or election authority.
              </p>
              <p>
                This site does not ask for or transmit IC/eKYC data through the page. Intake starts as a user-controlled email draft. It must not contain personal or sensitive details.
              </p>
              <p>
                WakilKita must publish privacy, verification, dispute, retention, and deletion policies before collecting resident information beyond this email-based intake. Individual preferences must never be public, sold, or shared as supporter lists.
              </p>
              <p>
                No public counts, rankings, or supporter lists are shown in this phase.
              </p>
              <p>
                <a
                  className="font-bold text-[var(--civic-dark)] underline"
                  href="mailto:miccy@arusdigital.com?subject=WakilKita%20report%20or%20takedown"
                >
                  Report impersonation, dispute a nomination, or request takedown.
                </a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

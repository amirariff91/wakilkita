import { WakilKitaActionPanel } from "./WakilKitaActionPanel";
import { WakilKitaMark, P105LineMotif } from "./WakilKitaMark";

const boundaryChips = [
  "Not an official election",
  "Not affiliated with SPR",
  "Independent from political parties",
  "Review queue",
  "No IC/eKYC in public submissions",
];

const intakeFacts = [
  {
    label: "Open now",
    value: "P105 Petaling Jaya",
    note: "Nominations, endorsements, and local priorities are open",
  },
  {
    label: "Accepting",
    value: "Nominate or endorse",
    note: "Name the person you trust and give a clear public reason",
  },
  {
    label: "Routed to",
    value: "Review queue",
    note: "Every submission is reviewed before anything is shown publicly",
  },
];

const reviewSteps = [
  {
    n: "1",
    title: "Record the submission",
    body: "Your nomination, endorsement, or issue enters the review queue immediately.",
  },
  {
    n: "2",
    title: "Check constituency scope",
    body: "We check that the name, issue, or claim belongs to P105 Petaling Jaya.",
  },
  {
    n: "3",
    title: "Remove unsafe or private details",
    body: "IC numbers, addresses, private allegations, and unnecessary personal details are removed before public review.",
  },
  {
    n: "4",
    title: "Contact before public profile",
    body: "Named people may be contacted for consent, correction, or removal before any public profile appears.",
  },
];

const privacyBlocks = [
  {
    heading: "Contact details stay private",
    body: "Your reply contact is used only for follow-up. It is not published or shown in the public tally.",
  },
  {
    heading: "Review first, public later",
    body: "Submissions go through review before they can appear publicly. Only approved, consent-safe information is shown.",
  },
  {
    heading: "No supporter lists sold or shared",
    body: "WakilKita does not sell, share, or transfer submission records to parties, candidates, employers, representative offices, or campaigns.",
  },
  {
    heading: "No public totals in this phase",
    body: "Public counts, rankings, and popularity indicators stay closed until the verification method is clear.",
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
          Before you send
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
          After you submit, it enters review. It must pass consent and privacy checks before anything public appears.
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
    "A P105 nomination and local-priority intake, manually reviewed",
    "A way to nominate or endorse a local person you trust",
    "Independent from parties, candidates, government, and SPR",
    "Review first — nothing public without checks",
  ];

  const isNotItems = [
    "Not an official election",
    "Not public IC/eKYC collection",
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
            What WakilKita is — and what it is not
          </h2>
        </div>
        <div className="grid divide-y divide-[var(--line)] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="px-6 py-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
              What it is
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
              What it is not
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
            First review. Then public action.
          </h2>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-[var(--slate)]">
            A submission does not create an instant public profile or count. Details are reviewed, sensitive information is removed, and named people may be contacted before anything public appears.
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
          Trust rules
        </p>
        <h2
          id="privacy-heading"
          className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl"
        >
          Clear rules before anything goes public.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--slate)]">
          Trust starts with simple rules: manual review, no IC/eKYC in public submissions, no public supporter lists, and no public counts until verification is ready.
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
              <a href="#take-part">Nominate</a>
              <a href="/dashboard">Review queue</a>
              <a href="#how-it-works">How review works</a>
              <a href="#trust">Trust rules</a>
            </div>
            <a
              href="#take-part"
              className="bg-[var(--civic)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--civic-dark)]"
            >
              Nominate
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
                Let Petaling Jaya voters name the local people they trust.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slate)] sm:text-xl">
                For P105 residents: nominate or endorse a local person you believe should represent the area. Every submission is reviewed before anything appears publicly.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#take-part"
                  className="bg-[var(--ink)] px-6 py-4 text-center text-sm font-bold text-[var(--mint)] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                >
                  Nominate a local rep
                </a>
                <a
                  href="/dashboard"
                  className="border border-[var(--line)] bg-white px-6 py-4 text-center text-sm font-bold text-[var(--ink)]"
                >
                  View review queue
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
              <p className="font-bold text-[var(--ink)]">Independent civic nomination</p>
              <p className="mt-1 text-xs text-[var(--slate)]">P105 Petaling Jaya · Review queue</p>
            </div>
            <div className="space-y-3">
              <p>
                WakilKita is independent and is not affiliated with SPR, the Malaysian government, any political party, candidate, or election authority.
              </p>
              <p>
                This site does not collect IC/eKYC data in the nomination form. Please do not submit private or sensitive details.
              </p>
              <p>
                Before any public tally is opened, WakilKita will publish clear privacy, verification, dispute, retention, and deletion rules. Individual preferences must never be sold or shared as supporter lists.
              </p>
              <p>
                No public counts, rankings, or supporter lists are shown during this intake phase.
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

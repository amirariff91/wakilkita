import { WakilKitaActionPanel } from "./WakilKitaActionPanel";
import { CivicFooter, CivicNav } from "./civic-content";
import { P105LineMotif } from "./WakilKitaMark";

const boundaryChips = [
  "Nominate your rep",
  "eKYC required",
  "1 week nomination window",
  "Then live polling",
];

const intakeFacts = [
  {
    label: "Open now",
    value: "P105 Petaling Jaya",
    note: "Nominate one person to represent Petaling Jaya",
  },
  {
    label: "Accepting",
    value: "Verified nominations",
    note: "Nomination and voting both require eKYC",
  },
  {
    label: "Then",
    value: "Live polling",
    note: "After 7 days, verified users can vote in the live poll",
  },
];

const reviewSteps = [
  {
    n: "1",
    title: "Verify identity",
    body: "A user must pass eKYC before a nomination or vote can count.",
  },
  {
    n: "2",
    title: "Nominate your rep",
    body: "For the first week, verified P105 users submit one representative nomination and one clear reason.",
  },
  {
    n: "3",
    title: "Open live polling",
    body: "After 7 days, approved nominees move into a live poll for verified users.",
  },
  {
    n: "4",
    title: "Show clean results",
    body: "Votes can be shown publicly, but identity data, IC, and raw verification records stay private.",
  },
];

const privacyBlocks = [
  {
    heading: "eKYC gates nomination and voting",
    body: "Only verified users can nominate or vote. Verification data is kept separate from public poll data.",
  },
  {
    heading: "One week to nominate",
    body: "The first phase is nomination only. After the first week, nominations close and live polling opens.",
  },
  {
    heading: "No public voter list",
    body: "Poll totals can be public, but voter identities and verification details are not shown or shared.",
  },
  {
    heading: "Simple public promise",
    body: "Nominate first, vote later, verify both times, and keep private identity data out of public pages.",
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
          First week: verified users nominate. After that: verified users vote in a live poll. Nothing needs to be more complicated than that.
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
    "A simple P105 representative nomination flow",
    "eKYC required before nominating",
    "Live polling starts after one week",
    "eKYC required before voting",
  ];

  const isNotItems = [
    "Not a public authority service",
    "Not an election or SPR process",
    "Not a public IC, voter, or participant list",
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
            Nominate for one week. Then vote live.
          </h2>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-[var(--slate)]">
            Keep the product clear: eKYC first, one nomination per verified user, then a verified live poll after the nomination window closes.
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
          Simple rules
        </p>
        <h2
          id="privacy-heading"
          className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl"
        >
          Verify people. Keep identity private.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--slate)]">
          Trust starts with a simple rule: nomination and voting require eKYC, but IC and verification records never become public poll content.
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
          <CivicNav />

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
                Nominate your Petaling Jaya representative. After one week, live polling opens.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slate)] sm:text-xl">
                Simple: verified users nominate one rep, we review the list, then verified users vote in a live poll.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#take-part"
                  className="bg-[var(--ink)] px-6 py-4 text-center text-sm font-bold text-[var(--mint)] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                >
                  Nominate your rep
                </a>
                <a
                  href="#how-it-works"
                  className="border border-[var(--line)] bg-white px-6 py-4 text-center text-sm font-bold text-[var(--ink)]"
                >
                  How polling works
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

        <CivicFooter />
      </main>
    </>
  );
}

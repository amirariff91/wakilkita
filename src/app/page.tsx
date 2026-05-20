import { WakilKitaActionPanel } from "./WakilKitaActionPanel";
import { CivicFooter, CivicNav } from "./civic-content";
import { P105LineMotif } from "./WakilKitaMark";

const boundaryChips = [
  "Nominate someone you trust",
  "One person, one verified voice",
  "7 days to suggest names",
  "Then the community votes",
];

const intakeFacts = [
  {
    label: "Open now",
    value: "P105 Petaling Jaya",
    note: "Tell us who you trust to speak for the area",
  },
  {
    label: "Accepting",
    value: "Real people only",
    note: "A quick identity check keeps spam and repeat votes out",
  },
  {
    label: "Then",
    value: "Community poll",
    note: "After nominations close, residents can choose from the approved names",
  },
];

const reviewSteps = [
  {
    n: "1",
    title: "Confirm you are a real person",
    body: "Before your nomination counts, we ask for a quick eKYC check. This helps keep the list clean and fair.",
  },
  {
    n: "2",
    title: "Suggest someone you trust",
    body: "For 7 days, residents can put forward one name and explain why that person should be considered.",
  },
  {
    n: "3",
    title: "Vote from the approved list",
    body: "When nominations close, the approved names move into a simple poll. One verified person gets one vote.",
  },
  {
    n: "4",
    title: "Share the result, not private details",
    body: "The public can see the poll result. They do not see IC numbers, eKYC records, or the list of voters.",
  },
];

const privacyBlocks = [
  {
    heading: "One real person, one voice",
    body: "Nominations and votes need eKYC so the poll is harder to spam or game.",
  },
  {
    heading: "7 days to suggest names",
    body: "The first week is only for names. After that, the list closes and voting begins.",
  },
  {
    heading: "No public voter list",
    body: "Results can be public. Voter names, IC details, and verification records stay private.",
  },
  {
    heading: "Clear public promise",
    body: "Suggest names first. Vote after the list closes. Keep identity checks separate from public results.",
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
          For Petaling Jaya residents
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[var(--ink)]">
          How this works
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
          Start with a name. Tell us why. Once nominations close, the community votes from the approved list.
        </p>
      </div>
      <div className="px-6 pb-4 text-[var(--civic)]">
        <P105LineMotif />
      </div>
    </aside>
  );
}

function ManifestoSection() {
  return (
    <section
      className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10"
      aria-labelledby="manifesto-heading"
    >
      <div className="grid gap-0 border border-[var(--line)] bg-[var(--ink)] text-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] lg:grid-cols-[0.38fr_0.62fr]">
        <div className="border-b border-white/15 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--mint)]">
            Prinsip WakilKita
          </p>
          <h2
            id="manifesto-heading"
            className="mt-4 text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl"
          >
            Rakyat memilih wakil mereka sendiri.
          </h2>
        </div>
        <div className="space-y-5 p-6 text-base leading-8 text-white/86 sm:p-8 sm:text-lg">
          <p>Politik hari ini terlalu lama dikawal oleh struktur parti dan birokrasi.</p>
          <p>
            Calon selalunya dipilih oleh parti.
            <br />
            Rakyat hanya diberi pilihan terakhir.
          </p>
          <p>
            Kami percaya sudah tiba masanya rakyat diberi kuasa untuk menentukan sendiri siapa yang layak mewakili mereka.
          </p>
          <p>Platform ini dibina dengan satu prinsip mudah:</p>
          <ul className="space-y-2 font-bold text-white">
            <li>• Bukan parti memilih rakyat.</li>
            <li>• Rakyat memilih wakil mereka sendiri.</li>
          </ul>
          <p>
            Kami juga percaya setiap suara mesti dihargai secara adil dan telus. Bukan sekadar angka yang hilang dalam sistem politik
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatIsSection() {
  const isItems = [
    "A place to suggest who should represent Petaling Jaya",
    "A short reason for every nomination",
    "A 7-day nomination round",
    "A community poll after names are reviewed",
  ];

  const isNotItems = [
    "Not an official election",
    "Not run by SPR, Parliament, MBPJ, or any party",
    "Not a public list of IC numbers, voters, or participants",
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
            What this is — and what it is not
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
            First suggest names. Then choose together.
          </h2>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-[var(--slate)]">
            The goal is simple: collect trusted names, remove noise, and let real residents choose from a clean list.
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
          Trust and privacy
        </p>
        <h2
          id="privacy-heading"
          className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl"
        >
          We check identity so the poll stays fair — not to expose people.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--slate)]">
          A quick identity check helps stop fake or repeated entries. The public result should show the community’s choice, not anyone’s private identity.
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
                Who should represent Petaling Jaya?
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slate)] sm:text-xl">
                Suggest someone you trust. After 7 days, the approved names go into a community poll so residents can choose together.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#take-part"
                  className="bg-[var(--ink)] px-6 py-4 text-center text-sm font-bold text-[var(--mint)] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                >
                  Suggest a name
                </a>
                <a
                  href="#how-it-works"
                  className="border border-[var(--line)] bg-white px-6 py-4 text-center text-sm font-bold text-[var(--ink)]"
                >
                  See how it works
                </a>
              </div>
            </div>
            <IntakeDeskPanel />
          </div>
        </section>

        <ManifestoSection />

        <WakilKitaActionPanel />

        <WhatIsSection />

        <ReviewJourneySection />

        <PrivacyModelSection />

        <CivicFooter />
      </main>
    </>
  );
}

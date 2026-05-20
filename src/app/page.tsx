import { WakilKitaActionPanel } from "./WakilKitaActionPanel";
import { CivicFooter, CivicNav } from "./civic-content";
import { P105LineMotif } from "./WakilKitaMark";

const boundaryChips = [
  "Cadang nama yang dipercayai",
  "P105 Petaling Jaya first",
  "Review before public profile",
  "Poll only after rules are ready",
];

const intakeFacts = [
  {
    label: "Open now",
    value: "P105 Petaling Jaya",
    note: "Tell us who residents should seriously consider",
  },
  {
    label: "Accepting",
    value: "Names + reasons",
    note: "A useful nomination explains trust, local work, and issues they can champion",
  },
  {
    label: "Before public",
    value: "Review first",
    note: "We check safety, duplicates, consent needs, and privacy risk before anything appears",
  },
];

const reviewSteps = [
  {
    n: "1",
    title: "Suggest a trusted person",
    body: "Start with one name and one clear reason. Keep it factual: what they have done, who trusts them, and what local issue they can help move.",
  },
  {
    n: "2",
    title: "We review before public use",
    body: "Submissions go into a private queue first. We screen for unsafe details, duplicates, consent needs, and whether the entry belongs to P105.",
  },
  {
    n: "3",
    title: "Build a cleaner shortlist",
    body: "Approved names can become a consent-safe public shortlist. No public profile should appear just because someone typed in a name.",
  },
  {
    n: "4",
    title: "Open the poll only when trust rules are ready",
    body: "A community poll comes later, after verification, privacy thresholds, dispute handling, and methodology are clear.",
  },
];

const privacyBlocks = [
  {
    heading: "Trust starts before the poll",
    body: "The first job is to collect useful names and reasons without exposing private resident data.",
  },
  {
    heading: "No instant public profiles",
    body: "Named people need review, correction routes, and consent handling before a public profile appears.",
  },
  {
    heading: "No public participant list",
    body: "Contact details and future identity checks stay separate from any public poll or public profile.",
  },
  {
    heading: "Clear public promise",
    body: "Suggest names first. Review before public use. Publish only what can be explained and defended.",
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
          Start with the name residents already trust
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
          This is the first step: collect names worth reviewing, not publish a popularity board.
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
            Rakyat patut boleh mencadangkan wakil yang mereka percaya.
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
            Kami percaya sudah tiba masanya rakyat diberi ruang untuk mencadangkan sendiri siapa yang layak dipertimbangkan sebagai wakil komuniti.
          </p>
          <p>Platform ini dibina dengan satu prinsip mudah:</p>
          <ul className="space-y-2 font-bold text-white">
            <li>• Bukan parti menentukan semua pilihan.</li>
            <li>• Rakyat mencadangkan nama yang mereka percaya.</li>
          </ul>
          <p>
            Setiap cadangan perlu dilayan dengan adil, telus, dan berhati-hati — bukan sekadar angka yang hilang dalam sistem politik.
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatIsSection() {
  const isItems = [
    "A place to suggest who should be considered for Petaling Jaya",
    "A short public reason for every nomination",
    "A private review queue before public profiles",
    "A foundation for a future community poll with clear rules",
  ];

  const isNotItems = [
    "Not a government-run selection process or public authority service",
    "Not run by SPR, Parliament, MBPJ, or any party",
    "Not a public list of IC numbers, verification records, or participants",
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
            First collect trusted names. Then earn the right to ask more.
          </h2>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-[var(--slate)]">
            The conversion we care about now is a good nomination: one real name, one clear reason, and enough care to protect everyone involved.
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
          Trust is the product. The poll comes later.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--slate)]">
          WakilKita has to prove the intake is careful before it asks residents for stronger verification. That means no public participant lists, no instant profiles, and no public counts without a published method.
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
                Who should Petaling Jaya seriously consider?
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slate)] sm:text-xl">
                Suggest a local name you trust and explain why. WakilKita reviews each nomination before any public profile, shortlist, or community poll appears.
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

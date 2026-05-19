import { WakilKitaActionPanel } from "./WakilKitaActionPanel";

const pilotFacts = [
  ["Open now", "P105 Petaling Jaya", "Private nominations and local issue submissions are open"],
  ["Accepting", "Local nominations", "Submit one trusted person, one issue, and a factual reason"],
  ["Not collecting", "IC/eKYC data", "Do not send IC numbers, addresses, or sensitive details"],
];




const afterSubmitSteps = [
  ["1", "Check the constituency", "We review whether the name, issue, or claim belongs to the submitted constituency."],
  ["2", "Clean the submission", "We remove addresses, IC numbers, private allegations, and unnecessary personal data before any public use."],
  ["3", "Contact before publishing", "Named people are contacted before a public profile is considered. They can request correction or removal."],
];

function OperationalTrustPanel() {
  const rules = [
    "Current phase: email-only intake for P105 Petaling Jaya.",
    "Nothing is published automatically; submissions are manually reviewed first.",
    "Named people are contacted before a public profile is considered.",
    "WakilKita is not collecting votes, IC numbers, eKYC data, or public supporter lists.",
  ];

  return (
    <div className="border border-[var(--line)] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <p className="text-sm font-bold text-[var(--civic)]">Current operating rules</p>
      <ul className="mt-4 space-y-3 text-base leading-7 text-[var(--slate)]">
        {rules.map((rule) => (
          <li key={rule} className="flex gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            <span>{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductPreview() {
  return (
    <aside className="border border-[var(--line)] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]" aria-label="Before submitting">
      <p className="text-sm font-bold text-[var(--civic)]">P105 Petaling Jaya intake</p>
      <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-[var(--ink)]">Before you submit</h2>
      <div className="mt-5 grid gap-3">
        {pilotFacts.map(([label, value, source]) => (
          <div key={label} className="border border-[var(--line)] bg-[var(--soft)] p-4">
            <p className="text-xs font-semibold text-[var(--accent)]">{label}</p>
            <p className="mt-1 text-xl font-bold text-[var(--ink)]">{value}</p>
            <p className="mt-1 text-sm leading-6 text-[var(--slate)]">{source}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 border-l-2 border-[var(--accent)] pl-4 text-sm leading-6 text-[var(--slate)]">
        This page opens an email draft. You can review it before sending. Nothing is uploaded to a WakilKita server from this page.
      </p>
    </aside>
  );
}

function AfterSubmitSection() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10" aria-labelledby="after-submit-heading">
      <div className=" border border-[var(--line)] bg-[var(--paper)] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] sm:p-7">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-[var(--civic)]">After you submit</p>
          <h2 id="after-submit-heading" className="mt-3 text-3xl font-bold tracking-[-0.06em] text-[var(--ink)] sm:text-4xl">First we review. Then we publish carefully.</h2>
          <p className="mt-4 text-base font-semibold leading-7 text-[var(--slate)]">
            Submitting a name or priority does not create an instant public profile or count. We review the details, remove sensitive information, and contact named people before anything public appears.
          </p>
        </div>
        <div className="mt-6 grid gap-3">
          {afterSubmitSteps.map(([num, title, body]) => (
            <article key={title} className="border border-[var(--line)] bg-[var(--soft)] p-5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--ink)] text-sm font-bold text-[var(--mint)]">{num}</span>
              <h3 className="mt-4 text-xl font-bold tracking-[-0.04em] text-[var(--ink)]">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--slate)]">{body}</p>
            </article>
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
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--ink)] text-sm font-bold text-[var(--mint)]">WK</span>
              <span>
                <span className="block text-base font-bold tracking-[-0.03em] text-[var(--ink)]">WakilKita</span>
                <span className="block text-xs font-semibold text-[var(--civic)]">P105 Petaling Jaya</span>
              </span>
            </a>
            <div className="hidden items-center gap-6 text-sm font-semibold text-[var(--slate)] md:flex">
              <a href="#take-part">Start intake</a>
              <a href="#how-it-works">Review process</a>
              <a href="#trust">Trust & privacy</a>
            </div>
            <a href="#take-part" className="bg-[var(--civic)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--civic-dark)]">
              Start intake
            </a>
          </nav>

          <div id="top" className="grid items-center gap-10 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-14">
            <div>
              <div className="mb-6 inline-flex border border-[var(--line)] bg-white px-4 py-2 text-sm font-bold text-[var(--civic-dark)]">
                P105 Petaling Jaya · Private intake open · No IC/eKYC here
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
                Submit a Petaling Jaya nomination or local issue for review.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--slate)] sm:text-xl">
                For P105 residents: send a trusted local name, a profile correction, or a local priority. Nothing becomes public without manual review and consent.
              </p>
              <p className="mt-4 max-w-2xl text-sm font-bold leading-6 text-[var(--civic-dark)]">
                Not online voting. Not SPR-affiliated. Not a party tool. No public supporter lists.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#take-part" className="rounded-full bg-[var(--ink)] px-6 py-4 text-center text-sm font-bold text-[var(--mint)] shadow-[0_1px_3px_rgba(0,0,0,0.12)]">
                  Start private intake
                </a>
                <a href="#take-part" className="rounded-full border border-[var(--line)] bg-white px-6 py-4 text-center text-sm font-bold text-[var(--ink)]">
                  Submit local issue
                </a>
              </div>
            </div>
            <ProductPreview />
          </div>
        </section>


        <WakilKitaActionPanel />


        <AfterSubmitSection />


        <section id="trust" className="border-y border-[var(--line)] bg-[var(--soft)] py-16">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.08em] text-[var(--civic)]">How trust works</p>
              <h2 className="mt-4 text-4xl font-bold tracking-[-0.06em] text-[var(--ink)] sm:text-5xl">Plain rules before anything public.</h2>
              <p className="mt-5 text-lg leading-8 text-[var(--slate)]">
                Trust starts with a smaller promise: P105 email intake, manual review, no IC/eKYC collection on this page, and no public supporter lists. Verification and public counts are not open.
              </p>
              <div className="mt-7">
                <OperationalTrustPanel />
              </div>
            </div>
          </div>
        </section>



        <footer className="border-t border-[var(--line)] bg-[rgba(255,250,241,0.72)] px-5 py-8 text-sm leading-6 text-[var(--slate)] sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[1fr_1.4fr]">
            <p className="font-bold text-[var(--ink)]">Independent civic intake</p>
            <div className="space-y-2">
              <p>WakilKita is independent and is not affiliated with SPR, the Malaysian government, any political party, candidate, or election authority.</p>
              <p>This site does not ask for or transmit IC/eKYC data through the page. Intake starts as a user-controlled email draft. It must not contain personal or sensitive details. WakilKita must publish privacy, verification, dispute, retention, and deletion policies before collecting resident information beyond this email-based intake.</p>
              <p>Individual preferences must never be public, sold, or shared as supporter lists. Public aggregate output needs threshold protection and must never expose individual support choices.</p>
              <p><a className="font-bold text-[var(--civic-dark)] underline" href="mailto:miccy@arusdigital.com?subject=WakilKita%20report%20or%20takedown">Report impersonation, dispute a nomination, or request takedown.</a></p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

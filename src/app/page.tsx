const constituencies = [
  {
    code: "P105",
    name: "Petaling Jaya",
    verified: "1,284",
    nominations: "9",
    topIssue: "Transit reliability",
  },
  {
    code: "P104",
    name: "Subang",
    verified: "842",
    nominations: "6",
    topIssue: "Flood mitigation",
  },
  {
    code: "P121",
    name: "Lembah Pantai",
    verified: "517",
    nominations: "5",
    topIssue: "Rental pressure",
  },
];

const safeguards = [
  "One verified constituent account per identity check",
  "Constituency eligibility checked before support is counted",
  "Identity records separated from support records",
  "Public results show aggregate participant signal only",
  "Every count-changing action is designed to produce an audit event",
  "Dispute, impersonation, and takedown workflow from day one",
];

const issues = [
  { label: "Flood hotspots", score: "78", source: "NADMA + resident reports" },
  { label: "Clinic access", score: "64", source: "OpenDOSM + facility distance" },
  { label: "School density", score: "59", source: "MOE school list + population" },
  { label: "Public transport gaps", score: "72", source: "GTFS + resident priority" },
];

const roadmap = [
  "Private pilot in 1–3 constituencies",
  "Verified resident signup and constituency matching",
  "Nominate, claim, and verify rep profiles",
  "Support one preferred local rep with privacy protection",
  "Open-data constituency issue dashboard",
  "Rep priority plan tied to evidence and resident concerns",
];

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
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--ink)] text-sm font-black text-[var(--mint)]">
              WK
            </span>
            <span>
              <span className="block text-base font-black tracking-[-0.03em] text-[var(--ink)]">
                WakilKita
              </span>
              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--civic)]">
                civic preference signal
              </span>
            </span>
          </a>
          <div className="hidden items-center gap-6 text-sm font-semibold text-[var(--slate)] md:flex">
            <a href="#trust">Trust model</a>
            <a href="#constituency">Constituencies</a>
            <a href="#pilot">Pilot</a>
          </div>
          <a
            href="mailto:miccy@arusdigital.com?subject=Join%20WakilKita%20pilot"
            className="rounded-full bg-[var(--civic)] px-4 py-2 text-sm font-bold text-white shadow-[0_10px_30px_rgba(15,107,77,0.26)] transition hover:bg-[var(--civic-dark)]"
          >
            Join pilot
          </a>
        </nav>

        <div id="top" className="grid items-center gap-10 py-8 lg:grid-cols-[1.04fr_0.96fr] lg:py-14">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-[rgba(15,107,77,0.24)] bg-[rgba(221,247,232,0.72)] px-4 py-2 text-sm font-bold text-[var(--civic-dark)]">
              Not online voting. Not SPR. Not a party tool. A non-binding preference signal.
            </div>
            <h1 className="max-w-4xl font-serif text-5xl font-black leading-[1.02] tracking-[-0.07em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
              Let verified constituents signal their preferred local representative.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--slate)] sm:text-xl">
              WakilKita is being designed to help Malaysians nominate and support one preferred local rep in their own constituency, backed by planned identity checks, privacy-preserving tallying, and constituency-level issue data.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#pilot"
                className="rounded-full bg-[var(--ink)] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.12em] text-[var(--mint)] shadow-[0_20px_60px_rgba(7,22,19,0.22)]"
              >
                Start pilot design
              </a>
              <a
                href="#trust"
                className="rounded-full border border-[var(--line)] bg-[rgba(255,250,241,0.7)] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.12em] text-[var(--ink)]"
              >
                Review trust layer
              </a>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-[var(--line)] bg-[rgba(255,250,241,0.88)] p-4 shadow-[0_30px_100px_rgba(7,22,19,0.16)]">
            <div className="rounded-[1.5rem] bg-[var(--ink)] p-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--mint)]">Illustrative pilot model</p>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">P105 Petaling Jaya</h2>
                </div>
                <div className="rounded-full bg-[rgba(221,247,232,0.14)] px-3 py-2 text-xs font-bold text-[var(--mint)]">
                  demo — not live
                </div>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  ["Verified", "1,284"],
                  ["Nominated", "9"],
                  ["Disputes", "0 open"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/56">{label}</p>
                    <p className="mt-2 text-xl font-black tracking-[-0.03em]">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-3xl bg-[var(--paper)] p-5 text-[var(--ink)]">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--civic)]">Sample participant signal</p>
                    <h3 className="mt-2 text-3xl font-black tracking-[-0.06em]">Illustrative nominee</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--slate)]">Example profile showing how a local representative plan could be tied to transit reliability, flood mitigation, and transparent service KPIs.</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--mint)] px-4 py-3 text-center">
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[var(--civic-dark)]">Support</p>
                    <p className="text-2xl font-black">38%</p>
                  </div>
                </div>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-[rgba(7,22,19,0.1)]">
                  <div className="h-full w-[38%] rounded-full bg-[var(--civic)]" />
                </div>
                <p className="mt-3 text-xs font-semibold text-[var(--slate)]">Illustrative demo only. Aggregate public results would appear only after privacy thresholds are met.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="trust" className="border-y border-[var(--line)] bg-[rgba(255,250,241,0.58)] py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--civic)]">Trust before turnout</p>
            <h2 className="mt-4 font-serif text-4xl font-black tracking-[-0.06em] text-[var(--ink)] sm:text-5xl">
              The product is the trust model.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--slate)]">
              WakilKita should win because the planned count is hard to abuse and easy to explain. No blockchain theatre. No public preference exposure. Just boring, auditable civic infrastructure.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {safeguards.map((item, index) => (
              <div key={item} className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-5 shadow-[0_16px_50px_rgba(7,22,19,0.07)]">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--amber-text)]">0{index + 1}</span>
                <p className="mt-3 text-base font-bold leading-6 text-[var(--ink)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="constituency" className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-10">
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[0_24px_80px_rgba(7,22,19,0.1)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--civic)]">Constituency pages</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--ink)]">Local preference snapshots</h2>
              <p className="mt-2 text-sm font-semibold text-[var(--slate)]">Example figures shown for product demonstration only.</p>
            </div>
            <span className="rounded-full bg-[var(--mint)] px-3 py-2 text-xs font-black text-[var(--civic-dark)]">illustrative data</span>
          </div>
          <div className="mt-6 space-y-3">
            {constituencies.map((seat) => (
              <div key={seat.code} className="rounded-3xl border border-[var(--line)] bg-white/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--amber-text)]">{seat.code}</p>
                    <h3 className="mt-1 text-xl font-black tracking-[-0.04em]">{seat.name}</h3>
                  </div>
                  <div className="text-right text-sm font-bold text-[var(--slate)]">
                    <p>{seat.verified} verified residents</p>
                    <p>{seat.nominations} nominations</p>
                  </div>
                </div>
                <p className="mt-4 rounded-2xl bg-[rgba(15,107,77,0.08)] px-4 py-3 text-sm font-bold text-[var(--civic-dark)]">
                  Top issue: {seat.topIssue}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-[var(--ink)] p-6 text-white shadow-[0_24px_90px_rgba(7,22,19,0.2)]">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--mint)]">Evidence board</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em]">Example issue ranking from public data and resident priority</h2>
          <div className="mt-6 space-y-4">
            {issues.map((issue) => (
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
        </div>
      </section>

      <section id="pilot" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="rounded-[2.4rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[0_30px_100px_rgba(7,22,19,0.12)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--civic)]">MVP pilot scope</p>
              <h2 className="mt-4 font-serif text-4xl font-black tracking-[-0.06em] text-[var(--ink)] sm:text-5xl">
                Prove trust, not hype.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[var(--slate)]">
                First milestone: one constituency, verified resident signup design, nominations, and a public aggregate participant signal that can survive scrutiny before any identity data is collected.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {roadmap.map((item) => (
                <div key={item} className="rounded-3xl bg-[rgba(15,107,77,0.08)] p-5">
                  <p className="text-base font-black leading-6 text-[var(--ink)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 rounded-3xl bg-[var(--ink)] p-5 text-white sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--mint)]">Positioning rule</p>
              <p className="mt-2 text-xl font-black tracking-[-0.03em]">One eligible resident supports one local preferred rep. It is a non-binding participant signal, not an official vote, candidacy decision, or election result.</p>
            </div>
            <a
              href="mailto:miccy@arusdigital.com?subject=Pilot%20WakilKita"
              className="mt-5 inline-flex rounded-full bg-[var(--mint)] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-[var(--civic-dark)] sm:mt-0"
            >
              Request pilot access
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] bg-[rgba(255,250,241,0.72)] px-5 py-8 text-sm leading-6 text-[var(--slate)] sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[1fr_1.4fr]">
          <p className="font-black text-[var(--ink)]">Independent civic prototype</p>
          <div className="space-y-2">
            <p>
              WakilKita is independent and is not affiliated with SPR, the Malaysian government, any political party, candidate, or election authority.
            </p>
            <p>
              This landing page collects no IC or identity data. Any future pilot must publish privacy, verification, dispute, and deletion policies before collecting resident information.
            </p>
            <p>
              Individual support choices will never be public, sold, or shared as supporter lists. Public results should be aggregate-only and threshold-protected.
            </p>
          </div>
        </div>
      </footer>
      </main>
    </>
  );
}

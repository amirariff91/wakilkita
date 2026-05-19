import Link from "next/link";
import type { ReactNode } from "react";
import { WakilKitaMark, P105LineMotif } from "./WakilKitaMark";

export const siteLinks = [
  { href: "/petaling-jaya", label: "Petaling Jaya" },
  { href: "/petaling-jaya/aduan", label: "Aduan PJ" },
  { href: "/petaling-jaya/ahli-parlimen", label: "Ahli Parlimen" },
  { href: "/panduan/ahli-parlimen", label: "Panduan MP" },
  { href: "/panduan/wakil-rakyat", label: "Panduan wakil rakyat" },
  { href: "/tentang", label: "Tentang" },
  { href: "/ketelusan", label: "Ketelusan" },
  { href: "/privasi", label: "Privasi" },
];

const footerLinks = [
  ...siteLinks,
  { href: "/#take-part", label: "Private intake" },
];

export type CivicPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  cta?: {
    label: string;
    href: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
};

export type InfoBlock = {
  title: string;
  body: string;
};

export function CivicNav() {
  return (
    <nav className="flex flex-col gap-4 border-b border-[var(--line)] bg-white px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
      <Link href="/" className="flex items-center gap-3" aria-label="WakilKita home">
        <span className="grid h-10 w-10 shrink-0 place-items-center bg-[var(--ink)] text-[var(--mint)]">
          <WakilKitaMark size={28} />
        </span>
        <span>
          <span className="block text-base font-bold tracking-[-0.03em] text-[var(--ink)]">WakilKita</span>
          <span className="block text-xs font-semibold text-[var(--civic)]">Private civic intake</span>
        </span>
      </Link>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[var(--slate)]">
        <Link href="/#take-part">Submit</Link>
        <Link href="/petaling-jaya">Petaling Jaya</Link>
        <Link href="/ketelusan">Ketelusan</Link>
        <Link href="/privasi">Privasi</Link>
      </div>
    </nav>
  );
}

export function CivicFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[rgba(255,250,241,0.72)] px-5 py-10 text-sm leading-6 text-[var(--slate)] sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="font-bold text-[var(--ink)]">Independent civic intake</p>
          <p className="mt-1 text-xs text-[var(--slate)]">P105 Petaling Jaya · review queue</p>
          <div className="mt-5 text-[var(--civic)]">
            <P105LineMotif />
          </div>
        </div>
        <div className="space-y-4">
          <p>
            WakilKita is independent. It is not run by Parliament, MBPJ, any public body, any party, or any representative office.
          </p>
          <p>
            This site is for private intake, local nomination, preference signal, participant signal, and review. Authority-action complaints must still go to the relevant authority.
          </p>
          <p>
            Contact details stay private during review. No public counts, rank lists, or public participant lists are shown.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="font-bold text-[var(--civic-dark)] underline">
                {link.label}
              </Link>
            ))}
          </div>
          <p>
            <a className="font-bold text-[var(--civic-dark)] underline" href="mailto:miccy@arusdigital.com?subject=WakilKita%20report%20or%20removal">
              Report impersonation, dispute a nomination, or request removal.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export function CivicPageShell({ eyebrow, title, intro, children, cta }: CivicPageProps) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" tabIndex={-1} className="min-h-screen overflow-hidden bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
          <CivicNav />
          <section className="grid gap-8 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
            <div>
              <p className="inline-flex border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
                {eyebrow}
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl">
                {title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--slate)]">{intro}</p>
              {cta && (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href={cta.href} className="bg-[var(--ink)] px-6 py-4 text-center text-sm font-bold text-[var(--mint)]">
                    {cta.label}
                  </Link>
                  {cta.secondaryHref && cta.secondaryLabel && (
                    <Link href={cta.secondaryHref} className="border border-[var(--line)] bg-white px-6 py-4 text-center text-sm font-bold text-[var(--ink)]">
                      {cta.secondaryLabel}
                    </Link>
                  )}
                </div>
              )}
            </div>
            <DisclosurePanel />
          </section>
        </div>
        {children}
        <CivicFooter />
      </main>
    </>
  );
}

function DisclosurePanel() {
  return (
    <aside className="border border-[var(--line)] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]" aria-label="WakilKita boundaries">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Clear boundaries</p>
      <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[var(--ink)]">Independent, careful, and limited.</h2>
      <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--slate)]">
        <li>Not a public authority service.</li>
        <li>Not run by Parliament, MBPJ, parties, or representative offices.</li>
        <li>Not a place for authority-action complaints; those still go to the relevant authority.</li>
        <li>No public counts, rank lists, or public participant lists.</li>
        <li>Contact details are used only for review and follow-up.</li>
      </ul>
    </aside>
  );
}

export function InfoGrid({ blocks }: { blocks: InfoBlock[] }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:px-8 md:grid-cols-2 lg:px-10">
      {blocks.map((block) => (
        <article key={block.title} className="border border-[var(--line)] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <h2 className="text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">{block.title}</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--slate)]">{block.body}</p>
        </article>
      ))}
    </div>
  );
}

export function NoteSection({ title, body }: { title: string; body: string }) {
  return (
    <section className="border-y border-[var(--line)] bg-[var(--soft)] py-14">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Important note</p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">{title}</h2>
        <p className="mt-4 text-base leading-7 text-[var(--slate)]">{body}</p>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../civic-content";

export const metadata: Metadata = {
  title: "Ketelusan WakilKita",
  description:
    "Transparency foundations for WakilKita: independence, review process, consent, privacy limits, and no public ranking displays.",
};

const blocks = [
  {
    title: "Independence",
    body: "WakilKita is not run by Parliament, MBPJ, any public body, any party, or any representative office. Copy, links, and page structure should keep that separation clear.",
  },
  {
    title: "Review queue",
    body: "Submissions enter a private dashboard queue first. Review should check scope, safety, duplicate entries, consent needs, correction requests, and removal requests.",
  },
  {
    title: "No public pressure metrics",
    body: "Public pages should not display counts, rank lists, public participant lists, or popularity indicators. Internal summaries need documented methodology before any public release.",
  },
  {
    title: "Correction and removal",
    body: "Named people and submitters need clear routes to correct, dispute, or remove information. Public profiles should not appear without careful handling.",
  },
  {
    title: "Data minimisation",
    body: "Collect only what is needed for review. Avoid IC numbers, exact home addresses, sensitive identity details, and private allegations in the intake flow.",
  },
  {
    title: "Auditability before scale",
    body: "Before expanding scope, WakilKita should document reviewer access, retention periods, deletion handling, moderation criteria, and incident response."
  },
];

export default function KetelusanPage() {
  return (
    <CivicPageShell
      eyebrow="Transparency"
      title="Clear limits for a privacy-first civic intake project."
      intro="This page states how WakilKita should handle independence, review, consent, participant signals, and public information before deeper product work."
      cta={{ label: "Read privacy page", href: "/privasi", secondaryLabel: "Submit private intake", secondaryHref: "/#take-part" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="Public information should be slower than private review."
        body="A submission should never become a public claim just because it was entered. Careful review protects residents, nominated people, and the usefulness of the civic record."
      />
    </CivicPageShell>
  );
}

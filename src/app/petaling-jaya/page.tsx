import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../civic-content";

export const metadata: Metadata = {
  title: "Petaling Jaya civic intake | WakilKita",
  description:
    "Independent P105 Petaling Jaya private intake for local nominations, issue priorities, and consent-based review.",
};

const blocks = [
  {
    title: "What this page is for",
    body: "Residents can understand the P105 Petaling Jaya intake scope before submitting a local nomination, endorsement, profile claim, or issue priority into the private review queue.",
  },
  {
    title: "What stays private",
    body: "Reply contacts, sensitive identity details, addresses, private allegations, and raw submissions are not shown publicly. Reviewers must screen submissions before any public use.",
  },
  {
    title: "What is not handled here",
    body: "Authority-action complaints, service requests, enforcement matters, and council casework must still go to the relevant authority. WakilKita can record a civic priority, not replace that process.",
  },
  {
    title: "How public pages should work",
    body: "Public pages should use conservative summaries, clear consent, correction paths, and no public rank lists or participant lists.",
  },
];

export default function PetalingJayaPage() {
  return (
    <CivicPageShell
      eyebrow="P105 Petaling Jaya"
      title="A careful civic intake page for Petaling Jaya residents."
      intro="WakilKita starts with private intake and manual review. It helps collect local nominations, endorsements, issue priorities, and preference signals without presenting itself as a public body."
      cta={{ label: "Submit private intake", href: "/#take-part", secondaryLabel: "Read privacy rules", secondaryHref: "/privasi" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="Authority-action complaints still belong with the relevant authority."
        body="If a matter requires enforcement, service delivery, permits, council action, police action, or a statutory decision, send it through the responsible authority channel as well. WakilKita does not replace those channels."
      />
    </CivicPageShell>
  );
}

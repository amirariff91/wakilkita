import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../../civic-content";

export const metadata: Metadata = {
  title: "Aduan Petaling Jaya guide | WakilKita",
  description:
    "A conservative guide explaining how WakilKita handles Petaling Jaya issue priorities while authority-action complaints remain with the relevant authority.",
};

const blocks = [
  {
    title: "Use WakilKita for civic priorities",
    body: "Submit patterns, local pain points, and representative follow-up ideas that residents want reviewed. Keep details factual, brief, and safe for manual review.",
  },
  {
    title: "Use authority channels for action",
    body: "Service requests, permits, enforcement, emergencies, and casework that require authority action must still be sent to the relevant authority through its own channel.",
  },
  {
    title: "Remove private details",
    body: "Do not include IC numbers, home addresses, phone numbers, private medical details, or allegations about a named person. Share only what is needed to understand the issue area.",
  },
  {
    title: "Review before public use",
    body: "A submission can be grouped into a broad issue theme only after screening. Raw submissions and contact details should not be published."
  },
];

export default function AduanPetalingJayaPage() {
  return (
    <CivicPageShell
      eyebrow="Petaling Jaya aduan guide"
      title="Separate civic issue intake from authority-action complaints."
      intro="WakilKita can collect local issue priorities for review, but it cannot replace the channels that handle formal action, service delivery, enforcement, or casework."
      cta={{ label: "Submit an issue priority", href: "/#take-part", secondaryLabel: "Read transparency notes", secondaryHref: "/ketelusan" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="Send action-required complaints to the relevant authority."
        body="WakilKita may help reviewers understand recurring civic priorities in Petaling Jaya, but authority-action complaints still need to be filed with the responsible authority."
      />
    </CivicPageShell>
  );
}

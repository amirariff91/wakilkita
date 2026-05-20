import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../../civic-content";

export const metadata: Metadata = {
  title: "Ahli Parlimen Petaling Jaya civic guide | WakilKita",
  description:
    "Independent Petaling Jaya guide to representative roles, nomination intake, privacy review, and privacy boundaries.",
};

const blocks = [
  {
    title: "Representative role, plain language",
    body: "An Ahli Parlimen represents a parliamentary area, raises public matters, supports policy discussion, and helps residents understand routes for casework and local concerns.",
  },
  {
    title: "Local nomination intake",
    body: "Residents may nominate or endorse trusted local names for review. A nomination is only a nomination record until consent, safety, and correction checks are complete.",
  },
  {
    title: "No public popularity display",
    body: "WakilKita does not show public counts, rank lists, or participant lists. Preference signals are private and reviewed with care.",
  },
  {
    title: "No real photos without consent",
    body: "Public civic profiles should avoid real politician photos unless the person has provided clear permission or the image is otherwise safe for the stated use.",
  },
];

export default function AhliParlimenPetalingJayaPage() {
  return (
    <CivicPageShell
      eyebrow="Petaling Jaya representative guide"
      title="Understand the Ahli Parlimen role without confusing WakilKita for a public body."
      intro="This page provides civic context for Petaling Jaya residents and explains how private nominations and endorsements should be reviewed before anything public appears."
      cta={{ label: "Nominate or endorse", href: "/#take-part", secondaryLabel: "Read MP guide", secondaryHref: "/panduan/ahli-parlimen" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="WakilKita does not speak for any representative office."
        body="Any public profile, claim, correction, or removal request must be handled through consent and review. This site should not imply appointment, affiliation, or approval by a representative office."
      />
    </CivicPageShell>
  );
}

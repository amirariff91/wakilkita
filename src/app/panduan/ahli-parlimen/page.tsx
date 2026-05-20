import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../../civic-content";

export const metadata: Metadata = {
  title: "Panduan Ahli Parlimen | WakilKita",
  description:
    "Plain-language guide to Ahli Parlimen responsibilities, resident contact boundaries, and community nomination review.",
};

const blocks = [
  {
    title: "What an MP can usually help explain",
    body: "An MP may raise public policy matters, connect residents to the right route, ask questions, and communicate issues affecting the parliamentary area.",
  },
  {
    title: "What may need another route",
    body: "Council services, enforcement, licensing, police matters, courts, immigration, school placement, and welfare casework may sit with a different authority or office.",
  },
  {
    title: "How to write a safe request",
    body: "Use a clear issue, affected area, timeline, and desired follow-up. Avoid IC numbers, private addresses, medical details, and allegations about people who cannot respond.",
  },
  {
    title: "How WakilKita intake differs",
    body: "WakilKita stores a community nomination item for review. It is not a representative office, not a complaint channel, and not a public endorsement list.",
  },
];

export default function PanduanAhliParlimenPage() {
  return (
    <CivicPageShell
      eyebrow="Panduan civic"
      title="A plain guide to the Ahli Parlimen role and resident follow-up."
      intro="Use this guide to understand where an MP role may fit, where another authority may be responsible, and how WakilKita keeps community nomination separate from formal channels."
      cta={{ label: "Suggest a name", href: "/#take-part", secondaryLabel: "Petaling Jaya guide", secondaryHref: "/petaling-jaya" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="Always use the responsible channel for matters needing formal action."
        body="WakilKita can help collect civic priorities and preference signals for review, but it cannot receive or decide matters that belong to a public authority or representative office."
      />
    </CivicPageShell>
  );
}

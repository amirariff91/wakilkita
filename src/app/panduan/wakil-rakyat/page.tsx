import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../../civic-content";

export const metadata: Metadata = {
  title: "Panduan Wakil Rakyat | WakilKita",
  description:
    "Independent civic guide to wakil rakyat roles, safe resident submissions, privacy review, and privacy boundaries.",
};

const blocks = [
  {
    title: "Use clear role language",
    body: "A wakil rakyat may be linked to lawmaking, constituency communication, policy discussion, local issue follow-up, or connecting residents to the right authority route.",
  },
  {
    title: "Do not mix roles",
    body: "Some issues belong to councils, state agencies, federal agencies, courts, police, schools, or service providers. The right route depends on the issue and required action.",
  },
  {
    title: "Nomination is not publication",
    body: "A local nomination or endorsement is a nomination record. Public use requires review, consent where needed, correction handling, and privacy screening.",
  },
  {
    title: "Preference signals stay private",
    body: "Preference and participant signals should help careful review, not create public pressure, public lists, or popularity displays.",
  },
];

export default function PanduanWakilRakyatPage() {
  return (
    <CivicPageShell
      eyebrow="Panduan wakil rakyat"
      title="Understand representative roles with privacy-first community nomination."
      intro="This guide helps residents describe local concerns and representative expectations without turning WakilKita into a public authority service or a public popularity display."
      cta={{ label: "Suggest a name", href: "/#take-part", secondaryLabel: "Read privacy page", secondaryHref: "/privasi" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="Responsible authority routes still matter."
        body="When a matter needs a decision, enforcement, permit, service delivery, or casework action, use the relevant authority route. WakilKita records civic priorities for review only."
      />
    </CivicPageShell>
  );
}

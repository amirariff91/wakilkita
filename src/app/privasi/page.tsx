import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../civic-content";

export const metadata: Metadata = {
  title: "Privasi WakilKita",
  description:
    "Privacy foundations for WakilKita community nomination: data minimisation, privacy review, retention, removal, and authority-channel boundaries.",
};

const blocks = [
  {
    title: "Data collected in the nomination form",
    body: "The current form asks for constituency, intake type, name or issue area, priority area, reason, and optional reply contact. It does not ask for IC numbers or exact addresses.",
  },
  {
    title: "How contact details are used",
    body: "A reply contact is used only for follow-up, correction, consent, dispute, or removal handling. It should not be published or shared as a public participant list.",
  },
  {
    title: "Sensitive details",
    body: "Do not submit IC numbers, home addresses, private allegations, medical details, or private family information. Reviewers should remove unnecessary sensitive details from summaries.",
  },
  {
    title: "Retention and deletion",
    body: "A production service should define retention periods, reviewer access, deletion handling, and audit logs before collecting broader resident information.",
  },
  {
    title: "Consent for named people",
    body: "A nominated or endorsed person should be contacted where practical before public profile use. Requests to correct, dispute, or remove information should be handled promptly.",
  },
  {
    title: "Authority channels",
    body: "Complaints that require authority action must still go to the relevant authority. WakilKita stores community nomination for review and cannot replace responsible channels."
  },
];

export default function PrivasiPage() {
  return (
    <CivicPageShell
      eyebrow="Privacy"
      title="Privacy foundations for community nomination."
      intro="WakilKita should collect less, review more, and publish slowly. The aim is to protect submitters, nominated people, and local issue records."
      cta={{ label: "Submit carefully", href: "/#take-part", secondaryLabel: "Read transparency page", secondaryHref: "/ketelusan" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="Do not put sensitive details in the nomination form."
        body="Keep submissions factual and safe to review. If a matter needs formal action, use the relevant authority channel and keep WakilKita intake limited to broad civic context."
      />
    </CivicPageShell>
  );
}

import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../civic-content";

export const metadata: Metadata = {
  title: "Tentang WakilKita",
  description:
    "About WakilKita: independent, community nomination for Petaling Jaya community nominations and poll signals.",
};

const blocks = [
  {
    title: "What WakilKita is",
    body: "WakilKita is an independent community nomination project for community nominations and poll signals that need careful review.",
  },
  {
    title: "What WakilKita is not",
    body: "WakilKita is not Parliament, MBPJ, a public body, a party, a representative office, a complaint authority, or a public ranking service.",
  },
  {
    title: "Why dashboard-first",
    body: "Dashboard-first intake lets reviewers screen privacy risk, contact named people, group issues carefully, and avoid instant public exposure.",
  },
  {
    title: "Current scope",
    body: "The current scope is P105 Petaling Jaya community nomination. Expansion should happen only after privacy, review, correction, retention, and removal processes are documented.",
  },
];

export default function TentangPage() {
  return (
    <CivicPageShell
      eyebrow="About WakilKita"
      title="Independent community nomination, built around consent and review."
      intro="WakilKita helps residents submit local nominations, endorsements, and issue priorities into a review list. It uses conservative language so nobody mistakes it for a public service."
      cta={{ label: "Suggest a name", href: "/#take-part", secondaryLabel: "Read transparency page", secondaryHref: "/ketelusan" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="Trust starts by saying what this site cannot do."
        body="WakilKita cannot decide complaints, speak for authorities, publish private participant data, or imply consent from a nominated person. Those boundaries should stay visible across the product."
      />
    </CivicPageShell>
  );
}

import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../civic-content";

export const metadata: Metadata = {
  title: "Tentang WakilKita",
  description:
    "About WakilKita: independent civic intake for Petaling Jaya community nominations, review, and future preference signals.",
};

const blocks = [
  {
    title: "What WakilKita is",
    body: "WakilKita is an independent civic intake project where residents can suggest people who deserve serious consideration, with review before public use.",
  },
  {
    title: "What WakilKita is not",
    body: "WakilKita is not Parliament, MBPJ, a public body, a party, a representative office, a complaint authority, or a public popularity board.",
  },
  {
    title: "Why review-first",
    body: "Review-first intake lets reviewers screen privacy risk, contact named people where needed, group issues carefully, and avoid instant public exposure.",
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
      title="Independent community nomination, built around trust before reach."
      intro="WakilKita helps residents submit local nominations and issue priorities into a private review list first. The product earns public visibility only when the information is safe, useful, and clearly labelled."
      cta={{ label: "Suggest a name", href: "/#take-part", secondaryLabel: "Read transparency page", secondaryHref: "/ketelusan" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="Trust starts by refusing shortcuts."
        body="WakilKita cannot decide complaints, speak for authorities, publish private participant data, or imply consent from a nominated person. The public layer has to be slower than the intake layer."
      />
    </CivicPageShell>
  );
}

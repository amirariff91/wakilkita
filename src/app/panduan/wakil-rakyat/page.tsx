import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../../civic-content";

export const metadata: Metadata = {
  title: "Panduan Wakil Rakyat | WakilKita",
  description:
    "Panduan sivik bebas tentang peranan wakil rakyat, cadangan penduduk yang selamat, semakan privasi, dan had paparan awam.",
};

const blocks = [
  {
    title: "Gunakan bahasa peranan yang jelas",
    body: "Wakil rakyat boleh dikaitkan dengan penggubalan undang-undang, komunikasi kawasan, perbincangan dasar, susulan isu setempat, atau menghubungkan penduduk kepada laluan pihak berkuasa yang betul.",
  },
  {
    title: "Jangan campur semua peranan",
    body: "Sesetengah isu berada di bawah majlis, agensi negeri, agensi persekutuan, mahkamah, polis, sekolah, atau penyedia perkhidmatan. Laluan yang betul bergantung pada isu dan tindakan yang diperlukan.",
  },
  {
    title: "Cadangan nama bukan penerbitan awam",
    body: "Cadangan tempatan ialah rekod semakan. Sebarang kegunaan awam memerlukan semakan, kebenaran jika perlu, pengendalian pembetulan, dan saringan privasi.",
  },
  {
    title: "Maklum balas penduduk kekal peribadi",
    body: "Maklum balas peserta hanya membantu semakan berhati-hati, bukan mewujudkan tekanan awam, senarai awam, atau paparan populariti.",
  },
];

export default function PanduanWakilRakyatPage() {
  return (
    <CivicPageShell
      eyebrow="Panduan wakil rakyat"
      title="Fahami peranan wakil dengan cadangan komuniti yang mengutamakan privasi."
      intro="Panduan ini membantu penduduk menerangkan isu setempat dan jangkaan terhadap wakil tanpa menjadikan WakilKita perkhidmatan pihak berkuasa atau paparan populariti awam."
      cta={{ label: "Cadangkan nama", href: "/#take-part", secondaryLabel: "Baca halaman privasi", secondaryHref: "/privasi" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="Laluan pihak berkuasa yang bertanggungjawab masih penting."
        body="Apabila sesuatu perkara memerlukan keputusan, penguatkuasaan, permit, penyampaian perkhidmatan, atau tindakan kerja kes, gunakan laluan pihak berkuasa yang berkaitan. WakilKita hanya merekodkan keutamaan sivik untuk semakan."
      />
    </CivicPageShell>
  );
}

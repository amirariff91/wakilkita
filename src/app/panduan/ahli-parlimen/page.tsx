import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../../civic-content";

export const metadata: Metadata = {
  title: "Panduan Ahli Parlimen | WakilKita",
  description:
    "Panduan bahasa mudah tentang tanggungjawab Ahli Parlimen, had hubungan penduduk, dan semakan cadangan komuniti.",
};

const blocks = [
  {
    title: "Apa yang biasanya boleh dijelaskan oleh MP",
    body: "Seorang MP boleh membangkitkan perkara dasar awam, menghubungkan penduduk kepada laluan yang betul, bertanya soalan, dan menyampaikan isu yang menjejaskan kawasan Parlimen.",
  },
  {
    title: "Apa yang mungkin perlukan laluan lain",
    body: "Perkhidmatan majlis, penguatkuasaan, lesen, hal polis, mahkamah, imigresen, penempatan sekolah, dan kerja kes kebajikan mungkin berada di bawah pihak berkuasa atau pejabat lain.",
  },
  {
    title: "Cara menulis permintaan yang selamat",
    body: "Gunakan isu yang jelas, kawasan terlibat, garis masa, dan susulan yang diingini. Elakkan nombor IC, alamat peribadi, butiran kesihatan, dan tuduhan terhadap orang yang tidak boleh menjawab.",
  },
  {
    title: "Perbezaan pengambilan WakilKita",
    body: "WakilKita menyimpan item cadangan komuniti untuk semakan. Ia bukan pejabat wakil rakyat, bukan saluran aduan, dan bukan senarai sokongan awam.",
  },
];

export default function PanduanAhliParlimenPage() {
  return (
    <CivicPageShell
      eyebrow="Panduan sivik"
      title="Panduan mudah tentang peranan Ahli Parlimen dan susulan penduduk."
      intro="Gunakan panduan ini untuk memahami di mana peranan MP mungkin sesuai, di mana pihak berkuasa lain mungkin bertanggungjawab, dan bagaimana WakilKita memisahkan cadangan komuniti daripada saluran rasmi."
      cta={{ label: "Cadangkan nama", href: "/#take-part", secondaryLabel: "Panduan Petaling Jaya", secondaryHref: "/petaling-jaya" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="Sentiasa gunakan saluran bertanggungjawab untuk perkara yang memerlukan tindakan rasmi."
        body="WakilKita boleh membantu mengumpul keutamaan sivik dan cadangan komuniti untuk semakan, tetapi ia tidak boleh menerima atau memutuskan perkara yang berada di bawah pihak berkuasa awam atau pejabat wakil rakyat."
      />
    </CivicPageShell>
  );
}

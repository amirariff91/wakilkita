import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../../civic-content";

export const metadata: Metadata = {
  title: "Panduan aduan Petaling Jaya | WakilKita",
  description:
    "Panduan berhati-hati tentang cara WakilKita mengendalikan keutamaan isu Petaling Jaya sementara aduan yang memerlukan tindakan kekal dengan pihak berkuasa berkaitan.",
};

const blocks = [
  {
    title: "Guna WakilKita untuk keutamaan sivik",
    body: "Hantar corak isu, kesakitan setempat, dan idea susulan wakil yang penduduk mahu disemak. Pastikan butiran faktual, ringkas, dan selamat untuk semakan manual.",
  },
  {
    title: "Guna saluran pihak berkuasa untuk tindakan",
    body: "Permintaan perkhidmatan, permit, penguatkuasaan, kecemasan, dan kerja kes yang memerlukan tindakan pihak berkuasa mesti terus dihantar kepada pihak berkaitan melalui saluran mereka sendiri.",
  },
  {
    title: "Buang butiran peribadi",
    body: "Jangan masukkan nombor IC, alamat rumah, nombor telefon, butiran perubatan peribadi, atau tuduhan terhadap individu bernama. Kongsi hanya perkara yang diperlukan untuk memahami kawasan isu.",
  },
  {
    title: "Semakan sebelum kegunaan awam",
    body: "Cadangan hanya boleh dikelompokkan sebagai tema isu umum selepas saringan. Cadangan mentah dan butiran hubungan tidak patut diterbitkan."
  },
];

export default function AduanPetalingJayaPage() {
  return (
    <CivicPageShell
      eyebrow="Panduan aduan Petaling Jaya"
      title="Asingkan pengambilan isu sivik daripada aduan yang memerlukan tindakan pihak berkuasa."
      intro="WakilKita boleh mengumpul keutamaan isu setempat untuk semakan, tetapi ia tidak menggantikan saluran yang mengendalikan tindakan rasmi, penyampaian perkhidmatan, penguatkuasaan, atau kerja kes."
      cta={{ label: "Cadangkan keutamaan isu", href: "/#take-part", secondaryLabel: "Baca nota ketelusan", secondaryHref: "/ketelusan" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="Hantar aduan yang memerlukan tindakan kepada pihak berkuasa berkaitan."
        body="WakilKita boleh membantu penyemak memahami keutamaan sivik berulang di Petaling Jaya, tetapi aduan yang memerlukan tindakan masih perlu difailkan dengan pihak berkuasa yang bertanggungjawab."
      />
    </CivicPageShell>
  );
}

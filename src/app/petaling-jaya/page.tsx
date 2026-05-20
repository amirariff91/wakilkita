import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../civic-content";

export const metadata: Metadata = {
  title: "Cadangan komuniti Petaling Jaya | WakilKita",
  description:
    "Pengambilan cadangan peribadi P105 Petaling Jaya untuk nama tempatan, keutamaan isu, dan semakan privasi.",
};

const blocks = [
  {
    title: "Tujuan halaman ini",
    body: "Penduduk boleh memahami skop pengambilan cadangan P105 Petaling Jaya sebelum menghantar nama tempatan ke dalam senarai semakan.",
  },
  {
    title: "Apa yang kekal peribadi",
    body: "Butiran hubungan, maklumat identiti sensitif, alamat, tuduhan peribadi, dan cadangan mentah tidak dipaparkan kepada umum. Penyemak mesti menapis cadangan sebelum sebarang kegunaan awam.",
  },
  {
    title: "Apa yang tidak dikendalikan di sini",
    body: "Aduan yang memerlukan tindakan pihak berkuasa, permintaan perkhidmatan, penguatkuasaan, dan kerja kes majlis mesti terus dihantar kepada pihak berkuasa berkaitan. WakilKita boleh merekodkan keutamaan sivik, bukan menggantikan proses itu.",
  },
  {
    title: "Cara halaman awam patut berfungsi",
    body: "Halaman awam patut menggunakan ringkasan berhati-hati, kebenaran yang jelas, laluan pembetulan, dan tiada susunan kedudukan atau senarai peserta awam.",
  },
];

export default function PetalingJayaPage() {
  return (
    <CivicPageShell
      eyebrow="P105 Petaling Jaya"
      title="Halaman cadangan komuniti yang berhati-hati untuk warga Petaling Jaya."
      intro="WakilKita bermula dengan pengambilan cadangan secara peribadi dan semakan manual. Ia membantu mengumpul cadangan nama dan isu setempat tanpa menjadi badan awam atau proses pilihan raya."
      cta={{ label: "Cadangkan nama", href: "/#take-part", secondaryLabel: "Baca prinsip privasi", secondaryHref: "/privasi" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="Aduan yang memerlukan tindakan masih perlu ke pihak berkuasa berkaitan."
        body="Jika perkara memerlukan penguatkuasaan, penyampaian perkhidmatan, permit, tindakan majlis, polis, atau keputusan berkanun, hantar juga melalui saluran pihak berkuasa yang bertanggungjawab. WakilKita tidak menggantikan saluran tersebut."
      />
    </CivicPageShell>
  );
}

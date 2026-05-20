import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../../civic-content";

export const metadata: Metadata = {
  title: "Panduan Ahli Parlimen Petaling Jaya | WakilKita",
  description:
    "Panduan Petaling Jaya yang bebas tentang peranan wakil, pengambilan cadangan, semakan privasi, dan had paparan awam.",
};

const blocks = [
  {
    title: "Peranan wakil dalam bahasa mudah",
    body: "Ahli Parlimen mewakili kawasan Parlimen, membangkitkan perkara awam, menyokong perbincangan dasar, dan membantu penduduk memahami laluan untuk kerja kes serta isu setempat.",
  },
  {
    title: "Pengambilan cadangan tempatan",
    body: "Penduduk boleh mencadangkan nama tempatan yang dipercayai untuk semakan. Cadangan ini bukan sokongan rasmi dan bukan senarai awam sehingga semakan keselamatan, kebenaran, dan pembetulan selesai.",
  },
  {
    title: "Tiada paparan populariti awam",
    body: "WakilKita tidak memaparkan kiraan awam, susunan kedudukan, atau senarai peserta. Maklum balas keutamaan disimpan peribadi dan disemak dengan berhati-hati.",
  },
  {
    title: "Tiada foto sebenar tanpa kebenaran",
    body: "Profil sivik awam patut mengelakkan foto ahli politik sebenar kecuali orang tersebut memberi kebenaran jelas atau imej itu selamat untuk kegunaan yang dinyatakan.",
  },
];

export default function AhliParlimenPetalingJayaPage() {
  return (
    <CivicPageShell
      eyebrow="Panduan wakil Petaling Jaya"
      title="Fahami peranan Ahli Parlimen tanpa mengelirukan WakilKita sebagai badan awam."
      intro="Halaman ini memberi konteks sivik kepada penduduk Petaling Jaya dan menerangkan bagaimana cadangan peribadi patut disemak sebelum apa-apa dipaparkan kepada umum."
      cta={{ label: "Cadangkan nama", href: "/#take-part", secondaryLabel: "Baca panduan MP", secondaryHref: "/panduan/ahli-parlimen" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="WakilKita tidak bercakap bagi pihak mana-mana pejabat wakil rakyat."
        body="Sebarang profil awam, dakwaan, pembetulan, atau permintaan pemadaman mesti dikendalikan melalui kebenaran dan semakan. Laman ini tidak boleh membayangkan pelantikan, kaitan, atau kelulusan oleh pejabat wakil rakyat."
      />
    </CivicPageShell>
  );
}

import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../civic-content";

export const metadata: Metadata = {
  title: "Tentang WakilKita",
  description:
    "Tentang WakilKita: ruang cadangan sivik bebas untuk Petaling Jaya, semakan peribadi, privasi, dan maklum balas komuniti masa depan tertakluk kepada peraturan.",
};

const blocks = [
  {
    title: "Apa itu WakilKita",
    body: "WakilKita ialah ruang cadangan sivik bebas untuk penduduk mencadangkan nama yang wajar dipertimbangkan, dengan semakan dahulu sebelum sebarang kegunaan awam.",
  },
  {
    title: "Apa WakilKita bukan",
    body: "WakilKita bukan Parlimen, MBPJ, badan awam, parti, pejabat wakil rakyat, pihak aduan rasmi, atau carta populariti awam.",
  },
  {
    title: "Kenapa semakan dahulu",
    body: "Semakan awal membantu menyaring risiko privasi, menghubungi nama yang dicadangkan bila perlu, mengelompokkan isu dengan cermat, dan mengelakkan pendedahan awam yang terburu-buru.",
  },
  {
    title: "Skop semasa",
    body: "Skop semasa ialah cadangan komuniti untuk P105 Petaling Jaya. Perluasan hanya patut berlaku selepas proses privasi, semakan, pembetulan, penyimpanan, dan pemadaman didokumentasikan.",
  },
];

export default function TentangPage() {
  return (
    <CivicPageShell
      eyebrow="Tentang WakilKita"
      title="Ruang cadangan komuniti bebas, dibina atas kepercayaan sebelum capaian."
      intro="WakilKita membantu penduduk menghantar cadangan nama dan keutamaan isu setempat ke dalam senarai semakan peribadi dahulu. Maklumat hanya wajar dibuka kepada umum apabila ia selamat, berguna, dan dilabel dengan jelas."
      cta={{ label: "Cadangkan nama", href: "/#take-part", secondaryLabel: "Baca halaman ketelusan", secondaryHref: "/ketelusan" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="Kepercayaan bermula dengan menolak jalan pintas."
        body="WakilKita tidak boleh memutuskan aduan, bercakap bagi pihak berkuasa, menerbitkan data peribadi peserta, atau menganggap nama yang dicadangkan sudah memberi kebenaran. Lapisan awam mesti lebih perlahan daripada lapisan pengambilan cadangan."
      />
    </CivicPageShell>
  );
}

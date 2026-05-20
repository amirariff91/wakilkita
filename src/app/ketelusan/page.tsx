import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../civic-content";

export const metadata: Metadata = {
  title: "Ketelusan WakilKita",
  description:
    "Asas ketelusan WakilKita: kebebasan, proses semakan, kebenaran, had privasi, dan tiada paparan populariti awam.",
};

const blocks = [
  {
    title: "Bebas",
    body: "WakilKita bukan dikendalikan oleh Parlimen, MBPJ, mana-mana badan awam, parti, atau pejabat wakil rakyat. Salinan, pautan, dan struktur halaman perlu mengekalkan pemisahan ini dengan jelas.",
  },
  {
    title: "Barisan semakan",
    body: "Cadangan masuk ke senarai semakan tertutup dahulu. Semakan melihat skop kawasan, keselamatan, pendua, keperluan kebenaran, permintaan pembetulan, dan permintaan pemadaman.",
  },
  {
    title: "Tiada metrik tekanan awam",
    body: "Halaman awam tidak patut memaparkan kiraan, susunan kedudukan, senarai peserta awam, atau petunjuk populariti. Ringkasan dalaman memerlukan metodologi dan ambang keselamatan sebelum sebarang penerbitan.",
  },
  {
    title: "Pembetulan dan pemadaman",
    body: "Nama yang dicadangkan dan penghantar cadangan perlukan laluan jelas untuk membetulkan, mempertikaikan, atau memadam maklumat. Profil awam tidak patut muncul tanpa pengendalian yang cermat.",
  },
  {
    title: "Minimakan data",
    body: "Kumpul hanya perkara yang diperlukan untuk semakan. Elakkan nombor IC, alamat rumah tepat, butiran identiti sensitif, dan tuduhan peribadi dalam aliran pengambilan cadangan.",
  },
  {
    title: "Boleh diaudit sebelum diperluas",
    body: "Sebelum memperluas skop, WakilKita perlu mendokumenkan akses penyemak, tempoh penyimpanan, cara pemadaman, kriteria moderasi, log audit, dan tindak balas insiden."
  },
];

export default function KetelusanPage() {
  return (
    <CivicPageShell
      eyebrow="Ketelusan"
      title="Had yang jelas untuk ruang cadangan komuniti yang mengutamakan semakan."
      intro="Halaman ini menerangkan cara WakilKita mengendalikan kebebasan, semakan, kebenaran, maklum balas peribadi, dan maklumat awam sebelum produk ini meminta kepercayaan penduduk yang lebih besar."
      cta={{ label: "Baca halaman privasi", href: "/privasi", secondaryLabel: "Cadangkan nama", secondaryHref: "/#take-part" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="Maklumat awam perlu lebih perlahan daripada semakan peribadi."
        body="Cadangan tidak boleh menjadi dakwaan awam hanya kerana ia dihantar. Semakan yang cermat melindungi penduduk, orang yang dicadangkan, dan kredibiliti rekod sivik."
      />
    </CivicPageShell>
  );
}

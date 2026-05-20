import type { Metadata } from "next";
import { CivicPageShell, InfoGrid, NoteSection } from "../civic-content";

export const metadata: Metadata = {
  title: "Privasi WakilKita",
  description:
    "Asas privasi WakilKita: minimakan data, pengambilan cadangan berasaskan semakan, penyimpanan, pemadaman, dan had saluran pihak berkuasa.",
};

const blocks = [
  {
    title: "Data yang dikumpul dalam borang cadangan",
    body: "Borang semasa meminta kawasan, nama orang yang dicadangkan, sebab kepercayaan, bidang keutamaan, dan butiran hubungan pilihan. Ia tidak meminta nombor IC atau alamat tepat.",
  },
  {
    title: "Cara butiran hubungan digunakan",
    body: "Butiran hubungan digunakan hanya untuk susulan, pembetulan, kebenaran, pertikaian, atau pemadaman. Ia tidak patut diterbitkan atau dikongsi sebagai senarai peserta awam.",
  },
  {
    title: "Butiran sensitif",
    body: "Jangan hantar nombor IC, alamat rumah, tuduhan peribadi, maklumat kesihatan, atau maklumat keluarga yang sensitif. Penyemak patut membuang butiran sensitif yang tidak diperlukan daripada ringkasan.",
  },
  {
    title: "Penyimpanan dan pemadaman",
    body: "Perkhidmatan produksi perlu menentukan tempoh penyimpanan, akses penyemak, cara pemadaman, dan log audit sebelum mengumpul maklumat penduduk yang lebih luas.",
  },
  {
    title: "Kebenaran untuk nama yang dicadangkan",
    body: "Orang yang dicadangkan patut dihubungi bila praktikal sebelum sebarang penggunaan profil awam. Permintaan pembetulan, pertikaian, atau pemadaman perlu ditangani dengan segera.",
  },
  {
    title: "Saluran pihak berkuasa",
    body: "Aduan yang memerlukan tindakan pihak berkuasa mesti terus dihantar kepada pihak yang berkaitan. WakilKita menyimpan cadangan komuniti untuk semakan dan tidak menggantikan saluran yang bertanggungjawab."
  },
];

export default function PrivasiPage() {
  return (
    <CivicPageShell
      eyebrow="Privasi"
      title="Asas privasi untuk cadangan komuniti."
      intro="WakilKita patut mengumpul lebih sedikit, menyemak lebih banyak, dan menerbitkan dengan perlahan. Tujuannya ialah melindungi penghantar cadangan, orang yang dicadangkan, dan kredibiliti rekod isu setempat."
      cta={{ label: "Hantar cadangan dengan cermat", href: "/#take-part", secondaryLabel: "Baca halaman ketelusan", secondaryHref: "/ketelusan" }}
    >
      <InfoGrid blocks={blocks} />
      <NoteSection
        title="Jangan letak butiran sensitif dalam borang cadangan."
        body="Pastikan cadangan faktual dan selamat untuk disemak. Jika sesuatu perkara memerlukan tindakan rasmi, gunakan saluran pihak berkuasa yang berkaitan dan hadkan pengambilan WakilKita kepada konteks sivik umum serta cadangan nama yang dipercayai."
      />
    </CivicPageShell>
  );
}

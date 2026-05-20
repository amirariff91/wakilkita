// P105 Petaling Jaya constituency data
// Sources: DOSM Census 2020 (census_parlimen.csv), SPR/Thevesh GE15 voters_ge15.csv, candidates_ge15.csv

export const p105Data = {
  meta: {
    kod: "P.105",
    nama: "Petaling Jaya",
    negeri: "Selangor",
    keluasan: 55, // km²
    penduduk2020: 362290,
    pengundi2022: 195148,
    pengundi2023: 196588, // SPR updated
    ketumpatanPenduduk: 6587,
    pendapatanMedian: 8942,
    pendapatanPurata: 12464,
    gini: 0.441,
    kadarKemiskinan: 1.1,
  },

  wakil: {
    nama: "Lee Chean Chung",
    parti: "Pakatan Harapan (DAP)",
    mandat: "2022 – kini",
    undianGE15: 83311,
    peratusUndian: 57.12,
    majoriti: 50575,
  },

  keputusanGE15: [
    { nama: "Lee Chean Chung", parti: "PH (DAP)", undi: 83311, menang: true },
    { nama: "Dato Theng Book", parti: "PN", undi: 32736, menang: false },
    { nama: "Chew Hian Tat", parti: "BN", undi: 23253, menang: false },
    { nama: "Mazween Mokhtar", parti: "PEJUANG", undi: 4052, menang: false },
    { nama: "Datuk Ezam Mohd Nor", parti: "PRM", undi: 2049, menang: false },
    { nama: "Dr. K.J. John", parti: "BEBAS", undi: 461, menang: false },
  ],

  demografi: {
    kaum: [
      { label: "Bumiputera", peratus: 52.0, warna: "#263A4F" },
      { label: "Cina", peratus: 32.4, warna: "#3B6EA5" },
      { label: "India", peratus: 14.7, warna: "#6B9BD2" },
      { label: "Lain-lain", peratus: 0.9, warna: "#B8CDE3" },
    ],
    // From voters_ge15.csv aggregated P.105
    umurPengundi: [
      { label: "18–20", lelaki: 5222, perempuan: 4876 },
      { label: "21–29", lelaki: 17771, perempuan: 16621 },
      { label: "30–39", lelaki: 19927, perempuan: 18595 },
      { label: "40–49", lelaki: 17635, perempuan: 17469 },
      { label: "50–59", lelaki: 15299, perempuan: 16287 },
      { label: "60–69", lelaki: 11811, perempuan: 14006 },
      { label: "70+", lelaki: 6201, perempuan: 7426 },
    ],
    jantina: { lelaki: 49.4, perempuan: 50.6 },
    penduduk: {
      warganegara: 324429,
      bukanWarganegara: 37861,
    },
  },

  isuSemasa: [
    {
      isu: "Banjir kilat",
      kawasan: "SS2, SS3, Jalan Templer",
      keterangan: "Banjir berlaku hampir setiap kali hujan lebat akibat sistem saliran yang lama dan tidak diselenggara. Penduduk SS2 melaporkan air masuk rumah berulang kali.",
      tahap: "tinggi" as const,
      sumber: "Aduan penduduk, media sosial 2024–2025",
    },
    {
      isu: "Kesesakan lalu lintas",
      kawasan: "Jalan Kemajuan, Lebuhraya KESAS, LDP",
      keterangan: "Trafik sesak setiap pagi dan petang terutama di laluan utama. Kurang pilihan pengangkutan awam menyebabkan kebergantungan tinggi kepada kenderaan persendirian.",
      tahap: "tinggi" as const,
      sumber: "MBPJ, laporan pemandu 2025",
    },
    {
      isu: "Pembangunan tidak terancang",
      kawasan: "SS14, Damansara Jaya, PJS",
      keterangan: "Pembangunan kondominium dan komersial yang pesat tanpa infrastruktur sokongan yang mencukupi — jalan sempit, tempat letak kereta terhad, bebanan utiliti meningkat.",
      tahap: "sederhana" as const,
      sumber: "Persatuan Penduduk PJ, 2024",
    },
    {
      isu: "Kutipan sampah & persekitaran",
      kawasan: "Seluruh kawasan perumahan",
      keterangan: "Jadual kutipan sampah tidak konsisten. Kawasan komersial sering ada sampah terbiar. Beberapa taman rekreasi dalam keadaan kurang diselenggara.",
      tahap: "sederhana" as const,
      sumber: "Aduan MBPJ, Facebook penduduk 2025",
    },
    {
      isu: "Kos sara hidup tinggi",
      kawasan: "Seluruh P105",
      keterangan: "Median pendapatan RM8,942 tetapi kos sewa dan perumahan terus meningkat. Golongan muda sukar membeli rumah di kawasan sendiri.",
      tahap: "tinggi" as const,
      sumber: "DOSM 2020, data NAPIC 2024",
    },
  ],
};

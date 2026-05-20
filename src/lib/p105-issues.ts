export type IssueConfidence = "Tinggi" | "Sederhana" | "Rendah";

export type IssueScope = "P105" | "Proksi daerah" | "Proksi negeri" | "Proksi operasi";

export type IssueCard = {
  slug: string;
  title: string;
  shortTitle: string;
  residentFrame: string;
  whyItMatters: string;
  localSignals: string[];
  caveats: string[];
  confidence: IssueConfidence;
  jurisdiction: string[];
  prioritisationLens: string[];
  validationQuestions: string[];
  representativeActions: string[];
  sourceNotes: string[];
  scope: IssueScope;
};

export const p105AreaFacts = [
  {
    label: "Populasi P105",
    value: "364.6k",
    note: "Angka 2022. Konteks populasi peringkat kawasan sahaja; ini bukan kiraan sokongan.",
  },
  {
    label: "Median pendapatan isi rumah daerah Petaling",
    value: "RM9,618",
    note: "Proksi daerah 2022; tekanan isi rumah boleh berbeza besar mengikut kejiranan dan status sewaan.",
  },
  {
    label: "Purata perbelanjaan isi rumah daerah Petaling",
    value: "RM7,721",
    note: "Proksi daerah 2022; berguna untuk konteks kemampuan hidup, bukan ukuran khusus P105.",
  },
  {
    label: "Kemiskinan / ketidaksamaan daerah Petaling",
    value: "1.6% miskin · 0.39198 Gini",
    note: "Proksi daerah 2022. Kemiskinan agregat yang rendah masih boleh menyembunyikan kelompok tertekan.",
  },
  {
    label: "Trend jenayah daerah PJ",
    value: "5,005 ke 1,472",
    note: "Jenayah dilaporkan di peringkat daerah menurun dari 2016 ke 2023. Persepsi, titik panas, dan kurang laporan masih perlu diambil kira.",
  },
  {
    label: "Isyarat data pengangkutan awam",
    value: "GTFS Prasarana boleh diakses",
    note: "Suapan operasi boleh membantu analisis laluan dan first/last-mile, tetapi pengalaman penumpang perlu disahkan penduduk.",
  },
] as const;

export const p105Rubric = [
  {
    label: "Beban penduduk",
    prompt: "Berapa ramai isi rumah mungkin merasai isu ini dalam rutin harian, kos, keselamatan, atau mobiliti?",
  },
  {
    label: "Keseriusan dan keutamaan masa",
    prompt: "Adakah kelewatan mencipta risiko kesihatan, keselamatan, pendapatan, persekolahan, atau kerosakan harta?",
  },
  {
    label: "Kesediaan bukti",
    prompt: "Bolehkah data terbuka, rekod agensi, foto, peta, atau laporan penduduk berulang mengesahkan corak ini?",
  },
  {
    label: "Padanan bidang kuasa",
    prompt: "Adakah laluan tindakan majlis, negeri, persekutuan, operator, atau antara agensi jelas?",
  },
  {
    label: "Pengaruh wakil",
    prompt: "Bolehkah wakil menghimpunkan agensi, meminta rekod, memantau pembaikan, atau menerbitkan jejak susulan?",
  },
] as const;

export const p105IssueCards: IssueCard[] = [
  {
    slug: "cost-of-living-household-pressure",
    title: "Kos sara hidup dan tekanan isi rumah",
    shortTitle: "Tekanan isi rumah",
    residentFrame:
      "Penduduk mungkin nampak selesa atas kertas tetapi masih terhimpit oleh kos makanan, sewa, pengangkutan, penjagaan anak, perubatan, dan hutang.",
    whyItMatters:
      "Petaling agak berpendapatan tinggi, tetapi asas perbelanjaan daerah menunjukkan kenapa kemampuan hidup perlu diuji sebagai tekanan sebenar, bukan dianggap selesa begitu sahaja.",
    localSignals: [
      "Median pendapatan isi rumah daerah Petaling pada 2022: RM9,618.",
      "Purata perbelanjaan isi rumah daerah Petaling pada 2022: RM7,721.",
      "Kemiskinan daerah Petaling pada 2022: 1.6%; Gini: 0.39198.",
    ],
    caveats: [
      "Angka pendapatan, perbelanjaan, kemiskinan, dan Gini ialah proksi daerah Petaling, bukan ukuran khusus P105.",
      "Pendapatan agregat boleh menyembunyikan penyewa, keluarga satu pencari nafkah, pekerja tidak formal, pelajar, warga emas, dan penjaga.",
    ],
    confidence: "Sederhana",
    jurisdiction: ["Perlindungan sosial persekutuan", "Kebajikan negeri", "Pelesenan dan pasar pihak berkuasa tempatan", "Majikan dan tuan rumah persendirian"],
    prioritisationLens: ["Beban harian tinggi", "Perlu pecahan mengikut kejiranan", "Perlu pengesahan penduduk yang kuat"],
    validationQuestions: [
      "Perbelanjaan berulang apa yang paling meningkat untuk isi rumah anda dalam enam bulan lepas?",
      "Kejiranan atau kumpulan isi rumah mana paling terdedah: penyewa, warga emas, keluarga muda, pelajar, atau pekerja gig?",
      "Apa yang perlu dibantu dahulu: pemantauan harga makanan, nasihat sewa, penjimatan pengangkutan, sokongan penjagaan anak, atau panduan bantuan bersasar?",
    ],
    representativeActions: [
      "Jalankan sampel diari kos penduduk dengan kategori selamat privasi, bukan nama atau alamat.",
      "Minta agensi menerbitkan laluan kelayakan bantuan dan kaunter perkhidmatan yang jelas untuk penduduk P105.",
      "Himpunkan peniaga tempatan, kumpulan penyewa, dan pejabat kebajikan sekitar titik bantuan praktikal.",
    ],
    sourceNotes: ["Konteks pendapatan, perbelanjaan, kemiskinan, dan ketidaksamaan isi rumah peringkat daerah DOSM 2022."],
    scope: "Proksi daerah",
  },
  {
    slug: "public-transport-first-last-mile",
    title: "Pengangkutan awam dan jurang first/last-mile",
    shortTitle: "Jurang transit",
    residentFrame:
      "Laluan tren atau bas yang berdekatan tidak semestinya mudah digunakan jika laluan pejalan kaki, feeder, lintasan, teduhan, kos, dan masa tidak berfungsi.",
    whyItMatters:
      "P105 mempunyai aset pengangkutan utama, tetapi pengalaman penduduk berlaku pada tahap pintu-ke-hentian dan hentian-ke-destinasi.",
    localSignals: [
      "Suapan GTFS Prasarana boleh diakses untuk analisis laluan, hentian, dan jadual.",
      "Isu first/last-mile boleh dipetakan menggunakan hentian, laluan berjalan, lintasan, cerun, teduhan, dan kekerapan perkhidmatan.",
    ],
    caveats: [
      "GTFS ialah sumber data operasi; ia tidak membuktikan kebolehpercayaan, kesesakan, keselamatan, atau pengalaman aksesibiliti dengan sendirinya.",
      "Liputan laluan perlu disahkan dengan laluan berjalan sebenar, halangan, dan masa perjalanan penduduk.",
    ],
    confidence: "Tinggi",
    jurisdiction: ["Prasarana dan operator", "APAD dan agensi pengangkutan", "MBPJ", "Penyelarasan pengangkutan negeri"],
    prioritisationLens: ["Kesediaan data kuat", "Pengaruh tinggi melalui peta", "Perlu semakan aksesibiliti dan keselamatan"],
    validationQuestions: [
      "Perjalanan mana masih susah walaupun ada hentian atau stesen berhampiran?",
      "Di mana lintasan hilang, laluan pejalan kaki rosak, lampu lemah, kawasan menunggu tidak selamat, atau feeder tidak boleh diharap?",
      "Waktu mana masalah paling teruk: waktu sekolah, ulang-alik kerja, lewat malam, hujan, atau hujung minggu?",
    ],
    representativeActions: [
      "Terbitkan audit akses hentian yang menggabungkan hentian GTFS dengan halangan dilaporkan penduduk.",
      "Minta maklum balas operator untuk jurang laluan, jurang kekerapan, dan masalah feeder.",
      "Selaraskan pembaikan MBPJ untuk lintasan, lampu, kesinambungan laluan pejalan kaki, teduhan, dan keadaan hentian bas.",
    ],
    sourceNotes: ["Kebolehcapaian GTFS Prasarana untuk analisis suapan transit."],
    scope: "Proksi operasi",
  },
  {
    slug: "flooding-drainage",
    title: "Banjir kilat dan kebolehpercayaan saliran",
    shortTitle: "Banjir dan saliran",
    residentFrame:
      "Banjir kilat yang singkat tetapi berulang boleh mengganggu perjalanan sekolah, merosakkan kenderaan dan rumah, serta membuat penduduk rasa longkang hanya dijaga selepas krisis.",
    whyItMatters:
      "Respons banjir sangat setempat: isu sebenar bukan sekadar sama ada banjir berlaku, tetapi longkang, cerun, tepi jalan, atau kitaran penyelenggaraan mana yang berulang kali gagal.",
    localSignals: [
      "Cadangan penduduk boleh dipadankan dengan foto, tarikh, segmen jalan, keadaan longkang, dan lokasi berulang.",
      "Laluan respons agensi sering merentasi penyelenggaraan majlis, saliran negeri, dan sempadan pemilikan jalan.",
    ],
    caveats: [
      "Tiada kiraan banjir disahkan seluruh P105 dimasukkan di sini; kad ini ialah rangka kerja untuk pengesahan.",
      "Keamatan hujan, kerja hulu, pembangunan persendirian, longkang tepi jalan, dan sistem sungai boleh berada di bawah pemilik berbeza.",
    ],
    confidence: "Sederhana",
    jurisdiction: ["MBPJ", "JPS", "Agensi negeri", "Pemilik jalan", "Pemaju atau pengurusan bangunan jika berkaitan"],
    prioritisationLens: ["Risiko kerosakan tinggi", "Perlu bukti khusus lokasi", "Kemungkinan perlu susulan antara agensi"],
    validationQuestions: [
      "Bahagian mana yang berulang kali banjir, dan selepas berapa banyak hujan?",
      "Isunya longkang tersumbat, longkang kecil, aliran balik, larian cerun, reka bentuk jalan, sisa pembinaan, atau limpahan sungai?",
      "Bukti apa yang ada: tarikh, foto, laporan pembaikan, nombor aduan, atau kerja pembangunan berhampiran?",
    ],
    representativeActions: [
      "Cipta log isu mengikut lokasi tanpa mendedahkan alamat peribadi.",
      "Minta jadual pembersihan longkang, masa respons aduan, dan sempadan pemilikan daripada agensi.",
      "Jejaki setiap tapak dari laporan ke pemeriksaan, mitigasi, dan semakan selepas hujan.",
    ],
    sourceNotes: ["Rangka kerja isu berdasarkan keperluan pengesahan penduduk; tiada statistik banjir baharu dinyatakan."],
    scope: "P105",
  },
  {
    slug: "safety-property-crime-perception",
    title: "Keselamatan dan persepsi jenayah harta benda",
    shortTitle: "Persepsi keselamatan",
    residentFrame:
      "Walaupun jenayah dilaporkan menurun, penduduk mungkin masih mengubah rutin kerana pecah masuk, takut ragut, lampu lemah, risiko parkir, atau insiden tidak dilaporkan.",
    whyItMatters:
      "Produk ini perlu memisahkan trend jenayah yang disahkan daripada persepsi keselamatan harian supaya respons tidak menolak pengalaman penduduk atau membesarkan ketakutan.",
    localSignals: [
      "Jenayah dilaporkan daerah PJ turun daripada 5,005 pada 2016 kepada 1,472 pada 2023.",
      "Persepsi keselamatan boleh diuji melalui laporan titik panas, jurang lampu, laluan dielak, dan maklum balas pengurusan bangunan.",
    ],
    caveats: [
      "Angka jenayah ialah peringkat daerah PJ, bukan khusus P105, dan kes dilaporkan mungkin tidak menangkap kurang laporan.",
      "Persepsi sah untuk perancangan ruang awam tetapi tidak patut dianggap bukti jenayah terhadap individu atau premis tertentu.",
    ],
    confidence: "Sederhana",
    jurisdiction: ["PDRM", "MBPJ", "Persatuan penduduk", "Pengurusan bangunan", "Program keselamatan negeri dan persekutuan"],
    prioritisationLens: ["Risiko dakwaan sensitif", "Perlu agregasi selamat", "Laluan tindakan ruang awam yang kuat"],
    validationQuestions: [
      "Tempat mana penduduk elak, dan kenapa: lampu, keterlihatan, insiden berulang, gangguan, parkir, atau laluan terpencil?",
      "Kebimbangan ini berdasarkan pengalaman sendiri, laporan kejiranan, laporan polis, atau khabar media sosial?",
      "Pembaikan tidak invasif apa yang membantu dahulu: lampu, penyelarasan rondaan, pemangkasan, reka bentuk CPTED, laluan laporan, atau sokongan mangsa?",
    ],
    representativeActions: [
      "Petakan kebimbangan keselamatan tanpa menamakan individu dituduh atau isi rumah peribadi.",
      "Minta semakan lampu, pemangkasan, dan penyelenggaraan ruang awam untuk titik kebimbangan berulang.",
      "Selaraskan panduan laporan bersama PDRM dan penduduk yang mengelakkan vigilantisme dan melindungi privasi.",
    ],
    sourceNotes: ["Trend jenayah dilaporkan daerah PJ, 2016 hingga 2023."],
    scope: "Proksi daerah",
  },
  {
    slug: "housing-rent-pressure",
    title: "Perumahan dan tekanan sewa",
    shortTitle: "Perumahan dan sewa",
    residentFrame:
      "Penyewa, penyewa bilik, pekerja muda, pelajar, dan keluarga boleh tertekan walaupun di daerah berpendapatan tinggi jika sewa, deposit, penyelenggaraan, dan kos ulang-alik naik bersama.",
    whyItMatters:
      "Tekanan perumahan berkait terus dengan kos sara hidup, kebergantungan pengangkutan, kestabilan sekolah, dan keupayaan penduduk kekal dekat dengan rangkaian sokongan.",
    localSignals: [
      "Angka pendapatan dan perbelanjaan daerah Petaling memberi konteks kemampuan hidup tetapi tidak menunjukkan beban sewa secara langsung.",
      "Pengesahan penduduk boleh memisahkan kenaikan sewa, pertikaian penyelenggaraan, kesesakan, deposit, dan risiko perpindahan.",
    ],
    caveats: [
      "Tiada indeks sewa P105 yang disahkan dimasukkan di sini; anggap ini hipotesis keutamaan untuk pengesahan penduduk.",
      "Tuil perumahan berbeza untuk sewaan persendirian, unit strata, rumah kos rendah, perumahan awam, dan perancangan guna tanah.",
    ],
    confidence: "Rendah",
    jurisdiction: ["Agensi perumahan negeri", "Perancangan dan penguatkuasaan MBPJ", "Badan strata", "Tuan rumah persendirian", "Dasar perumahan persekutuan"],
    prioritisationLens: ["Beban berpotensi serius", "Jurang bukti", "Perlu reka bentuk sensitif penyewaan"],
    validationQuestions: [
      "Adakah penduduk bergelut dengan jumlah sewa, deposit, risiko pengusiran, penyelenggaraan, kesesakan, atau akses kepada unit mampu milik?",
      "Kumpulan mana paling terkesan: keluarga, warga emas, pelajar, pekerja migran, pekerja muda, atau penduduk OKU?",
      "Rekod apa yang boleh dikongsi penduduk dengan selamat tanpa mendedahkan butiran penyewaan peribadi?",
    ],
    representativeActions: [
      "Sediakan tinjauan tekanan perumahan yang selamat privasi dan mengelakkan penamaan tuan rumah kecuali disahkan melalui saluran rasmi.",
      "Himpunkan laluan bantuan, tribunal, strata, dan majlis dalam satu panduan penduduk.",
      "Minta taklimat negeri dan majlis tentang bekalan rumah mampu milik, penyelenggaraan, dan laluan respons aduan yang menjejaskan P105.",
    ],
    sourceNotes: ["Konteks pendapatan dan perbelanjaan daerah Petaling; tiada statistik sewa P105 dinyatakan."],
    scope: "Proksi daerah",
  },
  {
    slug: "health-dengue",
    title: "Kesihatan dan pencegahan denggi",
    shortTitle: "Kesihatan dan denggi",
    residentFrame:
      "Risiko denggi, akses klinik, penjagaan warga emas, kesihatan mental, dan pencegahan kesihatan menjadi isu setempat apabila penduduk perlukan laluan yang cepat dan mudah difahami sebelum penyakit bertambah teruk.",
    whyItMatters:
      "Kerja denggi dan kesihatan awam bergantung pada laporan awal, tindakan persekitaran, dan kepercayaan antara penduduk, majlis, pejabat kesihatan, sekolah, dan pengurusan bangunan.",
    localSignals: [
      "Pengesahan denggi boleh menggunakan laporan titik panas, air bertakung, komunikasi fogging, dan respons pengurusan bangunan daripada penduduk.",
      "Pengesahan akses kesihatan boleh mengenal pasti halangan perjalanan klinik, masalah janji temu, dan jurang maklumat.",
    ],
    caveats: [
      "Tiada kiraan denggi P105 dimasukkan di sini; elakkan membayangkan wabak atau ranking yang disahkan.",
      "Dakwaan kesihatan mesti mengelakkan penamaan pesakit, isi rumah, atau premis tidak disahkan sebagai punca penyakit.",
    ],
    confidence: "Sederhana",
    jurisdiction: ["Pejabat kesihatan daerah", "MBPJ", "Sekolah", "Pengurusan bangunan", "Agensi kesihatan negeri dan persekutuan"],
    prioritisationLens: ["Potensi keseriusan kesihatan", "Sensitif privasi", "Boleh ditindak melalui kitaran pencegahan"],
    validationQuestions: [
      "Di mana penduduk melihat air bertakung atau notis denggi berulang tanpa susulan berterusan?",
      "Adakah penduduk faham siapa perlu dihubungi dan apa berlaku selepas laporan?",
      "Halangan akses kesihatan mana yang setempat: perjalanan, kos, bahasa, sistem janji temu, mobiliti, atau kekangan penjaga?",
    ],
    representativeActions: [
      "Terbitkan panduan laporan pencegahan denggi dan laluan eskalasi untuk titik panas berulang.",
      "Himpunkan pejabat kesihatan, majlis, sekolah, dan pengurusan bangunan untuk susulan pencegahan di lokasi yang dilaporkan penduduk.",
      "Kumpul halangan akses kesihatan dalam kategori agregat sahaja, tanpa butiran pesakit.",
    ],
    sourceNotes: ["Rangka kerja isu sahaja; tiada statistik denggi P105 dinyatakan."],
    scope: "P105",
  },
  {
    slug: "elderly-oku-pedestrian-accessibility",
    title: "Warga emas, OKU, dan akses pejalan kaki",
    shortTitle: "Aksesibiliti",
    residentFrame:
      "Kejiranan boleh nampak bersambung di peta tetapi masih tidak boleh digunakan oleh pengguna kerusi roda, warga emas, ibu bapa dengan stroller, orang kurang penglihatan, dan pejalan kaki dalam panas atau hujan.",
    whyItMatters:
      "Aksesibiliti ialah isu maruah harian dan ujian praktikal sama ada pengangkutan awam, kedai, klinik, sekolah, dan perkhidmatan benar-benar boleh dicapai.",
    localSignals: [
      "Data hentian GTFS Prasarana boleh membantu mengenal pasti titik akses yang perlu diaudit laluan berjalan.",
      "Pengesahan penduduk boleh menangkap ramp, tactile paving, halangan, cerun, teduhan, masa lintasan, lampu, dan kesinambungan laluan pejalan kaki.",
    ],
    caveats: [
      "Data suapan pengangkutan tidak menunjukkan sama ada laluan berjalan boleh diakses atau selamat.",
      "Halangan aksesibiliti patut didokumenkan dengan bukti lokasi sambil mengelakkan foto yang mendedahkan individu rentan tanpa kebenaran.",
    ],
    confidence: "Tinggi",
    jurisdiction: ["MBPJ", "Prasarana dan operator", "JKR atau pemilik jalan", "Pemilik bangunan", "Program aksesibiliti negeri"],
    prioritisationLens: ["Kesan kesaksamaan", "Mudah diaudit", "Sering boleh diperbaiki melalui penyelenggaraan dan piawaian reka bentuk"],
    validationQuestions: [
      "Laluan khusus mana mustahil atau tidak selamat untuk warga emas, penduduk OKU, stroller, atau pejalan kaki?",
      "Apakah halangannya: ramp tiada, laluan terhalang, penutup longkang, masa lintasan, akses hentian bas, teduhan, lampu, atau keadaan permukaan?",
      "Destinasi mana paling penting: klinik, sekolah, pasar, hentian LRT/MRT/bas, taman, atau perkhidmatan kerajaan?",
    ],
    representativeActions: [
      "Jalankan audit halangan sekitar klinik, sekolah, pasar, stesen, dan hentian bas menggunakan foto penduduk dan pin peta.",
      "Minta tarikh pembaikan majlis dan pembaikan akses operator untuk setiap halangan yang disahkan.",
      "Terbitkan kemas kini sebelum/selepas untuk pembaikan tanpa menjadikan laporan penduduk sebagai ranking aduan awam.",
    ],
    sourceNotes: ["Kebolehcapaian GTFS Prasarana untuk pemetaan hentian; audit penduduk diperlukan untuk keadaan walkability dan akses sejagat."],
    scope: "Proksi operasi",
  },
  {
    slug: "local-maintenance",
    title: "Penyelenggaraan tempatan dan kebolehpercayaan respons",
    shortTitle: "Penyelenggaraan tempatan",
    residentFrame:
      "Jalan berlubang, longkang tersumbat, lampu rosak, pokok tidak dipangkas, taman rosak, sampah haram, dan kitaran aduan lambat membentuk kepercayaan penduduk terhadap perkhidmatan asas.",
    whyItMatters:
      "Isu penyelenggaraan selalunya kecil secara individu tetapi serius apabila berulang, berlarutan, atau jatuh antara tanggungjawab agensi.",
    localSignals: [
      "Laporan penduduk boleh menangkap lokasi, tarikh, rujukan aduan, jenis bahaya, masa respons, dan sama ada pembaikan bertahan.",
      "Isu ini berkait dengan pencegahan banjir, persepsi keselamatan, akses pejalan kaki, dan keadaan perniagaan tempatan.",
    ],
    caveats: [
      "Tiada kiraan aduan awam atau ranking zon dimasukkan di sini.",
      "Log isu yang kelihatan tidak boleh memalukan pegawai, kontraktor, penduduk, atau premis individu tanpa proses yang adil.",
    ],
    confidence: "Tinggi",
    jurisdiction: ["MBPJ", "Konsesi", "Pemilik jalan", "Utiliti", "Pengurusan bangunan jika berkaitan"],
    prioritisationLens: ["Mudah ditindak", "Bukti mudah dikumpul", "Perlu penjejakan masa respons"],
    validationQuestions: [
      "Apa yang rosak, di mana lokasinya, bila dilaporkan, dan nombor rujukan apa yang ada?",
      "Adakah masalah belum selesai, berulang kali ditampal, berbahaya, atau tidak jelas pemilik agensinya?",
      "Apa yang dikira selesai: pembaikan, pembersihan, penguatkuasaan, reka bentuk semula, papan tanda, atau penyelenggaraan berjadual?",
    ],
    representativeActions: [
      "Kekalkan penjejak isu dari peribadi ke awam yang menunjukkan lokasi disahkan dan status tanpa kiraan populariti awam.",
      "Minta standard perkhidmatan dan garis masa eskalasi daripada agensi bertanggungjawab.",
      "Semak lokasi kegagalan berulang setiap bulan dan terbitkan pengajaran tentang apa yang berubah atau kenapa ia tersekat.",
    ],
    sourceNotes: ["Rangka kerja isu sahaja; tiada kiraan aduan awam dinyatakan."],
    scope: "P105",
  },
];

export const p105IssuePrinciples = [
  "Isu dahulu, orang kemudian: mulakan dengan beban penduduk dan bukti sebelum menamakan sebarang laluan wakil.",
  "Tiada kiraan awam, ranking, atau petunjuk populariti sehingga metodologi, semakan, dan peraturan privasi diterbitkan.",
  "Setiap kad mesti menunjukkan batasan, keyakinan, bidang kuasa, soalan pengesahan, dan laluan tindakan praktikal.",
  "Proksi daerah, negeri, dan operasi dilabel dengan jelas supaya penduduk tahu apa yang terbukti dan apa yang masih perlu disahkan setempat.",
] as const;

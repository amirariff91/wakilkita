import { WakilKitaActionPanel } from "./WakilKitaActionPanel";
import { CivicFooter, CivicNav } from "./civic-content";
import { P105LineMotif } from "./WakilKitaMark";

const boundaryChips = [
  "Untuk P105 Petaling Jaya",
  "Cadang nama + sebab jelas",
  "Semakan dahulu sebelum umum",
  "Tiada IC atau eKYC di borang ini",
];

const intakeFacts = [
  {
    label: "Sedang dibuka",
    value: "P105 Petaling Jaya",
    note: "Buat masa ini WakilKita menerima cadangan untuk kawasan Parlimen P105 dahulu.",
  },
  {
    label: "Apa diperlukan",
    value: "Nama + sebab khusus",
    note: "Cadangan yang berguna menerangkan kerja, kepercayaan komuniti, atau isu tempatan yang pernah dibantu.",
  },
  {
    label: "Sebelum umum",
    value: "Semakan dahulu",
    note: "Kami semak keselamatan, pendua, kaitan kawasan, keperluan kebenaran, dan risiko privasi sebelum apa-apa digunakan secara terbuka.",
  },
];

const reviewSteps = [
  {
    n: "1",
    title: "Cadangkan orang yang dipercayai",
    body: "Mulakan dengan satu nama dan satu sebab yang jelas. Ceritakan kerja mereka, kepercayaan komuniti, atau isu Petaling Jaya yang mereka faham.",
  },
  {
    n: "2",
    title: "Kami semak sebelum digunakan",
    body: "Cadangan masuk ke barisan semakan tertutup. Kami melihat pendua, butiran sensitif, kaitan kawasan, risiko privasi, dan keperluan kebenaran.",
  },
  {
    n: "3",
    title: "Bina senarai semakan yang lebih bersih",
    body: "Nama yang sesuai hanya boleh dipertimbangkan untuk paparan awam selepas semakan keselamatan, laluan pembetulan, dan kebenaran yang wajar.",
  },
  {
    n: "4",
    title: "Langkah seterusnya hanya bila peraturan jelas",
    body: "Sebarang maklum balas komuniti yang lebih kuat hanya patut dibuat kemudian, selepas kaedah, privasi, ambang keselamatan, dan cara bantahan diterangkan dengan jelas.",
  },
];

const privacyBlocks = [
  {
    heading: "Kepercayaan bermula sebelum paparan awam",
    body: "Tugas pertama ialah mengumpul nama dan sebab yang berguna tanpa mendedahkan data peribadi penduduk.",
  },
  {
    heading: "Tiada profil awam secara automatik",
    body: "Nama yang dicadangkan perlu melalui semakan, laluan pembetulan, dan pengendalian kebenaran sebelum profil awam wujud.",
  },
  {
    heading: "Tiada senarai peserta awam",
    body: "Butiran hubungan dan sebarang semakan identiti masa depan mesti kekal berasingan daripada paparan awam.",
  },
  {
    heading: "Janji awam yang jelas",
    body: "Cadangkan nama dahulu. Semak sebelum digunakan. Paparkan hanya perkara yang boleh diterangkan dan dipertahankan.",
  },
];

function IntakeDeskPanel() {
  return (
    <aside
      className="border border-[var(--line)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      aria-label="Sebelum menghantar cadangan"
    >
      <div className="border-b border-[var(--line)] px-6 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
          Untuk warga Petaling Jaya
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[var(--ink)]">
          Mulakan dengan nama yang sudah dipercayai komuniti
        </h2>
      </div>
      <div className="divide-y divide-[var(--line)]">
        {intakeFacts.map(({ label, value, note }) => (
          <div key={label} className="flex gap-4 px-6 py-4">
            <span className="w-28 shrink-0 pt-0.5 text-xs font-bold uppercase tracking-[0.06em] text-[var(--accent)]">
              {label}
            </span>
            <div>
              <p className="text-base font-bold text-[var(--ink)]">{value}</p>
              <p className="mt-0.5 text-sm leading-5 text-[var(--slate)]">{note}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--line)] px-6 py-4">
        <p className="text-sm leading-6 text-[var(--slate)]">
          Ini langkah awal untuk mengumpul cadangan yang boleh disemak dengan bertanggungjawab — bukan carta populariti.
        </p>
      </div>
      <div className="px-6 pb-4 text-[var(--civic)]">
        <P105LineMotif />
      </div>
    </aside>
  );
}

function ManifestoSection() {
  return (
    <section
      className="pb-4"
      aria-labelledby="manifesto-heading"
    >
      <div className="grid gap-0 border border-[var(--line)] bg-[var(--ink)] text-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] lg:grid-cols-[0.38fr_0.62fr]">
        <div className="border-b border-white/15 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--mint)]">
            Prinsip WakilKita
          </p>
          <h2
            id="manifesto-heading"
            className="mt-4 text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl"
          >
            Rakyat patut ada ruang mencadangkan wakil yang mereka percaya.
          </h2>
        </div>
        <div className="space-y-5 p-6 text-base leading-8 text-white/86 sm:p-8 sm:text-lg">
          <p>Politik hari ini terlalu lama dikawal oleh struktur parti dan birokrasi.</p>
          <p>
            Calon selalunya dipilih oleh parti.
            <br />
            Rakyat hanya diberi pilihan terakhir.
          </p>
          <p>
            Kami percaya sudah tiba masanya rakyat diberi ruang untuk mencadangkan sendiri siapa yang layak dipertimbangkan sebagai wakil komuniti.
          </p>
          <p>Platform ini dibina dengan satu prinsip mudah:</p>
          <ul className="space-y-2 font-bold text-white">
            <li>• Bukan parti menentukan semua pilihan.</li>
            <li>• Rakyat mencadangkan nama yang mereka percaya.</li>
          </ul>
          <p>
            Setiap cadangan perlu dilayan dengan adil, telus, dan berhati-hati — bukan sekadar angka yang hilang dalam sistem politik.
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatIsSection() {
  const isItems = [
    "Ruang untuk mencadangkan nama yang wajar dipertimbangkan di Petaling Jaya",
    "Setiap cadangan perlu ada sebab yang jelas dan boleh disemak",
    "Cadangan masuk ke barisan semakan tertutup sebelum sebarang paparan awam",
    "Langkah awal untuk membina rekod komuniti yang lebih bertanggungjawab",
  ];

  const isNotItems = [
    "Bukan proses rasmi pilihan raya, SPR, kerajaan, Parlimen, MBPJ, parti, atau pejabat wakil rakyat",
    "Bukan tempat menghantar aduan rasmi yang memerlukan tindakan pihak berkuasa",
    "Bukan senarai awam nombor IC, rekod eKYC, peserta, penyokong, kiraan, atau ranking",
  ];

  return (
    <section
      className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10"
      aria-labelledby="what-is-heading"
    >
      <div className="border border-[var(--line)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <div className="border-b border-[var(--line)] px-6 py-5">
          <h2
            id="what-is-heading"
            className="text-xl font-bold tracking-[-0.03em] text-[var(--ink)]"
          >
            Apa WakilKita buat — dan tidak buat
          </h2>
        </div>
        <div className="grid divide-y divide-[var(--line)] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="px-6 py-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
              Apa ini
            </p>
            <ul className="space-y-3">
              {isItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--ink)]">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--civic)]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 py-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-[var(--slate)]">
              Apa ini bukan
            </p>
            <ul className="space-y-3">
              {isNotItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--slate)]">
                  <span
                    className="mt-1 shrink-0 font-bold leading-6 text-[var(--accent)]"
                    aria-hidden="true"
                  >
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewJourneySection() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10"
      aria-labelledby="review-journey-heading"
    >
      <div className="border border-[var(--line)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <div className="border-b border-[var(--line)] px-6 py-5 sm:px-7">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
            Selepas anda hantar
          </p>
          <h2
            id="review-journey-heading"
            className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[var(--ink)] sm:text-3xl"
          >
            Cadangan dikumpul dahulu. Kepercayaan dibina sebelum apa-apa dibuka kepada umum.
          </h2>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-[var(--slate)]">
            Matlamat sekarang ialah cadangan yang berkualiti: satu nama sebenar, satu sebab yang jelas, dan maklumat yang selamat untuk disemak.
          </p>
        </div>
        <ol className="px-6 py-6 sm:px-7">
          {reviewSteps.map(({ n, title, body }, index) => (
            <li key={n} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="grid h-8 w-8 shrink-0 place-items-center bg-[var(--ink)] text-sm font-bold text-[var(--mint)]">
                  {n}
                </span>
                {index < reviewSteps.length - 1 && (
                  <div className="journey-connector" aria-hidden="true" />
                )}
              </div>
              <div className={index < reviewSteps.length - 1 ? "pb-6" : ""}>
                <h3 className="text-base font-bold tracking-[-0.02em] text-[var(--ink)]">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-[var(--slate)]">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PrivacyModelSection() {
  return (
    <section
      id="trust"
      className="border-y border-[var(--line)] bg-[var(--soft)] py-16"
      aria-labelledby="privacy-heading"
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
          Kepercayaan dan privasi
        </p>
        <h2
          id="privacy-heading"
          className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl"
        >
          Kepercayaan ialah produk. Paparan awam datang kemudian.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--slate)]">
          WakilKita perlu membuktikan pengambilan cadangan dibuat dengan cermat sebelum meminta kepercayaan yang lebih besar daripada penduduk. Maksudnya: tiada senarai peserta awam, tiada profil segera, dan tiada kiraan awam tanpa kaedah yang diterbitkan.
        </p>
        <div className="mt-8 divide-y divide-[var(--line)] border border-[var(--line)] bg-white">
          {privacyBlocks.map(({ heading, body }) => (
            <div key={heading} className="px-6 py-5">
              <p className="text-sm font-bold text-[var(--ink)]">{heading}</p>
              <p className="mt-1.5 text-sm leading-6 text-[var(--slate)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Langkau ke kandungan utama
      </a>
      <main id="main-content" tabIndex={-1} className="min-h-screen overflow-hidden">
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-5 py-6 sm:px-8 lg:px-10">
          <CivicNav />

          <ManifestoSection />

          <div
            id="top"
            className="grid items-start gap-10 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-14"
          >
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                {boundaryChips.map((chip) => (
                  <span
                    key={chip}
                    className="border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-bold text-[var(--civic-dark)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
                Siapa yang Petaling Jaya patut pertimbangkan dengan serius?
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slate)] sm:text-xl">
                Cadangkan satu nama tempatan yang anda percaya, dan jelaskan sebabnya. WakilKita menyemak setiap cadangan sebelum sebarang profil, senarai semakan, atau paparan awam dibuat.
              </p>
              <p className="mt-4 max-w-2xl text-sm font-bold leading-6 text-[var(--civic-dark)]">
                Bukan undian. Bukan SPR. Tiada IC atau eKYC diminta di sini.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#take-part"
                  className="bg-[var(--ink)] px-6 py-4 text-center text-sm font-bold text-[var(--mint)] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                >
                  Cadangkan nama
                </a>
                <a
                  href="#how-it-works"
                  className="border border-[var(--line)] bg-white px-6 py-4 text-center text-sm font-bold text-[var(--ink)]"
                >
                  Lihat cara semakan dibuat
                </a>
              </div>
            </div>
            <IntakeDeskPanel />
          </div>
        </section>

        <WakilKitaActionPanel />
        <WhatIsSection />
        <ReviewJourneySection />
        <PrivacyModelSection />
        <CivicFooter />
      </main>
    </>
  );
}

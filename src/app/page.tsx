import { WakilKitaActionPanel } from "./WakilKitaActionPanel";
import { CivicFooter, CivicNav } from "./civic-content";
import { P105LineMotif } from "./WakilKitaMark";

const boundaryChips = [
  "Prinsip dahulu",
  "Cadang wakil yang dipercayai",
  "Seminggu untuk cadangan",
  "Kemudian komuniti mengundi",
];

const intakeFacts = [
  {
    label: "Dibuka sekarang",
    value: "P105 Petaling Jaya",
    note: "WakilKita bermula di Petaling Jaya. Kawasan lain akan dibuka selepas ini.",
  },
  {
    label: "Langkah pertama",
    value: "Cadang nama dan cerita sebabnya",
    note: "Tulis nama orang yang anda percaya dan terangkan kenapa mereka layak dipercayai komuniti.",
  },
  {
    label: "Selepas seminggu",
    value: "Komuniti mengundi bersama",
    note: "Nama yang diluluskan masuk ke peringkat pengundian. Setiap pengundi perlu sahkan identiti — satu orang, satu suara.",
  },
];

const reviewSteps = [
  {
    n: "1",
    title: "Anda cadangkan seseorang",
    body: "Namakan seseorang yang anda percaya. Ceritakan apa yang mereka telah lakukan untuk komuniti — bukan sekadar siapa mereka.",
  },
  {
    n: "2",
    title: "Kami semak setiap cadangan",
    body: "Setiap nama disemak untuk pendua, keselamatan, kaitan kawasan, dan keperluan kebenaran sebelum tersenarai.",
  },
  {
    n: "3",
    title: "Pengundian dibuka selepas seminggu",
    body: "Setelah tempoh cadangan tamat, nama yang diluluskan dibuka untuk pengundian komuniti.",
  },
  {
    n: "4",
    title: "Satu orang, satu suara — wajib eKYC",
    body: "Melalui sistem eKYC yang disahkan, setiap individu yang sah boleh mencalon, memilih dan mengundi secara terus — tanpa perlu menjadi ahli parti atau ahli mana-mana organisasi politik.",
  },
];

const privacyBlocks = [
  {
    heading: "Prinsip dahulu, pengundian selepas itu",
    body: "WakilKita bermula dengan tujuan: rakyat patut mencadangkan wakil mereka sendiri. Pengundian berlaku hanya selepas nama dikumpul dan disemak.",
  },
  {
    heading: "Pengesahan eKYC wajib untuk semua",
    body: "Melalui sistem eKYC yang disahkan, setiap individu yang sah boleh mencalon, memilih dan mengundi calon pilihan mereka secara terus di platform ini — tanpa perlu menjadi ahli parti atau ahli mana-mana organisasi politik.",
  },
  {
    heading: "Identiti anda tidak dipaparkan",
    body: "IC, rekod pengesahan, nombor telefon, dan senarai pengundi tidak akan dipaparkan sebagai maklumat awam.",
  },
  {
    heading: "Telus dan boleh dipertanggungjawabkan",
    body: "Rakyat cadang nama dahulu. Selepas seminggu, komuniti mengundi daripada senarai yang telah disemak dan diluluskan.",
  },
];

function IntakeDeskPanel() {
  return (
    <aside
      className="border border-[var(--line)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      aria-label="Cara WakilKita berfungsi"
    >
      <div className="border-b border-[var(--line)] px-6 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
          Untuk warga Petaling Jaya
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[var(--ink)]">
          Cadangkan orang yang komuniti anda sudah percaya
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
          Ini bukan carta populariti. Ini ruang untuk mengumpul cadangan yang boleh disemak dan dipertanggungjawabkan.
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
            Rakyat memilih wakil mereka sendiri.
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
            Kami percaya sudah tiba masanya rakyat diberi kuasa untuk menentukan sendiri siapa yang layak mewakili mereka.
          </p>
          <p>Platform ini dibina dengan satu prinsip mudah:</p>
          <ul className="space-y-2 font-bold text-white">
            <li>• Bukan parti memilih rakyat.</li>
            <li>• Rakyat memilih wakil mereka sendiri.</li>
          </ul>
          <p>
            Kami juga percaya setiap suara mesti dihargai secara adil dan telus. Bukan sekadar angka yang hilang dalam sistem politik
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatIsSection() {
  const isItems = [
    "Ruang untuk rakyat mencadangkan wakil yang mereka percaya",
    "Setiap cadangan perlu ada sebab yang jelas dan boleh disemak",
    "Selepas seminggu, nama yang diluluskan masuk ke peringkat pengundian",
    "Pengundian memerlukan pengesahan identiti — satu orang, satu suara",
  ];

  const isNotItems = [
    "Bukan pilihan raya rasmi, SPR, Parlimen, MBPJ, parti, atau pejabat wakil rakyat",
    "Bukan saluran aduan rasmi yang memerlukan tindakan pihak berkuasa",
    "Bukan senarai awam nombor IC, rekod pengesahan, peserta, atau pengundi",
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
            Apa WakilKita buat — dan apa yang tidak
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
            Cara ia berjalan
          </p>
          <h2
            id="review-journey-heading"
            className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[var(--ink)] sm:text-3xl"
          >
            Cadangkan dahulu. Komuniti mengundi kemudian.
          </h2>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-[var(--slate)]">
            Rakyat cadang nama, WakilKita semak, komuniti mengundi. Mudah, telus, dan bertanggungjawab.
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
          Dipercayai kerana ia telus.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--slate)]">
          Pengundian hanya bermakna kalau proses boleh dipercayai. Sebab itu WakilKita bermula dengan prinsip, semakan nama, dan perlindungan identiti sebelum sebarang keputusan dipaparkan.
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
                Prinsip dahulu. Pilihan komuniti kemudian.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slate)] sm:text-xl">
                Cadangkan seseorang yang anda percaya. Selepas seminggu, nama yang diluluskan dibuka untuk pengundian komuniti Petaling Jaya.
              </p>
              <p className="mt-4 max-w-2xl text-sm font-bold leading-6 text-[var(--civic-dark)]">
                Pengesahan eKYC diperlukan untuk mencalon dan mengundi. IC dan rekod pengesahan tidak dipaparkan kepada umum.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#take-part"
                  className="bg-[var(--ink)] px-6 py-4 text-center text-sm font-bold text-[var(--mint)] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                >
                  Cadangkan nama
                </a>
                <a
                  href="/dashboard"
                  className="border border-[var(--line)] bg-white px-6 py-4 text-center text-sm font-bold text-[var(--ink)]"
                >
                  Lihat calon yang dicadangkan
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

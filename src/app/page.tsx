import { WakilKitaActionPanel } from "./WakilKitaActionPanel";
import { WakilKitaMark } from "./WakilKitaMark";

const principles = [
  "Bukan pilihan raya rasmi SPR",
  "Bukan undi online rasmi",
  "Bukan platform parti politik",
  "Satu pengundi, satu sokongan dalam kawasan sendiri",
  "Kawasan Parlimen dibuka secara berfasa",
];

const heroStats = [
  { label: "Fasa", value: "1 Parlimen", note: "Dibuka satu kawasan pada satu masa" },
  { label: "Pencalonan", value: "7 hari", note: "Untuk setiap kawasan Parlimen" },
  { label: "Selepas itu", value: "Live tally", note: "Sokongan awam dipaparkan selepas semakan" },
];

const steps = [
  {
    title: "Kawasan Parlimen dibuka",
    body: "Kami buka satu kawasan dahulu, kemudian bergerak ke kawasan lain secara berfasa seluruh Malaysia.",
  },
  {
    title: "Pencalonan selama 7 hari",
    body: "Pengundi mencalonkan individu tempatan yang mereka percaya layak mewakili kawasan tersebut.",
  },
  {
    title: "Sokongan awam dibuka",
    body: "Selepas pencalonan disemak, pengundi boleh menyokong satu calon pilihan dalam kawasan sendiri.",
  },
  {
    title: "Live tally dipaparkan",
    body: "Jumlah sokongan dipaparkan secara terbuka supaya semua orang boleh lihat pilihan rakyat setempat.",
  },
];

const tallyRows = [
  { seat: "Parlimen pertama", status: "Pencalonan dibuka", nominees: "Akan dikemaskini", support: "—" },
  { seat: "Parlimen seterusnya", status: "Akan datang", nominees: "Belum dibuka", support: "—" },
  { seat: "Seluruh Malaysia", status: "Berfasa", nominees: "222 kerusi Parlimen", support: "—" },
];

function HeroStatusCard() {
  return (
    <aside className="border border-[var(--line)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <div className="border-b border-[var(--line)] px-6 py-5">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
          Gerakan pencalonan rakyat
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[var(--ink)]">
          Rakyat mula dulu.
        </h2>
      </div>
      <div className="divide-y divide-[var(--line)]">
        {heroStats.map((item) => (
          <div key={item.label} className="grid grid-cols-[7rem_1fr] gap-4 px-6 py-5">
            <span className="text-xs font-bold uppercase tracking-[0.06em] text-[var(--accent)]">
              {item.label}
            </span>
            <div>
              <p className="text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">{item.value}</p>
              <p className="mt-1 text-sm leading-5 text-[var(--slate)]">{item.note}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--line)] bg-[var(--soft)] px-6 py-5 text-sm font-semibold leading-6 text-[var(--slate)]">
        Ini bukan keputusan rasmi. Ini signal awam untuk tunjuk siapa yang pengundi mahu lihat bertanding.
      </div>
    </aside>
  );
}

function ProblemSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10" aria-labelledby="problem-heading">
      <div className="grid gap-8 border border-[var(--line)] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Masalah sekarang</p>
          <h2 id="problem-heading" className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl">
            Pengundi biasanya hanya diberi pilihan selepas parti membuat keputusan.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-7 text-[var(--slate)] sm:text-lg">
          <p>
            Tetapi di banyak kawasan, rakyat sudah kenal “local hero” mereka sendiri — orang yang turun padang, bantu komuniti, dan dipercayai sebelum musim pilihan raya bermula.
          </p>
          <p>
            WakilKita wujud untuk beri ruang kepada pengundi menunjukkan pilihan mereka lebih awal. Bukan untuk menggantikan pilihan raya. Bukan untuk menjadi parti. Hanya untuk paparkan kehendak rakyat setempat secara jelas.
          </p>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10" aria-labelledby="how-heading">
      <div className="border border-[var(--line)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <div className="border-b border-[var(--line)] px-6 py-6 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Cara ia berjalan</p>
          <h2 id="how-heading" className="mt-2 text-3xl font-bold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl">
            Pencalonan dahulu. Sokongan selepas semakan. Tally dipaparkan secara langsung.
          </h2>
        </div>
        <ol className="grid divide-y divide-[var(--line)] lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {steps.map((step, index) => (
            <li key={step.title} className="p-6 sm:p-8">
              <span className="grid h-9 w-9 place-items-center bg-[var(--ink)] text-sm font-bold text-[var(--mint)]">
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--slate)]">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TallySection() {
  return (
    <section id="live-tally" className="border-y border-[var(--line)] bg-[var(--soft)] py-16" aria-labelledby="tally-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Live tally</p>
          <h2 id="tally-heading" className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl">
            Lihat siapa sedang mendapat sokongan rakyat di kawasan anda.
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--slate)]">
            Tally sebenar akan dibuka selepas pencalonan kawasan pertama disahkan. Setiap sokongan perlu terikat kepada satu kawasan Parlimen supaya ia tidak menjadi undian bebas tanpa konteks.
          </p>
        </div>
        <div className="overflow-hidden border border-[var(--line)] bg-white">
          <div className="grid grid-cols-[1fr_1fr] border-b border-[var(--line)] bg-[var(--ink)] px-5 py-4 text-xs font-bold uppercase tracking-[0.08em] text-[var(--mint)] sm:grid-cols-[1fr_1fr_1fr_1fr]">
            <span>Kawasan</span>
            <span>Status</span>
            <span className="hidden sm:block">Pencalonan</span>
            <span className="hidden sm:block">Sokongan</span>
          </div>
          {tallyRows.map((row) => (
            <div key={row.seat} className="grid grid-cols-[1fr_1fr] gap-3 border-b border-[var(--line)] px-5 py-4 last:border-b-0 sm:grid-cols-[1fr_1fr_1fr_1fr]">
              <p className="font-bold text-[var(--ink)]">{row.seat}</p>
              <p className="text-sm font-semibold text-[var(--civic)]">{row.status}</p>
              <p className="text-sm text-[var(--slate)]">{row.nominees}</p>
              <p className="text-sm font-bold text-[var(--ink)]">{row.support}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section id="trust" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10" aria-labelledby="trust-heading">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Batas yang jelas</p>
          <h2 id="trust-heading" className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl">
            Bukan pilihan raya rasmi. Bukan SPR. Bukan parti politik.
          </h2>
        </div>
        <div className="divide-y divide-[var(--line)] border border-[var(--line)] bg-white">
          {principles.map((item) => (
            <div key={item} className="flex gap-3 px-6 py-4 text-sm font-semibold leading-6 text-[var(--slate)]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--civic)]" aria-hidden="true" />
              {item}
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
        Skip to main content
      </a>
      <main id="main-content" tabIndex={-1} className="min-h-screen overflow-hidden">
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-6 sm:px-8 lg:px-10">
          <nav className="flex items-center justify-between border-b border-[var(--line)] bg-white px-4 py-3">
            <a href="#top" className="flex items-center gap-3" aria-label="WakilKita home">
              <span className="grid h-10 w-10 shrink-0 place-items-center bg-[var(--ink)] text-[var(--mint)]">
                <WakilKitaMark size={28} />
              </span>
              <span>
                <span className="block text-base font-bold tracking-[-0.03em] text-[var(--ink)]">WakilKita</span>
                <span className="block text-xs font-semibold text-[var(--civic)]">Calon rakyat, kawasan rakyat</span>
              </span>
            </a>
            <div className="hidden items-center gap-6 text-sm font-semibold text-[var(--slate)] md:flex">
              <a href="#take-part">Calonkan</a>
              <a href="#how-it-works">Cara berjalan</a>
              <a href="#live-tally">Live tally</a>
            </div>
            <a href="#take-part" className="bg-[var(--civic)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--civic-dark)]">
              Calonkan
            </a>
          </nav>

          <div id="top" className="grid items-start gap-10 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-16">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                {principles.slice(0, 3).map((chip) => (
                  <span key={chip} className="border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-bold text-[var(--civic-dark)]">
                    {chip}
                  </span>
                ))}
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-[-0.055em] text-[var(--ink)] sm:text-5xl lg:text-7xl">
                Biar pengundi pilih wakil mereka sendiri.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slate)] sm:text-xl">
                Calon biasanya diputuskan oleh parti. WakilKita buka ruang untuk pengundi mencalonkan dan menyokong individu tempatan yang mereka benar-benar mahu lihat bertanding di kawasan Parlimen mereka.
              </p>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[var(--civic-dark)]">
                Pencalonan dibuka 7 hari bagi setiap kawasan. Sokongan dipaparkan melalui live tally awam selepas semakan.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#take-part" className="bg-[var(--ink)] px-6 py-4 text-center text-sm font-bold text-[var(--mint)] shadow-[0_1px_3px_rgba(0,0,0,0.12)]">
                  Calonkan Wakil Tempatan
                </a>
                <a href="#live-tally" className="border border-[var(--line)] bg-white px-6 py-4 text-center text-sm font-bold text-[var(--ink)]">
                  Lihat Tally Langsung
                </a>
              </div>
              <p className="mt-4 text-sm font-semibold leading-6 text-[var(--slate)]">
                Ini bukan pilihan raya rasmi SPR. Ini suara awam pengundi setempat.
              </p>
            </div>
            <HeroStatusCard />
          </div>
        </section>

        <ProblemSection />
        <WakilKitaActionPanel />
        <HowItWorksSection />
        <TallySection />
        <TrustSection />

        <footer className="border-t border-[var(--line)] bg-[rgba(255,250,241,0.72)] px-5 py-10 text-sm leading-6 text-[var(--slate)] sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="font-bold text-[var(--ink)]">WakilKita</p>
              <p className="mt-1 text-xs text-[var(--slate)]">Platform pencalonan dan tally sokongan awam</p>
            </div>
            <div className="space-y-3">
              <p>
                Bukan platform rasmi SPR. Bukan pilihan raya online. Bukan parti politik. Ini ialah platform pencalonan dan tally sokongan awam untuk menunjukkan pilihan pengundi setempat.
              </p>
              <p>
                WakilKita perlu mengekalkan semakan pencalonan, laluan pembetulan, takedown, dan perlindungan data sebelum sebarang profil atau tally digunakan secara terbuka.
              </p>
              <p>
                <a className="font-bold text-[var(--civic-dark)] underline" href="mailto:miccy@arusdigital.com?subject=WakilKita%20report%20or%20takedown">
                  Report impersonation, dispute a nomination, or request takedown.
                </a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

import { p105Data } from "@/lib/p105-data";

function formatRibu(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "k";
  return n.toString();
}

function TahapBadge({ tahap }: { tahap: "tinggi" | "sederhana" | "rendah" }) {
  const map = {
    tinggi: "border-red-200 bg-red-50 text-red-700",
    sederhana: "border-amber-200 bg-amber-50 text-amber-700",
    rendah: "border-green-200 bg-green-50 text-green-700",
  };
  const label = { tinggi: "Keutamaan tinggi", sederhana: "Sederhana", rendah: "Rendah" };
  return (
    <span className={`border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${map[tahap]}`}>
      {label[tahap]}
    </span>
  );
}

function KaumBar() {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
        Komposisi pengundi mengikut kaum
      </p>
      <div className="flex h-5 w-full overflow-hidden rounded-sm">
        {p105Data.demografi.kaum.map((k) => (
          <div
            key={k.label}
            style={{ width: `${k.peratus}%`, background: k.warna }}
            title={`${k.label}: ${k.peratus}%`}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {p105Data.demografi.kaum.map((k) => (
          <div key={k.label} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: k.warna }} />
            <span className="text-xs font-semibold text-[var(--slate)]">
              {k.label} <span className="font-bold text-[var(--ink)]">{k.peratus}%</span>
            </span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-[var(--slate)]">Sumber: DOSM Banci 2020 (census_parlimen)</p>
    </div>
  );
}

function UmurBar() {
  const data = p105Data.demografi.umurPengundi;
  const max = Math.max(...data.map((d) => d.lelaki + d.perempuan));

  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
        Pengundi mengikut kumpulan umur (SPR GE15)
      </p>
      <div className="space-y-2">
        {data.map((d) => {
          const total = d.lelaki + d.perempuan;
          const pct = ((total / max) * 100).toFixed(0);
          return (
            <div key={d.label} className="flex items-center gap-3">
              <span className="w-12 shrink-0 text-right text-xs font-bold text-[var(--ink)]">{d.label}</span>
              <div className="flex-1">
                <div className="flex h-5 overflow-hidden rounded-sm">
                  <div
                    style={{ width: `${((d.lelaki / max) * 100).toFixed(1)}%`, background: "#263A4F" }}
                    title={`Lelaki: ${formatRibu(d.lelaki)}`}
                  />
                  <div
                    style={{ width: `${((d.perempuan / max) * 100).toFixed(1)}%`, background: "#6B9BD2" }}
                    title={`Perempuan: ${formatRibu(d.perempuan)}`}
                  />
                </div>
              </div>
              <span className="w-14 shrink-0 text-right text-xs font-semibold text-[var(--slate)]">
                {formatRibu(total)}
              </span>
              <span className="w-8 shrink-0 text-right text-[10px] text-[var(--slate)]">
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex gap-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#263A4F]" />
          <span className="text-[10px] font-semibold text-[var(--slate)]">Lelaki (49.4%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#6B9BD2]" />
          <span className="text-[10px] font-semibold text-[var(--slate)]">Perempuan (50.6%)</span>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-[var(--slate)]">Sumber: SPR voters_ge15.csv (Thevesh/analysis-election-msia)</p>
    </div>
  );
}

function HasilPilihRaya() {
  const total = p105Data.keputusanGE15.reduce((s, c) => s + c.undi, 0);
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
        Keputusan PRU15 (2022)
      </p>
      <div className="space-y-2">
        {p105Data.keputusanGE15.map((c) => (
          <div key={c.nama} className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <span className={`text-xs font-bold ${c.menang ? "text-[var(--ink)]" : "text-[var(--slate)]"}`}>
                  {c.nama}
                  {c.menang && (
                    <span className="ml-1.5 border border-green-300 bg-green-50 px-1.5 py-0.5 text-[10px] font-bold text-green-700">
                      MENANG
                    </span>
                  )}
                </span>
                <span className="text-xs font-semibold text-[var(--slate)]">
                  {((c.undi / total) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex-1 h-2 overflow-hidden rounded-sm bg-[var(--soft)]">
                  <div
                    style={{
                      width: `${((c.undi / total) * 100).toFixed(1)}%`,
                      background: c.menang ? "#263A4F" : "#B8CDE3",
                    }}
                    className="h-full"
                  />
                </div>
                <span className="w-14 shrink-0 text-right text-[10px] font-bold text-[var(--slate)]">
                  {formatRibu(c.undi)} undi
                </span>
              </div>
              <p className="text-[10px] text-[var(--slate)] mt-0.5">{c.parti}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-[var(--slate)]">
        Jumlah undi sah: {formatRibu(total)} · Majoriti: {formatRibu(p105Data.wakil.majoriti)} undi
      </p>
      <p className="mt-1 text-[10px] text-[var(--slate)]">Sumber: SPR / candidates_ge15.csv (Thevesh)</p>
    </div>
  );
}

function PetaKawasan() {
  // OpenStreetMap embed centered on P105 Petaling Jaya
  const lat = 3.1073;
  const lon = 101.6067;
  const iframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.08}%2C${lat - 0.06}%2C${lon + 0.08}%2C${lat + 0.06}&layer=mapnik&marker=${lat}%2C${lon}`;

  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
        Kawasan P105 Petaling Jaya
      </p>
      <div className="relative overflow-hidden border border-[var(--line)]" style={{ paddingBottom: "65%" }}>
        <iframe
          src={iframeSrc}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
          title="Peta kawasan P105 Petaling Jaya"
          loading="lazy"
        />
      </div>
      <p className="mt-2 text-[10px] text-[var(--slate)]">
        Keluasan: 55 km² · Ketumpatan: 6,587 orang/km² · © OpenStreetMap contributors
      </p>
    </div>
  );
}

function StatKotak({ label, nilai, sub }: { label: string; nilai: string; sub?: string }) {
  return (
    <div className="border border-[var(--line)] bg-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--civic)]">{label}</p>
      <p className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[var(--ink)]">{nilai}</p>
      {sub && <p className="mt-1 text-[10px] font-semibold text-[var(--slate)]">{sub}</p>}
    </div>
  );
}

export function ConstituencyProfile() {
  return (
    <section className="mb-8 space-y-6" aria-labelledby="profil-kawasan">
      {/* Header */}
      <div className="border border-[var(--line)] bg-[var(--ink)] text-white p-5 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--mint)]">
              Profil Kawasan Parlimen
            </p>
            <h2 id="profil-kawasan" className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              P105 Petaling Jaya
            </h2>
            <p className="mt-1 text-sm font-semibold text-white/70">Selangor · 55 km²</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--mint)]">Ahli Parlimen</p>
            <p className="mt-1 text-lg font-bold">{p105Data.wakil.nama}</p>
            <p className="text-xs text-white/70">{p105Data.wakil.parti}</p>
          </div>
        </div>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatKotak
          label="Jumlah pengundi"
          nilai="196,588"
          sub="SPR 2023"
        />
        <StatKotak
          label="Penduduk"
          nilai="362,290"
          sub="Banci DOSM 2020"
        />
        <StatKotak
          label="Pendapatan median"
          nilai="RM8,942"
          sub="Isi rumah sebulan"
        />
        <StatKotak
          label="Majoriti PRU15"
          nilai="50,575"
          sub={`${p105Data.wakil.peratusUndian}% undi sah`}
        />
      </div>

      {/* Map + Race */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="border border-[var(--line)] bg-white p-5">
          <PetaKawasan />
        </div>
        <div className="border border-[var(--line)] bg-white p-5 space-y-6">
          <KaumBar />
          <div className="border-t border-[var(--line)] pt-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">
              Statistik tambahan
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--slate)]">Kadar penyertaan tenaga kerja</span>
                <span className="font-bold text-[var(--ink)]">75%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--slate)]">Kadar pengangguran</span>
                <span className="font-bold text-[var(--ink)]">5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--slate)]">Saiz isi rumah purata</span>
                <span className="font-bold text-[var(--ink)]">3.7 orang</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--slate)]">Gini (ketaksamaan)</span>
                <span className="font-bold text-[var(--ink)]">0.441</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--slate)]">Kadar kemiskinan</span>
                <span className="font-bold text-[var(--ink)]">1.1%</span>
              </div>
            </div>
            <p className="mt-2 text-[10px] text-[var(--slate)]">Sumber: DOSM Banci 2020</p>
          </div>
        </div>
      </div>

      {/* Age distribution */}
      <div className="border border-[var(--line)] bg-white p-5">
        <UmurBar />
      </div>

      {/* GE15 results */}
      <div className="border border-[var(--line)] bg-white p-5">
        <HasilPilihRaya />
      </div>

      {/* Current issues */}
      <div className="border border-[var(--line)] bg-white">
        <div className="border-b border-[var(--line)] px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--civic)]">Isu semasa</p>
          <h3 className="mt-1 text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">
            Apa yang penduduk PJ hadapi sekarang
          </h3>
        </div>
        <div className="divide-y divide-[var(--line)]">
          {p105Data.isuSemasa.map((isu) => (
            <div key={isu.isu} className="px-5 py-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-base font-bold text-[var(--ink)]">{isu.isu}</p>
                <TahapBadge tahap={isu.tahap} />
              </div>
              <p className="mt-1 text-xs font-bold text-[var(--civic)]">{isu.kawasan}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--slate)]">{isu.keterangan}</p>
              <p className="mt-2 text-[10px] text-[var(--slate)]">📌 {isu.sumber}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--line)] bg-[var(--soft)] px-5 py-4">
          <p className="text-xs leading-5 text-[var(--slate)]">
            Isu-isu di atas dikumpul daripada laporan media, aduan penduduk, dan data awam. WakilKita bukan saluran aduan rasmi — untuk tindakan, sila hubungi MBPJ atau pejabat wakil rakyat.
          </p>
        </div>
      </div>
    </section>
  );
}

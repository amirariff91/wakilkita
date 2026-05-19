import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wakilkita.arusdigital.com"),
  title: "WakilKita — Biar pengundi pilih wakil mereka sendiri",
  description:
    "Platform pencalonan dan tally sokongan awam untuk menunjukkan siapa yang pengundi mahu lihat sebagai wakil tempatan. Bukan pilihan raya rasmi SPR dan bukan parti politik.",
  openGraph: {
    title: "WakilKita — Biar pengundi pilih wakil mereka sendiri",
    description:
      "Calonkan individu tempatan yang anda mahu lihat bertanding di kawasan Parlimen anda. Pencalonan 7 hari, sokongan awam, live tally selepas semakan.",
    images: [{ url: "/og/wakilkita-pj-og.svg", width: 1200, height: 630, alt: "WakilKita nomination and public support tally" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WakilKita — Biar pengundi pilih wakil mereka sendiri",
    description: "Pencalonan rakyat dan live tally sokongan awam. Bukan pilihan raya rasmi SPR.",
    images: ["/og/wakilkita-pj-og.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms">
      <body>{children}</body>
    </html>
  );
}

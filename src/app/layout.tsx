import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wakilkita.arusdigital.com"),
  title: "WakilKita — Cadangan komuniti Petaling Jaya",
  description:
    "Cadangkan nama tempatan yang dipercayai di Petaling Jaya. WakilKita menyemak setiap cadangan secara peribadi sebelum sebarang paparan awam.",
  openGraph: {
    title: "WakilKita — Cadangan komuniti Petaling Jaya",
    description:
      "Cadangkan nama yang dipercayai. Semakan dahulu sebelum sebarang paparan awam.",
    images: [{ url: "/og/wakilkita-pj-og.png", width: 1200, height: 630, alt: "WakilKita P105 Petaling Jaya" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WakilKita — Cadangan komuniti Petaling Jaya",
    description: "Cadangkan nama yang dipercayai. Semakan dahulu sebelum umum.",
    images: ["/og/wakilkita-pj-og.png"],
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

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wakilkita.arusdigital.com"),
  title: "WakilKita — Non-binding civic preference signal",
  description:
    "Independent Pandan-only civic intake for non-binding preference signals; not SPR-affiliated, not online voting, and not an official election service.",
  openGraph: {
    title: "WakilKita — P100 Pandan civic preference pilot",
    description:
      "A trust-first Pandan intake and constituency workbench. Not SPR-affiliated, not online voting, and not official election infrastructure.",
    images: [{ url: "/og/wakilkita-pandan-og.png", width: 1200, height: 630, alt: "WakilKita P100 Pandan non-binding civic preference signal preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WakilKita — P100 Pandan civic preference pilot",
    description: "Trust-first Pandan intake and constituency workbench. Not online voting.",
    images: ["/og/wakilkita-pandan-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

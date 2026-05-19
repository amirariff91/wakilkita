import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wakilkita.arusdigital.com"),
  title: "WakilKita — constituency nomination intake",
  description:
    "Independent private intake for constituency representative nominations and issue priorities. Verified support signals are not live yet. Not SPR-affiliated, not online voting, and not a public authority service.",
  openGraph: {
    title: "WakilKita — Nominate people serving your constituency",
    description:
      "A trust-first constituency intake for representative nominations and issue priorities. Not SPR-affiliated, not online voting, and not a party tool.",
    images: [{ url: "/og/wakilkita-pandan-og.png", width: 1200, height: 630, alt: "WakilKita private civic intake preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WakilKita — Nominate people serving your constituency",
    description: "Trust-first constituency intake for nominations and issue priorities. Not online voting.",
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

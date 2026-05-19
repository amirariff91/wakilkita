import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wakilkita.arusdigital.com"),
  title: "WakilKita — Petaling Jaya civic dashboard",
  description:
    "Dashboard-first P105 Petaling Jaya civic nomination and issue intake. Not SPR-affiliated, not online voting, and not a public authority service.",
  openGraph: {
    title: "WakilKita — P105 Petaling Jaya dashboard",
    description:
      "Dashboard-first P105 Petaling Jaya intake for local nominations, endorsements, and issue priorities. Not SPR-affiliated, not online voting, and not a party tool.",
    images: [{ url: "/og/wakilkita-pj-og.svg", width: 1200, height: 630, alt: "WakilKita constituency intake" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WakilKita — P105 Petaling Jaya dashboard",
    description: "Petaling Jaya intake for nominations and issue priorities. Not online voting.",
    images: ["/og/wakilkita-pj-og.svg"],
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

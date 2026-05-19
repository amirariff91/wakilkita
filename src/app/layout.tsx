import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wakilkita.arusdigital.com"),
  title: "WakilKita — Petaling Jaya nomination review",
  description:
    "P105 Petaling Jaya nomination and endorsement intake. Not affiliated with SPR, not an official election, and not a public authority service.",
  openGraph: {
    title: "WakilKita — P105 Petaling Jaya nomination review",
    description:
      "P105 Petaling Jaya intake for local nominations, endorsements, and issue priorities. Not affiliated with SPR, not an official election, and not a party tool.",
    images: [{ url: "/og/wakilkita-pj-og.svg", width: 1200, height: 630, alt: "WakilKita constituency intake" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WakilKita — P105 Petaling Jaya nomination review",
    description: "Petaling Jaya intake for nominations and endorsements. Not an official election.",
    images: ["/og/wakilkita-pj-og.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-MY">
      <body>{children}</body>
    </html>
  );
}

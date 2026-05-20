import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wakilkita.arusdigital.com"),
  title: "WakilKita — Petaling Jaya civic intake",
  description:
    "P105 Petaling Jaya rep nominations with eKYC-gated live polling after one week. Not a public authority service, election process, or party tool.",
  openGraph: {
    title: "WakilKita — P105 Petaling Jaya civic intake",
    description:
      "P105 Petaling Jaya rep nominations with eKYC-gated live polling after one week. Not a public authority service or party tool.",
    images: [{ url: "/og/wakilkita-pj-og.png", width: 1200, height: 630, alt: "WakilKita constituency intake" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WakilKita — P105 Petaling Jaya live polling",
    description: "Petaling Jaya rep nominations first, live polling after one week.",
    images: ["/og/wakilkita-pj-og.png"],
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

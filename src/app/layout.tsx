import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wakilkita.arusdigital.com"),
  title: "WakilKita — Petaling Jaya community nominations",
  description:
    "Suggest who should represent Petaling Jaya. WakilKita collects resident nominations for review before any public poll or profile appears.",
  openGraph: {
    title: "WakilKita — Petaling Jaya community nominations",
    description:
      "Suggest who should represent Petaling Jaya. Names are reviewed before any public poll or profile appears.",
    images: [{ url: "/og/wakilkita-pj-og.png", width: 1200, height: 630, alt: "WakilKita constituency intake" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WakilKita — Petaling Jaya community nominations",
    description: "Suggest trusted names first. Review before anything public.",
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

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wakilkita.arusdigital.com"),
  title: "WakilKita — Petaling Jaya community poll",
  description:
    "Suggest who should represent Petaling Jaya. After 7 days, approved names move into a community poll. Not an official election or party tool.",
  openGraph: {
    title: "WakilKita — Petaling Jaya community poll",
    description:
      "Suggest who should represent Petaling Jaya. After 7 days, approved names move into a community poll.",
    images: [{ url: "/og/wakilkita-pj-og.png", width: 1200, height: 630, alt: "WakilKita constituency intake" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WakilKita — Petaling Jaya community poll",
    description: "Suggest names first. Community poll after 7 days.",
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

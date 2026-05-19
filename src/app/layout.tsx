import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wakilkita.arusdigital.com"),
  title: "WakilKita — Petaling Jaya civic intake",
  description:
    "P105 Petaling Jaya civic nomination and issue intake. Not a public authority service, not a public ranking, and not a party tool.",
  openGraph: {
    title: "WakilKita — P105 Petaling Jaya civic intake",
    description:
      "P105 Petaling Jaya intake for local nominations, endorsements, and issue priorities. Not a public authority service and not a party tool.",
    images: [{ url: "/og/wakilkita-pj-og.png", width: 1200, height: 630, alt: "WakilKita constituency intake" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WakilKita — P105 Petaling Jaya nomination review",
    description: "Petaling Jaya intake for nominations and issue priorities. Review first, public later.",
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

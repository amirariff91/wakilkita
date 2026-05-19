import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WakilKita — Verified civic mandate platform",
  description:
    "A trust-first platform for Malaysians to nominate, support, and compare local representatives using verified constituency signals and public data.",
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

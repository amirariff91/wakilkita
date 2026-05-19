import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WakilKita — Non-binding civic preference signal",
  description:
    "Independent Pandan-only civic demo for non-binding preference signals; not SPR-affiliated, not online voting, and not an official election service.",
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

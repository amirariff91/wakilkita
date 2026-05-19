import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WakilKita — Non-binding civic preference signal",
  description:
    "A trust-first Malaysian civic prototype for constituents to nominate, support, and compare local representatives using planned verification and public-data issue signals.",
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

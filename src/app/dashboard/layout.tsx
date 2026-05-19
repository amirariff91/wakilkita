import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private review queue — WakilKita",
  description: "Token-gated WakilKita reviewer queue for private intake review.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

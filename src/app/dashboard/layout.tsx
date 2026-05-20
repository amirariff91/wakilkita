import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard calon — WakilKita",
  description: "Dashboard cadangan calon WakilKita untuk Petaling Jaya dengan kemas kini langsung.",
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

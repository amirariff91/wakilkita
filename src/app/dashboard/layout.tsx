import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calon dicadangkan — WakilKita",
  description: "Senarai nama yang dicadangkan oleh warga Petaling Jaya, dikemas kini secara langsung.",
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

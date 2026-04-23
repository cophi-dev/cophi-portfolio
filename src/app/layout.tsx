import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Philipp Portfolio",
  description: "Minimal coding portfolio powered by GitHub projects.",
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

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cophi",
  description: "A calm developer portfolio — featured GitHub projects, context, and links.",
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

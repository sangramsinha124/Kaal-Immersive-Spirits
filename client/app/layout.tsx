import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KAAL — Spirits of the Monsoon",
  description:
    "An immersive digital experience inspired by the spirit of the Indian monsoon.",
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

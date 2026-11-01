import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AngkatLogika | Learning Command Center",
  description: "A personal learning system for understanding, practice, progress, and reflection."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
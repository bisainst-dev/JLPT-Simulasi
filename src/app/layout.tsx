import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BISA JLPT - Simulasi Ujian JLPT (N5 - N1) Online",
  description: "Platform Resmi Simulasi Ujian JLPT Online (N5 hingga N1) dengan Scoring Engine IRT Statis, Format Furigana, Audio Choukai, dan Dual Passing Grade.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}

import { Metadata } from "next";
import { JlptSimulator } from "@/components/jlpt/JlptSimulator";

export const metadata: Metadata = {
  title: "CBT Simulasi Ujian JLPT (N5 - N1) | BISA JLPT",
  description: "Ruang simulasi ujian Computer-Based Testing JLPT N5 hingga N1 resmi dengan timer, audio Choukai, format furigana, dan evaluasi kelulusan ganda.",
};

export const dynamic = "force-dynamic";

export default function SimulationPage() {
  return <JlptSimulator />;
}

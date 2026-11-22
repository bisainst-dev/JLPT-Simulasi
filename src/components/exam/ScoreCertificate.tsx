'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, ShieldCheck, Printer, ArrowLeft, RotateCcw, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import FuriganaText from '@/components/common/FuriganaText';

interface SectionBreakdown {
  name: string;
  score?: number;
  scaledScore?: number;
  maxScore: number;
  threshold: number;
  isPassedSection: boolean;
  percentage: number;
}

interface ScoreCertificateProps {
  attempt: {
    id: string;
    createdAt: Date | string;
    scoreTotal: number;
    scoreSection1: number;
    scoreSection2: number;
    scoreSection3: number;
    isPassed: boolean;
    resultDetails?: string | null;
    user: {
      name: string;
      email: string;
      lpkName?: string | null;
    };
    examPackage: {
      id: string;
      title: string;
      level: string;
      passScoreTotal: number;
    };
    answers: Array<{
      id: string;
      selectedOption?: number | null;
      isCorrect: boolean;
      isFlagged: boolean;
      question: {
        id: string;
        mondaiNumber: number;
        questionNumber: number;
        instruction?: string | null;
        passage?: string | null;
        content: string;
        options: string;
        correctOption: number;
        explanation?: string | null;
        weight: number;
      };
    }>;
  };
}

export default function ScoreCertificate({ attempt }: ScoreCertificateProps) {
  const isPassed = attempt.isPassed;
  let details: any = {};
  try {
    details = attempt.resultDetails ? JSON.parse(attempt.resultDetails) : {};
  } catch (e) {
    details = {};
  }

  const sections: SectionBreakdown[] = details.sectionBreakdown || [];

  // Trigger celebration confetti on pass
  useEffect(() => {
    if (isPassed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8C0014', '#e5aa24', '#10b981', '#ffffff'],
      });
    }
  }, [isPassed]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 print:p-0 print:space-y-4">
      {/* Top Action Bar (hidden when printing) */}
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dasbor</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Lembar Sertifikat</span>
          </button>
          <Link
            href={`/exam/${attempt.examPackage.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-maroon-800 hover:bg-maroon-900 text-white shadow-sm transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Simulasi</span>
          </Link>
        </div>
      </div>

      {/* Official Score Report Certificate Sheet */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-xl relative overflow-hidden print:border-none print:shadow-none print:p-2">
        {/* Top Decorative Border */}
        <div className="h-3 bg-gradient-to-r from-maroon-900 via-maroon-700 to-amber-500 rounded-t-3xl -mx-6 sm:-mx-10 -mt-6 sm:-mt-10 mb-8" />

        {/* Certificate Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-slate-100 pb-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-maroon-800 text-white font-japanese font-black text-2xl flex items-center justify-center shadow-md flex-shrink-0">
              認定
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                  JLPT SCORE REPORT
                </span>
                <span className="px-2 py-0.5 rounded bg-maroon-100 text-maroon-900 text-[11px] font-bold">
                  BISA JFT
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Sertifikat Evaluasi Resmi Hasil Simulasi Ujian Kemampuan Bahasa Jepang
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
              No. Sertifikat Digital
            </span>
            <span className="text-xs font-mono font-bold text-slate-800">
              JLPT-{attempt.examPackage.level}-{attempt.id.slice(-8).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Student & Exam Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Nama Peserta (Candidate):</span>
            <strong className="text-slate-900 text-sm font-bold">{attempt.user.name}</strong>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Tingkat Ujian (Level):</span>
            <span className="inline-flex items-center gap-1 font-bold text-maroon-800 text-sm">
              JLPT {attempt.examPackage.level}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Tanggal Ujian (Date):</span>
            <strong className="text-slate-800">
              {new Date(attempt.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </strong>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Lembaga / Afiliasi:</span>
            <strong className="text-slate-800">{attempt.user.lpkName || 'Peserta Mandiri'}</strong>
          </div>
        </div>

        {/* Pass / Fail Big Result Banner */}
        <div className="my-6">
          <div
            className={`p-6 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isPassed
                ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950'
                : 'bg-red-50/80 border-red-400 text-red-950'
            }`}
          >
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  isPassed ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                }`}
              >
                {isPassed ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-extrabold text-slate-500">
                  Keputusan Akhir (Result Verdict)
                </p>
                <h3 className="text-2xl sm:text-3xl font-black">
                  {isPassed ? '合格 (PASSED - LULUS)' : '不合格 (FAILED - TIDAK LULUS)'}
                </h3>
                <p className="text-xs font-medium mt-1">
                  {details.summaryMessage ||
                    (isPassed
                      ? 'Selamat! Anda memenuhi syarat total passing grade dan batas aman seluruh seksi.'
                      : 'Total skor atau batas aman seksional belum terpenuhi.')}
                </p>
              </div>
            </div>

            {/* Big Score Stamp */}
            <div className="text-center bg-white/90 backdrop-blur rounded-2xl p-4 border border-slate-200 min-w-[170px] shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Total Nilai Akhir
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">
                {attempt.scoreTotal}
                <span className="text-sm font-bold text-slate-400 font-sans"> / 180</span>
              </div>
              <span className="text-[11px] font-bold text-maroon-800 block mt-0.5">
                Pass: {attempt.examPackage.passScoreTotal} Pts
              </span>
            </div>
          </div>
        </div>

        {/* Sectional Breakdown Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Rincian Nilai Seksional & Batas Aman (Anti-Nilai Mati)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sections.map((sec, idx) => {
              const scoreVal = sec.scaledScore ?? (sec as any).score ?? 0;
              const isSectionSafe = scoreVal >= sec.threshold;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    isSectionSafe
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-red-50/50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">
                      {sec.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSectionSafe
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {isSectionSafe ? 'AMAN' : 'NILAI MATI'}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-2xl font-black font-mono text-slate-900">
                      {scoreVal}{' '}
                      <span className="text-xs font-normal text-slate-400">/ {sec.maxScore}</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Batas Aman: <strong>{sec.threshold} Pts</strong>
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${
                        isSectionSafe ? 'bg-emerald-600' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, (scoreVal / sec.maxScore) * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Security Stamp & Seal */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-maroon-800" />
            <span>Dokumen ini diterbitkan secara elektronik dan terverifikasi oleh Sistem BISA JFT.</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
            <span>SEAL HINOMARU VALIDATED</span>
          </div>
        </div>
      </div>

      {/* Answer Review & Discussion Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 print:hidden">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Pembahasan Soal & Kunci Jawaban Lengkap
          </h3>
          <p className="text-xs text-slate-500">
            Pelajari setiap butir soal untuk memahami materi tata bahasa, kanji, dan dokkai
          </p>
        </div>

        <div className="space-y-6">
          {attempt.answers.map((ans, idx) => {
            const q = ans.question;
            let optionsArr: string[] = [];
            try {
              optionsArr = JSON.parse(q.options);
            } catch (e) {
              optionsArr = [];
            }

            return (
              <div
                key={ans.id}
                className={`p-5 rounded-2xl border transition-all ${
                  ans.isCorrect
                    ? 'bg-white border-slate-200'
                    : 'bg-red-50/20 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-maroon-100 text-maroon-900 font-bold text-xs">
                      Soal #{q.questionNumber || idx + 1} (Mondai {q.mondaiNumber})
                    </span>
                    <span className="text-xs text-slate-500">Bobot: {q.weight} Pt</span>
                  </div>

                  {ans.isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Jawaban Benar
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                      <XCircle className="w-3.5 h-3.5" />
                      Jawaban Salah
                    </span>
                  )}
                </div>

                {q.instruction && (
                  <p className="text-xs text-slate-500 mb-2 font-japanese">
                    <FuriganaText text={q.instruction} />
                  </p>
                )}

                {q.passage && (
                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/80 text-xs leading-relaxed mb-3 whitespace-pre-line font-japanese">
                    <FuriganaText text={q.passage} />
                  </div>
                )}

                <div className="text-sm font-semibold text-slate-900 mb-3 font-japanese leading-relaxed">
                  <FuriganaText text={q.content} />
                </div>

                {/* Options Review */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {optionsArr.map((opt, oIdx) => {
                    const optNum = oIdx + 1;
                    const isUserChoice = ans.selectedOption === optNum;
                    const isCorrectChoice = q.correctOption === optNum;

                    return (
                      <div
                        key={oIdx}
                        className={`p-3 rounded-xl text-xs flex items-center justify-between border ${
                          isCorrectChoice
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                            : isUserChoice
                            ? 'bg-red-50 border-red-300 text-red-900'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="font-japanese">
                          <FuriganaText text={opt} />
                        </span>
                        <div className="flex items-center gap-1 text-[10px]">
                          {isUserChoice && !isCorrectChoice && (
                            <span className="bg-red-200 text-red-900 px-1.5 py-0.2 rounded font-bold">
                              Pilihan Anda
                            </span>
                          )}
                          {isCorrectChoice && (
                            <span className="bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-bold">
                              Kunci Jawaban
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                    <strong className="text-maroon-800 block mb-0.5">Penjelasan & Pembahasan:</strong>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

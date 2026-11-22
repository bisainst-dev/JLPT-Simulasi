"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  JLPT_CONFIG, 
  JLPTScoringEngine, 
  JlptLevel, 
  EvaluationResult, 
  QuestionData 
} from "@/lib/scoring/jlptScoringEngine";
import { JLPT_QUESTIONS } from "@/data/jlptQuestions";
import { FuriganaText } from "@/components/exam/FuriganaText";
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  Sparkles,
  ChevronRight,
  Home
} from "lucide-react";

export function JlptSimulator() {
  const [selectedLevel, setSelectedLevel] = useState<JlptLevel>("N5");
  const [examState, setExamState] = useState<"intro" | "testing" | "result">("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(90 * 60);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [evalResult, setEvalResult] = useState<EvaluationResult | null>(null);

  const currentQuestions: QuestionData[] = JLPT_QUESTIONS[selectedLevel] || [];
  const currentQ = currentQuestions[currentIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examState === "testing" && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examState, timeRemaining]);

  const startExam = (level: JlptLevel) => {
    setSelectedLevel(level);
    setCurrentIndex(0);
    setUserAnswers({});
    const lvlConfig = JLPT_CONFIG[level];
    setTimeRemaining(lvlConfig.durationMinutes * 60);
    setExamState("testing");
  };

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQ) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleSubmitExam = () => {
    const result = JLPTScoringEngine.evaluateExam(selectedLevel, currentQuestions, userAnswers);
    setEvalResult(result);
    setExamState("result");
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const playSpeech = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;
      utterance.onstart = () => setIsAudioPlaying(true);
      utterance.onend = () => setIsAudioPlaying(false);
      utterance.onerror = () => setIsAudioPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Browser tidak mendukung Web Speech API.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-[#1A1A1A] selection:bg-[#8C0014] selection:text-white">
      {/* ── Top Navbar ── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-red-950/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8C0014] to-[#66000E] flex items-center justify-center text-white font-bold shadow-md shadow-red-950/20">
                <span className="text-amber-300 text-sm">日</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-wide text-slate-900 group-hover:text-[#8C0014] transition-colors">
                  BISA <span className="text-[#8C0014]">JLPT</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium -mt-1">
                  Computer-Based Simulation Platform
                </span>
              </div>
            </Link>

            {examState === "testing" && (
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-[#8C0014] border border-red-200">
                Level {selectedLevel}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {examState === "testing" && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-xl border border-amber-200/80 text-amber-900 font-mono font-bold text-sm shadow-inner">
                <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
                <span>{formatTimer(timeRemaining)}</span>
              </div>
            )}

            {examState === "testing" ? (
              <button
                onClick={() => {
                  if (confirm("Apakah Anda yakin ingin mengakhiri dan mengumpulkan ujian sekarang?")) {
                    handleSubmitExam();
                  }
                }}
                className="px-4 py-1.5 bg-gradient-to-r from-[#8C0014] to-[#66000E] hover:from-[#730010] hover:to-[#4D000A] text-white text-xs font-bold rounded-xl shadow-md shadow-red-950/20 transition-all"
              >
                Selesai Ujian
              </button>
            ) : (
              <button
                onClick={() => setExamState("intro")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#8C0014] px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Beranda Level</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── 1. INTRO / LEVEL SELECTION SCREEN ── */}
      {examState === "intro" && (
        <main className="max-w-6xl mx-auto px-4 py-10 sm:py-16">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#8C0014] via-[#66000E] to-[#3B0008] text-white p-8 sm:p-12 shadow-2xl mb-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Standar Resmi Japan Foundation & JEES (N5 - N1)
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
                Simulasi Ujian JLPT <br />
                <span className="text-amber-300">Level N5 Hingga N1</span>
              </h1>
              <p className="text-red-100/90 text-sm sm:text-base leading-relaxed mb-6">
                Platform CBT mandiri berarsitektur eksekutif dengan kalkulasi <strong>bobot statis IRT</strong>, format furigana, audio Choukai interaktif, dan evaluasi <strong>syarat mutlak kelulusan ganda</strong> (Total Skor Minimum & Batas Aman Sectional).
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              Pilih Tingkat Ujian (JLPT Level)
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Tingkat N5 (Pemula) hingga N1 (Mahir) dengan kurikulum resmi standar Jepang.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(["N5", "N4", "N3", "N2", "N1"] as JlptLevel[]).map((lvl) => {
                const cfg = JLPT_CONFIG[lvl];
                const qCount = JLPT_QUESTIONS[lvl]?.length || 0;
                return (
                  <div
                    key={lvl}
                    className="relative bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-xl hover:border-red-900/30 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-black text-[#8C0014]">
                          {lvl}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          Min {cfg.passingTotal}/180
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base mb-1">
                        {cfg.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        {cfg.description}
                      </p>

                      <div className="space-y-1.5 text-xs text-slate-600 mb-6 bg-slate-50 p-3 rounded-xl">
                        <div className="flex justify-between">
                          <span>Durasi Resmi:</span>
                          <span className="font-semibold text-slate-900">{cfg.durationMinutes} Menit</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Jumlah Soal:</span>
                          <span className="font-semibold text-slate-900">{qCount} Butir</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ambang Seksional:</span>
                          <span className="font-semibold text-emerald-700">Wajib Lolos Tiap Bagian</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => startExam(lvl)}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#8C0014] to-[#66000E] group-hover:from-[#730010] group-hover:to-[#4D000A] text-white font-bold rounded-xl text-xs shadow-md transition-all"
                    >
                      <span>Mulai Simulasi {lvl}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}

      {/* ── 2. CBT EXAM INTERFACE ── */}
      {examState === "testing" && currentQ && (
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-[#8C0014] text-white font-black text-sm">
                      Soal No. {currentIndex + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      {currentQ.subCategory}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                    Bobot IRT: {currentQ.weight.toFixed(1)}x
                  </span>
                </div>

                {currentQ.instruction && (
                  <div className="mb-4 text-sm text-slate-600 bg-slate-50/80 p-3 rounded-xl border border-slate-100 font-japanese leading-relaxed">
                    <FuriganaText text={currentQ.instruction} />
                  </div>
                )}

                {currentQ.passage && (
                  <div className="mb-6 p-4 bg-amber-50/40 rounded-xl border border-amber-200/60 text-sm text-slate-800 font-japanese leading-loose">
                    <p className="font-semibold text-xs text-amber-900 mb-2 uppercase tracking-wide">
                      Wacana Bacaan (読解テキスト):
                    </p>
                    <FuriganaText text={currentQ.passage} />
                  </div>
                )}

                {(currentQ.audioScript || currentQ.audioDialogue || currentQ.ttsPrompt) && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl border border-red-200/60 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-[#8C0014] flex items-center gap-1.5 mb-1">
                        <Volume2 className="w-4 h-4" />
                        Audio Percakapan Choukai (聴解音声)
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Dengarkan percakapan bahasa Jepang dengan cermat.
                      </p>
                    </div>

                    <button
                      onClick={() => playSpeech(currentQ.ttsPrompt || currentQ.audioScript || currentQ.questionText)}
                      disabled={isAudioPlaying}
                      className="px-4 py-2 bg-[#8C0014] hover:bg-[#66000E] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
                    >
                      <Volume2 className={`w-4 h-4 ${isAudioPlaying ? "animate-bounce" : ""}`} />
                      <span>{isAudioPlaying ? "Memutar..." : "Putar Suara"}</span>
                    </button>
                  </div>
                )}

                <div className="text-lg sm:text-xl font-japanese font-semibold text-slate-900 mb-6 leading-relaxed">
                  <FuriganaText text={currentQ.questionText} />
                </div>

                <div className="space-y-3">
                  {currentQ.options.map((optText, optIdx) => {
                    const isSelected = userAnswers[currentQ.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base font-japanese transition-all flex items-center gap-4 ${
                          isSelected
                            ? "bg-red-50/70 border-[#8C0014] text-[#8C0014] shadow-sm ring-1 ring-[#8C0014]"
                            : "bg-white border-slate-200 hover:border-slate-300 text-slate-800"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isSelected
                              ? "bg-[#8C0014] text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {optIdx + 1}
                        </div>
                        <div className="flex-1">
                          <FuriganaText text={optText} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-40"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                {currentIndex < currentQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#8C0014] text-white text-sm font-semibold transition-all shadow-md"
                  >
                    <span>Selanjutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (confirm("Kumpulkan dan periksa nilai ujian sekarang?")) {
                        handleSubmitExam();
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8C0014] to-[#66000E] text-white text-sm font-bold shadow-lg shadow-red-950/20 hover:opacity-95 transition-all"
                  >
                    <span>Kumpulkan Lembar Jawaban</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 text-sm mb-3">
                  Nomor Soal
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {currentQuestions.map((q, idx) => {
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const isCurrent = idx === currentIndex;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                          isCurrent
                            ? "bg-[#8C0014] text-white shadow-md ring-2 ring-[#8C0014]/30"
                            : isAnswered
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ── 3. RESULT VIEW ── */}
      {examState === "result" && evalResult && (
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="relative bg-white rounded-3xl border-2 border-red-950/20 p-8 sm:p-12 shadow-2xl overflow-hidden mb-8">
            <div className="absolute top-8 right-8 pointer-events-none">
              <div
                className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center font-japanese font-black rotate-[-12deg] shadow-lg ${
                  evalResult.isPassed
                    ? "border-emerald-600 text-emerald-600 bg-emerald-50/30"
                    : "border-red-600 text-red-600 bg-red-50/30"
                }`}
              >
                <span className="text-2xl tracking-widest">
                  {evalResult.isPassed ? "合格" : "不合格"}
                </span>
                <span className="text-[10px] tracking-normal font-sans font-bold">
                  {evalResult.isPassed ? "PASSED" : "FAILED"}
                </span>
              </div>
            </div>

            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-widest text-[#8C0014] font-bold">
                日本語能力試験 判定通知書
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                LEMBAR HASIL SIMULASI JLPT ({evalResult.level})
              </h2>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center max-w-md mx-auto mb-8">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Skor Berskala (Aproksimasi IRT)
              </span>
              <div className="text-5xl font-black text-[#8C0014] my-2">
                {evalResult.totalScaledScore} <span className="text-xl text-slate-400 font-bold">/ 180</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Ambang Kelulusan Minimum: <strong>{evalResult.levelConfig.passingTotal} Poin</strong>
              </p>
            </div>

            <div
              className={`p-4 rounded-xl border text-sm leading-relaxed mb-8 flex items-start gap-3 ${
                evalResult.isPassed
                  ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                  : "bg-red-50/80 border-red-200 text-red-900"
              }`}
            >
              {evalResult.isPassed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-sm mb-1">{evalResult.statusGrade}</p>
                <p className="text-xs">{evalResult.statusMessage}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-slate-900 text-sm mb-3">
                Rincian Skor per Bagian
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600 border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                    <tr>
                      <th className="p-3">Seksi</th>
                      <th className="p-3 text-center">Soal Benar</th>
                      <th className="p-3 text-center">Skor</th>
                      <th className="p-3 text-center">Batas Aman</th>
                      <th className="p-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {evalResult.sectionalBreakdown.map((sec) => (
                      <tr key={sec.id}>
                        <td className="p-3 font-semibold text-slate-900">
                          {sec.label}
                        </td>
                        <td className="p-3 text-center">
                          {sec.correctQuestions} / {sec.totalQuestions}
                        </td>
                        <td className="p-3 text-center font-bold text-slate-900">
                          {sec.scaledScore} / {sec.maxScore}
                        </td>
                        <td className="p-3 text-center">
                          min {sec.minPassScore}
                        </td>
                        <td className="p-3 text-right">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              sec.isSectionPassed
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {sec.isSectionPassed ? "LULUS" : "GAGAL (NILAI MATI)"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => startExam(selectedLevel)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#8C0014] hover:bg-[#66000E] text-white font-bold rounded-xl text-xs shadow-md transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Simulasi ({selectedLevel})</span>
              </button>

              <button
                onClick={() => setExamState("intro")}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
              >
                Pilih Level Lain (N5 - N1)
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <h3 className="font-extrabold text-slate-900 text-base mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#8C0014]" />
              Pembahasan Soal & Kunci Jawaban
            </h3>

            <div className="space-y-6">
              {currentQuestions.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice === q.correctOption;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border text-sm leading-relaxed ${
                      isCorrect
                        ? "bg-slate-50/70 border-slate-200"
                        : "bg-red-50/40 border-red-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-slate-900">
                        Soal No. {idx + 1} ({q.subCategory})
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isCorrect
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isCorrect ? "Benar" : "Salah"}
                      </span>
                    </div>

                    <div className="font-japanese font-semibold text-slate-900 mb-3">
                      <FuriganaText text={q.questionText} />
                    </div>

                    {q.explanation && (
                      <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200/80">
                        <span className="font-bold text-[#8C0014]">Pembahasan: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

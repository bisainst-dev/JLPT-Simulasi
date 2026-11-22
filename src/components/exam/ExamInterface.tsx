'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import FuriganaText from '@/components/common/FuriganaText';
import AudioPlayer from '@/components/common/AudioPlayer';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  Send,
  AlertTriangle,
  HelpCircle,
  Eye,
  EyeOff,
  Volume2,
  CheckCircle2,
  Bookmark,
  Loader2,
} from 'lucide-react';

interface QuestionItem {
  id: string;
  mondaiNumber: number;
  questionNumber: number;
  instruction?: string | null;
  passage?: string | null;
  audioUrl?: string | null;
  imageUrl?: string | null;
  content: string;
  options: string; // JSON array
  weight: number;
  orderIndex: number;
}

interface SectionItem {
  id: string;
  sectionType: string;
  name: string;
  timeLimitMinutes: number;
  questions: QuestionItem[];
}

interface ExamInterfaceProps {
  examPackage: {
    id: string;
    title: string;
    level: string;
    durationMinutes: number;
    passScoreTotal: number;
    sections: SectionItem[];
  };
}

export default function ExamInterface({ examPackage }: ExamInterfaceProps) {
  const router = useRouter();

  // Flatten all questions across sections with pointers
  const allSections = examPackage.sections;
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // User responses state
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [showFurigana, setShowFurigana] = useState(true);

  // Timer state
  const totalSeconds = (examPackage.durationMinutes || 90) * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Current active section and question
  const currentSection = allSections[activeSectionIndex] || allSections[0];
  const currentQuestions = currentSection?.questions || [];
  const currentQuestion = currentQuestions[activeQuestionIndex] || currentQuestions[0];

  // Submit test handler
  const handleSubmitExam = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examPackageId: examPackage.id,
          answers,
          flaggedQuestions: flagged,
          timeSpentSeconds: totalSeconds - timeLeft,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengumpulkan ujian');
      }

      router.push(`/result/${data.attemptId}`);
    } catch (e: any) {
      alert(e.message || 'Terjadi kesalahan saat mengumpulkan ujian');
      setIsSubmitting(false);
    }
  }, [answers, flagged, examPackage.id, isSubmitting, router, timeLeft, totalSeconds]);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmitExam]);

  // Format timer HH:MM:SS
  const formatTimer = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? `${h}:` : ''}${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Option select handler
  const handleSelectOption = (questionId: string, optionNumber: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionNumber,
    }));
  };

  // Flag toggle handler
  const toggleFlag = (questionId: string) => {
    setFlagged((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Calculate statistics across all sections
  let totalQuestionsCount = 0;
  let totalAnsweredCount = 0;
  let totalFlaggedCount = 0;

  for (const sec of allSections) {
    for (const q of sec.questions) {
      totalQuestionsCount++;
      if (answers[q.id] !== undefined) totalAnsweredCount++;
      if (flagged[q.id]) totalFlaggedCount++;
    }
  }

  // Parse options for current question
  let parsedOptions: string[] = [];
  try {
    parsedOptions = currentQuestion ? JSON.parse(currentQuestion.options) : [];
  } catch (e) {
    parsedOptions = ['Pilihan 1', 'Pilihan 2', 'Pilihan 3', 'Pilihan 4'];
  }

  const isLowTime = timeLeft < 300; // Less than 5 minutes

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 select-none">
      {/* Top Fixed Header */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white shadow-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left info */}
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-maroon-800 text-white font-black flex items-center justify-center text-sm shadow">
              {examPackage.level}
            </span>
            <div>
              <h1 className="text-xs sm:text-sm font-bold truncate max-w-[200px] sm:max-w-md text-slate-100">
                {examPackage.title}
              </h1>
              <p className="text-[11px] text-slate-400 truncate">
                {currentSection?.name}
              </p>
            </div>
          </div>

          {/* Center Timer */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-sm sm:text-base font-bold shadow-inner ${
              isLowTime
                ? 'bg-red-950 text-red-400 border border-red-800 animate-pulse'
                : 'bg-slate-800 text-amber-300 border border-slate-700'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          {/* Right Tools & Submit */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFurigana(!showFurigana)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="Aktifkan/Nonaktifkan Furigana"
            >
              {showFurigana ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Furigana: {showFurigana ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-maroon-800 hover:bg-maroon-700 text-white shadow-md transition-all border border-maroon-600 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>Kumpulkan Ujian</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Question Board */}
          <div className="lg:col-span-8 space-y-4">
            {/* Section tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {allSections.map((sec, sIdx) => {
                const isActive = sIdx === activeSectionIndex;
                const secAnswered = sec.questions.filter((q) => answers[q.id] !== undefined).length;

                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveSectionIndex(sIdx);
                      setActiveQuestionIndex(0);
                    }}
                    className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      isActive
                        ? 'bg-maroon-800 text-white border-maroon-700 shadow-sm'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span>{sec.name}</span>{' '}
                    <span className={`text-[10px] ml-1 px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {secAnswered}/{sec.questions.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Question Card */}
            {currentQuestion ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-maroon-100 text-maroon-900 rounded-lg text-xs font-bold border border-maroon-200">
                      Mondai {currentQuestion.mondaiNumber} • Nomor {currentQuestion.questionNumber}
                    </span>
                    <span className="text-xs text-slate-500">
                      (Bobot: {currentQuestion.weight} Poin)
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFlag(currentQuestion.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      flagged[currentQuestion.id]
                        ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        flagged[currentQuestion.id] ? 'fill-amber-500 text-amber-600' : 'text-slate-400'
                      }`}
                    />
                    <span>{flagged[currentQuestion.id] ? 'Ditandai Ragu-ragu' : 'Tandai Ragu'}</span>
                  </button>
                </div>

                {/* Instruction */}
                {currentQuestion.instruction && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-japanese">
                    <FuriganaText text={currentQuestion.instruction} showFurigana={showFurigana} />
                  </div>
                )}

                {/* Audio Player for Choukai / Listening */}
                {currentQuestion.audioUrl && (
                  <div className="pt-2">
                    <AudioPlayer
                      src={currentQuestion.audioUrl}
                      title={`Audio Mondai ${currentQuestion.mondaiNumber} (Soal ${currentQuestion.questionNumber})`}
                      maxPlays={2}
                    />
                  </div>
                )}

                {/* Optional Image */}
                {currentQuestion.imageUrl && (
                  <div className="rounded-xl overflow-hidden border border-slate-200 max-w-md mx-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentQuestion.imageUrl}
                      alt="Ilustrasi Soal"
                      className="w-full h-auto object-cover max-h-60"
                    />
                  </div>
                )}

                {/* Dokkai Reading Passage (if present) */}
                {currentQuestion.passage && (
                  <div className="p-5 bg-amber-50/40 rounded-2xl border border-amber-200/70 text-slate-900 text-sm leading-loose whitespace-pre-line font-japanese">
                    <strong className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 font-sans">
                      [Wacana Bacaan / 読解 本文]:
                    </strong>
                    <FuriganaText text={currentQuestion.passage} showFurigana={showFurigana} />
                  </div>
                )}

                {/* Question Content */}
                <div className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed font-japanese p-2">
                  <FuriganaText text={currentQuestion.content} showFurigana={showFurigana} />
                </div>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  {parsedOptions.map((optText, optIdx) => {
                    const optNum = optIdx + 1;
                    const isSelected = answers[currentQuestion.id] === optNum;

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(currentQuestion.id, optNum)}
                        className={`w-full p-4 rounded-2xl text-left text-sm font-medium transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-maroon-50 border-2 border-maroon-800 text-maroon-950 font-bold shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                              isSelected
                                ? 'bg-maroon-800 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {optNum}
                          </span>
                          <span className="font-japanese leading-relaxed">
                            <FuriganaText text={optText} showFurigana={showFurigana} />
                          </span>
                        </div>

                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-maroon-800 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={activeQuestionIndex === 0 && activeSectionIndex === 0}
                    onClick={() => {
                      if (activeQuestionIndex > 0) {
                        setActiveQuestionIndex(activeQuestionIndex - 1);
                      } else if (activeSectionIndex > 0) {
                        const prevSec = allSections[activeSectionIndex - 1];
                        setActiveSectionIndex(activeSectionIndex - 1);
                        setActiveQuestionIndex(prevSec.questions.length - 1);
                      }
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Sebelumnya</span>
                  </button>

                  <button
                    type="button"
                    disabled={
                      activeQuestionIndex === currentQuestions.length - 1 &&
                      activeSectionIndex === allSections.length - 1
                    }
                    onClick={() => {
                      if (activeQuestionIndex < currentQuestions.length - 1) {
                        setActiveQuestionIndex(activeQuestionIndex + 1);
                      } else if (activeSectionIndex < allSections.length - 1) {
                        setActiveSectionIndex(activeSectionIndex + 1);
                        setActiveQuestionIndex(0);
                      }
                    }}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 disabled:opacity-30 disabled:pointer-events-none transition-colors shadow-sm"
                  >
                    <span>Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-white rounded-3xl text-center text-slate-500">
                Tidak ada soal pada seksi ini.
              </div>
            )}
          </div>

          {/* Right Question Palette */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-3">
                Navigasi Soal (Question Palette)
              </h3>

              {/* Quick progress indicator */}
              <div className="mb-4 bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Status Pengerjaan:</span>
                  <strong className="text-slate-900">
                    {totalAnsweredCount} / {totalQuestionsCount} Terjawab
                  </strong>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-maroon-800 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        totalQuestionsCount > 0
                          ? (totalAnsweredCount / totalQuestionsCount) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Number Grid for Current Section */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2">
                    {currentSection.name}:
                  </p>

                  <div className="grid grid-cols-5 gap-2">
                    {currentQuestions.map((q, idx) => {
                      const isAnswered = answers[q.id] !== undefined;
                      const isFlagged = flagged[q.id];
                      const isCurrent = idx === activeQuestionIndex;

                      return (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => setActiveQuestionIndex(idx)}
                          className={`h-10 rounded-xl text-xs font-bold transition-all relative flex items-center justify-center border ${
                            isCurrent
                              ? 'ring-2 ring-maroon-800 ring-offset-1 border-maroon-800'
                              : 'border-slate-200'
                          } ${
                            isFlagged
                              ? 'bg-amber-100 text-amber-950 border-amber-300'
                              : isAnswered
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{q.questionNumber || idx + 1}</span>
                          {isFlagged && (
                            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Palette Legend */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-emerald-600 flex-shrink-0" />
                    <span>Terjawab ({totalAnsweredCount})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-amber-100 border border-amber-300 flex-shrink-0" />
                    <span>Ragu-ragu ({totalFlaggedCount})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-200 flex-shrink-0" />
                    <span>Belum Dijawab ({totalQuestionsCount - totalAnsweredCount})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded ring-2 ring-maroon-800 bg-white flex-shrink-0" />
                    <span>Sedang Dilihat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-extrabold text-slate-900">
                Konfirmasi Penyerahan Ujian
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Pastikan Anda telah memeriksa seluruh jawaban sebelum mengumpulkan.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Total Soal:</span>
                <strong className="text-slate-900">{totalQuestionsCount} Butir</strong>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Sudah Terjawab:</span>
                <strong>{totalAnsweredCount} Butir</strong>
              </div>
              {totalQuestionsCount - totalAnsweredCount > 0 && (
                <div className="flex justify-between text-red-600 font-bold">
                  <span>Belum Terjawab:</span>
                  <strong>{totalQuestionsCount - totalAnsweredCount} Butir</strong>
                </div>
              )}
              {totalFlaggedCount > 0 && (
                <div className="flex justify-between text-amber-700">
                  <span>Masih Ragu-ragu:</span>
                  <strong>{totalFlaggedCount} Butir</strong>
                </div>
              )}
            </div>

            {totalQuestionsCount - totalAnsweredCount > 0 && (
              <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-center">
                Peringatan: Masih terdapat soal yang belum Anda jawab. Soal yang kosong akan dihitung 0 poin.
              </p>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Lanjut Mengerjakan
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  setShowSubmitModal(false);
                  handleSubmitExam();
                }}
                className="py-2.5 px-4 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span>Ya, Kumpulkan</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

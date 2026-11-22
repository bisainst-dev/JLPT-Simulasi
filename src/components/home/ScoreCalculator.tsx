'use client';

import React, { useState } from 'react';
import { JLPT_CRITERIA } from '@/lib/scoring';
import { CheckCircle2, XCircle, Sparkles, Sliders, ShieldCheck, Flame } from 'lucide-react';

export default function ScoreCalculator() {
  const [level, setLevel] = useState<'N1' | 'N2' | 'N3' | 'N4' | 'N5'>('N5');
  const [sec1, setSec1] = useState(85); // For N4/N5 max 120, for N1-N3 max 60
  const [sec2, setSec2] = useState(40); // For N4/N5 Listening max 60, for N1-N3 Dokkai max 60
  const [sec3, setSec3] = useState(38); // For N1-N3 Listening max 60

  const isN4N5 = level === 'N4' || level === 'N5';
  const criteria = JLPT_CRITERIA[level];

  // Adjust sliders when level changes
  const handleLevelChange = (lvl: 'N1' | 'N2' | 'N3' | 'N4' | 'N5') => {
    setLevel(lvl);
    if (lvl === 'N4' || lvl === 'N5') {
      setSec1(75);
      setSec2(35);
    } else {
      setSec1(38);
      setSec2(35);
      setSec3(38);
    }
  };

  // Section checks
  const s1Max = isN4N5 ? 120 : 60;
  const s1Threshold = isN4N5 ? 38 : 19;
  const isS1Safe = sec1 >= s1Threshold;

  const s2Max = 60;
  const s2Threshold = 19;
  const isS2Safe = sec2 >= s2Threshold;

  const s3Max = 60;
  const s3Threshold = 19;
  const isS3Safe = isN4N5 ? true : sec3 >= s3Threshold;

  const totalScore = isN4N5 ? sec1 + sec2 : sec1 + sec2 + sec3;
  const isTotalPassed = totalScore >= criteria.passScoreTotal;
  const isAllSectionsSafe = isS1Safe && isS2Safe && isS3Safe;
  const isPassed = isTotalPassed && isAllSectionsSafe;

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-maroon-100 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-maroon-100 text-maroon-900 text-[10px] font-extrabold uppercase tracking-wider">
              INTERACTIVE CALCULATOR
            </span>
            <span className="text-xs text-amber-600 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Simulasi Passing Grade
            </span>
          </div>
          <h3 className="text-lg font-black text-slate-900">
            Kalkulator Uji Logika Nilai Mati & Passing Grade
          </h3>
          <p className="text-xs text-slate-500">
            Geser nilai tiap seksi untuk menguji rumus kelulusan standar Japan Foundation & BISA JFT
          </p>
        </div>

        {/* Level Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start sm:self-auto">
          {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => handleLevelChange(lvl)}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                level === lvl
                  ? 'bg-maroon-800 text-white shadow-sm scale-105'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section 1 Slider */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-800 line-clamp-1">
              {isN4N5 ? 'Gengo Chishiki & Dokkai' : 'Gengo Chishiki (Vocab/Grammar)'}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isS1Safe ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {isS1Safe ? 'AMAN' : 'NILAI MATI'}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono text-slate-900">
              {sec1} <span className="text-xs font-normal text-slate-400">/ {s1Max} Pt</span>
            </span>
            <span className="text-[11px] text-slate-500">Min. Aman: {s1Threshold} Pt</span>
          </div>
          <input
            type="range"
            min="0"
            max={s1Max}
            value={sec1}
            onChange={(e) => setSec1(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-maroon-800"
          />
        </div>

        {/* Section 2 Slider */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-800 line-clamp-1">
              {isN4N5 ? '聴解 Choukai (Listening)' : '読解 Dokkai (Reading)'}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isS2Safe ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {isS2Safe ? 'AMAN' : 'NILAI MATI'}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono text-slate-900">
              {sec2} <span className="text-xs font-normal text-slate-400">/ {s2Max} Pt</span>
            </span>
            <span className="text-[11px] text-slate-500">Min. Aman: {s2Threshold} Pt</span>
          </div>
          <input
            type="range"
            min="0"
            max={s2Max}
            value={sec2}
            onChange={(e) => setSec2(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-maroon-800"
          />
        </div>

        {/* Section 3 Slider (Only for N1-N3) */}
        {!isN4N5 ? (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800 line-clamp-1">
                聴解 Choukai (Listening)
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isS3Safe ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {isS3Safe ? 'AMAN' : 'NILAI MATI'}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black font-mono text-slate-900">
                {sec3} <span className="text-xs font-normal text-slate-400">/ {s3Max} Pt</span>
              </span>
              <span className="text-[11px] text-slate-500">Min. Aman: {s3Threshold} Pt</span>
            </div>
            <input
              type="range"
              min="0"
              max={s3Max}
              value={sec3}
              onChange={(e) => setSec3(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-maroon-800"
            />
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50/50 border border-dashed border-slate-200 flex flex-col justify-center text-center text-slate-400">
            <ShieldCheck className="w-8 h-8 mx-auto text-slate-300 mb-1" />
            <p className="text-xs font-bold text-slate-600">Seksi 3 Digabung pada {level}</p>
            <p className="text-[10px] text-slate-400">Format standar N4 & N5 terdiri dari 2 seksi (120 + 60)</p>
          </div>
        )}
      </div>

      {/* Result Verdict Callout */}
      <div
        className={`p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
          isPassed
            ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/60 border-emerald-500 text-emerald-950 shadow-md'
            : 'bg-gradient-to-r from-red-50 to-red-100/60 border-red-400 text-red-950'
        }`}
      >
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
              isPassed ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            {isPassed ? <CheckCircle2 className="w-7 h-7" /> : <XCircle className="w-7 h-7" />}
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-slate-500">
                STATUS KELULUSAN JLPT {level}
              </span>
              <span
                className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  isPassed ? 'bg-emerald-200 text-emerald-900' : 'bg-red-200 text-red-900'
                }`}
              >
                {isPassed ? '合格 (LULUS)' : '不合格 (BELUM LULUS)'}
              </span>
            </div>
            <p className="text-xs font-medium mt-0.5">
              {isPassed
                ? `Total nilai ${totalScore}/180 memenuhi syarat passing grade (min. ${criteria.passScoreTotal}) dan seluruh seksi di atas batas aman!`
                : !isTotalPassed && !isAllSectionsSafe
                ? `Total nilai ${totalScore}/180 belum mencapai ${criteria.passScoreTotal} dan terdapat seksi yang terkena nilai mati.`
                : !isTotalPassed
                ? `Meskipun tiap seksi aman, total nilai ${totalScore}/180 belum mencapai passing grade ${criteria.passScoreTotal} poin.`
                : `Total nilai ${totalScore}/180 lolos passing grade, TETAPI Anda terkena NILAI MATI pada salah satu seksi.`}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl px-5 py-3 border border-slate-200 text-center min-w-[140px] shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Poin</span>
          <p className="text-3xl font-black text-slate-900 font-mono">
            {totalScore}
            <span className="text-xs font-normal text-slate-400 font-sans"> / 180</span>
          </p>
          <span className="text-[10px] font-bold text-maroon-800 block">Pass: {criteria.passScoreTotal} Pt</span>
        </div>
      </div>
    </div>
  );
}

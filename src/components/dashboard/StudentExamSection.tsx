'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Play, Lock, Sparkles, Filter, CheckCircle2, Target, ArrowRight } from 'lucide-react';
import MidtransCheckoutModal from '@/components/payment/MidtransCheckoutModal';

interface ExamPackageItem {
  id: string;
  title: string;
  code: string;
  level: string;
  description?: string | null;
  durationMinutes: number;
  tierRequired: string;
  passScoreTotal: number;
  sections: Array<{
    id: string;
    questions: Array<{ id: string }>;
  }>;
}

interface StudentExamSectionProps {
  initialTargetLevel: string;
  userTier: string;
  packages: ExamPackageItem[];
}

export default function StudentExamSection({
  initialTargetLevel,
  userTier,
  packages,
}: StudentExamSectionProps) {
  const { update } = useSession();
  const [selectedLevel, setSelectedLevel] = useState<string>(initialTargetLevel || 'N5');
  const [savingTarget, setSavingTarget] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutTier, setCheckoutTier] = useState<'SILVER' | 'GOLD' | 'LPK_PARTNER'>('GOLD');

  const canAccessPackage = (pkgTier: string) => {
    if (userTier === 'LPK_PARTNER' || userTier === 'GOLD') return true;
    if (userTier === 'SILVER') return pkgTier === 'FREE' || pkgTier === 'SILVER';
    return pkgTier === 'FREE';
  };

  const handleSetTargetLevel = async (newLevel: string) => {
    setSelectedLevel(newLevel);
    setSavingTarget(true);
    try {
      const res = await fetch('/api/user/target-level', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetLevel: newLevel }),
      });
      const data = await res.json();
      if (data.success) {
        await update({ user: { targetLevel: newLevel } });
      }
    } catch (e) {
      console.error('Failed to update target level', e);
    } finally {
      setSavingTarget(false);
    }
  };

  // Filter packages specifically by the active selected level (Default: Kenji's N5 target)
  const filteredPackages = packages.filter((pkg) => pkg.level === selectedLevel);

  return (
    <div className="space-y-6">
      {/* Target Level Banner & Selector */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-maroon-800 animate-ping" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-maroon-800">
              TARGET UJIAN ANDA
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Simulasi Khusus: JLPT {selectedLevel}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-maroon-100 text-maroon-900 border border-maroon-200">
              Fokus Aktif
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Hanya paket simulasi ujian <strong>JLPT {selectedLevel}</strong> yang ditampilkan sesuai tingkat pendaftaran Anda.
          </p>
        </div>

        {/* Level Switcher Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto">
          {['N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => {
            const isTarget = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => handleSetTargetLevel(lvl)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  isTarget
                    ? 'bg-maroon-800 text-white shadow-md scale-105'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtered Packages Grid */}
      {filteredPackages.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 space-y-2">
          <Target className="w-12 h-12 mx-auto text-slate-300 mb-1" />
          <h3 className="text-sm font-bold text-slate-800">
            Belum ada paket simulasi untuk tingkat JLPT {selectedLevel}
          </h3>
          <p className="text-xs text-slate-400">
            Silakan pilih tingkat lain menggunakan tombol di atas atau hubungi admin.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => {
            const hasAccess = canAccessPackage(pkg.tierRequired);
            const totalQ = pkg.sections.reduce((acc, s) => acc + s.questions.length, 0);

            return (
              <div
                key={pkg.id}
                className={`bg-white rounded-3xl border p-6 shadow-sm flex flex-col justify-between transition-all ${
                  hasAccess
                    ? 'border-slate-200 hover:border-maroon-700 hover:shadow-lg'
                    : 'border-slate-200 opacity-80 bg-slate-50/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-maroon-800 to-maroon-950 text-white font-black text-lg flex items-center justify-center shadow-md">
                        {pkg.level}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          JLPT {pkg.level}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{pkg.code}</span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        pkg.tierRequired === 'FREE'
                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                          : pkg.tierRequired === 'SILVER'
                          ? 'bg-slate-200 text-slate-800 border-slate-300'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}
                    >
                      {pkg.tierRequired}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base mb-2 line-clamp-1">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 space-y-2 text-xs text-slate-600 mb-6">
                    <div className="flex justify-between">
                      <span>Passing Grade Total:</span>
                      <strong className="text-maroon-800 font-bold">{pkg.passScoreTotal} / 180</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Batas Aman Seksional:</span>
                      <strong className="text-slate-800">
                        {pkg.level === 'N4' || pkg.level === 'N5' ? '38/120 & 19/60' : '19/60 Tiap Seksi'}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Durasi Pengerjaan:</span>
                      <span>{pkg.durationMinutes} Menit</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jumlah Butir Soal:</span>
                      <span>{totalQ} Butir ({pkg.sections.length} Seksi)</span>
                    </div>
                  </div>
                </div>

                {hasAccess ? (
                  <Link
                    href={`/exam/${pkg.id}`}
                    className="w-full py-3 px-4 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs rounded-2xl text-center shadow-md transition-all flex items-center justify-center gap-2 hover:shadow-lg"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Mulai Ujian Simulasi {pkg.level}</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutTier(
                        (pkg.tierRequired === 'SILVER' ? 'SILVER' : 'GOLD') as any
                      );
                      setCheckoutModalOpen(true);
                    }}
                    className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-2xl text-center transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Upgrade ke {pkg.tierRequired} (Midtrans)</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Midtrans Checkout Modal */}
      <MidtransCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        targetTier={checkoutTier}
      />
    </div>
  );
}

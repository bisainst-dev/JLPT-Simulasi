import React from 'react';
import { prisma } from '@/lib/prisma';
import { UserCheck, Users, Shield, TrendingUp, BarChart3 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminRecapPage() {
  // Fetch summaries of registrations per level and tier
  const totalStudents = await prisma.user.count({ where: { role: 'STUDENT' } });
  const freeTier = await prisma.user.count({ where: { tier: 'FREE' } });
  const silverTier = await prisma.user.count({ where: { tier: 'SILVER' } });
  const goldTier = await prisma.user.count({ where: { tier: 'GOLD' } });
  const lpkTier = await prisma.user.count({ where: { tier: 'LPK_PARTNER' } });

  const levelN5 = await prisma.user.count({ where: { targetLevel: 'N5' } });
  const levelN4 = await prisma.user.count({ where: { targetLevel: 'N4' } });
  const levelN3 = await prisma.user.count({ where: { targetLevel: 'N3' } });
  const levelN2 = await prisma.user.count({ where: { targetLevel: 'N2' } });
  const levelN1 = await prisma.user.count({ where: { targetLevel: 'N1' } });

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded bg-maroon-100 text-maroon-900 text-[10px] font-extrabold uppercase tracking-wider">
            REKAP PENDAFTAR SISWA
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Laporan & Rekap Pendaftaran Ujian
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Statistik pendaftar siswa JLPT berdasarkan level target ujian dan tingkatan tier akses keanggotaan.
        </p>
      </div>

      {/* Grid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tier Distribution */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-maroon-800" />
            <span>Pendaftar Berdasarkan Tier Akses</span>
          </h3>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="text-slate-600">Free Tier (Gratis)</span>
              <strong className="text-slate-900 font-bold">{freeTier} Siswa</strong>
            </div>
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="text-slate-600">Silver Tier (N5-N3)</span>
              <strong className="text-slate-900 font-bold">{silverTier} Siswa</strong>
            </div>
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="text-slate-600">Gold Tier (Akses Penuh N5-N1)</span>
              <strong className="text-maroon-800 font-bold">{goldTier} Siswa</strong>
            </div>
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="text-slate-600">LPK Partner (Afiliasi Lembaga)</span>
              <strong className="text-emerald-700 font-bold">{lpkTier} Lembaga</strong>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 font-bold">
              <span className="text-slate-800">Total Pendaftar Aktif</span>
              <span className="text-slate-900">{totalStudents} Siswa</span>
            </div>
          </div>
        </div>

        {/* Level Distribution */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-600" />
            <span>Pendaftar Berdasarkan Target Level JLPT</span>
          </h3>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="text-slate-600 font-bold">Target JLPT N5 (Dasar)</span>
              <strong className="text-slate-900 font-bold">{levelN5} Siswa</strong>
            </div>
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="text-slate-600 font-bold">Target JLPT N4 (Pra-Menengah)</span>
              <strong className="text-slate-900 font-bold">{levelN4} Siswa</strong>
            </div>
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="text-slate-600 font-bold">Target JLPT N3 (Menengah)</span>
              <strong className="text-slate-900 font-bold">{levelN3} Siswa</strong>
            </div>
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="text-slate-600 font-bold">Target JLPT N2 (Bisnis)</span>
              <strong className="text-slate-900 font-bold">{levelN2} Siswa</strong>
            </div>
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="text-slate-600 font-bold">Target JLPT N1 (Mahir)</span>
              <strong className="text-slate-900 font-bold">{levelN1} Siswa</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

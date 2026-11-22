import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
  Users,
  HelpCircle,
  Award,
  Layers,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Plus,
  ArrowUpRight,
  Shield,
  Activity,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  // Aggregate metrics
  const [totalQuestions, totalUsers, totalPackages, attempts] = await Promise.all([
    prisma.question.count(),
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.examPackage.count(),
    prisma.examAttempt.findMany({
      include: {
        user: true,
        examPackage: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 8,
    }),
  ]);

  const allAttemptsCount = await prisma.examAttempt.count();
  const passedCount = await prisma.examAttempt.count({ where: { isPassed: true } });
  const globalPassRate = allAttemptsCount > 0 ? Math.round((passedCount / allAttemptsCount) * 100) : 0;

  // Level statistics
  const levelStats = await prisma.examPackage.findMany({
    include: {
      sections: {
        include: {
          questions: { select: { id: true } },
        },
      },
      attempts: { select: { id: true, isPassed: true } },
    },
    orderBy: { level: 'desc' },
  });

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded bg-maroon-100 text-maroon-900 text-[10px] font-extrabold uppercase tracking-wider">
              PUSAT KENDALI EKSEKUTIF
            </span>
            <span className="text-xs text-slate-400 font-mono">BISA JFT v2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dasbor CMS Administrator
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola bank soal ruby furigana, audit siswa via mode impersonasi, dan evaluasi performa ujian JLPT.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/questions"
            className="px-4 py-2 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Soal Baru</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-maroon-50 text-maroon-800 flex items-center justify-center font-bold">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Bank Soal Aktif</p>
            <p className="text-2xl font-black text-slate-900">{totalQuestions} <span className="text-xs font-normal text-slate-400">butir</span></p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Siswa Terdaftar</p>
            <p className="text-2xl font-black text-slate-900">{totalUsers} <span className="text-xs font-normal text-slate-400">orang</span></p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Paket Ujian</p>
            <p className="text-2xl font-black text-slate-900">{totalPackages} <span className="text-xs font-normal text-slate-400">paket</span></p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Kelulusan Global</p>
            <p className="text-2xl font-black text-emerald-700">{globalPassRate}%</p>
          </div>
        </div>
      </div>

      {/* Level Distributions Card Matrix */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Distribusi Tingkat Ujian (N5 s/d N1)
          </h2>
          <span className="text-xs text-slate-500">Skala 180 Poin per Tingkat</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {levelStats.map((pkg) => {
            const qCount = pkg.sections.reduce((acc, s) => acc + s.questions.length, 0);
            const passed = pkg.attempts.filter((a) => a.isPassed).length;
            const rate = pkg.attempts.length > 0 ? Math.round((passed / pkg.attempts.length) * 100) : 0;

            return (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-lg bg-maroon-800 text-white font-black text-sm flex items-center justify-center">
                      {pkg.level}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {pkg.tierRequired}
                    </span>
                  </div>

                  <h3 className="font-bold text-xs text-slate-900 line-clamp-1 mb-1">
                    {pkg.title}
                  </h3>

                  <div className="text-[11px] text-slate-500 space-y-1 mb-3">
                    <p>Total Soal: <strong className="text-slate-800">{qCount} butir</strong></p>
                    <p>Passing Grade: <strong className="text-maroon-800">{pkg.passScoreTotal}/180</strong></p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between items-center">
                  <span>Tingkat Lulus:</span>
                  <span className="font-bold text-emerald-700">{rate}% ({passed}/{pkg.attempts.length})</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Exam Submissions Activity Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-maroon-800" />
            <h3 className="font-bold text-sm text-slate-900">
              Aktivitas Pengerjaan Ujian Terkini
            </h3>
          </div>
          <span className="text-xs text-slate-500">Live Real-time Feed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Nama Siswa</th>
                <th className="py-3 px-4">Paket & Tingkat</th>
                <th className="py-3 px-4">Waktu Ujian</th>
                <th className="py-3 px-4">Total Skor (180)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attempts.map((attempt) => (
                <tr key={attempt.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <p>{attempt.user.name}</p>
                    <p className="text-[10px] text-slate-400 font-normal">{attempt.user.email}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    <span className="inline-flex items-center gap-1">
                      <span className="w-5 h-5 rounded bg-maroon-800 text-white font-bold text-[9px] flex items-center justify-center">
                        {attempt.examPackage.level}
                      </span>
                      <span>{attempt.examPackage.title}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {new Date(attempt.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3.5 px-4 font-bold font-mono">
                    <span className="text-slate-900">{attempt.scoreTotal}</span>
                    <span className="text-slate-400 text-[10px]"> / 180</span>
                  </td>
                  <td className="py-3.5 px-4">
                    {attempt.isPassed ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        LULUS (合格)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
                        <XCircle className="w-3 h-3 text-red-600" />
                        TIDAK LULUS
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/result/${attempt.id}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-maroon-800 hover:text-white text-slate-800 font-semibold text-xs transition-colors"
                    >
                      <span>Lihat Skor</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

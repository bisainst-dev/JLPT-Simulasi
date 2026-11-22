import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import StudentExamSection from '@/components/dashboard/StudentExamSection';
import DashboardUpgradeBanner from '@/components/payment/DashboardUpgradeBanner';
import Link from 'next/link';
import {
  Award,
  BookOpen,
  Calendar,
  Clock,
  Crown,
  Play,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Lock,
  ArrowUpRight,
} from 'lucide-react';

export const revalidate = 0; // dynamic

export default async function StudentDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/login?callbackUrl=/dashboard');
  }

  const userId = (session.user as any).id;
  const userTier = (session.user as any).tier || 'FREE';

  // Fetch latest user data for targetLevel
  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { targetLevel: true },
  });
  const userTargetLevel = dbUser?.targetLevel || (session.user as any).targetLevel || 'N5';

  // Fetch student attempts
  const attempts = await prisma.examAttempt.findMany({
    where: { userId },
    include: {
      examPackage: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  // Fetch all published exam packages
  const packages = await prisma.examPackage.findMany({
    where: { published: true },
    include: {
      sections: {
        include: {
          questions: {
            select: { id: true },
          },
        },
      },
    },
    orderBy: { level: 'desc' },
  });

  // Calculate student statistics
  const totalCompleted = attempts.filter((a) => a.status === 'COMPLETED').length;
  const passedCount = attempts.filter((a) => a.isPassed).length;
  const passRate = totalCompleted > 0 ? Math.round((passedCount / totalCompleted) * 100) : 0;
  const highestScore = attempts.reduce((max, a) => (a.scoreTotal > max ? a.scoreTotal : max), 0);

  const userRole = (session.user as any).role;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Admin Quick Switcher Banner */}
        {userRole === 'ADMIN' && (
          <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-amber-700 text-white rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 border border-amber-400/30">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-maroon-950 font-black text-sm flex items-center justify-center shadow">
                管
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-amber-300">
                  Panel Administrator Aktif
                </p>
                <p className="text-xs text-white/90">
                  Anda sedang melihat dasbor dari persepsi siswa. Akses seluruh menu sidebar, bank soal, dan laporan di CMS Admin.
                </p>
              </div>
            </div>
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-white hover:bg-amber-100 text-maroon-900 font-extrabold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Buka Sidebar CMS Admin</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient opacity-10 pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-black/30 px-3 py-1 rounded-full border border-amber-400/30">
                  {userTier} TIER MEMBER
                </span>
                <span className="text-xs font-bold text-white bg-maroon-700/80 px-3 py-1 rounded-full border border-maroon-500/50 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Target: JLPT {userTargetLevel}
                </span>
                {(session.user as any).lpkName && (
                  <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                    {(session.user as any).lpkName}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Selamat Datang, {session.user.name}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Pantau performa ujian simulasi JLPT {userTargetLevel} Anda, evaluasi kelemahan tiap seksi (Gengo Chishiki, Dokkai, Choukai), dan raih sertifikat kelulusan.
              </p>
            </div>

            {/* JLPT Official Exam Countdown Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center flex-shrink-0 min-w-[200px]">
              <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-bold mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Target Ujian JLPT</span>
              </div>
              <p className="text-2xl font-black font-mono text-white">Desember 2026</p>
              <p className="text-[11px] text-slate-300 mt-0.5">Gelombang 2 Resmi ({userTargetLevel})</p>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-maroon-50 text-maroon-800 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Ujian Diselesaikan</p>
              <p className="text-2xl font-black text-slate-900">{totalCompleted} <span className="text-xs font-normal text-slate-400">kali</span></p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Tingkat Kelulusan</p>
              <p className="text-2xl font-black text-emerald-700">{passRate}%</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Skor Tertinggi</p>
              <p className="text-2xl font-black text-slate-900">{highestScore} <span className="text-xs font-normal text-slate-400">/ 180</span></p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Target & Status</p>
              <p className="text-base font-bold text-slate-900">JLPT {userTargetLevel} • {userTier}</p>
            </div>
          </div>
        </div>

        {/* Midtrans Upgrade Banner for Free/Silver members */}
        <DashboardUpgradeBanner />

        {/* Filtered Exam Packages Section */}
        <StudentExamSection
          initialTargetLevel={userTargetLevel}
          userTier={userTier}
          packages={packages}
        />

        {/* Exam History Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Riwayat Ujian & Lembar Hasil
              </h2>
              <p className="text-xs text-slate-500">
                Tinjau riwayat skor dan pembahasan soal yang telah dikerjakan
              </p>
            </div>
          </div>

          {attempts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
              <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-medium">Anda belum pernah menyelesaikan simulasi ujian.</p>
              <p className="text-xs text-slate-400 mt-1">Pilih salah satu paket di atas untuk memulai simulasi perdana Anda.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Paket Ujian</th>
                      <th className="py-3 px-4">Tanggal Ujian</th>
                      <th className="py-3 px-4">Total Skor (180)</th>
                      <th className="py-3 px-4">Rincian Seksi</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {attempts.map((attempt) => (
                      <tr key={attempt.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded bg-maroon-800 text-white flex items-center justify-center font-bold text-[10px]">
                              {attempt.examPackage.level}
                            </span>
                            <span>{attempt.examPackage.title}</span>
                          </div>
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
                        <td className="py-3.5 px-4">
                          <span className="font-extrabold text-sm text-slate-900">
                            {attempt.scoreTotal}
                          </span>
                          <span className="text-slate-400"> / 180</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          Seksi 1: {attempt.scoreSection1} | Seksi 2: {attempt.scoreSection2}
                          {attempt.scoreSection3 > 0 ? ` | Seksi 3: ${attempt.scoreSection3}` : ''}
                        </td>
                        <td className="py-3.5 px-4">
                          {attempt.isPassed ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              LULUS (合格)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-800 border border-red-200">
                              <XCircle className="w-3 h-3 text-red-600" />
                              TIDAK LULUS (不合格)
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            href={`/result/${attempt.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-maroon-800 hover:text-white text-slate-800 font-semibold text-xs transition-colors"
                          >
                            <span>Lembar Hasil</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

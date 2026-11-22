import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ExamInterface from '@/components/exam/ExamInterface';
import Link from 'next/link';
import { Lock, ArrowLeft } from 'lucide-react';

export const revalidate = 0; // dynamic

interface ExamPageProps {
  params: {
    id: string;
  };
}

export default async function ExamPage({ params }: ExamPageProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(`/login?callbackUrl=/exam/${params.id}`);
  }

  const userTier = (session.user as any).tier || 'FREE';

  // Fetch exam package
  const examPackage = await prisma.examPackage.findUnique({
    where: { id: params.id },
    include: {
      sections: {
        include: {
          questions: {
            orderBy: { orderIndex: 'asc' },
          },
        },
        orderBy: { orderIndex: 'asc' },
      },
    },
  });

  if (!examPackage) {
    redirect('/dashboard');
  }

  // Verify tier access
  const hasAccess = (() => {
    if (userTier === 'LPK_PARTNER' || userTier === 'GOLD') return true;
    if (userTier === 'SILVER') return examPackage.tierRequired === 'FREE' || examPackage.tierRequired === 'SILVER';
    return examPackage.tierRequired === 'FREE';
  })();

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Akses Terkunci</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Paket ujian <strong>{examPackage.title}</strong> membutuhkan tier keanggotaan minimal{' '}
            <span className="font-bold text-maroon-800">{examPackage.tierRequired} TIER</span>.
            Tier akun Anda saat ini adalah <span className="font-bold">{userTier}</span>.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/#pricing"
              className="py-3 px-4 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs rounded-xl shadow transition-colors"
            >
              Tingkatkan (Upgrade) Tier Sekarang
            </Link>
            <Link
              href="/dashboard"
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              Kembali ke Dasbor Siswa
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <ExamInterface examPackage={examPackage} />;
}

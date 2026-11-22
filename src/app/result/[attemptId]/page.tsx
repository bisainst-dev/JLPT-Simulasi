import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import ScoreCertificate from '@/components/exam/ScoreCertificate';

export const revalidate = 0;

interface ResultPageProps {
  params: {
    attemptId: string;
  };
}

export default async function ResultPage({ params }: ResultPageProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(`/login?callbackUrl=/result/${params.attemptId}`);
  }

  const userId = (session.user as any).id;
  const userRole = (session.user as any).role;

  const attempt = await prisma.examAttempt.findUnique({
    where: { id: params.attemptId },
    include: {
      user: true,
      examPackage: true,
      answers: {
        include: {
          question: true,
        },
        orderBy: {
          question: {
            orderIndex: 'asc',
          },
        },
      },
    },
  });

  if (!attempt) {
    redirect('/dashboard');
  }

  // Ensure security: only the user who took the exam or an Admin can view the result
  if (attempt.userId !== userId && userRole !== 'ADMIN') {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ScoreCertificate attempt={attempt as any} />
      </main>

      <Footer />
    </div>
  );
}

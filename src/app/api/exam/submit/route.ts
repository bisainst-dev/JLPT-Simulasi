import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { calculateJlptScore } from '@/lib/scoring';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { examPackageId, answers, flaggedQuestions, timeSpentSeconds } = await req.json();

    if (!examPackageId) {
      return NextResponse.json({ error: 'Exam Package ID wajib diisi' }, { status: 400 });
    }

    // Fetch package with all sections and questions
    const examPackage = await prisma.examPackage.findUnique({
      where: { id: examPackageId },
      include: {
        sections: {
          include: {
            questions: true,
          },
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    if (!examPackage) {
      return NextResponse.json({ error: 'Paket ujian tidak ditemukan' }, { status: 404 });
    }

    // Calculate score using Scoring Engine
    const scoreResult = calculateJlptScore({
      level: examPackage.level,
      sections: examPackage.sections.map((s) => ({
        id: s.id,
        sectionType: s.sectionType,
        name: s.name,
        questions: s.questions.map((q) => ({
          id: q.id,
          correctOption: q.correctOption,
          weight: q.weight,
        })),
      })),
      userAnswers: answers || {},
    });

    // Determine section 1, 2, 3 scaled scores
    const s1 = scoreResult.sectionBreakdown[0]?.scaledScore || 0;
    const s2 = scoreResult.sectionBreakdown[1]?.scaledScore || 0;
    const s3 = scoreResult.sectionBreakdown[2]?.scaledScore || 0;

    // Create completed ExamAttempt
    const attempt = await prisma.examAttempt.create({
      data: {
        userId,
        examPackageId,
        startedAt: new Date(Date.now() - (timeSpentSeconds || 60) * 1000),
        completedAt: new Date(),
        status: 'COMPLETED',
        scoreTotal: scoreResult.totalScore,
        scoreSection1: s1,
        scoreSection2: s2,
        scoreSection3: s3,
        isPassed: scoreResult.isPassed,
        resultDetails: JSON.stringify(scoreResult),
      },
    });

    // Save individual UserAnswers
    const userAnswersToCreate = [];
    for (const section of examPackage.sections) {
      for (const q of section.questions) {
        const userChoice = answers[q.id] ? Number(answers[q.id]) : null;
        const isCorrect = userChoice === q.correctOption;
        const isFlagged = Boolean(flaggedQuestions && flaggedQuestions[q.id]);

        userAnswersToCreate.push({
          attemptId: attempt.id,
          questionId: q.id,
          selectedOption: userChoice,
          isCorrect,
          isFlagged,
        });
      }
    }

    // Batch create answers
    for (const ua of userAnswersToCreate) {
      await prisma.userAnswer.create({
        data: ua,
      });
    }

    return NextResponse.json({
      success: true,
      attemptId: attempt.id,
      scoreResult,
    });
  } catch (error: any) {
    console.error('Submit exam error:', error);
    return NextResponse.json({ error: error.message || 'Gagal mengirim jawaban ujian' }, { status: 500 });
  }
}

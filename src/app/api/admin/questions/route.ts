import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET all questions with optional level and section filtering
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const level = searchParams.get('level');
    const search = searchParams.get('search');
    const sectionId = searchParams.get('sectionId');

    const whereClause: any = {};

    if (level) {
      whereClause.examSection = {
        examPackage: {
          level: level.toUpperCase(),
        },
      };
    }

    if (sectionId) {
      whereClause.examSectionId = sectionId;
    }

    if (search) {
      whereClause.OR = [
        { content: { contains: search } },
        { instruction: { contains: search } },
        { explanation: { contains: search } },
      ];
    }

    const questions = await prisma.question.findMany({
      where: whereClause,
      include: {
        examSection: {
          include: {
            examPackage: true,
          },
        },
      },
      orderBy: [
        { examSection: { examPackage: { level: 'desc' } } },
        { mondaiNumber: 'asc' },
        { questionNumber: 'asc' },
      ],
    });

    return NextResponse.json({ success: true, questions });
  } catch (error: any) {
    console.error('Fetch questions error:', error);
    return NextResponse.json({ error: error.message || 'Gagal memuat soal' }, { status: 500 });
  }
}

// POST create new question
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
    }

    const body = await req.json();
    const {
      examSectionId,
      mondaiNumber = 1,
      questionNumber = 1,
      instruction,
      passage,
      audioUrl,
      imageUrl,
      content,
      options, // array of strings or string
      correctOption = 1,
      explanation,
      weight = 1,
      orderIndex = 1,
    } = body;

    if (!examSectionId || !content || !options) {
      return NextResponse.json(
        { error: 'Section, Konten Soal, dan Opsi Jawaban wajib diisi' },
        { status: 400 }
      );
    }

    const formattedOptions = Array.isArray(options) ? JSON.stringify(options) : options;

    const question = await prisma.question.create({
      data: {
        examSectionId,
        mondaiNumber: Number(mondaiNumber),
        questionNumber: Number(questionNumber),
        instruction,
        passage,
        audioUrl,
        imageUrl,
        content,
        options: formattedOptions,
        correctOption: Number(correctOption),
        explanation,
        weight: Number(weight),
        orderIndex: Number(orderIndex),
      },
    });

    return NextResponse.json({ success: true, question });
  } catch (error: any) {
    console.error('Create question error:', error);
    return NextResponse.json({ error: error.message || 'Gagal membuat soal' }, { status: 500 });
  }
}

// DELETE bulk delete using deleteMany
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
    }

    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Daftar ID soal tidak valid' }, { status: 400 });
    }

    // First delete associated UserAnswers for these questions
    await prisma.userAnswer.deleteMany({
      where: {
        questionId: {
          in: ids,
        },
      },
    });

    // Execute bulk delete with deleteMany
    const deleteResult = await prisma.question.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `${deleteResult.count} soal berhasil dihapus massal`,
      deletedCount: deleteResult.count,
    });
  } catch (error: any) {
    console.error('Bulk delete error:', error);
    return NextResponse.json({ error: error.message || 'Gagal menghapus soal massal' }, { status: 500 });
  }
}

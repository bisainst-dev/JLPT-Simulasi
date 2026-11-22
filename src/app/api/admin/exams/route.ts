import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
    }

    const exams = await prisma.examPackage.findMany({
      include: {
        sections: {
          include: {
            questions: true,
          },
          orderBy: { orderIndex: 'asc' },
        },
        attempts: true,
      },
      orderBy: { level: 'desc' },
    });

    return NextResponse.json({ success: true, exams });
  } catch (error: any) {
    console.error('Fetch exams error:', error);
    return NextResponse.json({ error: error.message || 'Gagal memuat paket ujian' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
    }

    const body = await req.json();
    const { title, code, level, description, durationMinutes, tierRequired, passScoreTotal } = body;

    if (!title || !code || !level) {
      return NextResponse.json({ error: 'Judul, Kode, dan Level wajib diisi' }, { status: 400 });
    }

    const exam = await prisma.examPackage.create({
      data: {
        title,
        code,
        level,
        description,
        durationMinutes: Number(durationMinutes || 90),
        tierRequired: tierRequired || 'FREE',
        passScoreTotal: Number(passScoreTotal || 90),
        published: true,
      },
    });

    // Create default sections depending on level
    if (level === 'N4' || level === 'N5') {
      await prisma.examSection.createMany({
        data: [
          {
            examPackageId: exam.id,
            sectionType: 'LANGUAGE_KNOWLEDGE_READING',
            name: '言語知識・読解 (Gengo Chishiki & Dokkai)',
            timeLimitMinutes: 60,
            orderIndex: 1,
          },
          {
            examPackageId: exam.id,
            sectionType: 'LISTENING',
            name: '聴解 (Choukai)',
            timeLimitMinutes: 30,
            orderIndex: 2,
          },
        ],
      });
    } else {
      await prisma.examSection.createMany({
        data: [
          {
            examPackageId: exam.id,
            sectionType: 'VOCABULARY',
            name: '言語知識（文字・語彙・文法） (Gengo Chishiki)',
            timeLimitMinutes: 50,
            orderIndex: 1,
          },
          {
            examPackageId: exam.id,
            sectionType: 'READING',
            name: '読解 (Dokkai)',
            timeLimitMinutes: 45,
            orderIndex: 2,
          },
          {
            examPackageId: exam.id,
            sectionType: 'LISTENING',
            name: '聴解 (Choukai)',
            timeLimitMinutes: 45,
            orderIndex: 3,
          },
        ],
      });
    }

    return NextResponse.json({ success: true, exam });
  } catch (error: any) {
    console.error('Create exam error:', error);
    return NextResponse.json({ error: error.message || 'Gagal membuat paket ujian' }, { status: 500 });
  }
}

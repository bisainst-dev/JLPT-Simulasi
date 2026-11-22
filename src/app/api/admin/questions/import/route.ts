import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
    }

    const body = await req.json();
    const { level, examSectionId, questions } = body;

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { error: 'Daftar butir soal tidak boleh kosong.' },
        { status: 400 }
      );
    }

    const targetLevel = (level || 'N5').toUpperCase();

    // Determine examSectionId if not explicitly provided
    let targetSectionId = examSectionId;

    if (!targetSectionId) {
      // Find default exam package for targetLevel
      let examPackage = await prisma.examPackage.findFirst({
        where: { level: targetLevel },
        include: { sections: true },
      });

      if (!examPackage) {
        // Create an exam package for this level if missing
        examPackage = await prisma.examPackage.create({
          data: {
            title: `Simulasi Resmi JLPT ${targetLevel}`,
            code: `JLPT-${targetLevel}-AUTO`,
            level: targetLevel,
            durationMinutes: targetLevel === 'N1' ? 170 : targetLevel === 'N2' ? 155 : targetLevel === 'N3' ? 140 : targetLevel === 'N4' ? 115 : 90,
            passScoreTotal: targetLevel === 'N1' ? 100 : targetLevel === 'N2' ? 90 : targetLevel === 'N3' ? 95 : targetLevel === 'N4' ? 90 : 80,
            sections: {
              create: [
                {
                  name: targetLevel === 'N4' || targetLevel === 'N5' ? '言語知識・読解 (Gengo & Dokkai)' : '言語知識 (Gengo Chishiki)',
                  sectionType: targetLevel === 'N4' || targetLevel === 'N5' ? 'LANGUAGE_KNOWLEDGE_READING' : 'VOCABULARY',
                  timeLimitMinutes: 60,
                  orderIndex: 1,
                },
              ],
            },
          },
          include: { sections: true },
        });
      }

      if (examPackage.sections.length > 0) {
        targetSectionId = examPackage.sections[0].id;
      } else {
        const createdSection = await prisma.examSection.create({
          data: {
            examPackageId: examPackage.id,
            name: '言語知識 (Gengo Chishiki)',
            sectionType: 'VOCABULARY',
            timeLimitMinutes: 60,
            orderIndex: 1,
          },
        });
        targetSectionId = createdSection.id;
      }
    }

    // Process and validate question items
    const validQuestionsData: any[] = [];

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.content) {
        continue; // skip invalid questions without content
      }

      let formattedOptions = '["1. Opsi 1","2. Opsi 2","3. Opsi 3","4. Opsi 4"]';
      if (Array.isArray(q.options)) {
        formattedOptions = JSON.stringify(q.options);
      } else if (typeof q.options === 'string') {
        try {
          JSON.parse(q.options);
          formattedOptions = q.options;
        } catch {
          formattedOptions = JSON.stringify([q.options, 'Opsi 2', 'Opsi 3', 'Opsi 4']);
        }
      }

      validQuestionsData.push({
        examSectionId: q.examSectionId || targetSectionId,
        mondaiNumber: Number(q.mondaiNumber) || 1,
        questionNumber: Number(q.questionNumber) || i + 1,
        instruction: q.instruction || null,
        passage: q.passage || null,
        audioUrl: q.audioUrl || null,
        imageUrl: q.imageUrl || null,
        content: q.content,
        options: formattedOptions,
        correctOption: Number(q.correctOption) || 1,
        explanation: q.explanation || null,
        weight: Number(q.weight) || 1,
        orderIndex: Number(q.orderIndex) || i + 1,
      });
    }

    if (validQuestionsData.length === 0) {
      return NextResponse.json(
        { error: 'Tidak ada butir soal valid yang dapat diimpor.' },
        { status: 400 }
      );
    }

    // Bulk insert questions
    const createdResult = await prisma.question.createMany({
      data: validQuestionsData,
    });

    return NextResponse.json({
      success: true,
      message: `Berhasil mengimpor ${createdResult.count} butir soal JLPT ${targetLevel}!`,
      count: createdResult.count,
      level: targetLevel,
    });
  } catch (error: any) {
    console.error('Import questions error:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal mengimpor soal' },
      { status: 500 }
    );
  }
}

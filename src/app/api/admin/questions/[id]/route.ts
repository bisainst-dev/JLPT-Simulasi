import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
    }

    const body = await req.json();
    const {
      mondaiNumber,
      questionNumber,
      instruction,
      passage,
      audioUrl,
      imageUrl,
      content,
      options,
      correctOption,
      explanation,
      weight,
      orderIndex,
    } = body;

    const formattedOptions = Array.isArray(options) ? JSON.stringify(options) : options;

    const updated = await prisma.question.update({
      where: { id: params.id },
      data: {
        mondaiNumber: mondaiNumber !== undefined ? Number(mondaiNumber) : undefined,
        questionNumber: questionNumber !== undefined ? Number(questionNumber) : undefined,
        instruction,
        passage,
        audioUrl,
        imageUrl,
        content,
        options: formattedOptions,
        correctOption: correctOption !== undefined ? Number(correctOption) : undefined,
        explanation,
        weight: weight !== undefined ? Number(weight) : undefined,
        orderIndex: orderIndex !== undefined ? Number(orderIndex) : undefined,
      },
    });

    return NextResponse.json({ success: true, question: updated });
  } catch (error: any) {
    console.error('Update question error:', error);
    return NextResponse.json({ error: error.message || 'Gagal memperbarui soal' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
    }

    await prisma.userAnswer.deleteMany({
      where: { questionId: params.id },
    });

    await prisma.question.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: 'Soal berhasil dihapus' });
  } catch (error: any) {
    console.error('Delete single question error:', error);
    return NextResponse.json({ error: error.message || 'Gagal menghapus soal' }, { status: 500 });
  }
}

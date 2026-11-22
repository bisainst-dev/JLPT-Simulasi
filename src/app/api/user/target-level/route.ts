import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { targetLevel } = await req.json();

    if (!targetLevel) {
      return NextResponse.json({ error: 'Target Level diperlukan' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { targetLevel },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        targetLevel: updatedUser.targetLevel,
      },
    });
  } catch (error: any) {
    console.error('Update target level error:', error);
    return NextResponse.json({ error: error.message || 'Gagal mengubah target level' }, { status: 500 });
  }
}

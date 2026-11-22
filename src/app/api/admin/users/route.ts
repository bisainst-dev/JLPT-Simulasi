import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const tier = searchParams.get('tier');
    const role = searchParams.get('role');

    const where: any = {};
    if (tier) where.tier = tier;
    if (role) where.role = role;

    const users = await prisma.user.findMany({
      where,
      include: {
        attempts: {
          select: {
            id: true,
            scoreTotal: true,
            isPassed: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    console.error('Fetch users error:', error);
    return NextResponse.json({ error: error.message || 'Gagal memuat pengguna' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
    }

    const { userId, tier, role, targetLevel, lpkName } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID wajib diisi' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        tier: tier !== undefined ? tier : undefined,
        role: role !== undefined ? role : undefined,
        targetLevel: targetLevel !== undefined ? targetLevel : undefined,
        lpkName: lpkName !== undefined ? lpkName : undefined,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    console.error('Update user error:', error);
    return NextResponse.json({ error: error.message || 'Gagal memperbarui pengguna' }, { status: 500 });
  }
}

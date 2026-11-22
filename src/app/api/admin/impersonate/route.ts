import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
    }

    const { targetUserId, action } = await req.json();

    // If exiting impersonation
    if (action === 'exit') {
      const originalAdmin = await prisma.user.findFirst({
        where: { role: 'ADMIN' },
      });

      if (!originalAdmin) {
        return NextResponse.json({ error: 'Admin tidak ditemukan' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        user: {
          id: originalAdmin.id,
          name: originalAdmin.name,
          email: originalAdmin.email,
          role: originalAdmin.role,
          tier: originalAdmin.tier,
          lpkName: originalAdmin.lpkName,
          isImpersonated: false,
          impersonatorAdmin: null,
        },
      });
    }

    // Only Admin can initiate impersonation
    const userRole = (session.user as any).role;
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Akses ditolak. Hanya Admin yang dapat melakukan impersonasi.' }, { status: 403 });
    }

    if (!targetUserId) {
      return NextResponse.json({ error: 'Target User ID diperlukan' }, { status: 400 });
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'Siswa tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: targetUser.id,
        name: targetUser.name,
        email: targetUser.email,
        role: targetUser.role,
        tier: targetUser.tier,
        lpkName: targetUser.lpkName,
        isImpersonated: true,
        impersonatorAdmin: {
          id: (session.user as any).id,
          name: session.user.name,
          email: session.user.email,
        },
      },
    });
  } catch (err: any) {
    console.error('Impersonate error:', err);
    return NextResponse.json({ error: err.message || 'Gagal mengubah mode impersonasi' }, { status: 500 });
  }
}

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

    const { orderId, paymentType } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID wajib diisi' }, { status: 400 });
    }

    const transaction = await prisma.transaction.findUnique({
      where: { orderId },
    });

    if (!transaction) {
      return NextResponse.json({ error: 'Transaksi tidak ditemukan' }, { status: 404 });
    }

    // Update transaction to SETTLEMENT
    const updatedTx = await prisma.transaction.update({
      where: { orderId },
      data: {
        status: 'SETTLEMENT',
        paymentType: paymentType || 'qris_gopay',
        updatedAt: new Date(),
      },
    });

    // Upgrade user tier
    const updatedUser = await prisma.user.update({
      where: { id: transaction.userId },
      data: {
        tier: transaction.targetTier,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Pembayaran ${transaction.targetTier} berhasil diverifikasi!`,
      orderId: updatedTx.orderId,
      newTier: updatedUser.tier,
    });
  } catch (error: any) {
    console.error('Simulate payment error:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal memproses simulasi pembayaran' },
      { status: 500 }
    );
  }
}

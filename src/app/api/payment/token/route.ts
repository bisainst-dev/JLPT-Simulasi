import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getTierPrice, createMidtransSnapTransaction } from '@/lib/midtrans';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Silakan masuk ke akun Anda untuk melakukan upgrade.' },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { targetTier } = body;

    if (!targetTier || !['SILVER', 'GOLD', 'LPK_PARTNER'].includes(targetTier)) {
      return NextResponse.json(
        { error: 'Target Tier tidak valid. Pilih SILVER, GOLD, atau LPK_PARTNER.' },
        { status: 400 }
      );
    }

    const tierInfo = getTierPrice(targetTier);
    const orderId = `JLPT-${targetTier}-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    // Create Snap transaction token with Midtrans
    const snapResult = await createMidtransSnapTransaction({
      orderId,
      amount: tierInfo.price,
      itemTitle: tierInfo.name,
      customerName: session.user.name || 'Siswa JLPT',
      customerEmail: session.user.email || 'siswa@jlpt.id',
    });

    // Record transaction in database
    const transaction = await prisma.transaction.create({
      data: {
        orderId,
        userId,
        targetTier,
        amount: tierInfo.price,
        status: 'PENDING',
        snapToken: snapResult.token,
        snapRedirectUrl: snapResult.redirect_url,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: transaction.orderId,
      snapToken: snapResult.token,
      redirectUrl: snapResult.redirect_url,
      amount: tierInfo.price,
      targetTier,
      tierName: tierInfo.name,
    });
  } catch (error: any) {
    console.error('Create payment token error:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal memproses transaksi Midtrans' },
      { status: 500 }
    );
  }
}

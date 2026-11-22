import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const notification = await req.json();

    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;
    const paymentType = notification.payment_type;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID tidak ditemukan' }, { status: 400 });
    }

    // Find the matching transaction in DB
    const transaction = await prisma.transaction.findUnique({
      where: { orderId },
      include: { user: true },
    });

    if (!transaction) {
      return NextResponse.json({ error: 'Transaksi tidak terdaftar' }, { status: 404 });
    }

    let newStatus = transaction.status;
    let shouldUpgrade = false;

    if (transactionStatus === 'capture') {
      if (fraudStatus === 'accept') {
        newStatus = 'SETTLEMENT';
        shouldUpgrade = true;
      }
    } else if (transactionStatus === 'settlement') {
      newStatus = 'SETTLEMENT';
      shouldUpgrade = true;
    } else if (['cancel', 'deny', 'expire'].includes(transactionStatus)) {
      newStatus = transactionStatus === 'expire' ? 'EXPIRE' : 'CANCEL';
    } else if (transactionStatus === 'pending') {
      newStatus = 'PENDING';
    }

    // Update transaction
    await prisma.transaction.update({
      where: { orderId },
      data: {
        status: newStatus,
        paymentType: paymentType || transaction.paymentType,
        metadata: JSON.stringify(notification),
      },
    });

    // If payment succeeded, upgrade user tier automatically
    if (shouldUpgrade) {
      await prisma.user.update({
        where: { id: transaction.userId },
        data: {
          tier: transaction.targetTier,
        },
      });
      console.log(`[Midtrans Webhook] User ${transaction.userId} upgraded to ${transaction.targetTier}`);
    }

    return NextResponse.json({ status: 'OK', message: 'Notification processed successfully' });
  } catch (error: any) {
    console.error('Midtrans Webhook notification error:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal memproses webhook Midtrans' },
      { status: 500 }
    );
  }
}

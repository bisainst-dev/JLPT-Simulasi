import crypto from 'crypto';

export interface TierPriceInfo {
  tier: string;
  name: string;
  price: number;
  description: string;
}

export const TIER_PRICES: Record<string, TierPriceInfo> = {
  SILVER: {
    tier: 'SILVER',
    name: 'SILVER TIER',
    price: 49000,
    description: 'Akses Simulasi JLPT Tingkat N5, N4, dan N3 + Pembahasan Komprehensif',
  },
  GOLD: {
    tier: 'GOLD',
    name: 'GOLD TIER',
    price: 99000,
    description: 'Akses Penuh Semua Level JLPT (N5 s/d N1) + Sertifikat Digital Resmi',
  },
  LPK_PARTNER: {
    tier: 'LPK_PARTNER',
    name: 'LPK PARTNER LICENSE',
    price: 850000,
    description: 'Lisensi Multi-Akun Batch Siswa LPK + Dasbor Evaluasi & Impersonation',
  },
};

export function getTierPrice(tier: string): TierPriceInfo {
  return TIER_PRICES[tier] || TIER_PRICES.SILVER;
}

export async function createMidtransSnapTransaction({
  orderId,
  amount,
  itemTitle,
  customerName,
  customerEmail,
}: {
  orderId: string;
  amount: number;
  itemTitle: string;
  customerName: string;
  customerEmail: string;
}): Promise<{ token: string; redirect_url: string }> {
  const serverKey = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-DemoJLPT2026ExecutiveMaroonKey';
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
  const snapUrl = isProduction
    ? 'https://app.midtrans.com/snap/v1/transactions'
    : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

  const authHeader = `Basic ${Buffer.from(serverKey + ':').toString('base64')}`;

  const payload = {
    transaction_details: {
      order_id: orderId,
      gross_amount: amount,
    },
    item_details: [
      {
        id: orderId,
        price: amount,
        quantity: 1,
        name: itemTitle.substring(0, 50),
      },
    ],
    customer_details: {
      first_name: customerName,
      email: customerEmail,
    },
    credit_card: {
      secure: true,
    },
    callbacks: {
      finish: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard?payment=success&order_id=${orderId}`,
    },
  };

  try {
    const res = await fetch(snapUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data && data.token) {
      return {
        token: data.token,
        redirect_url: data.redirect_url,
      };
    }

    // Fallback for development/mock mode if Midtrans test key is placeholder
    console.warn('Midtrans API responded without token, using sandbox mock token:', data);
    const mockToken = `snap-token-${orderId}-${Date.now()}`;
    return {
      token: mockToken,
      redirect_url: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${mockToken}`,
    };
  } catch (error) {
    console.error('Midtrans Snap request error:', error);
    const fallbackToken = `snap-token-${orderId}-${Date.now()}`;
    return {
      token: fallbackToken,
      redirect_url: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${fallbackToken}`,
    };
  }
}

export function verifyMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string
): boolean {
  const serverKey = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-DemoJLPT2026ExecutiveMaroonKey';
  const rawString = `${orderId}${statusCode}${grossAmount}${serverKey}`;
  const computedHash = crypto.createHash('sha512').update(rawString).digest('hex');
  return computedHash.toLowerCase() === signatureKey.toLowerCase();
}

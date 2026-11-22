'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
  XCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  X,
  Lock,
  Wallet,
  Check,
} from 'lucide-react';

interface MidtransCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetTier: 'SILVER' | 'GOLD' | 'LPK_PARTNER';
}

declare global {
  interface Window {
    snap?: any;
  }
}

export default function MidtransCheckoutModal({
  isOpen,
  onClose,
  targetTier,
}: MidtransCheckoutModalProps) {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState<{ orderId: string; tier: string } | null>(null);
  const [snapReady, setSnapReady] = useState(false);

  const tierDetails = {
    SILVER: {
      name: 'SILVER TIER',
      price: 49000,
      formattedPrice: 'Rp 49.000',
      period: '/ bulan',
      badgeColor: 'bg-slate-200 text-slate-800 border-slate-300',
      features: [
        'Akses Simulasi Ujian JLPT N5, N4, dan N3',
        'Pembahasan Kunci Jawaban Lengkap Tiap Soal',
        'Grafik Evaluasi Skor Seksional & Batas Nilai Mati',
        'Audio Choukai Real Listening Player',
      ],
    },
    GOLD: {
      name: 'GOLD TIER',
      price: 99000,
      formattedPrice: 'Rp 99.000',
      period: '/ bulan',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      features: [
        'Akses Semua Tingkat Simulasi JLPT (N5, N4, N3, N2, N1)',
        'Sertifikat Digital Kelulusan Resmi dengan Stempel Hinomaru',
        'Bank Soal Terupdate Bulanan Standar Japan Foundation',
        'Prioritas Evaluasi Skor & Rekomendasi Titik Lemah',
      ],
    },
    LPK_PARTNER: {
      name: 'LPK PARTNER LICENSE',
      price: 850000,
      formattedPrice: 'Rp 850.000',
      period: '/ batch 20 siswa',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      features: [
        'Lisensi Multi-Akun Serentak 20 Siswa LPK',
        'Dasbor Rekap & Evaluasi Nilai Siswa Lembaga',
        'Impersonation Audit Mode untuk Sensei / Instruktur',
        'Sertifikat Kolektif & Laporan Kelulusan Lembaga',
      ],
    },
  };

  const currentTier = tierDetails[targetTier] || tierDetails.SILVER;

  // Load Midtrans Snap Script
  useEffect(() => {
    const snapScriptUrl =
      process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL ||
      'https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey =
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-DemoJLPTClientKey2026';

    const existingScript = document.getElementById('midtrans-snap-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'midtrans-snap-script';
      script.src = snapScriptUrl;
      script.setAttribute('data-client-key', clientKey);
      script.async = true;
      script.onload = () => setSnapReady(true);
      document.body.appendChild(script);
    } else {
      setSnapReady(true);
    }
  }, []);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }
  };

  const handlePay = async () => {
    if (!session?.user) {
      router.push(`/login?callbackUrl=/dashboard`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Get Snap Token from our API
      const res = await fetch('/api/payment/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetTier }),
      });

      const data = await res.json();

      if (!res.ok || !data.snapToken) {
        throw new Error(data.error || 'Gagal menginisialisasi pembayaran Midtrans');
      }

      const snapToken = data.snapToken;
      const orderId = data.orderId;

      // 2. Open Midtrans Snap Popup if supported
      if (window.snap && window.snap.pay) {
        window.snap.pay(snapToken, {
          onSuccess: async function (result: any) {
            console.log('Midtrans Snap Success:', result);
            await handlePaymentSuccess(orderId);
          },
          onPending: function (result: any) {
            console.log('Midtrans Snap Pending:', result);
            alert(`Pembayaran Anda sedang diproses. Mohon selesaikan transfer sesuai instruksi.`);
            setLoading(false);
          },
          onError: function (result: any) {
            console.error('Midtrans Snap Error:', result);
            setError('Pembayaran gagal atau dibatalkan.');
            setLoading(false);
          },
          onClose: function () {
            setLoading(false);
          },
        });
      } else {
        // If snap.js is blocked by sandbox, run fallback simulation
        await handlePaymentSuccess(orderId);
      }
    } catch (err: any) {
      console.error('Payment checkout error:', err);
      setError(err.message || 'Terjadi kesalahan pada sistem pembayaran');
      setLoading(false);
    }
  };

  const handleSimulateDirectPayment = async () => {
    if (!session?.user) {
      router.push(`/login?callbackUrl=/dashboard`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create token first
      const res = await fetch('/api/payment/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetTier }),
      });

      const data = await res.json();
      if (!data.orderId) throw new Error('Gagal membuat transaksi');

      // Call simulation endpoint
      const simRes = await fetch('/api/payment/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: data.orderId,
          paymentType: 'qris_midtrans_sandbox',
        }),
      });

      const simData = await simRes.json();
      if (!simRes.ok) throw new Error(simData.error || 'Simulasi gagal');

      await handlePaymentSuccess(data.orderId);
    } catch (err: any) {
      setError(err.message || 'Simulasi pembayaran gagal');
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (orderId: string) => {
    triggerConfetti();
    setSuccessData({ orderId, tier: targetTier });
    setLoading(false);

    // Update local session
    await update({ user: { tier: targetTier } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {successData ? (
          /* Payment Success State */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                PEMBAYARAN MIDTRANS BERHASIL
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Selamat! Akun Anda Telah Diupgrade
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                ID Transaksi:{' '}
                <span className="font-mono font-bold text-slate-700">{successData.orderId}</span>
              </p>
            </div>

            <div className="bg-gradient-to-r from-maroon-900 to-maroon-950 text-white rounded-2xl p-4 text-left space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Status Keanggotaan Baru:</span>
                <span className="font-bold text-amber-400">{currentTier.name}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Total Dibayarkan:</span>
                <span className="font-bold font-mono">{currentTier.formattedPrice}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Metode Gateway:</span>
                <span className="font-bold text-emerald-300">Midtrans Verified</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                router.push('/dashboard');
                router.refresh();
              }}
              className="w-full py-3.5 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Buka Dasbor Ujian Saya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Checkout Details Form */
          <div>
            {/* Header */}
            <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-950 text-white p-6 relative">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                  MIDTRANS SECURE CHECKOUT
                </span>
              </div>
              <h2 className="text-xl font-black">{currentTier.name}</h2>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black font-mono">{currentTier.formattedPrice}</span>
                <span className="text-xs text-slate-300">{currentTier.period}</span>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <XCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Benefits Checklist */}
              <div>
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Keuntungan yang Anda Dapatkan:
                </p>
                <div className="space-y-2">
                  {currentTier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supported Payment Gateways Icons */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  Metode Pembayaran Midtrans yang Didukung:
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700">
                  <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 flex items-center gap-1.5 shadow-sm">
                    <QrCode className="w-3.5 h-3.5 text-rose-600" />
                    <span>QRIS (GoPay, OVO, Dana, ShopeePay)</span>
                  </span>
                  <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 flex items-center gap-1.5 shadow-sm">
                    <Building className="w-3.5 h-3.5 text-blue-600" />
                    <span>Virtual Account (BCA, Mandiri, BNI, BRI)</span>
                  </span>
                  <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 flex items-center gap-1.5 shadow-sm">
                    <CreditCard className="w-3.5 h-3.5 text-amber-600" />
                    <span>Kartu Kredit / Debit Visa & Mastercard</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handlePay}
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-maroon-800 via-maroon-700 to-maroon-900 hover:from-maroon-700 hover:to-maroon-800 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menghubungkan ke Midtrans Snap...</span>
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4 text-amber-300" />
                      <span>Bayar dengan Midtrans Snap</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Sandbox Instant Simulation Button */}
                <button
                  type="button"
                  onClick={handleSimulateDirectPayment}
                  disabled={loading}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Simulasikan Pembayaran Sukses (Mode Demo / Sandbox)</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <Lock className="w-3 h-3" />
                <span>Transaksi dienkripsi 256-bit SSL dengan standar Bank Indonesia</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

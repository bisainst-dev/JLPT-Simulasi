'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import MidtransCheckoutModal from './MidtransCheckoutModal';
import { Crown, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DashboardUpgradeBanner() {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'SILVER' | 'GOLD' | 'LPK_PARTNER'>('GOLD');

  const userTier = (session?.user as any)?.tier || 'FREE';

  if (userTier === 'GOLD' || userTier === 'LPK_PARTNER') {
    return null; // Already highest tier
  }

  const handleOpen = (tier: 'SILVER' | 'GOLD') => {
    setSelectedTier(tier);
    setModalOpen(true);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-maroon-800 text-slate-950 rounded-3xl p-5 sm:p-6 shadow-md border border-amber-300 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/90 text-amber-600 flex items-center justify-center font-black flex-shrink-0 shadow-sm">
            <Crown className="w-7 h-7 fill-amber-500" />
          </div>
          <div className="text-white">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider bg-black/30 px-2.5 py-0.5 rounded-full text-amber-300 border border-amber-300/30">
                UPGRADE MIDTRANS INSTAN
              </span>
              <span className="text-xs text-amber-200 font-semibold">
                Status Anda: {userTier} TIER
              </span>
            </div>
            <h3 className="text-lg font-black tracking-tight">
              Buka Akses Seluruh Paket Soal Simulasi JLPT N1 s/d N5
            </h3>
            <p className="text-xs text-slate-200 mt-0.5 max-w-xl">
              Dapatkan sertifikat kelulusan resmi, evaluasi lengkap, dan bank soal terupdate mulai Rp 49.000 via QRIS & Virtual Account Midtrans.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto flex-shrink-0">
          {userTier === 'FREE' && (
            <button
              type="button"
              onClick={() => handleOpen('SILVER')}
              className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl backdrop-blur-md border border-white/40 transition-colors"
            >
              Silver (Rp 49K)
            </button>
          )}

          <button
            type="button"
            onClick={() => handleOpen('GOLD')}
            className="px-5 py-2.5 bg-slate-950 hover:bg-black text-amber-300 font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Upgrade Gold (Rp 99K)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <MidtransCheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        targetTier={selectedTier}
      />
    </>
  );
}

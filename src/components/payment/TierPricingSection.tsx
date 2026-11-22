'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import MidtransCheckoutModal from './MidtransCheckoutModal';
import { Check, Crown, Shield, Sparkles, Building2, ArrowRight } from 'lucide-react';

export default function TierPricingSection() {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'SILVER' | 'GOLD' | 'LPK_PARTNER'>('GOLD');

  const handleOpenCheckout = (tier: 'SILVER' | 'GOLD' | 'LPK_PARTNER') => {
    setSelectedTier(tier);
    setModalOpen(true);
  };

  const userTier = (session?.user as any)?.tier || 'FREE';

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Free Tier */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Tingkat Dasar
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">FREE TIER</h3>
              <div className="mt-3">
                <span className="text-3xl font-black text-slate-900">Rp 0</span>
                <span className="text-xs text-slate-500"> / selamanya</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Akses Simulasi JLPT N5 & N4</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Scoring Engine 180 Poin</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Audio Listening Standar</span>
              </li>
            </ul>
          </div>

          <Link
            href="/register"
            className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl text-center transition-colors"
          >
            Mulai Gratis
          </Link>
        </div>

        {/* Silver Tier */}
        <div
          className={`bg-white rounded-3xl border p-6 shadow-sm flex flex-col justify-between ${
            userTier === 'SILVER' ? 'border-2 border-slate-700 bg-slate-50/50' : 'border-slate-300'
          }`}
        >
          <div>
            <div className="mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Menengah
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">SILVER TIER</h3>
              <div className="mt-3">
                <span className="text-3xl font-black text-slate-900">Rp 49.000</span>
                <span className="text-xs text-slate-500"> / bulan</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Akses Semua N5, N4, dan N3</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Pembahasan Soal Komprehensif</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Grafik Evaluasi Skor Seksional</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => handleOpenCheckout('SILVER')}
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-2xl text-center transition-colors shadow"
          >
            {userTier === 'SILVER' ? 'Perpanjang Silver' : 'Upgrade ke Silver (Midtrans)'}
          </button>
        </div>

        {/* Gold Tier */}
        <div
          className={`bg-gradient-to-b from-amber-50/60 to-white rounded-3xl border-2 p-6 shadow-md flex flex-col justify-between relative ${
            userTier === 'GOLD' ? 'border-amber-500 ring-2 ring-amber-400' : 'border-amber-400'
          }`}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-black px-3.5 py-0.5 rounded-full uppercase tracking-wider">
            PALING POPULER
          </div>

          <div>
            <div className="mb-4">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Akses Penuh
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">GOLD TIER</h3>
              <div className="mt-3">
                <span className="text-3xl font-black text-maroon-800">Rp 99.000</span>
                <span className="text-xs text-slate-500"> / bulan</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-600" />
                <span className="font-semibold">Akses Semua Level (N5 s/d N1)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-600" />
                <span>Sertifikat Kelulusan Digital Resmi</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-600" />
                <span>Bank Soal Terupdate Bulanan</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => handleOpenCheckout('GOLD')}
            className="w-full py-3 px-4 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs rounded-2xl text-center shadow-md transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{userTier === 'GOLD' ? 'Perpanjang Gold' : 'Langganan Gold (Midtrans)'}</span>
          </button>
        </div>

        {/* LPK Partner */}
        <div className="bg-white rounded-3xl border border-emerald-300 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Kemitraan LPK
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">LPK PARTNER</h3>
              <div className="mt-3">
                <span className="text-2xl font-black text-slate-900">Rp 850.000</span>
                <span className="text-xs text-slate-500"> / batch 20 siswa</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Multi-Akun Siswa Serentak</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Dasbor Evaluasi Nilai Siswa LPK</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Impersonation Audit Siswa</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => handleOpenCheckout('LPK_PARTNER')}
            className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-2xl text-center transition-colors shadow"
          >
            Beli Lisensi LPK (Midtrans)
          </button>
        </div>
      </div>

      <MidtransCheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        targetTier={selectedTier}
      />
    </div>
  );
}

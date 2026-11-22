'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Mail, KeyRound, ArrowRight, Loader2, Award, Crown, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tier, setTier] = useState('FREE');
  const [targetLevel, setTargetLevel] = useState('N5');
  const [lpkName, setLpkName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, tier, targetLevel, lpkName }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal mendaftar');
      }

      // Auto sign in
      const signInRes = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (signInRes?.error) {
        router.push('/login');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-maroon-800 selection:text-white relative overflow-hidden">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
        {/* Background Artwork matching Home Page */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/hero-fuji.png"
            alt="Pemandangan Gunung Fuji, Pagoda, dan Bunga Sakura Jepang"
            fill
            priority
            className="object-cover object-center lg:object-right-bottom filter saturate-[1.1]"
          />
          {/* Light sunrise gradient overlays for soft clean contrast & executive maroon accents */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
        </div>

        {/* Kanji Calligraphy Watermark */}
        <div className="absolute top-12 right-12 z-0 opacity-10 pointer-events-none select-none hidden lg:block">
          <p className="font-japanese font-black text-9xl text-maroon-900/20 tracking-widest writing-vertical">
            能力試験
          </p>
        </div>

        <div className="relative z-10 max-w-xl w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80 my-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-maroon-800 text-white flex items-center justify-center mx-auto mb-3 shadow-md font-japanese font-bold text-xl">
              試
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Registrasi Akun Simulasi JLPT
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Pilih tier belajar Anda dan mulai simulasi resmi dengan sistem BISA JFT
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Misal: Kenji Pratama"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Alamat Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Target JLPT Level Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Pilih Target Tingkat Ujian (Level):
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {['N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setTargetLevel(lvl)}
                    className={`py-2 rounded-xl text-xs font-black transition-all border ${
                      targetLevel === lvl
                        ? 'bg-maroon-800 text-white border-maroon-800 shadow-md ring-2 ring-maroon-800/20 scale-105'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Dasbor Anda akan otomatis menyaring dan memfokuskan paket simulasi {targetLevel}.
              </p>
            </div>

            {/* Tier Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Pilih Tier Keanggotaan:
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <button
                  type="button"
                  onClick={() => setTier('FREE')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    tier === 'FREE'
                      ? 'border-maroon-800 bg-maroon-50 text-maroon-900 font-bold ring-2 ring-maroon-800/20'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <p className="text-xs">FREE</p>
                  <p className="text-[10px] text-slate-400 font-normal">N5 & N4</p>
                </button>

                <button
                  type="button"
                  onClick={() => setTier('SILVER')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    tier === 'SILVER'
                      ? 'border-slate-700 bg-slate-100 text-slate-900 font-bold ring-2 ring-slate-400/30'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <p className="text-xs">SILVER</p>
                  <p className="text-[10px] text-slate-500 font-normal">N5 s/d N3</p>
                </button>

                <button
                  type="button"
                  onClick={() => setTier('GOLD')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    tier === 'GOLD'
                      ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-400/40'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <p className="text-xs flex items-center justify-center gap-1">
                    <Crown className="w-3 h-3 text-amber-600" />
                    GOLD
                  </p>
                  <p className="text-[10px] text-amber-700 font-normal">All N5-N1</p>
                </button>

                <button
                  type="button"
                  onClick={() => setTier('LPK_PARTNER')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    tier === 'LPK_PARTNER'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400/40'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <p className="text-xs flex items-center justify-center gap-1">
                    <Building2 className="w-3 h-3 text-emerald-600" />
                    LPK
                  </p>
                  <p className="text-[10px] text-emerald-700 font-normal">Partner</p>
                </button>
              </div>
            </div>

            {tier === 'LPK_PARTNER' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Lembaga Pelatihan (LPK / Kampus)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={lpkName}
                    onChange={(e) => setLpkName(e.target.value)}
                    placeholder="Contoh: LPK Sakura Indonesia Mandiri"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 px-4 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mendaftarkan Akun...</span>
                </>
              ) : (
                <>
                  <span>Selesaikan Pendaftaran</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Sudah memiliki akun?{' '}
              <Link href="/login" className="font-bold text-maroon-800 hover:underline">
                Masuk di Sini
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

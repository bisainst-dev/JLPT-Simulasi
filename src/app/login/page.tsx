'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { signIn, getSession, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { KeyRound, Mail, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard';
  const { data: session } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in as Admin, redirect immediately to Admin CMS Dashboard
  useEffect(() => {
    if (session?.user) {
      const role = (session.user as any).role;
      if (role === 'ADMIN') {
        router.push('/admin/dashboard');
      }
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        const currentSession = await getSession();
        const role = (currentSession?.user as any)?.role;

        if (role === 'ADMIN' || email.toLowerCase().includes('admin')) {
          router.push('/admin/dashboard');
        } else {
          router.push(callbackUrl);
        }
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat masuk');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
      {/* Left Info Panel */}
      <div className="md:col-span-5 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-maroon-800 text-xs font-bold border border-maroon-200/80 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sistem Ujian BISA JFT Official</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Akses Portal Simulasi <span className="text-maroon-800">JLPT N5-N1</span>
        </h1>

        <p className="text-sm text-slate-700 leading-relaxed font-medium">
          Masuk untuk memulai simulasi ujian, memantau riwayat skor seksional, dan mendapatkan sertifikat kelulusan terstandarisasi.
        </p>
      </div>

      {/* Right Login Card */}
      <div className="md:col-span-7">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-maroon-800/10 to-transparent rounded-bl-full pointer-events-none" />

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Masuk ke Akun</h2>
            <p className="text-xs text-slate-500 mt-1">
              Gunakan email dan kata sandi terdaftar Anda
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
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Kata Sandi
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sedang Memproses...</span>
                </>
              ) : (
                <>
                  <span>Masuk Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Belum memiliki akun simulasi?{' '}
              <Link href="/register" className="font-bold text-maroon-800 hover:underline">
                Daftar Akun Baru
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
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

        <div className="relative z-10 w-full max-w-4xl">
          <Suspense fallback={<div className="text-center text-slate-400 p-8">Memuat halaman login...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

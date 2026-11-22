import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import FuriganaText from '@/components/common/FuriganaText';
import ScoreCalculator from '@/components/home/ScoreCalculator';
import TierPricingSection from '@/components/payment/TierPricingSection';
import {
  CheckCircle2,
  Shield,
  Award,
  Zap,
  Clock,
  Volume2,
  ArrowRight,
  Sparkles,
  BookOpen,
  Check,
  Crown,
  Building2,
  HelpCircle,
  BarChart3,
  Flame,
  ShieldCheck,
  GraduationCap,
  Play,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let examPackages: any[] = [];
  try {
    examPackages = await prisma.examPackage.findMany({
      where: { published: true },
      include: {
        sections: {
          include: {
            questions: {
              select: { id: true },
            },
          },
        },
      },
      orderBy: { level: 'desc' },
    });
  } catch (err) {
    console.error('Database connection during build or fetch:', err);
  }

  const levelBadges: Record<string, { kanji: string; title: string; desc: string; color: string; bgBadge: string }> = {
    N1: {
      kanji: '極',
      title: 'Grand Master Mahir',
      desc: 'Pemahaman bahasa Jepang tingkat profesional bisnis, riset akademik, dan diplomatik.',
      color: 'text-amber-500',
      bgBadge: 'bg-amber-500/10 border-amber-500/30 text-amber-900',
    },
    N2: {
      kanji: '上',
      title: 'Menengah Atas (Bisnis)',
      desc: 'Syarat mutlak kerja di Jepang, visa engineering/humanities, dan universitas negeri Jepang.',
      color: 'text-red-600',
      bgBadge: 'bg-red-500/10 border-red-500/30 text-red-900',
    },
    N3: {
      kanji: '中',
      title: 'Menengah (Tokutei Ginou)',
      desc: 'Kunci utama kelulusan visa Tokutei Ginou (SSW), percakapan kantor, dan artikel umum.',
      color: 'text-blue-600',
      bgBadge: 'bg-blue-500/10 border-blue-500/30 text-blue-900',
    },
    N4: {
      kanji: '進',
      title: 'Pra-Menengah Lanjutan',
      desc: 'Penguasaan pola tata bahasa harian, percakapan magang (Ginou Jisshusei), dan bacaan dasar.',
      color: 'text-emerald-600',
      bgBadge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900',
    },
    N5: {
      kanji: '初',
      title: 'Dasar Pemula (Fondasi)',
      desc: 'Fondasi huruf Hiragana, Katakana, 100+ Kanji dasar, dan kalimat sederhana berfurigana.',
      color: 'text-purple-600',
      bgBadge: 'bg-purple-500/10 border-purple-500/30 text-purple-900',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-maroon-800 selection:text-white">
      <Navbar />

      {/* Hero Section with Mount Fuji & Pagoda Japanese Artwork */}
      <section className="relative overflow-hidden min-h-[640px] lg:min-h-[720px] flex items-center justify-center border-b border-maroon-900/20">
        {/* Background Artwork */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-fuji.png"
            alt="Pemandangan Gunung Fuji, Pagoda, dan Bunga Sakura Jepang"
            fill
            priority
            className="object-cover object-center lg:object-right-bottom filter saturate-[1.1]"
          />
          {/* Light sunrise gradient overlays for soft clean contrast & executive maroon accents */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent lg:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
          <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
        </div>

        {/* Kanji Calligraphy Watermark in Background */}
        <div className="absolute top-12 right-12 z-0 opacity-10 pointer-events-none select-none hidden lg:block">
          <p className="font-japanese font-black text-9xl text-maroon-900/20 tracking-widest writing-vertical">
            能力試験
          </p>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Texts */}
            <div className="lg:col-span-6 space-y-6 text-slate-900">
              {/* Badge */}


              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
                Kuasai Simulasi Ujian{' '}
                <span className="text-maroon-800 underline decoration-amber-400 decoration-4 underline-offset-8">
                  JLPT Jepang
                </span>{' '}
                dengan Akurasi Skor Nyata
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                Platform simulasi resmi berstandar industri dengan <strong className="text-maroon-800">Scoring Engine 180 Poin</strong>, validasi <strong className="text-rose-700">Batas Aman Seksional (Anti-Nilai Mati)</strong>, furigana otomatis, dan audio Choukai asli.
              </p>

              {/* Call To Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href="/register"
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-maroon-800 via-maroon-700 to-maroon-900 hover:from-maroon-700 hover:to-maroon-800 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-maroon-950/20 hover:shadow-2xl transition-all flex items-center gap-2.5 border border-maroon-500/30 group"
                >
                  <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
                  <span>Mulai Simulasi Sekarang</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="#scoring-calculator"
                  className="px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm sm:text-base border border-slate-300 shadow-sm transition-all flex items-center gap-2"
                >
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>Kalkulator Passing Grade</span>
                </Link>
              </div>

              {/* Floating Key Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200 max-w-lg">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-slate-200 shadow-sm">
                  <p className="text-2xl font-black text-maroon-800 font-mono">180 Pt</p>
                  <p className="text-[11px] text-slate-500 font-medium">Skor Standar JLPT</p>
                </div>
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-slate-200 shadow-sm">
                  <p className="text-2xl font-black text-rose-700 font-mono">5 Level</p>
                  <p className="text-[11px] text-slate-500 font-medium">N5 hingga N1</p>
                </div>
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-slate-200 shadow-sm">
                  <p className="text-2xl font-black text-emerald-700 font-mono">100%</p>
                  <p className="text-[11px] text-slate-500 font-medium">Furigana & Audio</p>
                </div>
              </div>
            </div>

            {/* Right Live Interactive Preview Card */}
            <div className="lg:col-span-6">
              <div className="glass-panel rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/60 relative backdrop-blur-xl">
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[11px] font-black px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SIMULASI LIVE N5</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-maroon-800 text-white font-black text-xs flex items-center justify-center shadow">
                      N5
                    </span>
                    <div>
                      <span className="text-xs font-extrabold text-slate-900 block">
                        言語知識・読解 (Gengo & Dokkai)
                      </span>
                      <span className="text-[10px] text-slate-500">Mondai 1 • Soal 1</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono text-maroon-800 bg-maroon-50 px-2.5 py-1 rounded-lg font-bold border border-maroon-200">
                    <Clock className="w-3.5 h-3.5 text-maroon-800" />
                    <span>00:58:32</span>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="text-[11px] text-slate-500 font-semibold font-japanese bg-slate-50 p-2 rounded-lg border border-slate-100">
                    つぎの ぶんの [漢字|かんじ]の ことばは どう かきますか。
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-slate-200 text-slate-900 font-semibold text-base leading-loose font-japanese shadow-sm">
                    きのう、<FuriganaText text="[友|とも]だちと" /> <FuriganaText text="[映画|えいが]を" /> <FuriganaText text="[見|み]ました。" />
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 flex items-center justify-between">
                      <span className="font-japanese">1. えいか</span>
                      <span className="text-[10px] text-slate-400">Pilihan 1</span>
                    </div>

                    <div className="p-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-xs font-bold text-emerald-950 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="font-japanese">2. えいが (Kunci Jawaban)</span>
                      </div>
                      <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-md">
                        +1 Poin
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 flex items-center justify-between">
                      <span className="font-japanese">3. えーが</span>
                      <span className="text-[10px] text-slate-400">Pilihan 3</span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-[11px] text-amber-950 flex items-start gap-2">
                    <Award className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Pembahasan Kunci:</strong> Kanji 映 (ei = pantulan) + 画 (ga = gambar) dibaca <em>eiga</em> yang berarti film.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Levels Bento Grid Showcase */}


      {/* Interactive Scoring Engine Simulator Section */}
      <section id="scoring-calculator" className="py-20 bg-gradient-to-b from-slate-100 via-rose-50/30 to-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold mb-3 border border-amber-300">
              <Flame className="w-4 h-4 text-amber-700" />
              <span>DUAL PASSING LOGIC CONDITIONAL SIMULATOR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Kalkulator Uji Penilaian & Anti-Nilai Mati
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Cobalah geser nilai perolehan di bawah ini untuk melihat langsung bagaimana algoritma <strong>Sistem BISA JFT</strong> mengevaluasi status kelulusan Anda.
            </p>
          </div>

          <ScoreCalculator />
        </div>
      </section>

      {/* Tier Ecosystem Section */}
      <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-maroon-100 text-maroon-900 text-xs font-extrabold mb-3 border border-maroon-200">
            <Crown className="w-4 h-4 text-maroon-800" />
            <span>PILIHAN TIER & PEMBAYARAN MIDTRANS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Pilihan Paket Belajar & Kemitraan Lembaga
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Upgrade instan melalui Midtrans (QRIS GoPay, OVO, Dana, Virtual Account Bank, dan Kartu Kredit).
          </p>
        </div>

        <TierPricingSection />
      </section>

      <Footer />
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { Award, BookOpen, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Bio */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-maroon-800 flex items-center justify-center text-white font-japanese font-bold text-base shadow">
                日
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                JLPT<span className="text-red-500">PRO</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Platform Simulasi Ujian Bahasa Jepang resmi berstandar BISA JFT. Membantu ribuan calon peserta lulus JLPT N5 hingga N1 dengan akurasi scoring terpercaya.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Standar Kurikulum Japan Foundation / JEES</span>
            </div>
          </div>

          {/* Tingkat JLPT */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-l-2 border-maroon-700 pl-2">
              Tingkat Ujian (Levels)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-amber-400 transition-colors">
                  JLPT N5 - Dasar (Pemula)
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-400 transition-colors">
                  JLPT N4 - Pra-Menengah (Dasar Lanjutan)
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-400 transition-colors">
                  JLPT N3 - Menengah (Syarat Tokutei Ginou)
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-400 transition-colors">
                  JLPT N2 - Menengah Atas (Bisnis/Kuliah)
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-400 transition-colors">
                  JLPT N1 - Mahir (Grand Master Level)
                </Link>
              </li>
            </ul>
          </div>

          {/* Fitur BISA JFT */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-l-2 border-maroon-700 pl-2">
              Fitur Sistem BISA JFT
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-slate-400">Scoring Engine IRT Approximation (180 Pts)</li>
              <li className="text-slate-400">Validasi Batas Aman Seksional (Nilai Mati)</li>
              <li className="text-slate-400">Tampilan Soal Furigana & Audio Choukai Asli</li>
              <li className="text-slate-400">Penerbitan Sertifikat Hasil Resmi Digital</li>
              <li className="text-slate-400">Dasbor Audit Siswa (Impersonation Mode)</li>
            </ul>
          </div>

          {/* Ekosistem Tier */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-l-2 border-maroon-700 pl-2">
              Ekosistem Tier & LPK
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Tersedia paket kemitraan khusus Lembaga Pelatihan Kerja (LPK) dan Sekolah Bahasa Jepang dengan dasbor evaluasi siswa terpadu.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 text-xs">
              <p className="text-amber-300 font-semibold mb-1">Butuh Integrasi LPK?</p>
              <p className="text-slate-400 text-[11px]">Hubungi partner eksekutif kami untuk paket multi-license ujian serentak.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 JLPT Pro Simulator - Diadaptasi dari Arsitektur Sistem BISA JFT. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Premium Executive Maroon Theme</span>
            <span>•</span>
            <span className="text-slate-400">Next.js & Prisma Relational Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

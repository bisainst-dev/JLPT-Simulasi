'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {
  BookOpen,
  Award,
  Crown,
  LayoutDashboard,
  LogOut,
  User,
  Shield,
  Menu,
  X,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const role = (session?.user as any)?.role;
  const tier = (session?.user as any)?.tier || 'FREE';

  const getTierBadge = (t: string) => {
    switch (t) {
      case 'GOLD':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <Crown className="w-3 h-3 text-amber-600 fill-amber-500" />
            GOLD TIER
          </span>
        );
      case 'SILVER':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-slate-200 text-slate-800 border border-slate-300">
            <Sparkles className="w-3 h-3 text-slate-500" />
            SILVER TIER
          </span>
        );
      case 'LPK_PARTNER':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            <Award className="w-3 h-3 text-emerald-600" />
            LPK PARTNER
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
            FREE TIER
          </span>
        );
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-maroon-800 to-maroon-950 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform relative">
              <span className="font-japanese font-black text-lg">日</span>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-maroon-900 font-sans">
                  BISA<span className="text-maroon-700">JLPT</span>
                </span>

              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                Simulasi Ujian Bahasa Jepang N5 - N1
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link href="/" className="hover:text-maroon-800 transition-colors">
              Beranda
            </Link>
            <Link href="/#simulasi-level" className="hover:text-maroon-800 transition-colors">
              Tingkat Ujian (N5-N1)
            </Link>
            <Link href="/#scoring-engine" className="hover:text-maroon-800 transition-colors">
              Standar Penilaian
            </Link>
            <Link href="/#pricing" className="hover:text-maroon-800 transition-colors">
              Ekosistem Tier
            </Link>
          </div>

          {/* Right Action / Auth Button */}
          <div className="hidden md:flex items-center gap-3">
            {session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-maroon-800 text-white flex items-center justify-center font-bold text-sm">
                    {session.user.name ? session.user.name[0].toUpperCase() : 'U'}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                      {session.user.name}
                    </p>
                    <div className="flex items-center gap-1">
                      {getTierBadge(tier)}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {dropdownOpen && (
                  <div
                    onClick={() => setDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-medium text-slate-400">Masuk sebagai</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{session.user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{session.user.email}</p>
                    </div>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-maroon-800"
                    >
                      <LayoutDashboard className="w-4 h-4 text-maroon-700" />
                      <span>Dasbor Siswa</span>
                    </Link>

                    {role === 'ADMIN' && (
                      <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-maroon-800 font-semibold bg-maroon-50 hover:bg-maroon-100"
                      >
                        <Shield className="w-4 h-4 text-maroon-800" />
                        <span>CMS Dasbor Admin</span>
                      </Link>
                    )}

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-maroon-800 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-maroon-800 hover:bg-maroon-900 rounded-lg shadow-sm transition-all hover:shadow"
                >
                  Daftar Ujian
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-maroon-800 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-maroon-800"
          >
            Beranda
          </Link>
          <Link
            href="/#simulasi-level"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-maroon-800"
          >
            Tingkat Ujian (N5-N1)
          </Link>
          <Link
            href="/#scoring-engine"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-maroon-800"
          >
            Standar Penilaian
          </Link>

          {session?.user ? (
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-maroon-800 text-white flex items-center justify-center font-bold text-sm">
                  {session.user.name ? session.user.name[0].toUpperCase() : 'U'}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{session.user.name}</p>
                  <p className="text-xs text-slate-500">{session.user.email}</p>
                </div>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 text-sm font-medium text-slate-700 hover:text-maroon-800"
              >
                <LayoutDashboard className="w-4 h-4 text-maroon-700" />
                Dasbor Siswa
              </Link>
              {role === 'ADMIN' && (
                <Link
                  href="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm font-semibold text-maroon-800 bg-maroon-50 px-2 rounded"
                >
                  <Shield className="w-4 h-4" />
                  CMS Dasbor Admin
                </Link>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut({ callbackUrl: '/' });
                }}
                className="w-full flex items-center gap-2 py-2 text-sm text-red-600 font-medium text-left"
              >
                <LogOut className="w-4 h-4" />
                Keluar (Logout)
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-medium text-white bg-maroon-800 rounded-lg"
              >
                Daftar Ujian
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

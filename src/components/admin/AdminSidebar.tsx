'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  HelpCircle,
  BookOpen,
  Users,
  Layers,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  UserCheck,
  Tag,
  Wallet,
  Settings,
} from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const menuSections = [
    {
      label: 'Menu Utama',
      items: [
        {
          title: 'Pusat Kendali (Overview)',
          href: '/admin/dashboard',
          icon: LayoutDashboard,
        },
        {
          title: 'Bank Soal & Furigana',
          href: '/admin/questions',
          icon: HelpCircle,
        },
        {
          title: 'Paket Ujian JLPT',
          href: '/admin/exams',
          icon: Layers,
        },
      ],
    },
    {
      label: 'Kelola Siswa & Afiliasi',
      items: [
        {
          title: 'Siswa Terdaftar',
          href: '/admin/users',
          icon: Users,
        },
        {
          title: 'Rekap Pendaftar',
          href: '/admin/recap',
          icon: UserCheck,
        },
        {
          title: 'Manajemen Referral',
          href: '/admin/referral',
          icon: Tag,
        },
      ],
    },
    {
      label: 'Keuangan & Sistem',
      items: [
        {
          title: 'Transaksi & Pendapatan',
          href: '/admin/transactions',
          icon: Wallet,
        },
        {
          title: 'Manajemen Blog',
          href: '/admin/blog',
          icon: BookOpen,
        },
        {
          title: 'Pengaturan Konten',
          href: '/admin/settings',
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <aside
      className={`bg-gradient-to-b from-[#8C0014] via-[#750011] to-[#5C000D] text-white flex flex-col border-r border-maroon-900/50 shadow-2xl transition-all duration-300 z-30 min-h-screen sticky top-0 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white font-black text-sm shadow">
              管
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white block">
                ADMIN CMS
              </span>
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                Sistem BISA JFT
              </span>
            </div>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 mx-auto transition-colors"
          title={collapsed ? 'Perluas Menu' : 'Perkecil Menu'}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
        {menuSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {!collapsed && (
              <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white/50">
                {section.label}
              </div>
            )}
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white/20 text-white shadow-md border border-white/30 font-bold backdrop-blur-md'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                  title={collapsed ? item.title : undefined}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? 'text-amber-300' : 'text-white/80'
                    }`}
                  />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              );
            })}
          </div>
        ))}

        <div className="pt-3 border-t border-white/10 my-2">
          {!collapsed && (
            <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white/50">
              Pintasan Luar
            </div>
          )}

          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all"
            title={collapsed ? 'Dasbor Siswa' : undefined}
          >
            <Home className="w-4 h-4 text-white/70 flex-shrink-0" />
            {!collapsed && <span>Ke Portal Siswa</span>}
          </Link>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-white/10 bg-black/20">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-rose-200 hover:bg-white/10 hover:text-white rounded-xl transition-colors"
          title={collapsed ? 'Keluar' : undefined}
        >
          <LogOut className="w-4 h-4 text-rose-300 flex-shrink-0" />
          {!collapsed && <span>Keluar (Logout)</span>}
        </button>
      </div>
    </aside>
  );
}

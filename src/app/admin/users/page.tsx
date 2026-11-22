'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Shield,
  Crown,
  Award,
  Sparkles,
  Loader2,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import ImpersonateButton from '@/components/admin/ImpersonateButton';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [search, setSearch] = useState('');

  const loadUsers = async () => {
    setLoading(true);
    try {
      let url = '/api/admin/users';
      const params = new URLSearchParams();
      if (selectedTier !== 'ALL') params.append('tier', selectedTier);
      const qs = params.toString();
      if (qs) url += `?${qs}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (e) {
      console.error('Failed to load users', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [selectedTier]);

  const handleUpdateTier = async (userId: string, newTier: string) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, tier: newTier }),
      });
      const data = await res.json();
      if (data.success) {
        loadUsers();
      }
    } catch (e: any) {
      alert(e.message || 'Gagal mengubah tier pengguna');
    }
  };

  const handleUpdateTargetLevel = async (userId: string, newLevel: string) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, targetLevel: newLevel }),
      });
      const data = await res.json();
      if (data.success) {
        loadUsers();
      }
    } catch (e: any) {
      alert(e.message || 'Gagal mengubah target level');
    }
  };

  const filteredUsers = users.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.lpkName?.toLowerCase().includes(q) ||
      u.targetLevel?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded bg-maroon-100 text-maroon-900 text-[10px] font-extrabold uppercase tracking-wider">
              MANAJEMEN SISWA & AUDIT
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Data Pengguna & Impersonation Mode
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola target ujian siswa, ekosistem tier pengguna, dan lakukan audit interaktif ke sistem melalui persepsi akun siswa.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Tier Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {['ALL', 'FREE', 'SILVER', 'GOLD', 'LPK_PARTNER'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedTier(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTier === t
                  ? 'bg-maroon-800 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {t === 'ALL' ? 'Semua Tier' : t.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, email, LPK, level..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon-800"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Nama Siswa / Pengguna</th>
                <th className="py-3 px-3">Target Ujian</th>
                <th className="py-3 px-3">Tier Akses</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Afiliasi LPK</th>
                <th className="py-3 px-3">Riwayat Ujian</th>
                <th className="py-3 px-4 text-right">Audit (Impersonation)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-maroon-800" />
                    <span>Memuat data pengguna...</span>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Tidak ada siswa ditemukan.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const totalAttempts = u.attempts?.length || 0;
                  const passedAttempts = u.attempts?.filter((a: any) => a.isPassed).length || 0;

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                            {u.name ? u.name[0].toUpperCase() : 'U'}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{u.name}</p>
                            <p className="text-[10px] text-slate-400 font-normal">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <select
                          value={u.targetLevel || 'N5'}
                          onChange={(e) => handleUpdateTargetLevel(u.id, e.target.value)}
                          className="bg-maroon-50 border border-maroon-200 text-maroon-900 font-black rounded-lg text-xs px-2 py-1 focus:outline-none focus:ring-1 focus:ring-maroon-800 cursor-pointer"
                        >
                          <option value="N5">JLPT N5</option>
                          <option value="N4">JLPT N4</option>
                          <option value="N3">JLPT N3</option>
                          <option value="N2">JLPT N2</option>
                          <option value="N1">JLPT N1</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-3">
                        <select
                          value={u.tier}
                          onChange={(e) => handleUpdateTier(u.id, e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold px-2 py-1 focus:outline-none focus:ring-1 focus:ring-maroon-800 cursor-pointer"
                        >
                          <option value="FREE">FREE</option>
                          <option value="SILVER">SILVER</option>
                          <option value="GOLD">GOLD</option>
                          <option value="LPK_PARTNER">LPK PARTNER</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            u.role === 'ADMIN'
                              ? 'bg-maroon-800 text-white'
                              : u.role === 'LPK_ADMIN'
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-600">
                        {u.lpkName ? (
                          <span className="inline-flex items-center gap-1 font-medium text-slate-800">
                            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                            {u.lpkName}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-slate-700">
                        <span className="font-bold font-mono text-slate-900">{totalAttempts}</span> kali{' '}
                        <span className="text-[10px] text-emerald-700 font-bold">({passedAttempts} lulus)</span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {u.role !== 'ADMIN' ? (
                          <ImpersonateButton userId={u.id} userName={u.name} />
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Akun Utama</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

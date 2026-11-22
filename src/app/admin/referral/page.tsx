import React from 'react';
import { Tag, Users, Award, Percent } from 'lucide-react';

export default function AdminReferralPage() {
  const sampleReferrals = [
    { code: 'SAKURA2026', owner: 'LPK Sakura Indonesia', discount: '15%', usageCount: 24, commissionEarned: 'Rp 360,000' },
    { code: 'KENJIPASS', owner: 'Kenji Pratama', discount: '10%', usageCount: 8, commissionEarned: 'Rp 80,000' },
    { code: 'SENSEITANAKA', owner: 'Tanaka Sensei', discount: '20%', usageCount: 42, commissionEarned: 'Rp 840,000' },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded bg-maroon-100 text-maroon-900 text-[10px] font-extrabold uppercase tracking-wider">
            MANAJEMEN REFERRAL & KOMISI
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Kode Referral & Kupon Diskon Partner
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Pantau penggunaan kode referral oleh mitra LPK atau siswa duta untuk melacak komisi afiliasi simulasi JLPT.
        </p>
      </div>

      {/* Referral Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Percent className="w-4 h-4 text-maroon-800" />
            <span>Daftar Kode Referral Aktif</span>
          </h3>
          <button className="px-3.5 py-1.5 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs rounded-xl shadow transition-colors">
            Tambah Kode Baru
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Kode Referral</th>
                <th className="py-3 px-4">Pemilik Kupon (Partner)</th>
                <th className="py-3 px-4">Diskon Pembeli</th>
                <th className="py-3 px-4">Jumlah Penggunaan</th>
                <th className="py-3 px-4">Komisi Terkumpul</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sampleReferrals.map((ref, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-maroon-800 text-sm">
                    {ref.code}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {ref.owner}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-700">
                    {ref.discount}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-800">
                    {ref.usageCount} kali
                  </td>
                  <td className="py-3.5 px-4 font-bold font-mono text-emerald-700">
                    {ref.commissionEarned}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Aktif
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { prisma } from '@/lib/prisma';
import { Wallet, Coins, ArrowUpRight, TrendingUp, CheckCircle2, Clock, XCircle } from 'lucide-react';

export const revalidate = 0; // dynamic

export default async function AdminTransactionsPage() {
  const dbTransactions = await prisma.transaction.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
          lpkName: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Calculate statistics
  const settledTransactions = dbTransactions.filter((t) => t.status === 'SETTLEMENT');
  const totalRevenue = settledTransactions.reduce((acc, t) => acc + t.amount, 0);

  const silverCount = settledTransactions.filter((t) => t.targetTier === 'SILVER').length;
  const goldCount = settledTransactions.filter((t) => t.targetTier === 'GOLD').length;
  const lpkCount = settledTransactions.filter((t) => t.targetTier === 'LPK_PARTNER').length;

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded bg-maroon-100 text-maroon-900 text-[10px] font-extrabold uppercase tracking-wider">
            TRANSAKSI & PENDAPATAN MIDTRANS
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Laporan Transaksi & Keuangan Gateway
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Tinjau riwayat pembayaran siswa untuk upgrade tier keanggotaan dan transaksi batch dari mitra LPK secara real-time.
        </p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Pendapatan Terverifikasi</span>
          <p className="text-2xl font-black text-slate-950 font-mono mt-1">
            Rp {totalRevenue.toLocaleString('id-ID')}
          </p>
          <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
            {settledTransactions.length} Transaksi Sukses
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Upgrade Silver (N5-N3)</span>
          <p className="text-2xl font-black text-slate-950 font-mono mt-1">{silverCount} Transaksi</p>
          <span className="text-[10px] text-slate-500 block mt-1">Rp 49.000 / bln</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Upgrade Gold (N5-N1)</span>
          <p className="text-2xl font-black text-slate-950 font-mono mt-1">{goldCount} Transaksi</p>
          <span className="text-[10px] text-amber-600 font-bold block mt-1">Rp 99.000 / bln</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Lisensi Batch LPK</span>
          <p className="text-2xl font-black text-slate-950 font-mono mt-1">{lpkCount} Lembaga</p>
          <span className="text-[10px] text-emerald-700 font-bold block mt-1">Rp 850.000 / batch</span>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Coins className="w-4 h-4 text-maroon-800" />
            <span>Riwayat Transaksi Masuk ({dbTransactions.length})</span>
          </h3>
        </div>

        {dbTransactions.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Wallet className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-700">Belum ada transaksi tercatat</p>
            <p className="text-xs text-slate-400">
              Transaksi pembayaran Midtrans dari siswa akan muncul secara otomatis di sini.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Siswa / Lembaga</th>
                  <th className="py-3 px-4">Target Tier</th>
                  <th className="py-3 px-4">Tanggal Transaksi</th>
                  <th className="py-3 px-4">Metode Bayar</th>
                  <th className="py-3 px-4">Nominal</th>
                  <th className="py-3 px-4 text-right">Status Gateway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dbTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {tx.orderId}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-900">{tx.user.name}</p>
                      <p className="text-[10px] text-slate-400">{tx.user.email}</p>
                      {tx.user.lpkName && (
                        <span className="text-[10px] text-emerald-700 font-semibold block">
                          {tx.user.lpkName}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          tx.targetTier === 'GOLD'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : tx.targetTier === 'SILVER'
                            ? 'bg-slate-200 text-slate-800 border-slate-300'
                            : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        }`}
                      >
                        {tx.targetTier}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(tx.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-mono text-[11px]">
                      {tx.paymentType || 'Midtrans Snap'}
                    </td>
                    <td className="py-3.5 px-4 font-bold font-mono text-slate-900 text-sm">
                      Rp {tx.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {tx.status === 'SETTLEMENT' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          SETTLEMENT
                        </span>
                      ) : tx.status === 'PENDING' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          <Clock className="w-3 h-3 text-amber-600" />
                          PENDING
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                          <XCircle className="w-3 h-3 text-red-600" />
                          {tx.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

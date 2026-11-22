import React from 'react';
import { Settings, Sliders, ShieldAlert, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-4xl w-full mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded bg-maroon-100 text-maroon-900 text-[10px] font-extrabold uppercase tracking-wider">
            KONFIGURASI SISTEM
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Pengaturan Konten & Konfigurasi Sistem
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Kelola parameter operasional situs, biaya upgrade tier, nomor layanan bantuan siswa, serta setelan hak akses LPK.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Sliders className="w-4 h-4 text-maroon-800" />
          <span>Pengaturan Parameter Portal Simulasi</span>
        </h3>

        <form className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nama Platform Ujian
              </label>
              <input
                type="text"
                defaultValue="JLPT PRO BISA JFT"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nomor Kontak Admin / WA Bantuan
              </label>
              <input
                type="text"
                defaultValue="+62 812-3456-7890"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Biaya Upgrade Silver Tier (Rp)
              </label>
              <input
                type="number"
                defaultValue={49000}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Biaya Upgrade Gold Tier (Rp)
              </label>
              <input
                type="number"
                defaultValue={99000}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Pengirim Notifikasi (SMTP)
            </label>
            <input
              type="email"
              defaultValue="noreply@jlptpro.id"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
            />
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-950 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <span>Perhatian: Perubahan konfigurasi sistem ini akan langsung memengaruhi harga tier keanggotaan pada halaman pendaftaran siswa secara global.</span>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              className="px-4 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-white font-bold rounded-xl shadow transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Pengaturan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

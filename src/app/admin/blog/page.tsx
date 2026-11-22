import React from 'react';
import { BookOpen, Plus, FileText, Calendar, Edit2, Trash2 } from 'lucide-react';

export default function AdminBlogPage() {
  const sampleBlogs = [
    { title: 'Panduan Lulus Ujian JLPT N3 untuk Visa Tokutei Ginou 2026', author: 'Sensei Tanaka', date: '25 Agt 2026', category: 'Tips & Trik', reads: 142 },
    { title: 'Pendaftaran JLPT Gelombang 2 Tahun 2026 Resmi Dibuka!', author: 'Admin System', date: '18 Agt 2026', category: 'Pengumuman', reads: 538 },
    { title: 'Perbedaan Kosakata Dasar N5 dan N4 yang Wajib Dihafal', author: 'Ayu Sensei', date: '10 Agt 2026', category: 'Materi Belajar', reads: 289 },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded bg-maroon-100 text-maroon-900 text-[10px] font-extrabold uppercase tracking-wider">
              PORTAL INFORMASI & KONTEN
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Blog & Artikel Pengumuman
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tulis dan kelola artikel, panduan kelulusan ujian, serta pengumuman resmi untuk dibaca oleh seluruh siswa di dasbor.
          </p>
        </div>

        <button className="px-4 py-2 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-maroon-800" />
            <span>Daftar Artikel & Berita Portal</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Judul Artikel</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Penulis</th>
                <th className="py-3 px-4">Tanggal Rilis</th>
                <th className="py-3 px-4">Jumlah Pembaca</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sampleBlogs.map((blog, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs truncate">
                    {blog.title}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px]">
                      {blog.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    {blog.author}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {blog.date}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-800">
                    {blog.reads} pembaca
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-600">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 rounded-lg hover:bg-red-50 text-red-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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

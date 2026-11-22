'use client';

import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Clock,
  Award,
  BookOpen,
  Loader2,
  X,
  Sparkles,
} from 'lucide-react';

export default function AdminExamsPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [level, setLevel] = useState('N5');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [tierRequired, setTierRequired] = useState('FREE');
  const [passScoreTotal, setPassScoreTotal] = useState(80);
  const [saving, setSaving] = useState(false);

  const loadExams = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/exams');
      const data = await res.json();
      if (data.success) {
        setExams(data.exams);
      }
    } catch (e) {
      console.error('Failed to load exams', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExams();
  }, []);

  const handleLevelChange = (lvl: string) => {
    setLevel(lvl);
    if (lvl === 'N5') setPassScoreTotal(80);
    else if (lvl === 'N4') setPassScoreTotal(90);
    else if (lvl === 'N3') setPassScoreTotal(95);
    else if (lvl === 'N2') setPassScoreTotal(90);
    else if (lvl === 'N1') setPassScoreTotal(100);
  };

  const handleCreatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          code,
          level,
          description,
          durationMinutes,
          tierRequired,
          passScoreTotal,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setTitle('');
        setCode('');
        setDescription('');
        loadExams();
      }
    } catch (e: any) {
      alert(e.message || 'Gagal membuat paket ujian');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded bg-maroon-100 text-maroon-900 text-[10px] font-extrabold uppercase tracking-wider">
              MANAJEMEN PAKET SIMULASI
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Paket Ujian JLPT (N5 - N1)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Konfigurasi paket ujian berstandar BISA JFT dengan durasi waktu, seksi otomatis, dan passing grade.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Paket Baru</span>
        </button>
      </div>

      {/* Exam Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-maroon-800" />
            <span>Memuat paket ujian...</span>
          </div>
        ) : (
          exams.map((pkg) => {
            const totalQuestions = pkg.sections.reduce(
              (acc: number, s: any) => acc + s.questions.length,
              0
            );

            return (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-9 h-9 rounded-xl bg-maroon-800 text-white font-black text-base flex items-center justify-center shadow-sm">
                      {pkg.level}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      {pkg.tierRequired}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mb-3">{pkg.code}</p>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-4">
                    {pkg.description || 'Tidak ada deskripsi.'}
                  </p>

                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-1.5 text-xs text-slate-600 mb-4">
                    <div className="flex justify-between">
                      <span>Passing Grade:</span>
                      <strong className="text-maroon-800 font-bold">{pkg.passScoreTotal} / 180</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Durasi Pengerjaan:</span>
                      <span>{pkg.durationMinutes} Menit</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seksi Ujian:</span>
                      <span>{pkg.sections.length} Seksi</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Soal:</span>
                      <span>{totalQuestions} Butir</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Dikerjakan: {pkg.attempts?.length || 0}x</span>
                  <span className="font-bold text-emerald-700">Published</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Buat Paket Ujian */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Buat Paket Simulasi Baru</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePackage} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Judul Paket Simulasi
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Misal: Paket Tryout Akbar JLPT N3 2026"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Kode Unik
                  </label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="JLPT-N3-MOCK-02"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Tingkat (Level)
                  </label>
                  <select
                    value={level}
                    onChange={(e) => handleLevelChange(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  >
                    <option value="N5">JLPT N5</option>
                    <option value="N4">JLPT N4</option>
                    <option value="N3">JLPT N3</option>
                    <option value="N2">JLPT N2</option>
                    <option value="N1">JLPT N1</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Durasi (Menit)
                  </label>
                  <input
                    type="number"
                    required
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Pass Score
                  </label>
                  <input
                    type="number"
                    required
                    value={passScoreTotal}
                    onChange={(e) => setPassScoreTotal(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Tier Akses
                  </label>
                  <select
                    value={tierRequired}
                    onChange={(e) => setTierRequired(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="FREE">FREE</option>
                    <option value="SILVER">SILVER</option>
                    <option value="GOLD">GOLD</option>
                    <option value="LPK_PARTNER">LPK_PARTNER</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Deskripsi Paket
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Keterangan singkat materi ujian..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="py-2 px-4 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs rounded-xl shadow"
                >
                  {saving ? 'Menyimpan...' : 'Simpan Paket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

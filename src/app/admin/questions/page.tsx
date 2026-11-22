'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  HelpCircle,
  Volume2,
  Image as ImageIcon,
  CheckCircle2,
  Sparkles,
  Loader2,
  RefreshCw,
  Upload,
} from 'lucide-react';
import FuriganaText from '@/components/common/FuriganaText';
import QuestionFormModal from '@/components/admin/QuestionFormModal';
import BulkDeleteButton from '@/components/admin/BulkDeleteButton';
import ImportQuestionsModal from '@/components/admin/ImportQuestionsModal';

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState<any | null>(null);

  // Fetch questions
  const loadQuestions = async () => {
    setLoading(true);
    try {
      let url = '/api/admin/questions';
      const params = new URLSearchParams();
      if (selectedLevel !== 'ALL') params.append('level', selectedLevel);
      if (searchQuery) params.append('search', searchQuery);

      const qs = params.toString();
      if (qs) url += `?${qs}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setQuestions(data.questions);
        setSelectedIds([]);
      }
    } catch (e) {
      console.error('Failed to load questions', e);
    } finally {
      setLoading(false);
    }
  };

  // Fetch sections for modal selector
  const loadExamsAndSections = async () => {
    try {
      const res = await fetch('/api/admin/exams');
      const data = await res.json();
      if (data.success) {
        const flattenedSections: any[] = [];
        data.exams.forEach((exam: any) => {
          exam.sections.forEach((sec: any) => {
            flattenedSections.push({
              id: sec.id,
              name: sec.name,
              examPackage: {
                level: exam.level,
                title: exam.title,
              },
            });
          });
        });
        setSections(flattenedSections);
      }
    } catch (e) {
      console.error('Failed to load sections', e);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [selectedLevel]);

  useEffect(() => {
    loadExamsAndSections();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadQuestions();
  };

  // Checkbox toggle
  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === questions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(questions.map((q) => q.id));
    }
  };

  // Single delete
  const handleDeleteSingle = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus butir soal ini?')) return;
    try {
      const res = await fetch(`/api/admin/questions/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        loadQuestions();
      }
    } catch (e: any) {
      alert(e.message || 'Gagal menghapus soal');
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded bg-maroon-100 text-maroon-900 text-[10px] font-extrabold uppercase tracking-wider">
              MANAJEMEN SOAL CMS
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Bank Soal & Ruby Furigana
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar butir soal ujian simulasi JLPT dari N5 hingga N1 dengan dukungan render furigana dan audio choukai.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Bulk Delete Action Button */}
          <BulkDeleteButton
            selectedIds={selectedIds}
            onDeleted={loadQuestions}
            entityName="soal"
          />

          <button
            type="button"
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4 text-amber-400" />
            <span>Import Soal (N5-N1)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setQuestionToEdit(null);
              setShowModal(true);
            }}
            className="px-4 py-2 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Soal Baru</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Level Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLevel === lvl
                  ? 'bg-maroon-800 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {lvl === 'ALL' ? 'Semua Tingkat' : `JLPT ${lvl}`}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-80">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kanji, kosakata, pola..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon-800"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-xl transition-colors"
          >
            Cari
          </button>
        </form>
      </div>

      {/* Questions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={questions.length > 0 && selectedIds.length === questions.length}
                    onChange={toggleSelectAll}
                    className="accent-maroon-800 cursor-pointer rounded"
                  />
                </th>
                <th className="py-3 px-3">Level / Seksi</th>
                <th className="py-3 px-3">Mondai</th>
                <th className="py-3 px-4">Konten Soal (Furigana Rendered)</th>
                <th className="py-3 px-3">Media</th>
                <th className="py-3 px-3">Kunci</th>
                <th className="py-3 px-3">Bobot</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-maroon-800" />
                    <span>Memuat bank soal...</span>
                  </td>
                </tr>
              ) : questions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    Tidak ada soal ditemukan untuk kriteria filter ini.
                  </td>
                </tr>
              ) : (
                questions.map((q) => {
                  const isChecked = selectedIds.includes(q.id);
                  const level = q.examSection?.examPackage?.level || 'N5';

                  return (
                    <tr
                      key={q.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isChecked ? 'bg-maroon-50/30' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectOne(q.id)}
                          className="accent-maroon-800 cursor-pointer rounded"
                        />
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="w-6 h-6 rounded bg-maroon-800 text-white font-bold text-[10px] inline-flex items-center justify-center mr-1.5">
                          {level}
                        </span>
                        <span className="text-[11px] text-slate-600 font-medium">
                          {q.examSection?.name?.split(' ')[0]}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-slate-700">
                        M{q.mondaiNumber}-#{q.questionNumber}
                      </td>
                      <td className="py-3.5 px-4 max-w-md font-japanese text-xs text-slate-900 leading-relaxed">
                        <FuriganaText text={q.content} />
                      </td>
                      <td className="py-3.5 px-3 text-slate-400">
                        <div className="flex items-center gap-1.5">
                          {q.audioUrl && (
                            <span title="Audio Choukai tersedia">
                              <Volume2 className="w-4 h-4 text-amber-600" />
                            </span>
                          )}
                          {q.imageUrl && (
                            <span title="Gambar mondai tersedia">
                              <ImageIcon className="w-4 h-4 text-blue-600" />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                          Opsi {q.correctOption}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-slate-700">
                        {q.weight} Pt
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setQuestionToEdit(q);
                              setShowModal(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-maroon-800 hover:bg-slate-100 transition-colors"
                            title="Edit Soal"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSingle(q.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Hapus Soal"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Question Form Modal */}
      {showModal && (
        <QuestionFormModal
          sections={sections}
          questionToEdit={questionToEdit}
          onClose={() => {
            setShowModal(false);
            setQuestionToEdit(null);
          }}
          onSaved={() => {
            loadQuestions();
          }}
        />
      )}

      {/* Import Questions Modal */}
      {showImportModal && (
        <ImportQuestionsModal
          sections={sections}
          onClose={() => setShowImportModal(false)}
          onImported={() => {
            loadQuestions();
          }}
        />
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { X, Plus, Sparkles, Loader2, Volume2, Image as ImageIcon } from 'lucide-react';
import FuriganaText from '@/components/common/FuriganaText';

interface SectionOption {
  id: string;
  name: string;
  examPackage: {
    level: string;
    title: string;
  };
}

interface QuestionFormModalProps {
  sections: SectionOption[];
  questionToEdit?: any | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function QuestionFormModal({
  sections,
  questionToEdit,
  onClose,
  onSaved,
}: QuestionFormModalProps) {
  const isEditing = Boolean(questionToEdit);

  let initialOptions = ['1. ', '2. ', '3. ', '4. '];
  if (questionToEdit?.options) {
    try {
      initialOptions = JSON.parse(questionToEdit.options);
    } catch (e) {}
  }

  const [examSectionId, setExamSectionId] = useState(
    questionToEdit?.examSectionId || (sections[0]?.id ?? '')
  );
  const [mondaiNumber, setMondaiNumber] = useState(questionToEdit?.mondaiNumber || 1);
  const [questionNumber, setQuestionNumber] = useState(questionToEdit?.questionNumber || 1);
  const [instruction, setInstruction] = useState(questionToEdit?.instruction || '');
  const [passage, setPassage] = useState(questionToEdit?.passage || '');
  const [content, setContent] = useState(questionToEdit?.content || '');
  const [audioUrl, setAudioUrl] = useState(questionToEdit?.audioUrl || '');
  const [imageUrl, setImageUrl] = useState(questionToEdit?.imageUrl || '');
  const [options, setOptions] = useState<string[]>(initialOptions);
  const [correctOption, setCorrectOption] = useState<number>(questionToEdit?.correctOption || 1);
  const [explanation, setExplanation] = useState(questionToEdit?.explanation || '');
  const [weight, setWeight] = useState<number>(questionToEdit?.weight || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOptionChange = (index: number, value: string) => {
    const next = [...options];
    next[index] = value;
    setOptions(next);
  };

  const insertFuriganaHelper = () => {
    setContent((prev: string) => `${prev}[漢字|かんじ]`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        examSectionId,
        mondaiNumber,
        questionNumber,
        instruction,
        passage,
        audioUrl,
        imageUrl,
        content,
        options,
        correctOption,
        explanation,
        weight,
      };

      const url = isEditing
        ? `/api/admin/questions/${questionToEdit.id}`
        : '/api/admin/questions';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menyimpan soal');
      }

      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {isEditing ? 'Perbarui Butir Soal' : 'Tambah Soal Baru ke Bank Soal'}
            </h3>
            <p className="text-xs text-slate-500">
              Format furigana didukung penuh dengan sintaks: <code className="text-maroon-800 font-bold bg-maroon-50 px-1 py-0.5 rounded">[漢字|かんじ]</code>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Section Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Target Paket Ujian & Seksi
            </label>
            <select
              value={examSectionId}
              onChange={(e) => setExamSectionId(e.target.value)}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-maroon-800 focus:outline-none"
            >
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  [{s.examPackage.level}] {s.examPackage.title} - {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nomor Mondai
              </label>
              <input
                type="number"
                min="1"
                required
                value={mondaiNumber}
                onChange={(e) => setMondaiNumber(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nomor Soal
              </label>
              <input
                type="number"
                min="1"
                required
                value={questionNumber}
                onChange={(e) => setQuestionNumber(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Bobot Soal (1 - 3 Pt)
              </label>
              <select
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              >
                <option value={1}>1 Poin (Kosakata / Moji-Goi)</option>
                <option value={2}>2 Poin (Bunpo / Star / Listening Pendek)</option>
                <option value={3}>3 Poin (Dokkai Bacaan / Listening Panjang)</option>
              </select>
            </div>
          </div>

          {/* Petunjuk Soal (Instruction) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Petunjuk Soal (Instruction)
            </label>
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Contoh: （　　）に なにを いれますか。"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-japanese"
            />
          </div>

          {/* Dokkai Passage */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Teks Wacana / Dokkai Passage (Opsional)
            </label>
            <textarea
              rows={3}
              value={passage}
              onChange={(e) => setPassage(e.target.value)}
              placeholder="Isi dengan teks bacaan panjang jika ada..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-japanese"
            />
          </div>

          {/* Content Soal */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Isi Soal Utama (Support Furigana) *
              </label>
              <button
                type="button"
                onClick={insertFuriganaHelper}
                className="text-[11px] font-bold text-maroon-800 hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>+ Sisipkan Furigana [漢字|かんじ]</span>
              </button>
            </div>
            <textarea
              rows={2}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Contoh: きのう、[友|とも]だちと [映画|えいが]を [見|み]ました。"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-japanese"
            />

            {/* Live Furigana Preview Box */}
            {content && (
              <div className="mt-2 p-3 bg-amber-50/60 rounded-xl border border-amber-200/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                  Live Preview Furigana:
                </span>
                <div className="text-sm font-japanese font-medium text-slate-900">
                  <FuriganaText text={content} />
                </div>
              </div>
            )}
          </div>

          {/* Media Links (Audio / Image) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Audio URL (Listening/Choukai)</span>
              </label>
              <input
                type="url"
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                placeholder="https://.../sample-listening.mp3"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>Image URL (Mondai Bergambar)</span>
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://.../diagram.jpg"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>
          </div>

          {/* Options 1-4 */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Opsi Jawaban & Kunci Jawaban Benar (1 - 4)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((optIdx) => {
                const optNum = optIdx + 1;
                const isCorrect = correctOption === optNum;

                return (
                  <div
                    key={optIdx}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                      isCorrect ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="correctOption"
                      checked={isCorrect}
                      onChange={() => setCorrectOption(optNum)}
                      className="accent-emerald-600 cursor-pointer"
                      title="Tandai sebagai kunci jawaban benar"
                    />
                    <span className="text-xs font-bold font-mono text-slate-500">{optNum}.</span>
                    <input
                      type="text"
                      required
                      value={options[optIdx] || ''}
                      onChange={(e) => handleOptionChange(optIdx, e.target.value)}
                      placeholder={`Pilihan ${optNum}`}
                      className="flex-1 bg-transparent border-none text-xs font-japanese focus:outline-none"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Penjelasan & Pembahasan Jawaban
            </label>
            <textarea
              rows={2}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Jelaskan alasan kunci jawaban benar..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2.5 px-5 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{isEditing ? 'Simpan Perubahan' : 'Tambah Soal'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

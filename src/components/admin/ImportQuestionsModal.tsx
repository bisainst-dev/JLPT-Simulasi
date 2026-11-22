'use client';

import React, { useState } from 'react';
import FuriganaText from '@/components/common/FuriganaText';
import {
  Upload,
  FileText,
  Download,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  Loader2,
  FileCode,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface ImportQuestionsModalProps {
  sections: Array<{
    id: string;
    name: string;
    examPackage: {
      level: string;
      title: string;
    };
  }>;
  onClose: () => void;
  onImported: () => void;
}

export default function ImportQuestionsModal({
  sections,
  onClose,
  onImported,
}: ImportQuestionsModalProps) {
  const [selectedLevel, setSelectedLevel] = useState<'N5' | 'N4' | 'N3' | 'N2' | 'N1'>('N5');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('');
  const [importMode, setImportMode] = useState<'JSON' | 'CSV'>('JSON');
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [parsedPreview, setParsedPreview] = useState<any[]>([]);

  // Filter sections for the selected level
  const filteredSections = sections.filter((s) => s.examPackage.level === selectedLevel);

  // Sample templates per level with Furigana markup
  const getSampleTemplate = (level: string) => {
    if (level === 'N5') {
      return [
        {
          mondaiNumber: 1,
          questionNumber: 1,
          instruction: 'つぎの ぶんの [漢字|かんじ]の ことばは どう かきますか。',
          content: 'きのう、[友|とも]だちと [映画|えいが]を [見|み]ました。',
          options: ['1. えいか', '2. えいが', '3. えーが', '4. えーか'],
          correctOption: 2,
          explanation: 'Kanji 映 (ei) + 画 (ga) dibaca えいが (eiga) yang berarti film.',
          weight: 1,
        },
        {
          mondaiNumber: 2,
          questionNumber: 2,
          instruction: '（ ）には なにを いれますか。いちばん いい ものを ひとつ えらんで ください。',
          content: 'わたしは まいあさ [珈琲|コーヒー]（ ）[飲|の]みます。',
          options: ['1. に', '2. を', '3. で', '4. が'],
          correctOption: 2,
          explanation: 'Partikel を (o) digunakan untuk menandai objek langsung dari kata kerja 飲みます.',
          weight: 1,
        },
        {
          mondaiNumber: 3,
          questionNumber: 3,
          instruction: 'つぎの ぶんしょうを よんで、しつもんに こたえて ください。',
          passage: 'たなかさんは まいにち [日本語|にほんご]を [勉強|べんきょう]します。らいねん [日本|にほん]へ [行|い]きます。',
          content: 'たなかさんは いつ [日本|にほん]へ [行|い]きますか。',
          options: ['1. きのう', '2. こんしゅう', '3. らいねん', '4. まいにち'],
          correctOption: 3,
          explanation: 'Berdasarkan teks bacaan: らいねん 日本へ 行きます (Pergi ke Jepang tahun depan).',
          weight: 2,
        },
      ];
    } else if (level === 'N4') {
      return [
        {
          mondaiNumber: 1,
          questionNumber: 1,
          instruction: '____のことばの 読み方として 最もよいものを 選びなさい。',
          content: '[毎朝|まいあさ] [公園|こうえん]を [散歩|さんぽ]しています。',
          options: ['1. さんほ', '2. さんぼ', '3. さんぽ', '4. ざんぽ'],
          correctOption: 3,
          explanation: 'Kanji 散歩 dibaca さんぽ (sanpo) yang berarti jalan-jalan pagi.',
          weight: 1,
        },
        {
          mondaiNumber: 2,
          questionNumber: 2,
          instruction: '（ ）に入る 最もよいものを ひとつ 選びなさい。',
          content: '雨が [降|ふ]り（ ）ですから、傘を [持|も]って 行きましょう。',
          options: ['1. そう', '2. よう', '3. らしい', '4. みたい'],
          correctOption: 1,
          explanation: 'Pola Masu-stem + そうです menyatakan perkiraan kondisi cuaca (kelihatannya akan hujan).',
          weight: 1,
        },
      ];
    } else if (level === 'N3') {
      return [
        {
          mondaiNumber: 1,
          questionNumber: 1,
          instruction: '次の文の（ ）に入れるのに 最もよいものを 選びなさい。',
          content: '彼は [経験|けいけん]が [豊富|ほうふ]な（ ）、どんな 問題も 解決できる。',
          options: ['1. だけに', '2. にかけて', '3. に反して', '4. を通して'],
          correctOption: 1,
          explanation: 'Pola 〜だけに menyatakan konsekuensi logis dari alasan positif yang kuat.',
          weight: 1,
        },
      ];
    } else if (level === 'N2') {
      return [
        {
          mondaiNumber: 1,
          questionNumber: 1,
          instruction: '次の文の（ ）に入れるのに 最もよいものを 選びなさい。',
          content: 'この [契約|けいやく]は [双方|そうほう]の [合意|ごうい]が ない（ ）[成立|せいりつ]しない。',
          options: ['1. 限り', '2. ばかりに', '3. ついでに', '4. につれて'],
          correctOption: 1,
          explanation: 'Pola 〜ない限り (selama tidak ada kesepakatan kedua belah pihak).',
          weight: 2,
        },
      ];
    } else {
      // N1
      return [
        {
          mondaiNumber: 1,
          questionNumber: 1,
          instruction: '次の文の（ ）に入れるのに 最もよいものを 選びなさい。',
          content: '政府の [政策|せいさく]は 国民の [信頼|しんらい]を [得|え]る（ ）、かえって 不信感を 募らせた。',
          options: ['1. どころか', '2. にひきかえ', '3. と相まって', '4. を皮切りに'],
          correctOption: 1,
          explanation: 'Pola 〜どころか (bukan hanya tidak meraih kepercayaan, melainkan sebaliknya...).',
          weight: 2,
        },
      ];
    }
  };

  // Download template JSON
  const handleDownloadTemplate = () => {
    const template = getSampleTemplate(selectedLevel);
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(template, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `template_soal_jlpt_${selectedLevel.toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Populate sample in text area
  const handleLoadSampleToEditor = () => {
    const template = getSampleTemplate(selectedLevel);
    setRawText(JSON.stringify(template, null, 2));
    parseAndValidate(JSON.stringify(template, null, 2));
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setRawText(content);
      parseAndValidate(content);
    };
    reader.readAsText(file);
  };

  // Parse text content and update preview
  const parseAndValidate = (text: string) => {
    setError('');
    setSuccessMsg('');
    if (!text.trim()) {
      setParsedPreview([]);
      return;
    }

    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        setParsedPreview(parsed);
      } else if (parsed && typeof parsed === 'object') {
        setParsedPreview([parsed]);
      } else {
        setError('Format JSON harus berupa Array daftar soal [...]');
        setParsedPreview([]);
      }
    } catch (err: any) {
      setError(`Format JSON tidak valid: ${err.message}`);
      setParsedPreview([]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setRawText(val);
    parseAndValidate(val);
  };

  // Execute Import
  const handleExecuteImport = async () => {
    if (parsedPreview.length === 0) {
      setError('Belum ada butir soal yang valid untuk diimpor.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/questions/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: selectedLevel,
          examSectionId: selectedSectionId || undefined,
          questions: parsedPreview,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal mengimpor soal');
      }

      setSuccessMsg(data.message || `Berhasil mengimpor ${data.count} soal JLPT ${selectedLevel}!`);
      setTimeout(() => {
        onImported();
        onClose();
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mengimpor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-950 text-white p-6 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                BULK QUESTION IMPORTER
              </span>
            </div>
            <h2 className="text-xl font-black">Import Soal Massal Berdasarkan Kategori JLPT</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Unggah file JSON/CSV soal per level (N5, N4, N3, N2, N1) lengkap dengan tag Ruby Furigana.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Level Selector Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Pilih Kategori Tingkat JLPT:
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    setSelectedLevel(lvl);
                    setSelectedSectionId('');
                    // reset template preview when switching level
                    const template = getSampleTemplate(lvl);
                    setRawText(JSON.stringify(template, null, 2));
                    parseAndValidate(JSON.stringify(template, null, 2));
                  }}
                  className={`py-3 px-3 rounded-2xl text-center font-black transition-all border ${
                    selectedLevel === lvl
                      ? 'bg-maroon-800 text-white border-maroon-900 shadow-md scale-[1.02]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-base">JLPT {lvl}</span>
                  <span className="text-[10px] font-normal opacity-80">
                    {lvl === 'N5' ? 'Dasar' : lvl === 'N4' ? 'Pra-Lanjut' : lvl === 'N3' ? 'Menengah' : lvl === 'N2' ? 'Bisnis' : 'Mahir'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Target Section (Optional) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Seksi Ujian (Opsional):
              </label>
              <select
                value={selectedSectionId}
                onChange={(e) => setSelectedSectionId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon-800"
              >
                <option value="">Otomatis (Sesuai Paket Ujian JLPT {selectedLevel})</option>
                {filteredSections.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.name} ({sec.examPackage.title})
                  </option>
                ))}
              </select>
            </div>

            {/* Template Actions */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Template Standar:
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Unduh Template JLPT {selectedLevel}</span>
                </button>

                <button
                  type="button"
                  onClick={handleLoadSampleToEditor}
                  className="py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-xl border border-amber-200 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Muat Contoh</span>
                </button>
              </div>
            </div>
          </div>

          {/* File Upload Dropzone */}
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:border-maroon-700 transition-colors bg-slate-50/50">
            <input
              type="file"
              accept=".json,.csv,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload-input"
            />
            <label
              htmlFor="file-upload-input"
              className="cursor-pointer flex flex-col items-center justify-center gap-1 text-xs text-slate-600"
            >
              <Upload className="w-6 h-6 text-maroon-800 mb-1" />
              <span className="font-bold text-slate-900">
                Klik untuk unggah file JSON atau seret file ke sini
              </span>
              <span className="text-[11px] text-slate-400">
                Format yang didukung: .json (Array objek butir soal JLPT)
              </span>
            </label>
          </div>

          {/* Direct Raw Text Editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Atau Tempel JSON Array Soal di Bawah:
              </label>
              <span className="text-[11px] font-bold text-slate-500 font-mono">
                {parsedPreview.length} Butir Soal Terdeteksi
              </span>
            </div>
            <textarea
              rows={8}
              value={rawText}
              onChange={handleTextChange}
              placeholder={`[\n  {\n    "mondaiNumber": 1,\n    "questionNumber": 1,\n    "content": "きのう、[友|とも]だちと [映画|えいが]を [見|み]ました。",\n    "options": ["1. えいか", "2. えいが", "3. えーが", "4. えーか"],\n    "correctOption": 2,\n    "explanation": "Pembahasan..."\n  }\n]`}
              className="w-full p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-2xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-maroon-800"
            />
          </div>

          {/* Notifications */}
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Live Furigana Preview Accordion */}
          {parsedPreview.length > 0 && (
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Preview Render Soal Pertama (Furigana Live)</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-maroon-100 text-maroon-900">
                  JLPT {selectedLevel}
                </span>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-2">
                {parsedPreview[0].instruction && (
                  <p className="text-[11px] text-slate-500 font-japanese">
                    <FuriganaText text={parsedPreview[0].instruction} />
                  </p>
                )}
                {parsedPreview[0].passage && (
                  <div className="p-3 bg-slate-50 rounded-lg text-xs font-japanese border border-slate-100 leading-relaxed text-slate-800">
                    <FuriganaText text={parsedPreview[0].passage} />
                  </div>
                )}
                <div className="text-sm font-semibold text-slate-900 font-japanese leading-relaxed">
                  <FuriganaText text={parsedPreview[0].content} />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  {(Array.isArray(parsedPreview[0].options)
                    ? parsedPreview[0].options
                    : ['1. Opsi 1', '2. Opsi 2', '3. Opsi 3', '4. Opsi 4']
                  ).map((opt: string, i: number) => {
                    const isKey = Number(parsedPreview[0].correctOption) === i + 1;
                    return (
                      <div
                        key={i}
                        className={`p-2 rounded-lg text-xs font-japanese border ${
                          isKey
                            ? 'bg-emerald-50 border-emerald-400 font-bold text-emerald-950'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {opt} {isKey && '✓ (Kunci)'}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-slate-500">
            Kategori:{' '}
            <strong className="text-maroon-800 font-bold">JLPT {selectedLevel}</strong> • Siap impor:{' '}
            <strong className="text-slate-900">{parsedPreview.length} butir</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Batal
            </button>

            <button
              type="button"
              onClick={handleExecuteImport}
              disabled={loading || parsedPreview.length === 0}
              className="px-6 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mengimpor ke Database...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Impor {parsedPreview.length} Soal ke JLPT {selectedLevel}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

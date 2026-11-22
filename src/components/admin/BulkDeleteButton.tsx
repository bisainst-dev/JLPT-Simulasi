'use client';

import React, { useState } from 'react';
import { Trash2, Loader2, AlertCircle } from 'lucide-react';

interface BulkDeleteButtonProps {
  selectedIds: string[];
  onDeleted: () => void;
  entityName?: string;
}

export default function BulkDeleteButton({
  selectedIds,
  onDeleted,
  entityName = 'soal',
}: BulkDeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const count = selectedIds.length;
  if (count === 0) return null;

  const handleExecuteBulkDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/questions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menghapus secara massal');
      }

      setShowConfirm(false);
      onDeleted();
    } catch (e: any) {
      alert(e.message || 'Terjadi kesalahan saat hapus massal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-all animate-in fade-in"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Hapus Massal ({count} {entityName})</span>
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">
                Konfirmasi Hapus Massal (deleteMany)
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Tindakan ini akan menghapus permanen <strong>{count} {entityName}</strong> terpilih dari basis data beserta seluruh relasi jawaban siswa terkait.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => setShowConfirm(false)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Batalkan
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleExecuteBulkDelete}
                className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
              >
                {loading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                <span>Ya, Hapus {count} Soal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

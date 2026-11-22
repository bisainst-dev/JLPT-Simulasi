'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { UserCheck, Loader2 } from 'lucide-react';

interface ImpersonateButtonProps {
  userId: string;
  userName: string;
}

export default function ImpersonateButton({ userId, userName }: ImpersonateButtonProps) {
  const { update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleImpersonate = async () => {
    if (!confirm(`Apakah Anda yakin ingin masuk ke sistem sebagai "${userName}" untuk keperluan audit?`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/impersonate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId: userId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal beralih mode impersonasi');
      }

      await update({ user: data.user });
      router.push('/dashboard');
      router.refresh();
    } catch (e: any) {
      alert(e.message || 'Terjadi kesalahan impersonasi');
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleImpersonate}
      disabled={loading}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-all shadow-sm disabled:opacity-50"
      title={`Masuk sebagai ${userName} (Impersonation Mode)`}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <UserCheck className="w-3.5 h-3.5 text-amber-700" />
      )}
      <span>Audit Akun</span>
    </button>
  );
}

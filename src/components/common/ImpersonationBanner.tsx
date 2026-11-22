'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { UserCheck, LogOut, Loader2, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ImpersonationBanner() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isImpersonated = (session?.user as any)?.isImpersonated;
  const impersonator = (session?.user as any)?.impersonatorAdmin;

  if (!isImpersonated) return null;

  const handleExitImpersonation = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/impersonate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'exit' }),
      });
      const data = await res.json();
      if (data.success) {
        await update({ user: data.user });
        router.push('/admin/dashboard');
        router.refresh();
      }
    } catch (e) {
      console.error('Failed to exit impersonation', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white px-4 py-2 text-sm shadow-md sticky top-0 z-50 flex flex-wrap items-center justify-between gap-2 border-b border-amber-500">
      <div className="flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-200 animate-pulse flex-shrink-0" />
        <div>
          <span className="font-bold tracking-wide uppercase text-xs bg-amber-900/60 px-2 py-0.5 rounded mr-2 border border-amber-400/40">
            Mode Audit / Impersonasi
          </span>
          <span>
            Anda sedang melihat sistem sebagai{' '}
            <strong className="underline decoration-amber-300 decoration-2 underline-offset-2">
              {session?.user?.name}
            </strong>{' '}
            <span className="text-amber-200 text-xs">({session?.user?.email} • Tier: {(session?.user as any)?.tier})</span>
          </span>
        </div>
      </div>

      <button
        onClick={handleExitImpersonation}
        disabled={loading}
        className="flex items-center gap-1.5 px-3 py-1 bg-white text-amber-900 hover:bg-amber-50 text-xs font-semibold rounded-md shadow-sm transition-all border border-amber-300 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <LogOut className="w-3.5 h-3.5" />
        )}
        <span>Kembali ke Dasbor Admin</span>
      </button>
    </div>
  );
}

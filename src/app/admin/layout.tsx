import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/login?callbackUrl=/admin/dashboard');
  }

  const role = (session.user as any).role;
  if (role !== 'ADMIN') {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex bg-slate-100 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-x-hidden min-w-0">
        {children}
      </div>
    </div>
  );
}

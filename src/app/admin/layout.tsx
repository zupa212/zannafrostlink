import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zanna Frost Admin | Dashboard',
  description: 'Manage your profile and track analytics',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout selection:bg-pink-300 selection:text-black">
      {children}
    </div>
  );
}

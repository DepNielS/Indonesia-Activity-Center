import type {
  ReactNode,
} from 'react';

import AdminLayout from '@/src/components/admin/AdminLayout';

interface AdminRootLayoutProps {
  children: ReactNode;
}

export default function AdminRootLayout({
  children,
}: AdminRootLayoutProps) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
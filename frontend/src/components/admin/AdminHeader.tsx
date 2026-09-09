'use client';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/src/context/AuthContext';

export default function AdminHeader() {
  const router = useRouter();

  const {
    user,
    logout,
  } = useAuth();

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  if (!user) {
    return null;
  }

  return (
    <header className="admin-header">
      <div className="admin-header-inner">

        <div className="admin-header-brand">
          <span className="admin-header-label">
            ADMIN DASHBOARD
          </span>

          <h1 className="admin-header-title">
            Indonesia Activity Center
          </h1>
        </div>

        <div className="admin-header-account">
          <div className="admin-header-user">
            <p className="admin-header-email">
              {user.email}
            </p>

            <p className="admin-header-role">
              Role: {user.role}
            </p>
          </div>

          <button
            type="button"
            className="admin-header-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

      </div>
    </header>
  );
}
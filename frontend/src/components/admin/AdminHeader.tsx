
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
    <header>
      <div>
        <div>
          <span>
            ADMIN DASHBOARD
          </span>

          <h1>
            Indonesia Activity Center
          </h1>
        </div>

        <div>
          <p>
            {user.email}
          </p>

          <p>
            Role: {user.role}
          </p>

          <button
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}


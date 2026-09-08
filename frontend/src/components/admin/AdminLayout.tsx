'use client';

import type {
ReactNode,
} from 'react';

import {
useEffect,
} from 'react';

import Link from 'next/link';

import {
usePathname,
useRouter,
} from 'next/navigation';

import {
useAuth,
} from '@/src/context/AuthContext';

interface AdminLayoutProps {
children: ReactNode;
}

export default function AdminLayout({
children,
}: AdminLayoutProps) {
const router = useRouter();
const pathname = usePathname();

const {
user,
logout,
isAuthenticated,
loading,
} = useAuth();

useEffect(() => {
if (!loading && !isAuthenticated) {
router.replace('/login');
}
}, [
loading,
isAuthenticated,
router,
]);

if (loading) {
return ( <main> <section className="login-section"> <div className="login-container"> <p>
Checking authentication... </p> </div> </section> </main>
);
}

if (!isAuthenticated) {
return null;
}

return ( <div className="admin-layout"> <aside className="admin-sidebar"> <div className="admin-sidebar-header"> <h2>
Indonesia Activity Center </h2>

      <p>
        Admin Panel
      </p>
    </div>

    <nav className="admin-sidebar-nav">
      <Link
        href="/admin"
        className={
          pathname === '/admin'
            ? 'admin-nav-link active'
            : 'admin-nav-link'
        }
      >
        Dashboard
      </Link>

      <Link
        href="/admin/activities"
        className={
          pathname.startsWith(
            '/admin/activities',
          )
            ? 'admin-nav-link active'
            : 'admin-nav-link'
        }
      >
        Activities
      </Link>

      <Link
        href="/admin/categories"
        className={
          pathname.startsWith(
            '/admin/categories',
          )
            ? 'admin-nav-link active'
            : 'admin-nav-link'
        }
      >
        Categories
      </Link>

      <Link
        href="/admin/events"
        className={
          pathname.startsWith(
            '/admin/events',
          )
            ? 'admin-nav-link active'
            : 'admin-nav-link'
        }
      >
        Events
      </Link>
    </nav>

    <div className="admin-sidebar-footer">
      <div className="admin-user">
        <p>
          {user?.email}
        </p>

        <span>
          {user?.role}
        </span>
      </div>

      <button
        type="button"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  </aside>

  <div className="admin-content">
    <header className="admin-content-header">
      <div>
        <p>
          ADMIN DASHBOARD
        </p>

        <h1>
          Management Console
        </h1>
      </div>
    </header>

    <main className="admin-content-main">
      {children}
    </main>
  </div>
</div>


);
}

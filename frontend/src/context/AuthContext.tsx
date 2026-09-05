'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import {
  getAccessToken,
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  type AuthenticatedUser,
} from '@/src/lib/auth';

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'EDITOR';

interface AuthUser
  extends AuthenticatedUser {
  role: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );

function getRoleFromId(
  roleId: number,
): UserRole | null {
  switch (roleId) {
    case 1:
      return 'SUPER_ADMIN';

    case 2:
      return 'ADMIN';

    case 3:
      return 'EDITOR';

    default:
      return null;
  }
}

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function restoreSession() {
      const token =
        getAccessToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const authenticatedUser =
          await getCurrentUser();

        const role =
          getRoleFromId(
            authenticatedUser.roleId,
          );

        if (!role) {
          throw new Error(
            'Unknown user role',
          );
        }

        setUser({
          ...authenticatedUser,
          role,
        });
      } catch {
        logoutRequest();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  async function login(
    email: string,
    password: string,
  ) {
    await loginRequest(
      email,
      password,
    );

    const authenticatedUser =
      await getCurrentUser();

    const role =
      getRoleFromId(
        authenticatedUser.roleId,
      );

    if (!role) {
      logoutRequest();

      throw new Error(
        'Unknown user role',
      );
    }

    setUser({
      ...authenticatedUser,
      role,
    });
  }

  function logout() {
    logoutRequest();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated:
          user !== null,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider',
    );
  }

  return context;
}
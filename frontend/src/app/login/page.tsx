'use client';

import {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/src/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();

  const {
    login,
    isAuthenticated,
    loading,
  } = useAuth();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [error, setError] =
    useState('');

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/');
    }
  }, [
    loading,
    isAuthenticated,
    router,
  ]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError('');
    setSubmitting(true);

    try {
      await login(
        email,
        password,
      );

      router.replace('/');
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Login failed',
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main>
        <section className="login-section">
          <div className="login-container">
            <p>Checking authentication...</p>
          </div>
        </section>
      </main>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <main>
      <section className="login-section">
        <div className="login-container">
          <div className="login-header">
            <span className="section-label">
              ADMIN
            </span>

            <h1 className="login-title">
              Login
            </h1>

            <p className="login-description">
              Sign in to access the
              administration area.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >
            <div className="login-field">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value,
                  )
                }
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value,
                  )
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="login-button"
            >
              {submitting
                ? 'Signing in...'
                : 'Sign In'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
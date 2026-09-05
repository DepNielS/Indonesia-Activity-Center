const ACCESS_TOKEN_KEY = 'iac_access_token';

export interface LoginResponse {
  accessToken: string;
}

export interface AuthenticatedUser {
  id: number;
  email: string;
  roleId: number;
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error(
      'NEXT_PUBLIC_API_URL is not configured',
    );
  }

  const response = await fetch(
    `${apiUrl}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        'Invalid email or password',
      );
    }

    throw new Error(
      `Login failed: ${response.status}`,
    );
  }

  const data: LoginResponse =
    await response.json();

  localStorage.setItem(
    ACCESS_TOKEN_KEY,
    data.accessToken,
  );

  return data;
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(
    ACCESS_TOKEN_KEY,
  );
}

export async function getCurrentUser(): Promise<AuthenticatedUser> {
  const token = getAccessToken();

  if (!token) {
    throw new Error(
      'Not authenticated',
    );
  }

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error(
      'NEXT_PUBLIC_API_URL is not configured',
    );
  }

  const response = await fetch(
    `${apiUrl}/auth/me`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to get current user: ${response.status}`,
    );
  }

  return response.json();
}

export function logout(): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(
    ACCESS_TOKEN_KEY,
  );

  
}
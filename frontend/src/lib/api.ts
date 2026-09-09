import { getAccessToken } from './auth';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    'NEXT_PUBLIC_API_URL is not configured',
  );
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getAccessToken();

  const headers = new Headers(
    options.headers,
  );

  headers.set(
    'Content-Type',
    'application/json',
  );

  if (token) {
    headers.set(
      'Authorization',
      `Bearer ${token}`,
    );
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers,
    },
  );

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status}`,
    );
  }

  return response.json();
}


// 
export interface ImageUploadResponse {
  path: string;
  publicUrl: string;
}

export async function uploadImage(
  file: File,
): Promise<ImageUploadResponse> {
  const token = getAccessToken();

  if (!token) {
    throw new Error(
      'Authentication token is not available',
    );
  }

  const formData = new FormData();

  formData.append('file', file);

  const response = await fetch(
    `${API_URL}/uploads/image`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  if (!response.ok) {
    let message = `Image upload failed: ${response.status}`;

    try {
      const errorData = await response.json();

      if (
        errorData &&
        typeof errorData.message === 'string'
      ) {
        message = errorData.message;
      }
    } catch {
      // Ignore invalid error response body.
    }

    throw new Error(message);
  }

  return response.json();
}
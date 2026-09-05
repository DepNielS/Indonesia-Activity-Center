
import { apiFetch } from '@/src/lib/api';

export type ActivityStatus =
  | 'DRAFT'
  | 'PUBLISHED';

export interface AdminActivity {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  location: string | null;
  duration: string | null;
  status: ActivityStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateActivityPayload {
  categoryId: number;
  name: string;
  slug: string;
  description: string;
  image?: string;
  location?: string;
  duration?: string;
}

export interface UpdateActivityPayload {
  categoryId?: number;
  name?: string;
  slug?: string;
  description?: string;
  image?: string;
  location?: string;
  duration?: string;
}

export async function getAdminActivities() {
  return apiFetch<AdminActivity[]>(
    '/activities',
  );
}

export async function getAdminActivityById(
  id: number,
) {
  return apiFetch<AdminActivity>(
    `/activities/${id}`,
  );
}

export async function createAdminActivity(
  payload: CreateActivityPayload,
) {
  return apiFetch<AdminActivity>(
    '/activities',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}

export async function updateAdminActivity(
  id: number,
  payload: UpdateActivityPayload,
) {
  return apiFetch<AdminActivity>(
    `/activities/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
  );
}

export async function publishAdminActivity(
  id: number,
) {
  return apiFetch<AdminActivity>(
    `/activities/${id}/publish`,
    {
      method: 'POST',
    },
  );
}

export async function unpublishAdminActivity(
  id: number,
) {
  return apiFetch<AdminActivity>(
    `/activities/${id}/unpublish`,
    {
      method: 'POST',
    },
  );
}

export async function deleteAdminActivity(
  id: number,
) {
  return apiFetch<{
    message: string;
  }>(`/activities/${id}`, {
    method: 'DELETE',
  });
}


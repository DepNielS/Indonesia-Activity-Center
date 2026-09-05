import { apiFetch } from '@/src/lib/api';

export type EventStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'CANCELLED';

export interface AdminEvent {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  startAt: string;
  endAt: string;
  location: string | null;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventPayload {
  title: string;
  slug: string;
  description: string;
  image?: string;
  startAt: string;
  endAt: string;
  location?: string;
}

export interface UpdateEventPayload {
  title?: string;
  slug?: string;
  description?: string;
  image?: string;
  startAt?: string;
  endAt?: string;
  location?: string;
}

export interface GetAdminEventsParams {
  page?: number;
  limit?: number;
  status?: EventStatus;
}

export async function getAdminEvents(
  params: GetAdminEventsParams = {},
) {
  const searchParams =
    new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.set(
      'page',
      String(params.page),
    );
  }

  if (params.limit !== undefined) {
    searchParams.set(
      'limit',
      String(params.limit),
    );
  }

  if (params.status !== undefined) {
    searchParams.set(
      'status',
      params.status,
    );
  }

  const query =
    searchParams.toString();

  return apiFetch<AdminEvent[]>(
    query
      ? `/events?${query}`
      : '/events',
  );
}

export async function getAdminEventById(
  id: number,
) {
  return apiFetch<AdminEvent>(
    `/events/${id}`,
  );
}

export async function createAdminEvent(
  payload: CreateEventPayload,
) {
  return apiFetch<AdminEvent>(
    '/events',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}

export async function updateAdminEvent(
  id: number,
  payload: UpdateEventPayload,
) {
  return apiFetch<AdminEvent>(
    `/events/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
  );
}

export async function publishAdminEvent(
  id: number,
) {
  return apiFetch<AdminEvent>(
    `/events/${id}/publish`,
    {
      method: 'POST',
    },
  );
}

export async function unpublishAdminEvent(
  id: number,
) {
  return apiFetch<AdminEvent>(
    `/events/${id}/unpublish`,
    {
      method: 'POST',
    },
  );
}

export async function cancelAdminEvent(
  id: number,
) {
  return apiFetch<AdminEvent>(
    `/events/${id}/cancel`,
    {
      method: 'POST',
    },
  );
}
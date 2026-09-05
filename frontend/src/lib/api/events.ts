import { apiFetch } from '@/src/lib/api';

export interface PublicEvent {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  startAt: string;
  endAt: string;
  location: string | null;
  status: 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
}

export async function getPublishedEvents() {
  return apiFetch<PublicEvent[]>(
    '/events/published',
  );
}

export async function getPublishedEventBySlug(
  slug: string,
) {
  return apiFetch<PublicEvent>(
    `/events/published/${slug}`,
  );
}
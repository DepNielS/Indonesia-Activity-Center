import { apiFetch } from '@/src/lib/api';

export interface ActivityCategory {
  id: number;
  name: string;
  slug: string;
}

export interface PublishedActivity {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  location: string | null;
  duration: string | null;
  category: ActivityCategory;
}

export async function getPublishedActivities() {
  return apiFetch<PublishedActivity[]>(
    '/activities/published',
  );
}

export async function getPublishedActivityBySlug(
  slug: string,
) {
  return apiFetch<PublishedActivity>(
    `/activities/published/${slug}`,
  );
}

export async function getPublishedActivitiesByCategory(
  categorySlug: string,
) {
  return apiFetch<PublishedActivity[]>(
    `/activities/category/${categorySlug}`,
  );
}

/**
 * Get all activity categories.
 */
export async function getActivityCategories() {
  return apiFetch<ActivityCategory[]>(
    '/activity-categories',
  );
}

/**
 * Get activity category by slug.
 */
export async function getActivityCategoryBySlug(
  slug: string,
) {
  return apiFetch<ActivityCategory>(
    `/activity-categories/${slug}`,
  );
}
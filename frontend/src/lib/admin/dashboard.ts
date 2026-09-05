
import { getAdminActivities } from './activities';

export async function getDashboardStats() {
  const activities =
    await getAdminActivities();

  const totalActivities =
    activities.length;

  const publishedActivities =
    activities.filter(
      (activity) =>
        activity.status === 'PUBLISHED',
    ).length;

  const draftActivities =
    activities.filter(
      (activity) =>
        activity.status === 'DRAFT',
    ).length;

  return {
    totalActivities,
    publishedActivities,
    draftActivities,
  };
}


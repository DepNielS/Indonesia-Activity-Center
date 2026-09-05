
import type {
  AdminActivity,
} from '@/src/lib/admin/activities';

import type {
  ActivityCategory,
} from '@/src/lib/api/activities';

import type {
  UserRole,
} from '@/src/context/AuthContext';

import {
  canEditActivities,
  canPublishActivities,
  canDeleteActivities,
} from '@/src/lib/admin/permissions';

interface ActivityTableProps {
  activities: AdminActivity[];
  categories: ActivityCategory[];

  role: UserRole;

  onEdit: (
    activity: AdminActivity,
  ) => void;

  onPublish: (
    activity: AdminActivity,
  ) => void;

  onUnpublish: (
    activity: AdminActivity,
  ) => void;

  onDelete: (
    activity: AdminActivity,
  ) => void;
}

export default function ActivityTable({
  activities,
  categories,
  role,
  onEdit,
  onPublish,
  onUnpublish,
  onDelete,
}: ActivityTableProps) {
  const canEdit =
    canEditActivities(role);

  const canPublish =
    canPublishActivities(role);

  const canDelete =
    canDeleteActivities(role);

  function getCategoryName(
    categoryId: number,
  ) {
    const category =
      categories.find(
        (item) =>
          item.id === categoryId,
      );

    return category?.name ?? '-';
  }

  if (activities.length === 0) {
    return (
      <p>
        No activities found.
      </p>
    );
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Location</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {activities.map(
            (activity) => (
              <tr
                key={activity.id}
              >
                <td>
                  {activity.name}
                </td>

                <td>
                  {getCategoryName(
                    activity.categoryId,
                  )}
                </td>

                <td>
                  {activity.status}
                </td>

                <td>
                  {activity.location ??
                    '-'}
                </td>

                <td>
                  {activity.duration ??
                    '-'}
                </td>

                <td>
                  {canEdit && (
                    <button
                      type="button"
                      onClick={() =>
                        onEdit(activity)
                      }
                    >
                      Edit
                    </button>
                  )}


                  {canPublish && (
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          activity.status ===
                          'PUBLISHED'
                        ) {
                          onUnpublish(
                            activity,
                          );
                        } else {
                          onPublish(
                            activity,
                          );
                        }
                      }}
                    >
                      {activity.status ===
                      'PUBLISHED'
                        ? 'Unpublish'
                        : 'Publish'}
                    </button>
                  )}

                  {canDelete && (
                    <button
                      type="button"
                      onClick={() =>
                        onDelete(activity)
                      }
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}


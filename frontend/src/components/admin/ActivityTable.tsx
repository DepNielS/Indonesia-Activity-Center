import type { AdminActivity } from '@/src/lib/admin/activities';
import type { ActivityCategory } from '@/src/lib/api/activities';
import type { UserRole } from '@/src/context/AuthContext';

import {
  canEditActivities,
  canPublishActivities,
  canDeleteActivities,
} from '@/src/lib/admin/permissions';

interface ActivityTableProps {
  activities: AdminActivity[];
  categories: ActivityCategory[];
  role: UserRole;
  onEdit: (activity: AdminActivity) => void;
  onPublish: (activity: AdminActivity) => void;
  onUnpublish: (activity: AdminActivity) => void;
  onDelete: (activity: AdminActivity) => void;
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
  const canEdit = canEditActivities(role);
  const canPublish = canPublishActivities(role);
  const canDelete = canDeleteActivities(role);

  function getCategoryName(categoryId: number) {
    const category = categories.find(
      (item) => item.id === categoryId,
    );

    return category?.name ?? '-';
  }

  if (activities.length === 0) {
    return (
      <div className="admin-activities-message">
        <p>No activities found.</p>
      </div>
    );
  }

  return (
    <div className="admin-activities-table-wrapper">
      <table className="admin-activities-table">
        <thead>
          <tr>
            <th className="activity-column-name">
              Name
            </th>

            <th className="activity-column-category">
              Category
            </th>

            <th className="activity-column-status">
              Status
            </th>

            <th className="activity-column-location">
              Location
            </th>

            <th className="activity-column-duration">
              Duration
            </th>

            <th className="activity-column-actions">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              {/* NAME */}
              <td>
                <div className="admin-activity-name-wrapper">
                  <div className="admin-activity-name">
                    {activity.name}
                  </div>

                  <div className="admin-activity-slug">
                    /{activity.slug}
                  </div>
                </div>
              </td>

              {/* CATEGORY */}
              <td>
                <span className="admin-activity-category">
                  {getCategoryName(activity.categoryId)}
                </span>
              </td>

              {/* STATUS */}
              <td>
                <span
                  className={`admin-activity-status ${
                    activity.status === 'PUBLISHED'
                      ? 'admin-activity-status-published'
                      : 'admin-activity-status-draft'
                  }`}
                >
                  {activity.status}
                </span>
              </td>

              {/* LOCATION */}
              <td>
                <span className="admin-activity-location">
                  {activity.location ?? '-'}
                </span>
              </td>

              {/* DURATION */}
              <td>
                <span className="admin-activity-duration">
                  {activity.duration ?? '-'}
                </span>
              </td>

              {/* ACTIONS */}
              <td>
                <div className="admin-activity-actions">
                  {canEdit && (
                    <button
                      type="button"
                      className="admin-activity-action"
                      onClick={() => onEdit(activity)}
                    >
                      Edit
                    </button>
                  )}

                  {canPublish && (
                    <button
                      type="button"
                      className="admin-activity-action"
                      onClick={() => {
                        if (
                          activity.status === 'PUBLISHED'
                        ) {
                          onUnpublish(activity);
                        } else {
                          onPublish(activity);
                        }
                      }}
                    >
                      {activity.status === 'PUBLISHED'
                        ? 'Unpublish'
                        : 'Publish'}
                    </button>
                  )}

                  {canDelete && (
                    <button
                      type="button"
                      className="admin-activity-action admin-activity-action-danger"
                      onClick={() =>
                        onDelete(activity)
                      }
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
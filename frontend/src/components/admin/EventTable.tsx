'use client';



import type {
  AdminEvent,
} from '@/src/lib/admin/events';

import EventActions from '@/src/components/admin/EventActions';

interface EventTableProps {
  events: AdminEvent[];
  onActionComplete: () => void;
}

export default function EventTable({
  events,
  onActionComplete,
}: EventTableProps) {
  return (
    <div className="admin-event-table-wrapper">
      <table className="admin-event-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Event</th>
            <th>Date</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>
                {event.id}
              </td>

              <td>
                <div className="admin-event-table-title">
                  {event.title}
                </div>

                <div className="admin-event-table-slug">
                  /{event.slug}
                </div>
              </td>

              <td>
                <div>
                  {formatDate(
                    event.startAt,
                  )}
                </div>

                <div className="admin-event-table-time">
                  {formatTime(
                    event.startAt,
                  )}{' '}
                  -
                  {' '}
                  {formatTime(
                    event.endAt,
                  )}
                </div>
              </td>

              <td>
                {event.location ??
                  '—'}
              </td>

              <td>
                <span
                  className={`admin-event-status admin-event-status-${event.status.toLowerCase()}`}
                >
                  {event.status}
                </span>
              </td>

              <td>
                <EventActions
                    event={event}
                    onActionComplete={onActionComplete}
                />
               </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(
  value: string,
): string {
  return new Date(
    value,
  ).toLocaleDateString(
    'en-GB',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    },
  );
}

function formatTime(
  value: string,
): string {
  return new Date(
    value,
  ).toLocaleTimeString(
    'en-GB',
    {
      hour: '2-digit',
      minute: '2-digit',
    },
  );
}
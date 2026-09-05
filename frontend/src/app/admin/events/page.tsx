'use client';

import {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';

import EventTable from '@/src/components/admin/EventTable';

import {
  getAdminEvents,
  type AdminEvent,
  type EventStatus,
} from '@/src/lib/admin/events';

import {
  useAuth,
} from '@/src/context/AuthContext';

import {
  canCreateEvents,
} from '@/src/lib/admin/permissions';

const STATUS_OPTIONS: Array<
  EventStatus | 'ALL'
> = [
  'ALL',
  'DRAFT',
  'PUBLISHED',
  'CANCELLED',
];

export default function AdminEventsPage() {
  const { user } = useAuth();

  const [events, setEvents] =
    useState<AdminEvent[]>([]);

  const [status, setStatus] =
    useState<EventStatus | 'ALL'>(
      'ALL',
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [page, setPage] =
    useState(1);

  const [limit] =
    useState(10);

  async function loadEvents() {
    setLoading(true);
    setError('');

    try {
      const data =
        await getAdminEvents({
          page,
          limit,
          status:
            status === 'ALL'
              ? undefined
              : status,
        });

      setEvents(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to load events',
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, [page, status]);

  function handleStatusChange(
    value: EventStatus | 'ALL',
  ) {
    setStatus(value);
    setPage(1);
  }

  const canCreate =
    user
      ? canCreateEvents(user.role)
      : false;

  return (
    <div className="admin-events-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-page-eyebrow">
            EVENT MANAGEMENT
          </p>

          <h2>
            Events
          </h2>

          <p>
            Manage upcoming events,
            schedules, publishing,
            and cancellations.
          </p>
        </div>

        {canCreate && (
          <Link
            href="/admin/events/new"
            className="admin-page-primary-action"
          >
            Create Event
          </Link>
        )}
      </div>

      <div className="admin-events-toolbar">
        <div>
          <label
            htmlFor="event-status-filter"
          >
            Status
          </label>

          <select
            id="event-status-filter"
            value={status}
            onChange={(event) =>
              handleStatusChange(
                event.target
                  .value as
                  | EventStatus
                  | 'ALL',
              )
            }
          >
            {STATUS_OPTIONS.map(
              (option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option === 'ALL'
                    ? 'All Statuses'
                    : option}
                </option>
              ),
            )}
          </select>
        </div>
      </div>

      {loading && (
        <div className="admin-page-state">
          <p>
            Loading events...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="admin-page-state admin-page-state-error">
          <p>
            {error}
          </p>

          <button
            type="button"
            onClick={loadEvents}
          >
            Try Again
          </button>
        </div>
      )}

      {!loading &&
        !error &&
        events.length === 0 && (
          <div className="admin-page-state">
            <p>
              No events found.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        events.length > 0 && (
         <EventTable
            events={events}
            onActionComplete={loadEvents}
          />
      )}

      {!loading &&
        !error &&
        events.length > 0 && (
          <div className="admin-pagination">
            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage(
                  (current) =>
                    current - 1,
                )
              }
            >
              Previous
            </button>

            <span>
              Page {page}
            </span>

            <button
              type="button"
              disabled={
                events.length < limit
              }
              onClick={() =>
                setPage(
                  (current) =>
                    current + 1,
                )
              }
            >
              Next
            </button>
          </div>
        )}
    </div>
  );
}
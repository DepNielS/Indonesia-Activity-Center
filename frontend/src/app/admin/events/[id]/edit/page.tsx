'use client';

import {
  useEffect,
  useState,
} from 'react';

import { useParams, useRouter } from 'next/navigation';

import EventForm, {
  type EventFormData,
} from '@/src/components/admin/EventForm';

import {
  getAdminEventById,
  updateAdminEvent,
  type AdminEvent,
} from '@/src/lib/admin/events';

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();

  const [event, setEvent] =
    useState<AdminEvent | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    async function loadEvent() {
      const id = Number(params.id);

      if (
        Number.isNaN(id) ||
        id <= 0
      ) {
        setError(
          'Invalid event ID.',
        );
        setLoading(false);
        return;
      }

      try {
        const data =
          await getAdminEventById(id);

        setEvent(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to load event.',
        );
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [params.id]);

  async function handleSubmit(
    data: EventFormData,
  ) {
    if (!event) {
      throw new Error(
        'Event data is not available.',
      );
    }

    await updateAdminEvent(
      event.id,
      {
        title: data.title,
        slug: data.slug,
        description:
          data.description,
        image:
          data.image || undefined,
        startAt: data.startAt,
        endAt: data.endAt,
        location:
          data.location || undefined,
      },
    );

    router.push(
      '/admin/events',
    );
  }

  function handleCancel() {
    router.push(
      '/admin/events',
    );
  }

  if (loading) {
    return (
      <div className="admin-page-state">
        <p>
          Loading event...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page-state admin-page-state-error">
        <p>
          {error}
        </p>

        <button
          type="button"
          onClick={() =>
            router.push(
              '/admin/events',
            )
          }
        >
          Back to Events
        </button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="admin-page-state">
        <p>
          Event not found.
        </p>

        <button
          type="button"
          onClick={() =>
            router.push(
              '/admin/events',
            )
          }
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="admin-event-edit-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-page-eyebrow">
            EVENT MANAGEMENT
          </p>

          <h2>
            Edit Event
          </h2>

          <p>
            Update the event information
            and schedule.
          </p>
        </div>
      </div>

      <EventForm
        initialData={event}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
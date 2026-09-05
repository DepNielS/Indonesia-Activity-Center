'use client';

import {
  useEffect,
  useState,
  type FormEvent,
} from 'react';

import type {
  AdminEvent,
} from '@/src/lib/admin/events';

export interface EventFormData {
  title: string;
  slug: string;
  description: string;
  image: string;
  startAt: string;
  endAt: string;
  location: string;
}

interface EventFormProps {
  initialData?: AdminEvent;

  onSubmit: (
    data: EventFormData,
  ) => Promise<void>;

  onCancel: () => void;
}

export default function EventForm({
  initialData,
  onSubmit,
  onCancel,
}: EventFormProps) {
  const isEditMode =
    initialData !== undefined;

  const [title, setTitle] =
    useState('');

  const [slug, setSlug] =
    useState('');

  const [description, setDescription] =
    useState('');

  const [image, setImage] =
    useState('');

  const [startAt, setStartAt] =
    useState('');

  const [endAt, setEndAt] =
    useState('');

  const [location, setLocation] =
    useState('');

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState('');

  useEffect(() => {
    if (!initialData) {
      setTitle('');
      setSlug('');
      setDescription('');
      setImage('');
      setStartAt('');
      setEndAt('');
      setLocation('');
      setError('');

      return;
    }

    setTitle(initialData.title);
    setSlug(initialData.slug);
    setDescription(
      initialData.description,
    );
    setImage(
      initialData.image ?? '',
    );
    setStartAt(
      formatDateTimeLocal(
        initialData.startAt,
      ),
    );
    setEndAt(
      formatDateTimeLocal(
        initialData.endAt,
      ),
    );
    setLocation(
      initialData.location ?? '',
    );
    setError('');
  }, [initialData]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!title.trim()) {
      setError(
        'Event title is required.',
      );
      return;
    }

    if (!slug.trim()) {
      setError(
        'Event slug is required.',
      );
      return;
    }

    if (!description.trim()) {
      setError(
        'Event description is required.',
      );
      return;
    }

    if (!startAt) {
      setError(
        'Event start date and time is required.',
      );
      return;
    }

    if (!endAt) {
      setError(
        'Event end date and time is required.',
      );
      return;
    }

    const startDate =
      new Date(startAt);

    const endDate =
      new Date(endAt);

    if (
      Number.isNaN(
        startDate.getTime(),
      ) ||
      Number.isNaN(
        endDate.getTime(),
      )
    ) {
      setError(
        'Invalid event date or time.',
      );
      return;
    }

    if (
      endDate.getTime() <=
      startDate.getTime()
    ) {
      setError(
        'Event end time must be after start time.',
      );
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      await onSubmit({
        title: title.trim(),
        slug: slug.trim(),
        description:
          description.trim(),
        image: image.trim(),
        startAt:
          startDate.toISOString(),
        endAt:
          endDate.toISOString(),
        location:
          location.trim(),
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : isEditMode
            ? 'Failed to update event.'
            : 'Failed to create event.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="admin-event-form"
    >
      <div className="admin-form-field">
        <label htmlFor="event-title">
          Title
        </label>

        <input
          id="event-title"
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          maxLength={150}
          required
          disabled={submitting}
        />
      </div>

      <div className="admin-form-field">
        <label htmlFor="event-slug">
          Slug
        </label>

        <input
          id="event-slug"
          type="text"
          value={slug}
          onChange={(event) =>
            setSlug(event.target.value)
          }
          maxLength={180}
          required
          disabled={submitting}
        />

        <p className="admin-form-help">
          Example: yoga-wellness-retreat
        </p>
      </div>

      <div className="admin-form-field">
        <label htmlFor="event-description">
          Description
        </label>

        <textarea
          id="event-description"
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value,
            )
          }
          required
          disabled={submitting}
          rows={6}
        />
      </div>

      <div className="admin-form-field">
        <label htmlFor="event-image">
          Image URL
        </label>

        <input
          id="event-image"
          type="url"
          value={image}
          onChange={(event) =>
            setImage(event.target.value)
          }
          maxLength={500}
          disabled={submitting}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="admin-form-grid">
        <div className="admin-form-field">
          <label htmlFor="event-start">
            Start Date & Time
          </label>

          <input
            id="event-start"
            type="datetime-local"
            value={startAt}
            onChange={(event) =>
              setStartAt(
                event.target.value,
              )
            }
            required
            disabled={submitting}
          />
        </div>

        <div className="admin-form-field">
          <label htmlFor="event-end">
            End Date & Time
          </label>

          <input
            id="event-end"
            type="datetime-local"
            value={endAt}
            onChange={(event) =>
              setEndAt(
                event.target.value,
              )
            }
            required
            disabled={submitting}
          />
        </div>
      </div>

      <div className="admin-form-field">
        <label htmlFor="event-location">
          Location
        </label>

        <input
          id="event-location"
          type="text"
          value={location}
          onChange={(event) =>
            setLocation(
              event.target.value,
            )
          }
          maxLength={200}
          disabled={submitting}
          placeholder="Indonesia Activity Center"
        />
      </div>

      {error && (
        <div className="admin-form-error">
          {error}
        </div>
      )}

      <div className="admin-form-actions">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? 'Saving...'
            : isEditMode
              ? 'Update Event'
              : 'Create Event'}
        </button>
      </div>
    </form>
  );
}

function formatDateTimeLocal(
  value: string,
): string {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return '';
  }

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1,
    ).padStart(2, '0');

  const day =
    String(
      date.getDate(),
    ).padStart(2, '0');

  const hours =
    String(
      date.getHours(),
    ).padStart(2, '0');

  const minutes =
    String(
      date.getMinutes(),
    ).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
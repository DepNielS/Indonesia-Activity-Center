'use client';

import {
  useEffect,
  useState,
  type FormEvent,
} from 'react';

import type {
  ActivityCategory,
} from '@/src/lib/api/activities';

import type {
  AdminActivity,
} from '@/src/lib/admin/activities';

export interface ActivityFormData {
  name: string;
  slug: string;
  description: string;
  categoryId: number;
  image: string;
  location: string;
  duration: string;
}

interface ActivityFormProps {
  categories: ActivityCategory[];

  initialData?: AdminActivity;

  onSubmit: (
    data: ActivityFormData,
  ) => Promise<void>;

  onCancel: () => void;
}

export default function ActivityForm({
  categories,
  initialData,
  onSubmit,
  onCancel,
}: ActivityFormProps) {
  const isEditMode =
    initialData !== undefined;

  const [name, setName] =
    useState('');

  const [slug, setSlug] =
    useState('');

  const [description, setDescription] =
    useState('');

  const [categoryId, setCategoryId] =
    useState<number | ''>('');

  const [image, setImage] =
    useState('');

  const [location, setLocation] =
    useState('');

  const [duration, setDuration] =
    useState('');

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState('');

  useEffect(() => {
    if (!initialData) {
      setName('');
      setSlug('');
      setDescription('');
      setCategoryId('');
      setImage('');
      setLocation('');
      setDuration('');
      setError('');

      return;
    }

    setName(initialData.name);
    setSlug(initialData.slug);
    setDescription(
      initialData.description,
    );
    setCategoryId(
      initialData.categoryId,
    );
    setImage(
      initialData.image ?? '',
    );
    setLocation(
      initialData.location ?? '',
    );
    setDuration(
      initialData.duration ?? '',
    );
    setError('');
  }, [initialData]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (categoryId === '') {
      setError(
        'Please select a category.',
      );
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      await onSubmit({
        name,
        slug,
        description,
        categoryId,
        image,
        location,
        duration,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : isEditMode
            ? 'Failed to update activity'
            : 'Failed to create activity',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="activity-name">
          Name
        </label>

        <input
          id="activity-name"
          type="text"
          value={name}
          onChange={(event) =>
            setName(
              event.target.value,
            )
          }
          placeholder="Activity name"
          required
        />
      </div>

      <div>
        <label htmlFor="activity-slug">
          Slug
        </label>

        <input
          id="activity-slug"
          type="text"
          value={slug}
          onChange={(event) =>
            setSlug(
              event.target.value,
            )
          }
          placeholder="activity-slug"
          required
        />
      </div>

      <div>
        <label htmlFor="activity-category">
          Category
        </label>

        <select
          id="activity-category"
          value={categoryId}
          onChange={(event) =>
            setCategoryId(
              event.target.value === ''
                ? ''
                : Number(
                    event.target.value,
                  ),
            )
          }
          required
        >
          <option value="">
            Select category
          </option>

          {categories.map(
            (category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ),
          )}
        </select>
      </div>

      <div>
        <label htmlFor="activity-description">
          Description
        </label>

        <textarea
          id="activity-description"
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value,
            )
          }
          placeholder="Activity description"
          rows={6}
          required
        />
      </div>

      <div>
        <label htmlFor="activity-image">
          Image URL
        </label>

        <input
          id="activity-image"
          type="url"
          value={image}
          onChange={(event) =>
            setImage(
              event.target.value,
            )
          }
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label htmlFor="activity-location">
          Location
        </label>

        <input
          id="activity-location"
          type="text"
          value={location}
          onChange={(event) =>
            setLocation(
              event.target.value,
            )
          }
          placeholder="Activity location"
        />
      </div>

      <div>
        <label htmlFor="activity-duration">
          Duration
        </label>

        <input
          id="activity-duration"
          type="text"
          value={duration}
          onChange={(event) =>
            setDuration(
              event.target.value,
            )
          }
          placeholder="60 minutes"
        />
      </div>

      {error && (
        <p>
          {error}
        </p>
      )}

      <div>
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
            ? isEditMode
              ? 'Updating...'
              : 'Creating...'
            : isEditMode
              ? 'Update Activity'
              : 'Create Activity'}
        </button>
      </div>
    </form>
  );
}


'use client';

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

import {
  uploadImage,
} from '@/src/lib/api';

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

  const [imagePreview, setImagePreview] =
    useState('');

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [imageError, setImageError] =
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
      setImagePreview('');
      setLocation('');
      setDuration('');
      setError('');
      setImageError('');

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

    setImagePreview('');

    setLocation(
      initialData.location ?? '',
    );

    setDuration(
      initialData.duration ?? '',
    );

    setError('');
    setImageError('');
  }, [initialData]);

  async function handleImageChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageError('');
    setError('');

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (!allowedTypes.includes(file.type)) {
      setImageError(
        'Only JPEG, PNG, and WebP images are allowed.',
      );

      event.target.value = '';

      return;
    }

    const maxFileSize =
      5 * 1024 * 1024;

    if (file.size > maxFileSize) {
      setImageError(
        'Image size must not exceed 5 MB.',
      );

      event.target.value = '';

      return;
    }

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);

    setUploadingImage(true);

    try {
      const result =
        await uploadImage(file);

      setImage(
        result.publicUrl,
      );
    } catch (error) {
      setImage('');

      setImagePreview('');

      setImageError(
        error instanceof Error
          ? error.message
          : 'Failed to upload image.',
      );
    } finally {
      setUploadingImage(false);
    }
  }

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

    if (uploadingImage) {
      setError(
        'Please wait until the image upload is complete.',
      );

      return;
    }

    if (imageError) {
      setError(imageError);

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
          Activity Image
        </label>

        <input
          id="activity-image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          disabled={
            submitting ||
            uploadingImage
          }
        />

        <p>
          Accepted formats: JPG, PNG,
          WebP. Maximum size: 5 MB.
        </p>

        {uploadingImage && (
          <p>
            Uploading image...
          </p>
        )}

        {imageError && (
          <p>
            {imageError}
          </p>
        )}

        {imagePreview && (
          <div>
            <p>
              Image Preview
            </p>

            <img
              src={imagePreview}
              alt="Selected activity"
            />
          </div>
        )}

        {!imagePreview && image && (
          <div>
            <p>
              Current Image
            </p>

            <img
              src={image}
              alt="Current activity"
            />
          </div>
        )}
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
          disabled={
            submitting ||
            uploadingImage
          }
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            submitting ||
            uploadingImage
          }
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
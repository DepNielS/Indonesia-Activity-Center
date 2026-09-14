"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { uploadImage } from "@/src/lib/api";

import type {
  ActivityCategory,
} from "@/src/lib/api/activities";

import type {
  AdminActivity,
} from "@/src/lib/admin/activities";

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
    useState("");

  const [slug, setSlug] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [categoryId, setCategoryId] =
    useState<number | "">("");

  const [image, setImage] =
    useState("");

  const [imagePreview, setImagePreview] =
    useState("");

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [imageError, setImageError] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [duration, setDuration] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!initialData) {
      setName("");
      setSlug("");
      setDescription("");
      setCategoryId("");
      setImage("");
      setImagePreview("");
      setLocation("");
      setDuration("");
      setError("");
      setImageError("");

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
      initialData.image ?? "",
    );

    setImagePreview("");

    setLocation(
      initialData.location ?? "",
    );

    setDuration(
      initialData.duration ?? "",
    );

    setError("");
    setImageError("");
  }, [initialData]);

  async function handleImageChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageError("");
    setError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setImageError(
        "Only JPEG, PNG, and WebP images are allowed.",
      );

      event.target.value = "";

      return;
    }

    const maxFileSize =
      5 * 1024 * 1024;

    if (file.size > maxFileSize) {
      setImageError(
        "Image size must not exceed 5 MB.",
      );

      event.target.value = "";

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
      setImage("");

      setImagePreview("");

      setImageError(
        error instanceof Error
          ? error.message
          : "Failed to upload image.",
      );
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (categoryId === "") {
      setError(
        "Please select a category.",
      );

      return;
    }

    if (uploadingImage) {
      setError(
        "Please wait until the image upload is complete.",
      );

      return;
    }

    if (imageError) {
      setError(imageError);

      return;
    }

    setError("");
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
            ? "Failed to update activity"
            : "Failed to create activity",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col"
    >
      {/* FORM FIELDS */}

      <div className="space-y-7">

        {/* NAME */}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="activity-name"
            className="
              text-[13px]
              font-semibold
              text-[var(--color-text)]
            "
          >
            Activity Name
          </label>

          <input
            id="activity-name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="e.g. Morning Padel Session"
            required
            className="
              h-12
              w-full
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              px-4
              text-[15px]
              text-[var(--color-text)]
              outline-none
              transition-[border-color,box-shadow]
              duration-200
              placeholder:text-[var(--color-text-muted)]
              focus:border-[var(--color-primary)]
              focus:ring-1
              focus:ring-[var(--color-primary)]
            "
          />
        </div>

        {/* SLUG */}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="activity-slug"
            className="
              text-[13px]
              font-semibold
              text-[var(--color-text)]
            "
          >
            Slug
          </label>

          <input
            id="activity-slug"
            type="text"
            value={slug}
            onChange={(event) =>
              setSlug(event.target.value)
            }
            placeholder="morning-padel-session"
            required
            className="
              h-12
              w-full
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              px-4
              text-[15px]
              text-[var(--color-text)]
              outline-none
              transition-[border-color,box-shadow]
              duration-200
              placeholder:text-[var(--color-text-muted)]
              focus:border-[var(--color-primary)]
              focus:ring-1
              focus:ring-[var(--color-primary)]
            "
          />

          <p
            className="
              m-0
              text-[12px]
              leading-[1.5]
              text-[var(--color-text-muted)]
            "
          >
            Used as the URL identifier for
            this activity.
          </p>
        </div>

        {/* CATEGORY */}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="activity-category"
            className="
              text-[13px]
              font-semibold
              text-[var(--color-text)]
            "
          >
            Category
          </label>

          <select
            id="activity-category"
            value={categoryId}
            onChange={(event) =>
              setCategoryId(
                event.target.value === ""
                  ? ""
                  : Number(
                      event.target.value,
                    ),
              )
            }
            required
            className="
              h-12
              w-full
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              px-4
              text-[15px]
              text-[var(--color-text)]
              outline-none
              transition-[border-color,box-shadow]
              duration-200
              focus:border-[var(--color-primary)]
              focus:ring-1
              focus:ring-[var(--color-primary)]
            "
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

        {/* DESCRIPTION */}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="activity-description"
            className="
              text-[13px]
              font-semibold
              text-[var(--color-text)]
            "
          >
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
            placeholder="Describe the activity..."
            rows={6}
            required
            className="
              min-h-[150px]
              w-full
              resize-y
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              px-4
              py-3
              text-[15px]
              leading-[1.6]
              text-[var(--color-text)]
              outline-none
              transition-[border-color,box-shadow]
              duration-200
              placeholder:text-[var(--color-text-muted)]
              focus:border-[var(--color-primary)]
              focus:ring-1
              focus:ring-[var(--color-primary)]
            "
          />
        </div>

        {/* IMAGE */}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="activity-image"
            className="
              text-[13px]
              font-semibold
              text-[var(--color-text)]
            "
          >
            Activity Image
          </label>

          <div
            className="
              border
              border-dashed
              border-[var(--color-border)]
              bg-[var(--color-background)]
              p-5
            "
          >
            <input
              id="activity-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              disabled={
                submitting ||
                uploadingImage
              }
              className="
                block
                w-full
                cursor-pointer
                text-[13px]
                text-[var(--color-text-muted)]
                file:mr-4
                file:cursor-pointer
                file:border-0
                file:bg-[var(--color-primary)]
                file:px-4
                file:py-2
                file:text-[13px]
                file:font-semibold
                file:text-white
                hover:file:bg-[var(--color-primary-dark)]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            <p
              className="
                m-0
                mt-3
                text-[12px]
                leading-[1.5]
                text-[var(--color-text-muted)]
              "
            >
              JPG, PNG, or WebP. Maximum
              file size: 5 MB.
            </p>
          </div>

          {/* UPLOADING */}

          {uploadingImage && (
            <div
              className="
                border
                border-[var(--color-border)]
                bg-[var(--color-background)]
                px-4
                py-3
                text-[13px]
                text-[var(--color-text)]
              "
            >
              Uploading image...
            </div>
          )}

          {/* IMAGE ERROR */}

          {imageError && (
            <div
              className="
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-[13px]
                leading-[1.5]
                text-red-700
              "
            >
              {imageError}
            </div>
          )}

          {/* NEW IMAGE PREVIEW */}

          {imagePreview && (
            <div
              className="
                mt-2
                overflow-hidden
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
              "
            >
              <div
                className="
                  border-b
                  border-[var(--color-border)]
                  px-4
                  py-3
                "
              >
                <p
                  className="
                    m-0
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-[var(--color-text-muted)]
                  "
                >
                  Image Preview
                </p>
              </div>

              <div
                className="
                  aspect-[16/9]
                  w-full
                  overflow-hidden
                "
              >
                <img
                  src={imagePreview}
                  alt="Selected activity"
                  className="
                    block
                    h-full
                    w-full
                    object-cover
                  "
                />
              </div>
            </div>
          )}

          {/* CURRENT IMAGE */}

          {!imagePreview && image && (
            <div
              className="
                mt-2
                overflow-hidden
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
              "
            >
              <div
                className="
                  border-b
                  border-[var(--color-border)]
                  px-4
                  py-3
                "
              >
                <p
                  className="
                    m-0
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-[var(--color-text-muted)]
                  "
                >
                  Current Image
                </p>
              </div>

              <div
                className="
                  aspect-[16/9]
                  w-full
                  overflow-hidden
                "
              >
                <img
                  src={image}
                  alt="Current activity"
                  className="
                    block
                    h-full
                    w-full
                    object-cover
                  "
                />
              </div>
            </div>
          )}
        </div>

        {/* LOCATION + DURATION */}

        <div
          className="
            grid
            grid-cols-2
            gap-6
            max-[700px]:grid-cols-1
          "
        >

          {/* LOCATION */}

          <div className="flex flex-col gap-2">
            <label
              htmlFor="activity-location"
              className="
                text-[13px]
                font-semibold
                text-[var(--color-text)]
              "
            >
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
              placeholder="e.g. Padel Court"
              className="
                h-12
                w-full
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                px-4
                text-[15px]
                text-[var(--color-text)]
                outline-none
                transition-[border-color,box-shadow]
                duration-200
                placeholder:text-[var(--color-text-muted)]
                focus:border-[var(--color-primary)]
                focus:ring-1
                focus:ring-[var(--color-primary)]
              "
            />
          </div>

          {/* DURATION */}

          <div className="flex flex-col gap-2">
            <label
              htmlFor="activity-duration"
              className="
                text-[13px]
                font-semibold
                text-[var(--color-text)]
              "
            >
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
              placeholder="e.g. 60 minutes"
              className="
                h-12
                w-full
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                px-4
                text-[15px]
                text-[var(--color-text)]
                outline-none
                transition-[border-color,box-shadow]
                duration-200
                placeholder:text-[var(--color-text-muted)]
                focus:border-[var(--color-primary)]
                focus:ring-1
                focus:ring-[var(--color-primary)]
              "
            />
          </div>
        </div>
      </div>

      {/* FORM ERROR */}

      {error && (
        <div
          className="
            mt-8
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-[13px]
            leading-[1.5]
            text-red-700
          "
        >
          {error}
        </div>
      )}

      {/* ACTIONS */}

      <div
        className="
          mt-10
          flex
          items-center
          justify-end
          gap-3
          border-t
          border-[var(--color-border)]
          pt-7
          max-[600px]:flex-col-reverse
          max-[600px]:items-stretch
        "
      >
        <button
          type="button"
          onClick={onCancel}
          disabled={
            submitting ||
            uploadingImage
          }
          className="
            inline-flex
            min-h-12
            items-center
            justify-center
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            px-6
            text-[14px]
            font-semibold
            text-[var(--color-text)]
            transition-[background,border-color]
            duration-200
            hover:border-[var(--color-text-muted)]
            hover:bg-[var(--color-background)]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            submitting ||
            uploadingImage
          }
          className="
            inline-flex
            min-h-12
            items-center
            justify-center
            bg-[var(--color-primary)]
            px-7
            text-[14px]
            font-semibold
            text-white
            transition-[background,transform]
            duration-200
            hover:-translate-y-0.5
            hover:bg-[var(--color-primary-dark)]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {submitting
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
              ? "Update Activity"
              : "Create Activity"}
        </button>
      </div>
    </form>
  );
}
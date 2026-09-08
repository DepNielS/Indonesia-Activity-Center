"use client";

import { useEffect } from "react";

import type { GalleryItem } from "@/src/types/gallery";

interface GalleryLightboxProps {
  item: GalleryItem;
  currentIndex: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
}

export default function GalleryLightbox({
  item,
  currentIndex,
  totalItems,
  onPrevious,
  onNext,
  onClose,
}: GalleryLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [
    onClose,
    onPrevious,
    onNext,
  ]);

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (
      event.target === event.currentTarget
    ) {
      onClose();
    }
  };

  return (
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} gallery image`}
      onMouseDown={handleBackdropClick}
    >
      <button
        type="button"
        className="gallery-lightbox-close"
        onClick={onClose}
        aria-label="Close gallery"
      >
        ×
      </button>

      <div className="gallery-lightbox-content">

        <div className="gallery-lightbox-image-wrapper">

          <img
            src={item.image}
            alt={item.alt}
            className="gallery-lightbox-image"
          />

        </div>

        <div className="gallery-lightbox-information">

          <div>
            <span className="gallery-lightbox-category">
              {item.category}
            </span>

            <h2 className="gallery-lightbox-title">
              {item.title}
            </h2>
          </div>

          <span className="gallery-lightbox-counter">
            {String(currentIndex + 1).padStart(
              2,
              "0"
            )}
            {" / "}
            {String(totalItems).padStart(
              2,
              "0"
            )}
          </span>

        </div>

      </div>

      <button
        type="button"
        className="gallery-lightbox-navigation previous"
        onClick={onPrevious}
        aria-label="Previous image"
      >
        ←
      </button>

      <button
        type="button"
        className="gallery-lightbox-navigation next"
        onClick={onNext}
        aria-label="Next image"
      >
        →
      </button>
    </div>
  );
}
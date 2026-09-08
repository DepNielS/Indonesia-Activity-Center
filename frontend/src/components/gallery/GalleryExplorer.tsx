"use client";

import { useState } from "react";

import Container from "@/src/components/ui/Container";

import GalleryLightbox from "@/src/components/gallery/GalleryLightbox";

import { galleryItems } from "@/src/data/gallery";

import type { GalleryCategory } from "@/src/types/gallery";

const categories: GalleryCategory[] = [
  "ALL",
  "PADEL",
  "FOOD",
  "WELLNESS",
  "EVENTS",
];

export default function GalleryExplorer() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("ALL");

    const [selectedIndex, setSelectedIndex] =
  useState<number | null>(null);

  const filteredItems =
    activeCategory === "ALL"
      ? galleryItems
      : galleryItems.filter(
          (item) =>
            item.category === activeCategory
        );

const handlePrevious = () => {
  if (selectedIndex === null) {
    return;
  }

  setSelectedIndex(
    selectedIndex === 0
      ? filteredItems.length - 1
      : selectedIndex - 1
  );
};

const handleNext = () => {
  if (selectedIndex === null) {
    return;
  }

  setSelectedIndex(
    selectedIndex ===
      filteredItems.length - 1
      ? 0
      : selectedIndex + 1
  );
};

const handleClose = () => {
  setSelectedIndex(null);
};

  return (
    <section className="gallery-page-section">
      <Container>

        <div className="gallery-page-header">

          <span className="gallery-page-label">
            GALLERY
          </span>

          <h1 className="gallery-page-title">
            See IAC
            <br />
            Through Our Moments.
          </h1>

          <p className="gallery-page-description">
            Explore the spaces, experiences, and
            moments that make Indonesia Activity
            Center a unique destination.
          </p>

        </div>

        <div
          className="gallery-page-filter"
          role="group"
          aria-label="Gallery categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category
                  ? "gallery-page-filter-button active"
                  : "gallery-page-filter-button"
              }
              onClick={() =>
                setActiveCategory(category)
              }
              aria-pressed={
                activeCategory === category
              }
            >
              {category}
            </button>
          ))}
        </div>

        <div className="gallery-page-grid">

          {filteredItems.map(
            (item, index) => (
              <article
                key={item.id}
                className={
                  index === 0
                    ? "gallery-page-card featured"
                    : "gallery-page-card"
                }
                onClick={() =>
                  setSelectedIndex(index)
                }

                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    setSelectedIndex(index);
                  }
                }}
                role="button"
                tabIndex={0}
              >

                <div className="gallery-page-image-wrapper">

                  <img
                    src={item.image}
                    alt={item.alt}
                    className="gallery-page-image"
                  />

                  <span className="gallery-page-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span className="gallery-page-category">
                    {item.category}
                  </span>

                </div>

                <div className="gallery-page-card-content">

                  <h2>
                    {item.title}
                  </h2>

                  <span>
                    View moment ↗
                  </span>

                </div>

              </article>
            )
          )}

        </div>

      </Container>

            {selectedIndex !== null && (
        <GalleryLightbox
          item={filteredItems[selectedIndex]}
          currentIndex={selectedIndex}
          totalItems={filteredItems.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onClose={handleClose}
        />
            )}

    </section>
  );

  
}
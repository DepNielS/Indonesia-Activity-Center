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
    <section
      className="
        w-full
        bg-[var(--color-background)]
        py-[120px]
        max-[900px]:py-[90px]
        max-[600px]:py-[70px]
      "
    >
      <Container>

        {/* HEADER */}

        <div
          className="
            mb-[60px]
            max-w-[900px]
            max-[600px]:mb-10
          "
        >
          <span
            className="
              mb-5
              inline-block
              text-xs
              font-bold
              uppercase
              tracking-[2px]
              text-[var(--color-primary)]
            "
          >
            GALLERY
          </span>

          <h1
            className="
              m-0
              mb-7
              text-[clamp(48px,7vw,84px)]
              font-bold
              leading-none
              tracking-[-3px]
              text-[var(--color-text)]
              max-[600px]:text-[42px]
              max-[600px]:tracking-[-2px]
            "
          >
            See IAC
            <br />
            Through Our Moments.
          </h1>

          <p
            className="
              m-0
              max-w-[700px]
              text-[19px]
              leading-[1.7]
              text-[var(--color-text-muted)]
              max-[600px]:text-[17px]
            "
          >
            Explore the spaces, experiences, and
            moments that make Indonesia Activity
            Center a unique destination.
          </p>
        </div>

        {/* FILTER */}

        <div
          className="
            mb-[50px]
            flex
            flex-wrap
            gap-[10px]
            max-[600px]:mb-10
            max-[600px]:overflow-x-auto
            max-[600px]:flex-nowrap
            max-[600px]:pb-[5px]
          "
          role="group"
          aria-label="Gallery categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`
                min-h-[42px]
                shrink-0
                border
                border-[var(--color-border)]
                bg-transparent
                px-[18px]
                text-xs
                font-bold
                tracking-[1px]
                text-[var(--color-text-muted)]
                transition-[background,color,border-color]
                duration-200
                hover:border-[var(--color-primary)]
                hover:text-[var(--color-primary)]
                ${
                  activeCategory === category
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                    : ""
                }
              `}
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

        {/* GALLERY GRID */}

        <div
          className="
            grid
            grid-cols-4
            gap-5
            max-[900px]:grid-cols-2
            max-[600px]:grid-cols-1
            max-[600px]:gap-7
          "
        >
          {filteredItems.map(
            (item, index) => (
              <article
                key={item.id}
                className={`
                  min-w-0
                  cursor-pointer
                  ${
                    index === 0
                      ? "col-span-2"
                      : ""
                  }
                  max-[900px]:${
                    index === 0
                      ? "col-span-2"
                      : "col-span-1"
                  }
                  max-[600px]:col-span-1
                `}
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
                <div
                  className="
                    group
                    relative
                    aspect-[4/3]
                    overflow-hidden
                    bg-[var(--color-primary-dark)]
                  "
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="
                      block
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      ease-in-out
                      group-hover:scale-[1.04]
                    "
                  />

                  <span
                    className="
                      absolute
                      top-[18px]
                      left-[18px]
                      text-[11px]
                      font-bold
                      tracking-[1px]
                      text-white
                    "
                  >
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span
                    className="
                      absolute
                      right-[18px]
                      bottom-[18px]
                      text-[10px]
                      font-bold
                      tracking-[1.5px]
                      text-white
                    "
                  >
                    {item.category}
                  </span>
                </div>

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-5
                    pt-[18px]
                    max-[600px]:block
                  "
                >
                  <h2
                    className="
                      m-0
                      text-xl
                      font-semibold
                      leading-[1.2]
                      text-[var(--color-text)]
                      max-[600px]:mb-2
                    "
                  >
                    {item.title}
                  </h2>

                  <span
                    className="
                      shrink-0
                      text-xs
                      font-semibold
                      text-[var(--color-primary)]
                    "
                  >
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
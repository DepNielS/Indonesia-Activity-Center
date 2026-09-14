"use client";

import { useState } from "react";

import Container from "../../ui/Container";
import GalleryCard from "./GalleryCard";

import { galleryItems } from "@/src/data/gallery";

import type { GalleryCategory } from "@/src/types/gallery";

const categories: GalleryCategory[] = [
  "ALL",
  "PADEL",
  "FOOD",
  "WELLNESS",
  "EVENTS",
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("ALL");

  const filteredItems =
    activeCategory === "ALL"
      ? galleryItems
      : galleryItems.filter(
          (item) =>
            item.category === activeCategory
        );

  return (
    <section
      className="
        w-full
        bg-[var(--color-surface)]
        py-[120px]
        max-[900px]:py-[90px]
        max-[600px]:py-[70px]
      "
    >
      <Container>

        {/* HEADER */}

        <div
          className="
            mb-[50px]
            grid
            grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]
            items-end
            gap-20
            max-[900px]:grid-cols-1
            max-[900px]:gap-[30px]
            max-[600px]:mb-10
          "
        >
          <div>
            <span
              className="
                inline-block
                text-sm
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[var(--color-secondary)]
              "
            >
              OUR SPACE
            </span>

            <h2
              className="
                m-0
                text-[clamp(40px,5vw,62px)]
                font-bold
                leading-[1.05]
                tracking-[-2px]
                text-[var(--color-text)]
                max-[600px]:text-[40px]
                max-[600px]:tracking-[-1.5px]
              "
            >
              Experience IAC.
              <br />
              Before You Arrive.
            </h2>
          </div>

          <p
            className="
              m-0
              max-w-[500px]
              text-[17px]
              leading-[1.7]
              text-[var(--color-text-muted)]
              max-[600px]:text-base
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
            mb-[35px]
            flex
            flex-wrap
            gap-[10px]
            max-[600px]:overflow-x-auto
            max-[600px]:flex-nowrap
            max-[600px]:pb-[5px]
          "
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`
                min-h-10
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
            gap-4
            max-[900px]:grid-cols-2
            max-[600px]:grid-cols-1
            max-[600px]:gap-3
          "
        >
          {filteredItems.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
            />
          ))}
        </div>

      </Container>
    </section>
  );
}
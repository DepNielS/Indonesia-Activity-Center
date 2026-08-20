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
    <section className="gallery-section">

      <Container>

        {/* HEADER */}

        <div className="gallery-header">

          <div>

            <span className="section-label">
              OUR SPACE
            </span>

            <h2 className="gallery-title">
              Experience IAC.
              <br />
              Before You Arrive.
            </h2>

          </div>

          <p className="gallery-description">
            Explore the spaces, experiences, and
            moments that make Indonesia Activity
            Center a unique destination.
          </p>

        </div>


        {/* FILTER */}

        <div className="gallery-filter">

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category
                  ? "gallery-filter-button active"
                  : "gallery-filter-button"
              }
              onClick={() =>
                setActiveCategory(category)
              }
            >
              {category}
            </button>
          ))}

        </div>


        {/* GALLERY GRID */}

        <div className="gallery-grid">

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
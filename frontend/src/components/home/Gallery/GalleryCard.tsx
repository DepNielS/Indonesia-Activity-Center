import type { GalleryItem } from "@/src/types/gallery";

interface GalleryCardProps {
  item: GalleryItem;
}

export default function GalleryCard({
  item,
}: GalleryCardProps) {
  return (
    <article className="gallery-card">

      <div className="gallery-card-image">

        <span className="gallery-card-category">
          {item.category}
        </span>

      </div>

      <div className="gallery-card-overlay">

        <h3>
          {item.title}
        </h3>

      </div>

    </article>
  );
}
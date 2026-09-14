import type { GalleryItem } from "@/src/types/gallery";

interface GalleryCardProps {
  item: GalleryItem;
}

export default function GalleryCard({
  item,
}: GalleryCardProps) {
  return (
    <article
      className="
        group
        relative
        aspect-square
        min-w-0
        cursor-pointer
        overflow-hidden
        bg-[var(--color-primary-dark)]
        first:col-span-2
        first:row-span-2
        max-[900px]:first:col-span-2
        max-[900px]:first:row-span-1
        max-[600px]:aspect-[4/3]
        max-[600px]:first:col-span-1
        max-[600px]:first:row-span-1
      "
    >
      {/* IMAGE */}

      <div
        className="
          absolute
          inset-0
          overflow-hidden
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
      </div>

      {/* CATEGORY */}

      <div
        className="
          absolute
          inset-0
          flex
          items-end
          p-5
        "
      >
        <span
          className="
            text-[11px]
            font-bold
            tracking-[1.5px]
            text-white
          "
        >
          {item.category}
        </span>
      </div>

      {/* OVERLAY */}

      <div
        className="
          absolute
          right-0
          bottom-0
          left-0
          bg-gradient-to-t
          from-black/65
          to-transparent
          px-5
          pt-[30px]
          pb-5
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
          max-[600px]:opacity-100
        "
      >
        <h3
          className="
            m-0
            text-[18px]
            font-semibold
            leading-[1.2]
            text-white
          "
        >
          {item.title}
        </h3>
      </div>
    </article>
  );
}
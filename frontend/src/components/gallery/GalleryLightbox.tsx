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
      className="
        fixed
        inset-0
        z-[1000]
        flex
        items-center
        justify-center
        bg-black/[0.92]
        p-10
        max-[900px]:p-[30px]
        max-[600px]:p-5
      "
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} gallery image`}
      onMouseDown={handleBackdropClick}
    >
      {/* CLOSE */}

      <button
        type="button"
        className="
          absolute
          top-6
          right-7
          flex
          h-11
          w-11
          items-center
          justify-center
          border
          border-white/25
          bg-transparent
          text-[30px]
          font-light
          leading-none
          text-white
          transition-[background,border-color]
          duration-200
          hover:border-white/60
          hover:bg-white/10
          max-[600px]:top-[14px]
          max-[600px]:right-[14px]
          max-[600px]:h-10
          max-[600px]:w-10
          max-[600px]:text-[26px]
        "
        onClick={onClose}
        aria-label="Close gallery"
      >
        ×
      </button>

      {/* CONTENT */}

      <div
        className="
          w-[min(100%,1100px)]
        "
      >
        {/* IMAGE */}

        <div
          className="
            flex
            max-h-[75vh]
            w-full
            items-center
            justify-center
            max-[600px]:max-h-[65vh]
          "
        >
          <img
            src={item.image}
            alt={item.alt}
            className="
              block
              h-auto
              max-h-[75vh]
              max-w-full
              w-auto
              object-contain
              max-[600px]:max-h-[65vh]
            "
          />
        </div>

        {/* INFORMATION */}

        <div
          className="
            mt-6
            flex
            items-end
            justify-between
            gap-[30px]
            text-white
            max-[600px]:mt-[18px]
            max-[600px]:items-start
          "
        >
          <div>
            <span
              className="
                mb-2
                block
                text-[10px]
                font-bold
                tracking-[1.5px]
                text-white/[0.65]
              "
            >
              {item.category}
            </span>

            <h2
              className="
                m-0
                text-[26px]
                font-semibold
                leading-[1.2]
                text-white
                max-[600px]:text-[21px]
              "
            >
              {item.title}
            </h2>
          </div>

          <span
            className="
              shrink-0
              text-xs
              font-bold
              tracking-[1px]
              text-white/[0.65]
              max-[600px]:mt-[5px]
            "
          >
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

      {/* PREVIOUS */}

      <button
        type="button"
        className="
          absolute
          top-1/2
          left-7
          flex
          h-12
          w-12
          -translate-y-1/2
          items-center
          justify-center
          border
          border-white/25
          bg-transparent
          text-[22px]
          text-white
          transition-[background,border-color]
          duration-200
          hover:border-white/60
          hover:bg-white/10
          max-[900px]:left-[15px]
          max-[600px]:top-auto
          max-[600px]:bottom-5
          max-[600px]:left-5
          max-[600px]:h-[42px]
          max-[600px]:w-[42px]
          max-[600px]:translate-y-0
        "
        onClick={onPrevious}
        aria-label="Previous image"
      >
        ←
      </button>

      {/* NEXT */}

      <button
        type="button"
        className="
          absolute
          top-1/2
          right-7
          flex
          h-12
          w-12
          -translate-y-1/2
          items-center
          justify-center
          border
          border-white/25
          bg-transparent
          text-[22px]
          text-white
          transition-[background,border-color]
          duration-200
          hover:border-white/60
          hover:bg-white/10
          max-[900px]:right-[15px]
          max-[600px]:top-auto
          max-[600px]:right-5
          max-[600px]:bottom-5
          max-[600px]:h-[42px]
          max-[600px]:w-[42px]
          max-[600px]:translate-y-0
        "
        onClick={onNext}
        aria-label="Next image"
      >
        →
      </button>
    </div>
  );
}
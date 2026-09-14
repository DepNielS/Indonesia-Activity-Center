import Link from "next/link";

interface ActivityCardProps {
  title: string;
  description: string;
  href: string;
  number: string;
  image: string | null;
}

export default function ActivityCard({
  title,
  description,
  href,
  number,
  image,
}: ActivityCardProps) {
  return (
    <Link
      href={href}
      className="
        group
        relative
        flex
        min-h-[360px]
        flex-col
        justify-between
        overflow-hidden
        border-r
        border-b
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-7
        transition-[background,transform]
        duration-250
        hover:-translate-y-1
        max-[600px]:min-h-[300px]
        max-[600px]:p-6
      "
    >
      {/* BACKGROUND IMAGE */}

      {image && (
        <div
          className="
            absolute
            inset-0
            overflow-hidden
          "
        >
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        </div>
      )}

      {/* OVERLAY */}

      <div
        className="
          absolute
          inset-0
          bg-black/0
          transition-colors
          duration-300
          group-hover:bg-black/45
        "
      />

      {/* NUMBER */}

      <div
        className="
          relative
          z-10
          text-[13px]
          font-bold
          text-[var(--color-text-muted)]
          transition-colors
          duration-300
          group-hover:text-white
        "
      >
        {number}
      </div>

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-start
        "
      >
        <h3
          className="
            mb-[14px]
            text-[28px]
            font-bold
            text-[var(--color-text)]
            transition-colors
            duration-300
            group-hover:text-white
            max-[600px]:text-[26px]
          "
        >
          {title}
        </h3>

        <p
          className="
            mb-7
            text-[15px]
            leading-[1.6]
            text-[var(--color-text-muted)]
            transition-colors
            duration-300
            group-hover:text-white/85
          "
        >
          {description}
        </p>

        <span
          className="
            text-[14px]
            font-semibold
            text-[var(--color-primary)]
            transition-colors
            duration-300
            group-hover:text-white
          "
        >
          Discover →
        </span>
      </div>
    </Link>
  );
}
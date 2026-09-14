import Link from "next/link";

interface ActivityCardProps {
  title: string;
  description: string;
  href: string;
  number: string;
}

export default function ActivityCard({
  title,
  description,
  href,
  number,
}: ActivityCardProps) {
  return (
    <Link
      href={href}
      className="
        relative
        flex
        min-h-[360px]
        flex-col
        justify-between
        border-r
        border-b
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-7
        transition-[background,transform]
        duration-250
        hover:-translate-y-1
        hover:bg-[var(--color-background)]
        max-[600px]:min-h-[300px]
        max-[600px]:p-6
      "
    >
      <div className="text-[13px] font-bold text-[var(--color-text-muted)]">
        {number}
      </div>

      <div className="flex flex-col items-start">
        <h3
          className="
            mb-[14px]
            text-[28px]
            font-bold
            text-[var(--color-text)]
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
          "
        >
          {description}
        </p>

        <span
          className="
            text-[14px]
            font-semibold
            text-[var(--color-primary)]
          "
        >
          Discover →
        </span>
      </div>
    </Link>
  );
}
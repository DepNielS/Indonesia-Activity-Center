import Link from "next/link";

import type { PublicEvent } from "@/src/lib/api/events";

interface EventCardProps {
  event: PublicEvent;
}

export default function EventCard({
  event,
}: EventCardProps) {
  return (
    <article
      className="
        overflow-hidden
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        transition-[transform,box-shadow]
        duration-250
        hover:-translate-y-[5px]
        hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative
          flex
          w-full
          aspect-[16/10]
          items-end
          bg-gradient-to-br
          from-[var(--color-primary)]
          to-[var(--color-primary-dark)]
          p-5
        "
      >
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="block h-full w-full object-cover"
          />
        ) : (
          <span
            className="
              text-[12px]
              font-bold
              tracking-[1.5px]
              text-white
            "
          >
            EVENT
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-[26px] max-[600px]:p-[22px]">
        <div className="mb-[14px]">
          <span
            className="
              text-[13px]
              font-bold
              tracking-[1px]
              text-[var(--color-primary)]
            "
          >
            {formatEventDate(event.startAt)}
          </span>
        </div>

        <h3
          className="
            mb-[14px]
            text-[25px]
            font-bold
            leading-[1.2]
            text-[var(--color-text)]
            max-[600px]:text-[23px]
          "
        >
          {event.title}
        </h3>

        <p
          className="
            mb-5
            text-[14px]
            leading-[1.65]
            text-[var(--color-text-muted)]
          "
        >
          {event.description}
        </p>

        <div
          className="
            mb-6
            flex
            flex-col
            gap-[6px]
            text-[13px]
            text-[var(--color-text-muted)]
          "
        >
          <span>
            {formatEventTime(
              event.startAt,
              event.endAt,
            )}
          </span>

          <span>
            {event.location ?? "Location TBA"}
          </span>
        </div>

        <Link
          href={`/events/${event.slug}`}
          className="
            text-[14px]
            font-semibold
            text-[var(--color-primary)]
            transition-colors
            duration-200
            hover:text-[var(--color-primary-dark)]
          "
        >
          View Event →
        </Link>
      </div>
    </article>
  );
}

function formatEventDate(
  value: string,
): string {
  return new Date(
    value,
  ).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
    },
  ).toUpperCase();
}

function formatEventTime(
  startAt: string,
  endAt: string,
): string {
  const start =
    new Date(startAt);

  const end =
    new Date(endAt);

  const startTime =
    start.toLocaleTimeString(
      "en-GB",
      {
        hour: "2-digit",
        minute: "2-digit",
      },
    );

  const endTime =
    end.toLocaleTimeString(
      "en-GB",
      {
        hour: "2-digit",
        minute: "2-digit",
      },
    );

  return `${startTime} - ${endTime}`;
}
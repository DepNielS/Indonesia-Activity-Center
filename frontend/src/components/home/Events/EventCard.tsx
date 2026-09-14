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
        flex
        flex-col
        min-w-0
      "
    >
      {/* IMAGE */}

      <div
        className="
          w-full
          aspect-[4/3]
          overflow-hidden
          bg-[#f1f1f1]
        "
      >
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="
              block
              h-full
              w-full
              object-cover
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              text-[12px]
              font-semibold
              tracking-[0.12em]
              text-[var(--color-text-muted)]
            "
          >
            EVENT
          </div>
        )}
      </div>

      {/* CONTENT */}

      <div
        className="
          flex
          flex-col
          pt-4
        "
      >
        {/* DATE */}

        <div
          className="
            mb-1
            text-[13px]
            text-[var(--color-text-muted)]
          "
        >
          {formatEventDate(event.startAt)}
        </div>

        {/* TITLE */}

        <h3
          className="
            m-0
            text-[16px]
            font-medium
            leading-[1.4]
            text-[var(--color-text)]
          "
        >
          {event.title}
        </h3>

        {/* DESCRIPTION */}

        <p
          className="
            m-0
            mt-1
            text-[14px]
            leading-[1.6]
            text-[var(--color-text-muted)]
          "
        >
          {event.description}
        </p>

        {/* META */}

        <div
          className="
            mt-1
            flex
            flex-wrap
            gap-x-1
            text-[13px]
            leading-[1.5]
            text-[var(--color-text)]
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

        {/* LINK */}

        <Link
          href={`/events/${event.slug}`}
          className="
            mt-1
            inline-flex
            w-fit
            text-[14px]
            font-medium
            text-[var(--color-text)]
            transition-colors
            duration-200
            hover:text-[var(--color-primary)]
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
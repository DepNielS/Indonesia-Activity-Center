import Link from "next/link";

import type { PublicEvent } from "@/src/lib/api/events";

interface EventCardProps {
  event: PublicEvent;
}

export default function EventCard({
  event,
}: EventCardProps) {
  return (
    <article className="event-card">

      {/* IMAGE */}

      <div className="event-card-image">

        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
          />
        ) : (
          <span>
            EVENT
          </span>
        )}

      </div>


      {/* CONTENT */}

      <div className="event-card-content">

        <div className="event-card-date">

          <span className="event-card-date-day">
            {formatEventDate(event.startAt)}
          </span>

        </div>

        <h3 className="event-card-title">
          {event.title}
        </h3>

        <p className="event-card-description">
          {event.description}
        </p>


        <div className="event-card-meta">

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
          className="event-card-link"
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
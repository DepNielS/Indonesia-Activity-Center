import Link from "next/link";

import type { Event } from "@/src/types/event";

interface EventCardProps {
  event: Event;
}

export default function EventCard({
  event,
}: EventCardProps) {
  return (
    <article className="event-card">

      {/* IMAGE */}

      <div className="event-card-image">

        <span>
          {event.category}
        </span>

      </div>


      {/* CONTENT */}

      <div className="event-card-content">

        <div className="event-card-date">

          <span className="event-card-date-day">
            {event.date}
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
            {event.time}
          </span>

          <span>
            {event.location}
          </span>

        </div>


        <Link
          href={`/events/${event.id}`}
          className="event-card-link"
        >
          View Event →
        </Link>

      </div>

    </article>
  );
}
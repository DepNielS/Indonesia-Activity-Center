import Link from "next/link";

import Container from "../../ui/Container";
import EventCard from "./EventCard";

import {
  getPublishedEvents,
} from "@/src/lib/api/events";

export default async function Events() {
  const events =
    await getPublishedEvents();

  const featuredEvents =
    events.slice(0, 3);

  return (
    <section
      className="
        w-full
        bg-[var(--color-background)]
        py-[120px]
        max-[900px]:py-[90px]
        max-[600px]:py-[70px]
      "
    >
      <Container>
        {/* HEADER */}
        <div
          className="
            mb-[60px]
            grid
            grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]
            items-end
            gap-20
            max-[900px]:grid-cols-1
            max-[900px]:gap-[30px]
            max-[600px]:mb-10
          "
        >
          <div>
            <span
              className="
                mb-4
                inline-block
                text-[12px]
                font-bold
                tracking-[2px]
                text-[var(--color-primary)]
              "
            >
              UPCOMING EVENTS
            </span>

            <h2
              className="
                m-0
                text-[clamp(40px,5vw,62px)]
                font-bold
                leading-[1.05]
                tracking-[-2px]
                text-[var(--color-text)]
                max-[600px]:text-[40px]
                max-[600px]:tracking-[-1.5px]
              "
            >
              What's Happening
              <br />
              At IAC.
            </h2>
          </div>

          <p
            className="
              m-0
              max-w-[500px]
              text-[17px]
              leading-[1.7]
              text-[var(--color-text-muted)]
              max-[600px]:text-base
            "
          >
            Stay connected with the latest
            activities, gatherings, workshops,
            and experiences happening at
            Indonesia Activity Center.
          </p>
        </div>

        {/* EVENTS */}
        {featuredEvents.length > 0 ? (
          <div
            className="
              grid
              grid-cols-3
              gap-6
              max-[900px]:grid-cols-2
              max-[600px]:grid-cols-1
              max-[600px]:gap-5
            "
          >
            {featuredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
        ) : (
          <div>
            <p>
              No upcoming events available.
            </p>
          </div>
        )}

        {/* VIEW ALL */}
        <div
          className="
            mt-[50px]
            flex
            justify-center
          "
        >
          <Link
            href="/events"
            className="
              inline-flex
              min-h-12
              items-center
              justify-center
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              px-[26px]
              text-[14px]
              font-semibold
              text-[var(--color-text)]
              transition-[background,color,border-color]
              duration-200
              hover:border-[var(--color-primary)]
              hover:bg-[var(--color-primary)]
              hover:text-white
            "
          >
            View All Events →
          </Link>
        </div>
      </Container>
    </section>
  );
}
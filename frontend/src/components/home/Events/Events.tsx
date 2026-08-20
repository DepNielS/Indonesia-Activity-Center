import Link from "next/link";

import Container from "../../ui/Container";
import EventCard from "./EventCard";

import { events } from "@/src/data/events";

export default function Events() {
  const featuredEvents = events.slice(0, 3);

  return (
    <section className="events-section">

      <Container>

        {/* HEADER */}

        <div className="events-header">

          <div>

            <span className="section-label">
              UPCOMING EVENTS
            </span>

            <h2 className="events-title">
              What's Happening
              <br />
              At IAC.
            </h2>

          </div>

          <p className="events-description">
            Stay connected with the latest activities,
            gatherings, workshops, and experiences
            happening at Indonesia Activity Center.
          </p>

        </div>


        {/* EVENTS */}

        <div className="events-grid">

          {featuredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}

        </div>


        {/* VIEW ALL */}

        <div className="events-footer">

          <Link
            href="/events"
            className="events-button"
          >
            View All Events →
          </Link>

        </div>

      </Container>

    </section>
  );
}
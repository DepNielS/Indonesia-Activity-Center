import Container from '@/src/components/ui/Container';
import EventCard from '@/src/components/home/Events/EventCard';

import {
  getPublishedEvents,
} from '@/src/lib/api/events';

export default async function EventsPage() {
  const events =
    await getPublishedEvents();

  return (
    <section
      id="events"
      className="events-section"
    >
      <Container>

        {/* HEADER */}

        <div className="events-header">

          <div>

            <span className="section-label">
              UPCOMING EVENTS
            </span>

            <h1 className="events-title">
              What's Happening
              <br />
              At IAC.
            </h1>

          </div>

          <p className="events-description">
            Stay connected with the latest
            activities, gatherings, workshops,
            and experiences happening at
            Indonesia Activity Center.
          </p>

        </div>


        {/* EVENTS */}

        {events.length > 0 ? (
          <div className="events-grid">

            {events.map(
              (event) => (
                <EventCard
                  key={event.id}
                  event={event}
                />
              ),
            )}

          </div>
        ) : (
          <div className="events-empty">
            <p>
              No upcoming events available.
            </p>
          </div>
        )}

      </Container>
    </section>
  );
}
import {notFound} from 'next/navigation';

import Container from '@/src/components/ui/Container';

import {
  getPublishedEventBySlug,
} from '@/src/lib/api/events';


interface EventDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;

  let event;

    try {
    event =
        await getPublishedEventBySlug(slug);
    } catch {
    notFound();
    }

  return (
    <section
      id="event-detail"
      className="events-section"
    >
      <Container>

        {/* EVENT IMAGE */}

        <div className="event-detail-image">

          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
            />
          ) : (
            <div className="event-detail-image-placeholder">
              EVENT
            </div>
          )}

        </div>


        {/* EVENT CONTENT */}

        <div className="event-detail-content">

          <span className="section-label">
            EVENT
          </span>

          <h1 className="events-title">
            {event.title}
          </h1>

          <p className="event-detail-description">
            {event.description}
          </p>


          {/* EVENT INFORMATION */}

          <div className="event-detail-meta">

            <div>
              <span>
                DATE
              </span>

              <p>
                {formatEventDate(
                  event.startAt,
                  event.endAt,
                )}
              </p>
            </div>


            <div>
              <span>
                TIME
              </span>

              <p>
                {formatEventTime(
                  event.startAt,
                  event.endAt,
                )}
              </p>
            </div>


            <div>
              <span>
                LOCATION
              </span>

              <p>
                {event.location ??
                  'Location TBA'}
              </p>
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}


function formatEventDate(
  startAt: string,
  endAt: string,
): string {
  const start =
    new Date(startAt);

  const end =
    new Date(endAt);

  const startDate =
    start.toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      },
    );

  const endDate =
    end.toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      },
    );

  if (startDate === endDate) {
    return startDate.toUpperCase();
  }

  return `${startDate} - ${endDate}`.toUpperCase();
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
      'en-GB',
      {
        hour: '2-digit',
        minute: '2-digit',
      },
    );

  const endTime =
    end.toLocaleTimeString(
      'en-GB',
      {
        hour: '2-digit',
        minute: '2-digit',
      },
    );

  return `${startTime} - ${endTime}`;
}
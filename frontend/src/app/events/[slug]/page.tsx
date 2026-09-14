import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import Container from '@/src/components/ui/Container';

import {
  getPublishedEventBySlug,
} from '@/src/lib/api/events';


interface EventDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}


export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const event =
      await getPublishedEventBySlug(slug);

    return {
      title: `${event.title} | Indonesia Activity Center`,
      description: event.description,
    };
  } catch {
    return {
      title: 'Event Not Found | Indonesia Activity Center',
      description:
        'The requested event could not be found.',
    };
  }
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
      className="
        w-full
        py-[120px]
        max-[768px]:py-20
      "
    >
      <Container>

        {/* EVENT IMAGE */}

        <div
          className="
            mb-16
            w-full
            overflow-hidden
            max-[768px]:mb-10
          "
        >
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="
                block
                h-auto
                w-full
                object-cover
              "
            />
          ) : (
            <div
              className="
                flex
                min-h-[480px]
                items-center
                justify-center
                bg-[#f1f1f1]
                text-[14px]
                tracking-[0.12em]
                max-[768px]:min-h-[280px]
              "
            >
              EVENT
            </div>
          )}
        </div>


        {/* EVENT CONTENT */}

        <div
          className="
            max-w-[900px]
          "
        >

          <span
            className="
              inline-block
              text-sm
              font-semibold
              uppercase
              tracking-[0.12em]
              text-[var(--color-secondary)]
            "
          >
            EVENT
          </span>


          <h1
            className="
              mt-4
              text-[clamp(42px,6vw,76px)]
              font-medium
              leading-[0.95]
              text-[var(--color-text)]
              max-[768px]:text-[clamp(38px,11vw,56px)]
            "
          >
            {event.title}
          </h1>


          <p
            className="
              mt-8
              max-w-[720px]
              text-[18px]
              leading-[1.7]
              text-[var(--color-text)]
              max-[768px]:text-base
            "
          >
            {event.description}
          </p>


          {/* EVENT META */}

          <div
            className="
              mt-14
              grid
              grid-cols-3
              gap-8
              border-t
              border-[var(--color-border)]
              pt-8
              max-[768px]:mt-10
              max-[768px]:grid-cols-1
              max-[768px]:gap-6
            "
          >

            {/* DATE */}

            <div
              className="
                flex
                flex-col
                gap-[10px]
              "
            >
              <span
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.14em]
                  text-[var(--color-text)]
                  opacity-60
                "
              >
                DATE
              </span>

              <p
                className="
                  m-0
                  text-base
                  leading-[1.5]
                  text-[var(--color-text)]
                "
              >
                {formatEventDate(
                  event.startAt,
                  event.endAt,
                )}
              </p>
            </div>


            {/* TIME */}

            <div
              className="
                flex
                flex-col
                gap-[10px]
              "
            >
              <span
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.14em]
                  text-[var(--color-text)]
                  opacity-60
                "
              >
                TIME
              </span>

              <p
                className="
                  m-0
                  text-base
                  leading-[1.5]
                  text-[var(--color-text)]
                "
              >
                {formatEventTime(
                  event.startAt,
                  event.endAt,
                )}
              </p>
            </div>


            {/* LOCATION */}

            <div
              className="
                flex
                flex-col
                gap-[10px]
              "
            >
              <span
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.14em]
                  text-[var(--color-text)]
                  opacity-60
                "
              >
                LOCATION
              </span>

              <p
                className="
                  m-0
                  text-base
                  leading-[1.5]
                  text-[var(--color-text)]
                "
              >
                {event.location ?? 'Location TBA'}
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
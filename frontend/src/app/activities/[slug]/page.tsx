import { notFound } from "next/navigation";

import Container from "@/src/components/ui/Container";

import { getPublishedActivityBySlug } from "@/src/lib/api/activities";

interface ActivityDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ActivityDetailPage({
  params,
}: ActivityDetailPageProps) {
  const { slug } = await params;

  try {
    const activity =
      await getPublishedActivityBySlug(slug);

    return (
      <main>
        <section className="activity-detail-section">
          <Container>
            <div className="activity-detail">

              <span className="section-label">
                ACTIVITY
              </span>

              <h1 className="activity-detail-title">
                {activity.name}
              </h1>

              <p className="activity-detail-description">
                {activity.description}
              </p>

              <div className="activity-detail-info">

                {activity.location && (
                  <div>
                    <strong>Location</strong>
                    <p>{activity.location}</p>
                  </div>
                )}

                {activity.duration && (
                  <div>
                    <strong>Duration</strong>
                    <p>{activity.duration}</p>
                  </div>
                )}

              </div>

              {activity.image && (
                <div className="activity-detail-image">
                  <img
                    src={activity.image}
                    alt={activity.name}
                  />
                </div>
              )}

            </div>
          </Container>
        </section>
      </main>
    );
  } catch {
    notFound();
  }
}
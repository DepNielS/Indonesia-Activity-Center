import Link from "next/link";

import Container from "@/src/components/ui/Container";

import {
  getPublishedActivities,
  getPublishedActivityBySlug,
} from "@/src/lib/api/activities";

interface ActivityDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ActivityDetailPage({
  params,
}: ActivityDetailPageProps) {
  const { slug } = await params;

  const [activity, activities] =
    await Promise.all([
      getPublishedActivityBySlug(slug),
      getPublishedActivities(),
    ]);

  const relatedActivities =
    activities
      .filter(
        (item) =>
          item.id !== activity.id &&
          item.category.id ===
            activity.category.id,
      )
      .slice(0, 3);

  return (
    <main>
      <section className="activity-detail-hero">
        <Container>
          <div className="activity-detail-hero-content">

            {/* Back Navigation */}
            <Link
              href="/activities"
              className="activity-detail-back"
            >
              <span className="activity-detail-back-arrow">
                ←
              </span>

              <span>
                All Activities
              </span>
            </Link>
            <p></p>
            {/* Category */}
            <span className="activity-detail-category">
              {activity.category.name}
            </span>

            {/* Title */}
            <h1 className="activity-detail-title">
              {activity.name}
            </h1>

            {/* Hero Image */}
            <div className="activity-detail-visual">
              {activity.image ? (
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="activity-detail-image"
                />
              ) : (
                <div className="activity-detail-image-placeholder">
                  <span>
                    {activity.category.name}
                  </span>
                </div>
              )}

              <div className="activity-detail-image-overlay">
                <span>
                  Explore Experience
                </span>

                <span className="activity-detail-image-arrow">
                  ↗
                </span>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ========================================
          EXPERIENCE INFORMATION
      ======================================== */}

      <section className="activity-detail-information">
        <Container>
          <div className="activity-detail-information-grid">

            <div className="activity-detail-information-heading">
              <span className="section-label">
                THE EXPERIENCE
              </span>

              <h2>
                About this
                experience.
              </h2>
            </div>

            <div className="activity-detail-information-content">

              <p className="activity-detail-description">
                {activity.description}
              </p>

              <div className="activity-detail-meta">

                {activity.location && (
                  <div className="activity-detail-meta-item">
                    <span className="activity-detail-meta-label">
                      LOCATION
                    </span>

                    <span className="activity-detail-meta-value">
                      {activity.location}
                    </span>
                  </div>
                )}

                {activity.duration && (
                  <div className="activity-detail-meta-item">
                    <span className="activity-detail-meta-label">
                      DURATION
                    </span>

                    <span className="activity-detail-meta-value">
                      {activity.duration}
                    </span>
                  </div>
                )}

              </div>

            </div>

          </div>
        </Container>
      </section>

      {/* ========================================
          RELATED ACTIVITIES
      ======================================== */}

      {relatedActivities.length > 0 && (
        <section className="activity-detail-related">
          <Container>

            <div className="activity-detail-related-header">
              <div>
                <span className="section-label">
                  KEEP EXPLORING
                </span>

                <h2>
                  More experiences.
                </h2>
              </div>

              <Link
                href="/activities"
                className="activity-detail-related-link"
              >
                Explore all
                <span>↗</span>
              </Link>
            </div>

            <div className="activity-detail-related-grid">

              {relatedActivities.map(
                (relatedActivity, index) => (
                  <Link
                    key={relatedActivity.id}
                    href={`/activities/${relatedActivity.slug}`}
                    className="activity-detail-related-card"
                  >
                    <div className="activity-detail-related-image-wrapper">

                      {relatedActivity.image ? (
                        <img
                          src={
                            relatedActivity.image
                          }
                          alt={
                            relatedActivity.name
                          }
                          className="activity-detail-related-image"
                        />
                      ) : (
                        <div className="activity-detail-related-placeholder">
                          <span>
                            {
                              relatedActivity
                                .category.name
                            }
                          </span>
                        </div>
                      )}

                      <span className="activity-detail-related-number">
                        {String(
                          index + 1,
                        ).padStart(2, "0")}
                      </span>

                      <span className="activity-detail-related-arrow">
                        ↗
                      </span>

                    </div>

                    <div className="activity-detail-related-content">

                      <span className="activity-detail-related-category">
                        {
                          relatedActivity
                            .category.name
                        }
                      </span>

                      <h3>
                        {
                          relatedActivity.name
                        }
                      </h3>

                      <span className="activity-detail-related-discover">
                        Discover experience →
                      </span>

                    </div>
                  </Link>
                ),
              )}

            </div>

          </Container>
        </section>
      )}
    </main>
  );
}
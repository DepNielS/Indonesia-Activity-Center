import Container from "@/src/components/ui/Container";
import ActivityCard from "@/src/components/home/Activity/ActivityCard";

import {
  getActivityCategories,
  getPublishedActivities,
  getPublishedActivitiesByCategory,
} from "@/src/lib/api/activities";

interface ActivitiesPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function ActivitiesPage({
  searchParams,
}: ActivitiesPageProps) {
  const params = await searchParams;
  const categorySlug = params.category;

  const [categories, activities] =
    await Promise.all([
      getActivityCategories(),
      categorySlug
        ? getPublishedActivitiesByCategory(
            categorySlug,
          )
        : getPublishedActivities(),
    ]);

  return (
    <main>
      <section className="activities-page-section">
        <Container>
          <div className="activities-page-header">
            <span className="section-label">
              ACTIVITIES
            </span>

            <h1 className="activities-title">
              Explore Our Experiences.
            </h1>

            <p className="activities-description">
              Discover the experiences available
              at Indonesia Activity Center, from
              active sessions to local food and
              wellness experiences.
            </p>
          </div>

          <nav
            className="activities-category-nav"
            aria-label="Activity categories"
          >
            <a
              href="/activities"
              className={
                !categorySlug
                  ? "active"
                  : ""
              }
            >
              All
            </a>

            {categories
            .filter(
              (category) => category.slug !== "events",
            )
            .map((category) => (
              <a
                key={category.id}
                href={`/activities?category=${category.slug}`}
                className={
                  categorySlug === category.slug
                    ? "active"
                    : ""
                }
              >
                {category.name}
              </a>
            ))}
          </nav>

          <div className="activities-grid">
            {activities.map(
              (activity, index) => (
                <ActivityCard
                  key={activity.id}
                  number={String(
                    index + 1,
                  ).padStart(2, "0")}
                  title={activity.name}
                  description={
                    activity.description
                  }
                  href={`/activities/${activity.slug}`}
                />
              ),
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
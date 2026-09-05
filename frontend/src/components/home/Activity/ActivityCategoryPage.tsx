import Container from "../../ui/Container";
import ActivityCard from "./ActivityCard";

import {
  getPublishedActivitiesByCategory,
  getActivityCategoryBySlug,
} from "@/src/lib/api/activities";

interface ActivityCategoryPageProps {
  categorySlug: string;
}

export default async function ActivityCategoryPage({
  categorySlug,
}: ActivityCategoryPageProps) {
  const [category, activities] = await Promise.all([
    getActivityCategoryBySlug(categorySlug),
    getPublishedActivitiesByCategory(categorySlug),
  ]);

  return (
    <section
      id="activities"
      className="activities-section"
    >
      <Container>
        <div className="activities-header">
          <div>
            <span className="section-label">
              {category.name}
            </span>

            <h2 className="activities-title">
              {category.name}
            </h2>
          </div>

          <p className="activities-description">
            Explore our{" "}
            {category.name.toLowerCase()} experiences
            at Indonesia Activity Center.
          </p>
        </div>

        <div className="activities-grid">
          {activities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              number={String(index + 1).padStart(2, "0")}
              title={activity.name}
              description={activity.description}
              href={`/activities/${activity.slug}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
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

  const [categories, activities] = await Promise.all([
    getActivityCategories(),
    categorySlug
      ? getPublishedActivitiesByCategory(categorySlug)
      : getPublishedActivities(),
  ]);

  return (
    <main>
      <section
        className="
          w-full
          bg-[var(--color-surface)]
          py-[120px]
          max-[1000px]:py-[100px]
          max-[600px]:py-[70px]
        "
      >
        <Container>
          {/* PAGE HEADER */}
          <div
            className="
              mb-[60px]
              max-w-[900px]
              max-[1000px]:mb-[50px]
              max-[1000px]:max-w-[800px]
              max-[600px]:mb-10
            "
          >
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
              ACTIVITIES
            </span>

            <h1
              className="
                mb-6
                m-0
                text-[clamp(40px,5vw,64px)]
                font-bold
                leading-[1.05]
                tracking-[-2px]
                text-[var(--color-text)]
                max-[600px]:text-[40px]
                max-[600px]:tracking-[-1.5px]
              "
            >
              Explore Our Experiences.
            </h1>

            <p
              className="
                m-0
                max-w-[700px]
                text-[17px]
                leading-[1.7]
                text-[var(--color-text-muted)]
                max-[600px]:text-base
              "
            >
              Discover the experiences available
              at Indonesia Activity Center, from
              active sessions to local food and
              wellness experiences.
            </p>
          </div>

          {/* CATEGORY NAVIGATION */}
          <nav
            className="
              mb-[60px]
              flex
              items-center
              gap-3
              overflow-x-auto
              border-b
              border-[var(--color-border)]
              pb-5
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              max-[1000px]:mb-[50px]
              max-[600px]:mb-10
              max-[600px]:gap-2
              max-[600px]:pb-4
            "
            aria-label="Activity categories"
          >
            <a
              href="/activities"
              className={`
                inline-flex
                shrink-0
                items-center
                justify-center
                border
                px-[18px]
                py-[10px]
                text-[13px]
                font-semibold
                no-underline
                transition-[background,color,border-color]
                duration-250
                max-[600px]:px-[15px]
                max-[600px]:py-[9px]
                max-[600px]:text-[12px]
                ${
                  !categorySlug
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-background)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text)]"
                }
              `}
            >
              All
            </a>

            {categories
              .filter(
                (category) =>
                  category.slug !== "events",
              )
              .map((category) => (
                <a
                  key={category.id}
                  href={`/activities?category=${category.slug}`}
                  className={`
                    inline-flex
                    shrink-0
                    items-center
                    justify-center
                    border
                    px-[18px]
                    py-[10px]
                    text-[13px]
                    font-semibold
                    no-underline
                    transition-[background,color,border-color]
                    duration-250
                    max-[600px]:px-[15px]
                    max-[600px]:py-[9px]
                    max-[600px]:text-[12px]
                    ${
                      categorySlug === category.slug
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-background)]"
                        : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text)]"
                    }
                  `}
                >
                  {category.name}
                </a>
              ))}
          </nav>

          {/* ACTIVITY GRID */}
          <div
            className="
              grid
              grid-cols-4
              border-l
              border-t
              border-[var(--color-border)]
              max-[1000px]:grid-cols-2
              max-[600px]:grid-cols-1
            "
          >
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
    </main>
  );
}
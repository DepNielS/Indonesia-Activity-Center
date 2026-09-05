import Container from "../../ui/Container";
import ActivityCard from "./ActivityCard";

import { getPublishedActivities } from "@/src/lib/api/activities";

export default async function Activities() {
  const activities =
    await getPublishedActivities();

  return (
    <section
      id="activities"
      className="activities-section"
    >
      <Container>

        {/* SECTION HEADER */}

        <div className="activities-header">

          <div>

            <span className="section-label">
              WHAT WE OFFER
            </span>

            <h2 className="activities-title">
              One Place.
              <br />
              Many Experiences.
            </h2>

          </div>

          <p className="activities-description">
            From active mornings on the padel court
            to relaxing wellness treatments and
            memorable local dining experiences,
            Indonesia Activity Center brings
            everything together in one destination.
          </p>

        </div>


        {/* ACTIVITY GRID */}

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
import Container from "../../ui/Container";
import ActivityCard from "./ActivityCard";

import { getPublishedActivities } from "@/src/lib/api/activities";

export default async function Activities() {
  
  const activities = await getPublishedActivities();

  return (
    <section
      id="activities"
      className="
        w-full
        bg-[var(--color-surface)]
        py-[100px]
        max-[600px]:py-[70px]
      "
    >
      <Container>
        {/* SECTION HEADER */}
        <div
          className="
            mb-[60px]
            grid
            grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]
            items-end
            gap-20
            max-[1000px]:grid-cols-1
            max-[1000px]:gap-[30px]
            max-[600px]:mb-10
          "
        >
          <div>
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
              WHAT WE OFFER
            </span>

            <h2
              className="
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
              One Place.
              <br />
              Many Experiences.
            </h2>
          </div>

          <p
            className="
              m-0
              max-w-[500px]
              text-[17px]
              leading-[1.7]
              text-[var(--color-text-muted)]
              max-[600px]:text-base
            "
          >
            From active mornings on the padel court
            to relaxing wellness treatments and
            memorable local dining experiences,
            Indonesia Activity Center brings
            everything together in one destination.
          </p>
        </div>

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
          {activities.map((activity, index) => {

  return (
    <ActivityCard
      key={activity.id}
      number={String(index + 1).padStart(2, "0")}
      title={activity.name}
      description={activity.description}
      href={`/activities/${activity.slug}`}
      image={activity.image}
    />
  );
})}
        </div>
      </Container>
    </section>
  );
}
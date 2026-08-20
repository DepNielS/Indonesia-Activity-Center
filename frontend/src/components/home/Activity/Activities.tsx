import Container from "../../ui/Container";
import ActivityCard from "./ActivityCard";

const activities = [
  {
    number: "01",
    title: "Padel",
    description:
      "Play, train, and connect on our padel courts in a vibrant social environment.",
    href: "/padel",
  },
  {
    number: "02",
    title: "Local Food",
    description:
      "Discover local flavors and enjoy carefully selected food in a relaxed atmosphere.",
    href: "/food",
  },
  {
    number: "03",
    title: "Wellness",
    description:
      "Relax and restore your body with Ayurvedic treatments and wellness experiences.",
    href: "/wellness",
  },
  {
    number: "04",
    title: "Events",
    description:
      "Join activities, community gatherings, workshops, and special events.",
    href: "/events",
  },
];

export default function Activities() {
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

          {activities.map((activity) => (
            <ActivityCard
              key={activity.number}
              number={activity.number}
              title={activity.title}
              description={activity.description}
              href={activity.href}
            />
          ))}

        </div>

      </Container>
    </section>
  );
}
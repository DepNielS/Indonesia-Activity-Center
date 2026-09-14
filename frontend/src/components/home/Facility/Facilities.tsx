import Container from "../../ui/Container";
import FacilityCard from "./FacilityCard";

const facilities = [
  {
    number: "01",
    title: "Padel Courts",
    description:
      "Modern padel courts designed for casual games, training sessions, and social activities.",
    features: [
      "Professional padel courts",
      "Equipment rental",
      "Training sessions",
    ],
  },
  {
    number: "02",
    title: "Local Food",
    description:
      "A relaxed dining experience featuring local flavors and carefully selected food.",
    features: [
      "Local cuisine",
      "Relaxed dining area",
      "Food & beverage service",
    ],
  },
  {
    number: "03",
    title: "Wellness",
    description:
      "A peaceful space for relaxation, wellness, and Ayurvedic treatments.",
    features: [
      "Ayurvedic treatments",
      "Relaxation area",
      "Wellness experiences",
    ],
  },
  {
    number: "04",
    title: "Event Space",
    description:
      "Flexible spaces for community gatherings, workshops, private events, and activities.",
    features: [
      "Community events",
      "Private gatherings",
      "Workshops & activities",
    ],
  },
];

export default function Facilities() {
  return (
    <section
      className="
        w-full
        bg-[var(--color-background)]
        py-[120px]
        max-[900px]:py-[90px]
        max-[600px]:py-[70px]
      "
    >
      <Container>
        {/* HEADER */}

        <div
          className="
            mb-[60px]
            grid
            grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]
            items-end
            gap-20
            max-[900px]:grid-cols-1
            max-[900px]:gap-[30px]
            max-[600px]:mb-10
          "
        >
          <div>
            <span
              className="
                mb-5
                inline-block
                text-sm
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[var(--color-secondary)]
              "
            >
              OUR FACILITIES
            </span>

            <h2
              className="
                m-0
                text-[clamp(40px,5vw,62px)]
                font-bold
                leading-[1.05]
                tracking-[-2px]
                text-[var(--color-text)]
                max-[600px]:text-[40px]
                max-[600px]:tracking-[-1.5px]
              "
            >
              Everything You Need.
              <br />
              All In One Place.
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
            Designed to make your visit comfortable,
            enjoyable, and memorable. Explore the
            facilities available at Indonesia Activity
            Center.
          </p>
        </div>

        {/* FACILITY GRID */}

        <div
          className="
            grid
            grid-cols-2
            border-l
            border-t
            border-[var(--color-border)]
            max-[600px]:grid-cols-1
          "
        >
          {facilities.map((facility) => (
            <FacilityCard
              key={facility.number}
              number={facility.number}
              title={facility.title}
              description={facility.description}
              features={facility.features}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
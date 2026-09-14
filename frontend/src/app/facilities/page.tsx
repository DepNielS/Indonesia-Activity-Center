import Container from "@/src/components/ui/Container";
import FacilityCard from "@/src/components/home/Facility/FacilityCard";

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

export default function FacilitiesPage() {
  return (
    <main>
      <section
        className="
          w-full
          bg-[var(--color-surface)]
          py-[140px]
          max-[900px]:py-[100px]
          max-[600px]:py-20
        "
      >
        <Container>
          {/* PAGE HEADER */}

          <div
            className="
              mb-20
              max-w-[900px]
              max-[900px]:mb-[60px]
              max-[600px]:mb-[50px]
            "
          >
            <span
              className="
                mb-5
                inline-block
                text-[13px]
                font-bold
                tracking-[1.5px]
                text-[var(--color-text-muted)]
              "
            >
              FACILITIES
            </span>

            <h1
              className="
                m-0
                max-w-[850px]
                text-[clamp(48px,6vw,76px)]
                font-bold
                leading-none
                tracking-[-3px]
                text-[var(--color-text)]
                max-[900px]:text-[clamp(44px,7vw,64px)]
                max-[600px]:text-[42px]
                max-[600px]:tracking-[-2px]
              "
            >
              Everything You Need in One Place
            </h1>

            <p
              className="
                mt-[30px]
                max-w-[650px]
                text-[18px]
                leading-[1.7]
                text-[var(--color-text-muted)]
                max-[600px]:text-base
              "
            >
              Indonesia Activity Center brings together
              sports, food, wellness, and community spaces
              in one destination.
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
    </main>
  );
}
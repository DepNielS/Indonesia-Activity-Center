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
      <section className="facilities-page-section">
        <Container>

          <div className="facilities-page-header">
            <span className="facilities-page-label">
              FACILITIES
            </span>

            <h1 className="facilities-page-title">
              Everything You Need in One Place
            </h1>

            <p className="facilities-page-description">
              Indonesia Activity Center brings together
              sports, food, wellness, and community spaces
              in one destination.
            </p>
          </div>

          <div className="facilities-page-grid">
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
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
    <section className="facilities-section">

      <Container>

        {/* HEADER */}

        <div className="facilities-header">

          <div>

            <span className="section-label">
              OUR FACILITIES
            </span>

            <h2 className="facilities-title">
              Everything You Need.
              <br />
              All In One Place.
            </h2>

          </div>

          <p className="facilities-description">
            Designed to make your visit comfortable,
            enjoyable, and memorable. Explore the
            facilities available at Indonesia Activity
            Center.
          </p>

        </div>


        {/* FACILITY GRID */}

        <div className="facilities-grid">

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
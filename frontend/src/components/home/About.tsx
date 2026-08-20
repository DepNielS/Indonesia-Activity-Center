import Link from "next/link";
import Container from "../ui/Container";

export default function About() {
  return (
    <section className="about-section">
      <Container>

        <div className="about-content">

          {/* IMAGE */}

          <div className="about-image-wrapper">
            <div className="about-image">
              <span>IAC</span>
            </div>
          </div>


          {/* CONTENT */}

          <div className="about-text">

            <span className="section-label">
              ABOUT US
            </span>

            <h2 className="about-title">
              More Than A Place.
              <br />
              It's A Community.
            </h2>

            <p className="about-description">
              Indonesia Activity Center brings together
              sports, local food, wellness, and community
              experiences in one destination.
            </p>

            <p className="about-description">
              Whether you are looking for an active day
              on the padel court, a relaxing wellness
              treatment, authentic local flavors, or a
              place to connect with others, IAC is designed
              to make every visit meaningful.
            </p>

            <Link
              href="/about"
              className="about-link"
            >
              Discover Our Story →
            </Link>

          </div>

        </div>

      </Container>
    </section>
  );
}
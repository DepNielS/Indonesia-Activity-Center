import Link from "next/link";
import Container from "../ui/Container";

export default function Hero() {
  return (
    <section className="hero">

      <Container>

        <div className="hero-content">

          {/* HERO TEXT */}

          <div className="hero-text">

            <span className="hero-label">
              INDONESIA ACTIVITY CENTER
            </span>

            <h1 className="hero-title">
              Your Place to
              <br />
              Play, Taste,
              <br />
              Relax & Connect.
            </h1>

            <p className="hero-description">
              Padel courts, local food, Ayurvedic
              treatments, and events — all together
              in one easy-to-find destination.
            </p>

            <div className="hero-actions">

              <Link
                href="#activities"
                className="hero-primary-button"
              >
                Explore Activities
              </Link>

              <Link
                href="/contact"
                className="hero-secondary-button"
              >
                Contact Us
              </Link>

            </div>

          </div>


          {/* HERO IMAGE */}

          <div className="hero-image-wrapper">

            <div className="hero-image">
              <span>
                IAC
              </span>
            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}
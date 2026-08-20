import Link from "next/link";

import Container from "../../ui/Container";

export default function ContactCTA() {
  return (
    <section className="contact-cta-section">

      <Container>

        <div className="contact-cta">

          <div className="contact-cta-content">

            <span className="section-label">
              GET IN TOUCH
            </span>

            <h2 className="contact-cta-title">
              Ready To
              <br />
              Experience IAC?
            </h2>

            <p className="contact-cta-description">
              Whether you want to play padel, enjoy
              local food, relax with a wellness treatment,
              or join our community, we'd love to welcome
              you to Indonesia Activity Center.
            </p>

          </div>


          <div className="contact-cta-actions">

            <Link
              href="/contact"
              className="contact-cta-primary"
            >
              Get In Touch →
            </Link>

            <Link
              href="/activities"
              className="contact-cta-secondary"
            >
              Explore Activities →
            </Link>

          </div>

        </div>

      </Container>

    </section>
  );
}
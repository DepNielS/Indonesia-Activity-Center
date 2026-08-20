import Link from "next/link";

import Container from "../../ui/Container";

export default function Location() {
  return (
    <section className="location-section">

      <Container>

        <div className="location-content">

          {/* INFORMATION */}

          <div className="location-info">

            <span className="section-label">
              FIND US
            </span>

            <h2 className="location-title">
              Come Visit
              <br />
              Indonesia Activity Center.
            </h2>

            <p className="location-description">
              Find us and experience sports, local food,
              wellness, and community activities all in
              one destination.
            </p>


            {/* ADDRESS */}

            <div className="location-item">

              <span className="location-item-label">
                ADDRESS
              </span>

              <p>
                Indonesia Activity Center
                <br />
                Bali, Indonesia
              </p>

            </div>


            {/* OPENING HOURS */}

            <div className="location-item">

              <span className="location-item-label">
                OPENING HOURS
              </span>

              <p>
                Monday - Sunday
                <br />
                08:00 - 22:00
              </p>

            </div>


            {/* CONTACT */}

            <div className="location-item">

              <span className="location-item-label">
                CONTACT
              </span>

              <p>
                +62 812 0000 0000
                <br />
                hello@indonesiaactivitycenter.com
              </p>

            </div>


            <Link
              href="/contact"
              className="location-button"
            >
              Contact Us →
            </Link>

          </div>


          {/* MAP */}

          <div className="location-map">

            <div className="location-map-placeholder">

              <span>
                MAP
              </span>

              <p>
                Indonesia Activity Center
              </p>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps →
              </a>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}
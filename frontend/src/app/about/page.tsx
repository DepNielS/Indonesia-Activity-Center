import Link from "next/link";
import Container from "@/src/components/ui/Container";

export default function AboutPage() {
  return (
    <main>
      {/* ========================================
          ABOUT INTRODUCTION
      ======================================== */}

      <section className="about-page-section">
        <Container>
          <div className="about-page-header">
            <span className="section-label">
              ABOUT
            </span>

            <h1 className="about-page-title">
              Indonesia Activity Center
            </h1>

            <p className="about-page-description">
              Indonesia Activity Center is a destination
              that brings activities, food, wellness,
              and events together in one place.
            </p>
          </div>
        </Container>
      </section>


      {/* ========================================
          ABOUT CONCEPT
      ======================================== */}

      <section className="about-page-concept">
        <Container>
          <div className="about-page-concept-grid">
            <div className="about-page-concept-label">
              <span className="section-label">
                OUR CONCEPT
              </span>
            </div>

            <div className="about-page-concept-content">
              <h2>
                One destination.
                <br />
                Different experiences.
              </h2>

              <p>
                Indonesia Activity Center brings
                different experiences together in
                one destination. Visitors can explore
                activities, discover local food, enjoy
                wellness experiences, and take part
                in events.
              </p>
            </div>
          </div>
        </Container>
      </section>


      {/* ========================================
          EXPERIENCE CATEGORIES
      ======================================== */}

      <section className="about-page-experiences">
        <Container>
          <div className="about-page-experiences-header">
            <span className="section-label">
              EXPERIENCES
            </span>

            <h2>
              Something for every visit.
            </h2>
          </div>

          <div className="about-page-experiences-grid">
            <div className="about-page-experience-card">
              <span className="about-page-experience-number">
                01
              </span>

              <h3>
                Activities
              </h3>

              <p>
                Explore active experiences and
                activities available at Indonesia
                Activity Center.
              </p>
            </div>

            <div className="about-page-experience-card">
              <span className="about-page-experience-number">
                02
              </span>

              <h3>
                Local Food
              </h3>

              <p>
                Discover local food experiences
                and flavors in one destination.
              </p>
            </div>

            <div className="about-page-experience-card">
              <span className="about-page-experience-number">
                03
              </span>

              <h3>
                Wellness
              </h3>

              <p>
                Take time to relax and experience
                wellness at Indonesia Activity Center.
              </p>
            </div>
          </div>
        </Container>
      </section>


      {/* ========================================
          ABOUT CTA
      ======================================== */}

      <section className="about-page-cta">
        <Container>
          <div className="about-page-cta-content">
            <span className="section-label">
              DISCOVER
            </span>

            <h2>
              Explore what Indonesia Activity Center
              has to offer.
            </h2>

            <Link
              href="/activities"
              className="about-page-cta-link"
            >
              Explore Activities →
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
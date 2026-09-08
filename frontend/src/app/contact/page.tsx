import Container from "@/src/components/ui/Container";

export default function ContactPage() {
  return (
    <main>
      <section className="contact-page-section">
        <Container>
          <div className="contact-page-header">
            <span className="contact-page-label">
              CONTACT
            </span>

            <h1 className="contact-page-title">
              Get in Touch
            </h1>

            <p className="contact-page-description">
              Have a question or want to learn more about
              Indonesia Activity Center? Get in touch with us.
            </p>
          </div>

          <div className="contact-page-grid">
            <article className="contact-page-card">
              <span className="contact-page-card-label">
                LOCATION
              </span>

              <h2 className="contact-page-card-title">
                Visit Us
              </h2>

              <p className="contact-page-card-description">
                Jl. I Ketut Natih, Purwakerthi,
                Amed, Bali
              </p>
            </article>

            <article className="contact-page-card">
                <span className="contact-page-card-label">
                    PHONE
                </span>

                <h2 className="contact-page-card-title">
                    Call or WhatsApp
                </h2>

                <div className="contact-page-card-actions">
                    <a
                    href="tel:+6282340941142"
                    className="contact-page-link"
                    >
                    +62 823-4094-1142
                    </a>

                    <a
                    href="https://wa.me/6282340941142"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-page-link"
                    >
                    WhatsApp →
                    </a>
                </div>
            </article>

            <article className="contact-page-card">
                <span className="contact-page-card-label">
                    EMAIL
                </span>

                <h2 className="contact-page-card-title">
                    Send Us an Email
                </h2>

                <a
                    href="mailto:amed@indonesiaactivity.com"
                    className="contact-page-link"
                >
                    amed@indonesiaactivity.com →
                </a>
            </article>

            <article className="contact-page-card">
              <span className="contact-page-card-label">
                HOURS
              </span>

              <h2 className="contact-page-card-title">
                Opening Hours
              </h2>

              <p className="contact-page-card-description">
                Daily · 8am–10pm
              </p>
            </article>
          </div>
        </Container>
      </section>
    </main>
  );
}


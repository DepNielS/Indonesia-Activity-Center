import Link from "next/link";

const exploreLinks = [
  {
    id: "activities",
    label: "Activities",
    href: "/activities",
  },
  {
    id: "facilities",
    label: "Facilities",
    href: "/facilities",
  },
  {
    id: "events",
    label: "Events",
    href: "/events",
  },
  {
    id: "gallery",
    label: "Gallery",
    href: "/gallery",
  },
];

const informationLinks = [
  {
    id: "about",
    label: "About Us",
    href: "/about",
  },
  {
    id: "location",
    label: "Location",
    href: "/contact",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
  },
];

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        <div className="container">

          <div className="footer-grid">

            {/* BRAND */}

            <div className="footer-brand">

              <Link
                href="/"
                className="footer-logo"
              >
                IAC
              </Link>

              <p className="footer-description">
                Indonesia Activity Center is a destination
                for sports, local food, wellness, community,
                and memorable experiences.
              </p>

            </div>


            {/* EXPLORE */}

            <div className="footer-column">

              <h3 className="footer-heading">
                Explore
              </h3>

              <nav className="footer-links">

                {exploreLinks.map((link) => (
                    <Link
                        key={link.id}
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                ))}

              </nav>

            </div>


            {/* INFORMATION */}

            <div className="footer-column">

              <h3 className="footer-heading">
                Information
              </h3>

              <nav className="footer-links">

               {informationLinks.map((link) => (
                <Link
                    key={link.id}
                    href={link.href}
                >
                    {link.label}
                </Link>
                ))}

              </nav>

            </div>


            {/* CONTACT */}

            <div className="footer-column">

              <h3 className="footer-heading">
                Contact
              </h3>

              <div className="footer-contact">

                <p>
                  Bali, Indonesia
                </p>

                <p>
                  +62 812 0000 0000
                </p>

                <p>
                  hello@indonesiaactivitycenter.com
                </p>

              </div>


              {/* SOCIAL */}

              <div className="footer-social">

                <a
                  href="#"
                  aria-label="Instagram"
                >
                  Instagram
                </a>

                <a
                  href="#"
                  aria-label="Facebook"
                >
                  Facebook
                </a>

                <a
                  href="#"
                  aria-label="WhatsApp"
                >
                  WhatsApp
                </a>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* FOOTER BOTTOM */}

      <div className="footer-bottom">

        <div className="container">

          <div className="footer-bottom-content">

            <p>
              © {new Date().getFullYear()} Indonesia Activity Center.
              All rights reserved.
            </p>

            <div className="footer-legal">

              <Link href="/privacy">
                Privacy Policy
              </Link>

              <Link href="/terms">
                Terms & Conditions
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}
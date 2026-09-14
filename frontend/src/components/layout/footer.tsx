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
    <footer className="bg-[var(--color-text)] text-white">
      {/* FOOTER MAIN */}
      <div className="py-20">
        <div className="mx-auto w-full max-w-[1200px] px-6 max-[600px]:px-4">
          <div
            className="
              grid
              gap-[60px]
              min-[901px]:grid-cols-[1.5fr_1fr_1fr_1.2fr]
              max-[900px]:grid-cols-2
              max-[600px]:grid-cols-1
            "
          >
            {/* BRAND */}
            <div>
              <Link
                href="/"
                className="
                  mb-5
                  inline-block
                  text-[36px]
                  font-extrabold
                  tracking-[-1px]
                  text-white
                "
              >
                IAC
              </Link>

              <p
                className="
                  m-0
                  max-w-[340px]
                  text-[14px]
                  leading-[1.7]
                  text-white/65
                "
              >
                Indonesia Activity Center is a destination
                for sports, local food, wellness, community,
                and memorable experiences.
              </p>
            </div>

            {/* EXPLORE */}
            <div>
              <h3
                className="
                  m-0
                  mb-5
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[1.5px]
                  text-white/50
                "
              >
                Explore
              </h3>

              <nav className="flex flex-col gap-3">
                {exploreLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="
                      text-[14px]
                      text-white/80
                      transition-colors
                      duration-200
                      hover:text-white
                    "
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* INFORMATION */}
            <div>
              <h3
                className="
                  m-0
                  mb-5
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[1.5px]
                  text-white/50
                "
              >
                Information
              </h3>

              <nav className="flex flex-col gap-3">
                {informationLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="
                      text-[14px]
                      text-white/80
                      transition-colors
                      duration-200
                      hover:text-white
                    "
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* CONTACT */}
            <div>
              <h3
                className="
                  m-0
                  mb-5
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[1.5px]
                  text-white/50
                "
              >
                Contact
              </h3>

              <div className="flex flex-col gap-2">
                <p className="m-0 text-[14px] leading-[1.5] text-white/80">
                  Bali, Indonesia
                </p>

                <p className="m-0 text-[14px] leading-[1.5] text-white/80">
                  +62 812 0000 0000
                </p>

                <p className="m-0 text-[14px] leading-[1.5] text-white/80">
                  hello@indonesiaactivitycenter.com
                </p>
              </div>

              {/* SOCIAL */}
              <div className="mt-6 flex flex-wrap gap-[14px]">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="
                    text-[12px]
                    font-semibold
                    text-white/65
                    transition-colors
                    duration-200
                    hover:text-white
                  "
                >
                  Instagram
                </a>

                <a
                  href="#"
                  aria-label="Facebook"
                  className="
                    text-[12px]
                    font-semibold
                    text-white/65
                    transition-colors
                    duration-200
                    hover:text-white
                  "
                >
                  Facebook
                </a>

                <a
                  href="#"
                  aria-label="WhatsApp"
                  className="
                    text-[12px]
                    font-semibold
                    text-white/65
                    transition-colors
                    duration-200
                    hover:text-white
                  "
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-[1200px] px-6 max-[600px]:px-4">
          <div
            className="
              flex
              items-center
              justify-between
              gap-6
              py-6
              max-[600px]:flex-col
              max-[600px]:items-start
            "
          >
            <p className="m-0 text-[13px] leading-[1.5] text-white/50">
              © {new Date().getFullYear()} Indonesia Activity Center.
              All rights reserved.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link
                href="/privacy"
                className="
                  text-[13px]
                  text-white/50
                  transition-colors
                  duration-200
                  hover:text-white
                "
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="
                  text-[13px]
                  text-white/50
                  transition-colors
                  duration-200
                  hover:text-white
                "
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
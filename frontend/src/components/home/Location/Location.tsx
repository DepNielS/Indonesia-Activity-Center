import Link from "next/link";

import Container from "../../ui/Container";

export default function Location() {
  return (
    <section
      className="
        w-full
        bg-[var(--color-background)]
        py-[120px]
        max-[900px]:py-[90px]
        max-[600px]:py-[70px]
      "
    >
      <Container>
        <div
          className="
            grid
            grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]
            items-stretch
            gap-20
            max-[900px]:grid-cols-1
            max-[900px]:gap-[50px]
            max-[600px]:gap-10
          "
        >
          {/* INFORMATION */}

          <div className="flex flex-col items-start">
            <span
              className="
                inline-block
                text-sm
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[var(--color-secondary)]
              "
            >
              FIND US
            </span>

            <h2
              className="
                m-0
                mb-7
                text-[clamp(40px,5vw,60px)]
                font-bold
                leading-[1.05]
                tracking-[-2px]
                text-[var(--color-text)]
                max-[600px]:text-[40px]
                max-[600px]:tracking-[-1.5px]
              "
            >
              Come Visit
              <br />
              Indonesia Activity Center.
            </h2>

            <p
              className="
                m-0
                mb-10
                max-w-[500px]
                text-[17px]
                leading-[1.7]
                text-[var(--color-text-muted)]
                max-[600px]:text-base
              "
            >
              Find us and experience sports, local food,
              wellness, and community activities all in
              one destination.
            </p>

            {/* ADDRESS */}

            <div
              className="
                w-full
                border-t
                border-[var(--color-border)]
                py-5
                last:border-b
              "
            >
              <span
                className="
                  mb-2
                  block
                  text-[11px]
                  font-bold
                  tracking-[1.5px]
                  text-[var(--color-primary)]
                "
              >
                ADDRESS
              </span>

              <p
                className="
                  m-0
                  text-[15px]
                  leading-[1.7]
                  text-[var(--color-text)]
                "
              >
                Indonesia Activity Center
                <br />
                Bali, Indonesia
              </p>
            </div>

            {/* OPENING HOURS */}

            <div
              className="
                w-full
                border-t
                border-[var(--color-border)]
                py-5
              "
            >
              <span
                className="
                  mb-2
                  block
                  text-[11px]
                  font-bold
                  tracking-[1.5px]
                  text-[var(--color-primary)]
                "
              >
                OPENING HOURS
              </span>

              <p
                className="
                  m-0
                  text-[15px]
                  leading-[1.7]
                  text-[var(--color-text)]
                "
              >
                Monday - Sunday
                <br />
                08:00 - 22:00
              </p>
            </div>

            {/* CONTACT */}

            <div
              className="
                w-full
                border-t
                border-[var(--color-border)]
                py-5
                border-b
              "
            >
              <span
                className="
                  mb-2
                  block
                  text-[11px]
                  font-bold
                  tracking-[1.5px]
                  text-[var(--color-primary)]
                "
              >
                CONTACT
              </span>

              <p
                className="
                  m-0
                  text-[15px]
                  leading-[1.7]
                  text-[var(--color-text)]
                "
              >
                +62 812 0000 0000
                <br />
                hello@indonesiaactivitycenter.com
              </p>
            </div>

            <Link
              href="/contact"
              className="
                mt-[30px]
                inline-flex
                min-h-12
                items-center
                justify-center
                bg-[var(--color-primary)]
                px-6
                text-sm
                font-semibold
                text-white
                no-underline
                transition-[background,transform]
                duration-200
                hover:-translate-y-0.5
                hover:bg-[var(--color-primary-dark)]
              "
            >
              Contact Us →
            </Link>
          </div>

          {/* MAP */}

          <div
            className="
              min-h-[600px]
              overflow-hidden
              max-[900px]:min-h-[450px]
              max-[600px]:min-h-[350px]
            "
          >
            <div
              className="
                flex
                h-full
                min-h-[600px]
                w-full
                flex-col
                items-center
                justify-center
                bg-linear-to-br
                from-[var(--color-primary-dark)]
                to-[var(--color-primary)]
                text-center
                text-white
                max-[900px]:min-h-[450px]
                max-[600px]:min-h-[350px]
              "
            >
              <span
                className="
                  mb-3
                  text-xs
                  font-bold
                  tracking-[2px]
                "
              >
                MAP
              </span>

              <p
                className="
                  m-0
                  mb-5
                  text-[22px]
                  font-semibold
                "
              >
                Indonesia Activity Center
              </p>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-sm
                  font-semibold
                  text-white
                  underline
                  underline-offset-4
                "
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
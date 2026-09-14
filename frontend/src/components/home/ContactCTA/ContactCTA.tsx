import Link from "next/link";

import Container from "../../ui/Container";

export default function ContactCTA() {
  return (
    <section
      className="
        w-full
        bg-[var(--color-primary)]
        py-[100px]
        max-[600px]:py-[70px]
      "
    >
      <Container>
        <div
          className="
            flex
            items-end
            justify-between
            gap-[60px]
            max-[800px]:flex-col
            max-[800px]:items-start
            max-[800px]:gap-10
          "
        >
          <div className="max-w-[700px]">
            <span
              className="
                inline-block
                text-sm
                font-semibold
                uppercase
                tracking-[0.12em]
                text-white/70
              "
            >
              GET IN TOUCH
            </span>

            <h2
              className="
                m-0
                mb-7
                text-[clamp(44px,6vw,72px)]
                font-bold
                leading-none
                tracking-[-2.5px]
                text-white
                max-[600px]:text-[44px]
                max-[600px]:tracking-[-1.5px]
              "
            >
              Ready To
              <br />
              Experience IAC?
            </h2>

            <p
              className="
                m-0
                max-w-[600px]
                text-[17px]
                leading-[1.7]
                text-white/80
                max-[600px]:text-base
              "
            >
              Whether you want to play padel, enjoy
              local food, relax with a wellness treatment,
              or join our community, we'd love to welcome
              you to Indonesia Activity Center.
            </p>
          </div>

          <div
            className="
              flex
              min-w-[220px]
              flex-col
              items-stretch
              gap-3
              max-[800px]:w-full
              max-[800px]:max-w-[400px]
              max-[600px]:max-w-none
            "
          >
            <Link
              href="/contact"
              className="
                flex
                min-h-[50px]
                items-center
                justify-center
                bg-white
                px-6
                text-sm
                font-semibold
                text-[var(--color-primary)]
                no-underline
                transition-[background,transform]
                duration-200
                hover:-translate-y-0.5
                hover:bg-[var(--color-background)]
              "
            >
              Get In Touch →
            </Link>

            <Link
              href="/activities"
              className="
                flex
                min-h-[50px]
                items-center
                justify-center
                border
                border-white/50
                bg-transparent
                px-6
                text-sm
                font-semibold
                text-white
                no-underline
                transition-[background,color,border-color,transform]
                duration-200
                hover:border-white
                hover:bg-white/10
              "
            >
              Explore Activities →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
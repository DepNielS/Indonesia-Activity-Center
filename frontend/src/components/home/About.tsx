import Link from "next/link";
import Container from "../ui/Container";
import Image from "next/image";

export default function About() {
  return (
    <section className="w-full bg-[var(--color-surface)] py-[120px] max-[900px]:py-[90px] max-[600px]:py-[70px]">
      <Container>
        <div
          className="
            grid
            grid-cols-2
            items-center
            gap-[90px]
            max-[900px]:grid-cols-1
            max-[900px]:gap-[50px]
            max-[600px]:gap-10
          "
        >
          {/* IMAGE */}

          <div className="flex justify-center">
            <div
              className="
                w-full
                overflow-hidden
                bg-gradient-to-br
                from-[var(--color-primary)]
                to-[var(--color-primary-dark)]
                max-[900px]:max-w-[600px]
              "
            >
              <Image
                src="/images/padel/padel_court.webp"
                alt="Indonesia Activity Center"
                width={400}
                height={400}
                priority
                className="block h-auto w-full"
              />
            </div>
          </div>

          {/* CONTENT */}

          <div className="max-w-[560px] max-[900px]:max-w-[700px]">
            <span
              className="
                mb-5
                inline-block
                text-sm
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[var(--color-secondary)]
              "
            >
              ABOUT US
            </span>

            <h2
              className="
                mb-7
                text-[clamp(40px,5vw,62px)]
                font-bold
                leading-[1.05]
                tracking-[-2px]
                text-[var(--color-text)]
                max-[600px]:text-[40px]
                max-[600px]:tracking-[-1.5px]
              "
            >
              More Than A Place.
              <br />
              It's A Community.
            </h2>

            <p
              className="
                mb-5
                text-[17px]
                leading-[1.75]
                text-[var(--color-text-muted)]
                max-[600px]:text-base
              "
            >
              Indonesia Activity Center brings together
              sports, local food, wellness, and community
              experiences in one destination.
            </p>

            <p
              className="
                mb-5
                text-[17px]
                leading-[1.75]
                text-[var(--color-text-muted)]
                max-[600px]:text-base
              "
            >
              Whether you are looking for an active day
              on the padel court, a relaxing wellness
              treatment, authentic local flavors, or a
              place to connect with others, IAC is designed
              to make every visit meaningful.
            </p>

            <Link
              href="/about"
              className="
                mt-4
                inline-flex
                text-[15px]
                font-semibold
                text-[var(--color-primary)]
                transition-[color,transform]
                duration-200
                hover:translate-x-1
                hover:text-[var(--color-primary-dark)]
              "
            >
              Discover Our Story →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
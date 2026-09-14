import Image from "next/image";
import Link from "next/link";
import Container from "../ui/Container";

export default function Hero() {
  return (
    <section className="w-full bg-[var(--color-background)] py-20 pb-[100px]">
      <Container>
        <div
          className="
            grid
            min-h-[600px]
            grid-cols-2
            items-center
            gap-20
            max-[900px]:min-h-0
            max-[900px]:grid-cols-1
            max-[900px]:gap-[50px]
            max-[600px]:gap-10
          "
        >
          {/* Hero Text */}
          <div className="max-w-[620px]">
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
              Indonesia Activity Center
            </span>

            <h1
              className="
                mb-6
                text-[56px]
                font-bold
                leading-[1.08]
                tracking-[-0.02em]
                text-[var(--color-primary)]
                max-[900px]:text-[52px]
                max-[600px]:text-[42px]
              "
            >
              Experience Indonesia
              <br />
              in One Destination
            </h1>

            <p
              className="
                mb-8
                max-w-[520px]
                text-lg
                leading-[1.7]
                text-[var(--color-text-muted)]
              "
            >
              Padel courts, local food, Ayurvedic treatments, and events
              together in one easy-to-find destination.
            </p>

            {/* Hero Actions */}
            <div
              className="
                flex
                items-center
                gap-4
                max-[600px]:w-full
                max-[600px]:flex-col
                max-[600px]:items-stretch
              "
            >
              <Link
                href="/activities"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-[6px]
                  bg-[var(--color-primary)]
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  leading-normal
                  text-white
                  transition-[background,transform]
                  duration-200
                  hover:-translate-y-px
                  hover:bg-[var(--color-primary-dark)]
                  max-[600px]:w-full
                "
              >
                Explore Activities
              </Link>

              <Link
                href="/about"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-[6px]
                  border
                  border-[var(--color-primary)]
                  bg-transparent
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  leading-normal
                  text-[var(--color-primary)]
                  transition-[background,color,transform]
                  duration-200
                  hover:-translate-y-px
                  hover:bg-[var(--color-primary)]
                  hover:text-white
                  max-[600px]:w-full
                "
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className="
              relative
              flex
              w-full
              max-w-[400px]
              justify-self-end
              overflow-hidden
              max-[900px]:max-w-[600px]
              max-[900px]:justify-self-center
              max-[600px]:max-w-full
              max-[600px]:aspect-[4/5]
            "
          >
            <Image
              src="/images/logo-iac.webp"
              alt="Indonesia Activity Center"
              width={800}
              height={1000}
              priority
              className="
                h-auto
                w-full
                object-contain
                max-[600px]:h-full
              "
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
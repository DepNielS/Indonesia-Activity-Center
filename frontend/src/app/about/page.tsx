import Link from "next/link";
import Container from "@/src/components/ui/Container";

export default function AboutPage() {
  return (
    <main>
      {/* ========================================
          ABOUT INTRODUCTION
      ======================================== */}

      <section
        className="
          bg-[var(--color-surface)]
          py-[120px]
          max-[1000px]:py-[100px]
          max-[600px]:py-[70px]
        "
      >
        <Container>
          <div className="max-w-[1000px]">
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
              ABOUT
            </span>

            <h1
              className="
                mb-7
                mt-0
                text-[clamp(48px,7vw,88px)]
                font-bold
                leading-none
                tracking-[-3px]
                text-[var(--color-text)]
                max-[600px]:text-[42px]
                max-[600px]:tracking-[-2px]
              "
            >
              Indonesia Activity Center
            </h1>

            <p
              className="
                m-0
                max-w-[720px]
                text-[20px]
                leading-[1.7]
                text-[var(--color-text-muted)]
                max-[600px]:text-[17px]
              "
            >
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

      <section
        className="
          bg-[var(--color-background)]
          py-[120px]
          max-[1000px]:py-[100px]
          max-[600px]:py-[70px]
        "
      >
        <Container>
          <div
            className="
              grid
              grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]
              gap-20
              max-[1000px]:grid-cols-1
              max-[1000px]:gap-10
            "
          >
            <div className="pt-2">
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
                OUR CONCEPT
              </span>
            </div>

            <div className="max-w-[760px]">
              <h2
                className="
                  mb-7
                  mt-0
                  text-[clamp(36px,5vw,64px)]
                  font-bold
                  leading-[1.05]
                  tracking-[-2px]
                  text-[var(--color-text)]
                  max-[600px]:text-[38px]
                  max-[600px]:tracking-[-1.5px]
                "
              >
                One destination.
                <br />
                Different experiences.
              </h2>

              <p
                className="
                  m-0
                  max-w-[680px]
                  text-[17px]
                  leading-[1.7]
                  text-[var(--color-text-muted)]
                "
              >
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

      <section
        className="
          bg-[var(--color-surface)]
          py-[120px]
          max-[1000px]:py-[100px]
          max-[600px]:py-[70px]
        "
      >
        <Container>
          <div className="mb-[60px] max-[600px]:mb-10">
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
              EXPERIENCES
            </span>

            <h2
              className="
                m-0
                text-[clamp(36px,5vw,56px)]
                font-bold
                leading-[1.05]
                tracking-[-2px]
                text-[var(--color-text)]
                max-[600px]:text-[38px]
                max-[600px]:tracking-[-1.5px]
              "
            >
              Something for every visit.
            </h2>
          </div>

          <div
            className="
              grid
              grid-cols-3
              border-l
              border-t
              border-[var(--color-border)]
              max-[1000px]:grid-cols-1
            "
          >
            {/* ACTIVITIES */}

            <div
  className="
    flex
    min-h-[460px]
    flex-col
    border-b
    border-r
    border-[var(--color-border)]
    bg-[var(--color-surface)]
    transition-[background,transform]
    duration-250
    hover:-translate-y-1
    hover:bg-[var(--color-background)]
    max-[600px]:min-h-[420px]
  "
>
  {/* IMAGE */}

  <div className="aspect-[4/3] w-full overflow-hidden">
    <img
      src="/images/padel/padel_a.jpg"
      alt="Activities at Indonesia Activity Center"
      className="block h-full w-full object-cover"
    />
  </div>

  {/* CONTENT */}

  <div
    className="
      flex
      flex-1
      flex-col
      justify-between
      p-7
      max-[600px]:p-6
    "
  >
    <span
      className="
        text-[13px]
        font-bold
        text-[var(--color-text-muted)]
      "
    >
      01
    </span>

    <div>
      <h3
        className="
          m-0
          text-[28px]
          font-bold
          text-[var(--color-text)]
        "
      >
        Activities
      </h3>

      <p
        className="
          mt-[14px]
          mb-0
          text-[15px]
          leading-[1.6]
          text-[var(--color-text-muted)]
        "
      >
        Explore active experiences and
        activities available at Indonesia
        Activity Center.
      </p>
    </div>
  </div>
</div>

            {/* LOCAL FOOD */}

            <div
  className="
    flex
    min-h-[460px]
    flex-col
    border-b
    border-r
    border-[var(--color-border)]
    bg-[var(--color-surface)]
    transition-[background,transform]
    duration-250
    hover:-translate-y-1
    hover:bg-[var(--color-background)]
    max-[600px]:min-h-[420px]
  "
>
  {/* IMAGE */}

  <div className="aspect-[4/3] w-full overflow-hidden">
    <img
      src="/images/food/local_food.jpg"
      alt="Local food at Indonesia Activity Center"
      className="block h-full w-full object-cover"
    />
  </div>

  {/* CONTENT */}

  <div
    className="
      flex
      flex-1
      flex-col
      justify-between
      p-7
      max-[600px]:p-6
    "
  >
    <span
      className="
        text-[13px]
        font-bold
        text-[var(--color-text-muted)]
      "
    >
      02
    </span>

    <div>
      <h3
        className="
          m-0
          text-[28px]
          font-bold
          text-[var(--color-text)]
        "
      >
        Local Food
      </h3>

      <p
        className="
          mt-[14px]
          mb-0
          text-[15px]
          leading-[1.6]
          text-[var(--color-text-muted)]
        "
      >
        Discover local food experiences
        and flavors in one destination.
      </p>
    </div>
  </div>
</div>

            {/* WELLNESS */}

            <div
  className="
    flex
    min-h-[460px]
    flex-col
    border-b
    border-r
    border-[var(--color-border)]
    bg-[var(--color-surface)]
    transition-[background,transform]
    duration-250
    hover:-translate-y-1
    hover:bg-[var(--color-background)]
    max-[600px]:min-h-[420px]
  "
>
  {/* IMAGE */}

  <div className="aspect-[4/3] w-full overflow-hidden">
    <img
      src="/images/wellness/wellness_a.jpg"
      alt="Wellness experience at Indonesia Activity Center"
      className="block h-full w-full object-cover"
    />
  </div>

  {/* CONTENT */}

  <div
    className="
      flex
      flex-1
      flex-col
      justify-between
      p-7
      max-[600px]:p-6
    "
  >
    <span
      className="
        text-[13px]
        font-bold
        text-[var(--color-text-muted)]
      "
    >
      03
    </span>

    <div>
      <h3
        className="
          m-0
          text-[28px]
          font-bold
          text-[var(--color-text)]
        "
      >
        Wellness
      </h3>

      <p
        className="
          mt-[14px]
          mb-0
          text-[15px]
          leading-[1.6]
          text-[var(--color-text-muted)]
        "
      >
        Take time to relax and experience
        wellness at Indonesia Activity Center.
      </p>
    </div>
  </div>
</div>
          </div>
        </Container>
      </section>

      {/* ========================================
          ABOUT CTA
      ======================================== */}

      <section
        className="
          bg-[var(--color-background)]
          py-[120px]
          max-[1000px]:py-[100px]
          max-[600px]:py-[70px]
        "
      >
        <Container>
          <div className="max-w-[850px]">
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
              DISCOVER
            </span>

            <h2
              className="
                mb-9
                mt-0
                text-[clamp(36px,5vw,60px)]
                font-bold
                leading-[1.05]
                tracking-[-2px]
                text-[var(--color-text)]
                max-[600px]:text-[38px]
                max-[600px]:tracking-[-1.5px]
              "
            >
              Explore what Indonesia Activity Center
              has to offer.
            </h2>

            <Link
              href="/activities"
              className="
                inline-flex
                items-center
                px-5
                py-3
                text-[14px]
                font-semibold
                text-[var(--color-background)]
                no-underline
                transition-[background,transform]
                duration-250
                hover:-translate-y-0.5
                hover:bg-[var(--color-text)]
                bg-[var(--color-primary)]
              "
            >
              Explore Activities →
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
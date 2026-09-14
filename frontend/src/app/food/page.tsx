import Container from "@/src/components/ui/Container";

const foodHighlights = [
  {
    number: "01",
    title: "Local Cuisine",
    description:
      "Enjoy a selection of local flavors inspired by the rich culinary traditions of Indonesia.",
    image: "/images/food/local_food.jpg",
  },
  {
    number: "02",
    title: "Relaxed Dining",
    description:
      "A comfortable dining space where guests can slow down, connect, and enjoy their time together.",
    image: "/images/food/relaxed-dining.jpg",
  },
  {
    number: "03",
    title: "Food & Beverage",
    description:
      "A selection of food and beverages designed to complement your experience at Indonesia Activity Center.",
    image: "/images/food/food-beverage.jpg",
  },
];

export default function FoodPage() {
  return (
    <main>
      <section
        className="
          w-full
          bg-[var(--color-surface)]
          py-[140px]
          max-[900px]:py-[100px]
          max-[600px]:py-20
        "
      >
        <Container>
          {/* Header */}
          <div
            className="
              mb-20
              max-w-[900px]
              max-[900px]:mb-[60px]
              max-[600px]:mb-[50px]
            "
          >
            <span
              className="
                mb-5
                inline-block
                text-[13px]
                font-bold
                tracking-[1.5px]
                text-[var(--color-text-muted)]
              "
            >
              FOOD
            </span>

            <h1
              className="
                m-0
                max-w-[850px]
                text-[clamp(48px,6vw,76px)]
                font-bold
                leading-none
                tracking-[-3px]
                text-[var(--color-text)]
                max-[900px]:text-[clamp(44px,7vw,64px)]
                max-[600px]:text-[42px]
                max-[600px]:tracking-[-2px]
              "
            >
              Local Flavors, Shared Experiences
            </h1>

            <p
              className="
                mt-[30px]
                max-w-[650px]
                text-[18px]
                leading-[1.7]
                text-[var(--color-text-muted)]
                max-[600px]:text-base
              "
            >
              Discover a relaxed dining experience featuring
              local flavors, carefully selected food, and a
              welcoming space to enjoy good food together.
            </p>
          </div>

          {/* Food Grid */}
          <div
            className="
              grid
              grid-cols-3
              border-l
              border-t
              border-[var(--color-border)]
              max-[900px]:grid-cols-2
              max-[600px]:grid-cols-1
            "
          >
            {foodHighlights.map((item) => (
  <article
    key={item.number}
    className="
      flex
      min-h-[460px]
      flex-col
      border-r
      border-b
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

    <div
      className="
        aspect-[4/3]
        w-full
        overflow-hidden
        bg-[#f1f1f1]
      "
    >
      <img
        src={item.image}
        alt={item.title}
        className="
          block
          h-full
          w-full
          object-cover
        "
      />
    </div>

    {/* CONTENT */}

    <div
      className="
        flex
        flex-1
        flex-col
        justify-between
        p-8
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
        {item.number}
      </span>

      <div className="mt-[50px]">
        <h2
          className="
            m-0
            text-[28px]
            font-bold
            leading-[1.2]
            text-[var(--color-text)]
            max-[600px]:text-[26px]
          "
        >
          {item.title}
        </h2>

        <p
          className="
            mt-5
            max-w-[420px]
            text-[15px]
            leading-[1.7]
            text-[var(--color-text-muted)]
          "
        >
          {item.description}
        </p>
      </div>
    </div>
  </article>
))}
          </div>
        </Container>
      </section>
    </main>
  );
}
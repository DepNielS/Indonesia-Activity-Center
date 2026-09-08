import Container from "@/src/components/ui/Container";

const foodHighlights = [
  {
    number: "01",
    title: "Local Cuisine",
    description:
      "Enjoy a selection of local flavors inspired by the rich culinary traditions of Indonesia.",
  },
  {
    number: "02",
    title: "Relaxed Dining",
    description:
      "A comfortable dining space where guests can slow down, connect, and enjoy their time together.",
  },
  {
    number: "03",
    title: "Food & Beverage",
    description:
      "A selection of food and beverages designed to complement your experience at Indonesia Activity Center.",
  },
];

export default function FoodPage() {
  return (
    <main>
      <section className="food-page-section">
        <Container>
          <div className="food-page-header">
            <span className="food-page-label">
              FOOD
            </span>

            <h1 className="food-page-title">
              Local Flavors, Shared Experiences
            </h1>

            <p className="food-page-description">
              Discover a relaxed dining experience featuring
              local flavors, carefully selected food, and a
              welcoming space to enjoy good food together.
            </p>
          </div>

          <div className="food-page-grid">
            {foodHighlights.map((item) => (
              <article
                key={item.number}
                className="food-page-card"
              >
                <span className="food-page-card-number">
                  {item.number}
                </span>

                <div className="food-page-card-content">
                  <h2 className="food-page-card-title">
                    {item.title}
                  </h2>

                  <p className="food-page-card-description">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
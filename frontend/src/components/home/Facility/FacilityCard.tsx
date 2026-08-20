interface FacilityCardProps {
  number: string;
  title: string;
  description: string;
  features: string[];
}

export default function FacilityCard({
  number,
  title,
  description,
  features,
}: FacilityCardProps) {
  return (
    <article className="facility-card">

      <div className="facility-card-header">

        <span className="facility-card-number">
          {number}
        </span>

        <h3 className="facility-card-title">
          {title}
        </h3>

      </div>

      <p className="facility-card-description">
        {description}
      </p>

      <ul className="facility-card-features">

        {features.map((feature) => (
          <li key={feature}>
            <span className="facility-check">
              ✓
            </span>

            {feature}
          </li>
        ))}

      </ul>

    </article>
  );
}
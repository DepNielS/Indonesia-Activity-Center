import Link from "next/link";

interface ActivityCardProps {
  title: string;
  description: string;
  href: string;
  number: string;
}

export default function ActivityCard({
  title,
  description,
  href,
  number,
}: ActivityCardProps) {
  return (
    <Link
      href={href}
      className="activity-card"
    >
      <div className="activity-card-number">
        {number}
      </div>

      <div className="activity-card-content">

        <h3 className="activity-card-title">
          {title}
        </h3>

        <p className="activity-card-description">
          {description}
        </p>

        <span className="activity-card-link">
          Discover →
        </span>

      </div>
    </Link>
  );
}
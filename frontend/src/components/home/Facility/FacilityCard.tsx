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
    <article
      className="
        flex
        min-h-[360px]
        flex-col
        justify-between
        border-b
        border-r
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-8
        transition-[background,transform]
        duration-250
        hover:-translate-y-1
        hover:bg-[var(--color-background)]
        max-[600px]:min-h-[320px]
        max-[600px]:p-6
      "
    >
      {/* CARD HEADER */}

      <div
        className="
          flex
          flex-col
          gap-4
        "
      >
        <span
          className="
            text-[13px]
            font-bold
            text-[var(--color-text-muted)]
          "
        >
          {number}
        </span>

        <h3
          className="
            m-0
            text-[30px]
            font-bold
            text-[var(--color-text)]
            max-[600px]:text-[26px]
          "
        >
          {title}
        </h3>
      </div>

      {/* DESCRIPTION */}

      <p
        className="
          my-[30px]
          max-w-[520px]
          text-[15px]
          leading-[1.7]
          text-[var(--color-text-muted)]
        "
      >
        {description}
      </p>

      {/* FEATURES */}

      <ul
        className="
          m-0
          flex
          list-none
          flex-col
          gap-[10px]
          p-0
        "
      >
        {features.map((feature) => (
          <li
            key={feature}
            className="
              flex
              items-center
              gap-[10px]
              text-[14px]
              text-[var(--color-text)]
            "
          >
            <span
              className="
                inline-flex
                h-5
                w-5
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[var(--color-primary)]
                text-[11px]
                font-bold
                text-white
              "
            >
              ✓
            </span>

            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}
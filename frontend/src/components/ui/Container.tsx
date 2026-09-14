interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`
        mx-auto
        w-full
        max-w-[1200px]
        px-6
        max-[600px]:px-4
        ${className}
      `}
    >
      {children}
    </div>
  );
}
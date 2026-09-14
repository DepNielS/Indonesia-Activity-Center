import Link from "next/link";
import Container from "../ui/Container";
import MobileMenu from "./MobileMenu";

const navItems = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Facilities",
    href: "/facilities",
  },
  {
    label: "Food",
    href: "/food",
  },
  {
    label: "Activities",
    href: "/activities",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
];

export default function Navbar() {
  return (
    <header className="relative z-[1000] w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container>

        <div className="flex min-h-20 items-center justify-between gap-8">

          <Link
            href="/"
            className="inline-flex items-center whitespace-nowrap text-lg font-bold text-[var(--color-primary)]"
          >
            Indonesia Activity Center
          </Link>

          <nav className="hidden items-center gap-7 min-[769px]:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center text-sm font-medium text-[var(--color-text)] transition-colors duration-200 hover:text-[var(--color-primary)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

<Link
  href="/contact"
  className="hidden items-center justify-center px-5 py-[11px] text-[14px] font-semibold leading-normal text-white bg-[var(--color-primary)] rounded-[6px] transition-[background,transform] duration-200 hover:bg-[var(--color-primary-dark)] hover:-translate-y-px min-[769px]:inline-flex"
>
  Contact Us
</Link>

          <MobileMenu />

        </div>

      </Container>
    </header>
  );
}
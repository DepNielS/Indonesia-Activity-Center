import Link from "next/link";
import Container from "../ui/Container";
import MobileMenu from "./MobileMenu";

const navItems = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Padel",
    href: "/padel",
  },
  {
    label: "Food",
    href: "/food",
  },
  {
    label: "Wellness",
    href: "/wellness",
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
    <header className="navbar">
      <Container>

        <div className="navbar-content">

          <Link
            href="/"
            className="navbar-logo"
          >
            Indonesia Activity Center
          </Link>

          <nav className="navbar-menu">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="navbar-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="navbar-button"
          >
            Contact Us
          </Link>

          <MobileMenu />

        </div>

      </Container>
    </header>
  );
}
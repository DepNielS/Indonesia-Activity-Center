"use client";

import Link from "next/link";
import { useState } from "react";

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

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((current) => !current);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="mobile-menu-wrapper">

      <button
        type="button"
        className="mobile-menu-button"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {isOpen && (
        <div className="mobile-menu">

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-menu-link"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="mobile-menu-button-link"
            onClick={closeMenu}
          >
            Contact Us
          </Link>

        </div>
      )}

    </div>
  );
}
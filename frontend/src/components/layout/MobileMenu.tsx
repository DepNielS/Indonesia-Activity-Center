"use client";

import Link from "next/link";
import { useState } from "react";

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

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((current) => !current);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative flex shrink-0 min-[769px]:hidden">
      {/* Mobile menu button */}
      <button
        type="button"
        className="
          flex
          h-[42px]
          w-[42px]
          shrink-0
          items-center
          justify-center
          rounded-[6px]
          border-0
          bg-transparent
          text-[24px]
          leading-none
          text-[var(--color-text)]
          transition-colors
          duration-200
          hover:bg-[var(--color-background)]
        "
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          className="
            absolute
            right-0
            top-[55px]
            z-[9999]
            flex
            w-[280px]
            flex-col
            gap-5
            rounded-[8px]
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            p-6
            shadow-[0_10px_30px_rgba(0,0,0,0.1)]
          "
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                block
                text-base
                font-medium
                text-[var(--color-text)]
                transition-colors
                duration-200
                hover:text-[var(--color-primary)]
              "
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}

          {/* Contact Us */}
          <Link
            href="/contact"
            className="
              flex
              items-center
              justify-center
              rounded-[6px]
              bg-[var(--color-primary)]
              px-5
              py-3
              text-[14px]
              font-semibold
              leading-normal
              text-white
              transition-colors
              duration-200
              hover:bg-[var(--color-primary-dark)]
            "
            onClick={closeMenu}
          >
            Contact Us
          </Link>
        </div>
      )}
    </div>
  );
}
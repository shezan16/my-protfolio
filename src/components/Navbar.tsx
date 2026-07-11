import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/navLinks";
import { cn } from "../utils/cn";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  activeId: string;
}

/**
 * Sticky navbar with logo, desktop links, CTA button and an animated
 * hamburger icon that toggles the mobile drawer.
 */
export default function Navbar({ activeId }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    const el = document.getElementById(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-plum-950/85 shadow-lg shadow-plum-950/20 backdrop-blur-md"
          : "bg-plum-950/40 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("home");
          }}
          className="group inline-flex h-16 items-center transition-all duration-300 hover:-translate-y-0.5 sm:h-20"
        >
          <img
            src="/images/shezan-logo-cream-bold.png"
            alt="Shezan"
            className="h-full w-auto object-contain drop-shadow-[0_0_12px_rgba(232,131,111,0.28)] transition-all duration-300 group-hover:drop-shadow-[0_0_18px_rgba(232,131,111,0.48)]"
          />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={`#${link.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(link.href);
                  }}
                  aria-current={activeId === link.href ? "page" : undefined}
                  className={cn(
                    "relative py-1 text-sm font-medium tracking-wide text-cream-100/90 transition-colors hover:text-coral-400",
                    "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:rounded-full after:bg-coral-500 after:transition-all after:duration-300",
                    activeId === link.href ? "text-coral-400 after:w-full" : "after:w-0 hover:after:w-full"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* Hamburger */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-cream-50/10 md:hidden"
          >
            <span
              className={cn(
                "h-0.5 w-6 rounded-full bg-cream-50 transition-all duration-300",
                isOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "h-0.5 w-6 rounded-full bg-cream-50 transition-all duration-300",
                isOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "h-0.5 w-6 rounded-full bg-cream-50 transition-all duration-300",
                isOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isOpen}
        activeId={activeId}
        onNavigate={handleNavigate}
        onClose={() => setIsOpen(false)}
      />
    </header>
  );
}

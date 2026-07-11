import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { NAV_LINKS } from "../data/navLinks";
import { cn } from "../utils/cn";

interface MobileMenuProps {
  isOpen: boolean;
  activeId: string;
  onNavigate: (href: string) => void;
  onClose: () => void;
}

const MENU_ICONS: Record<string, ReactNode> = {
  home: (
    <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.5Z" />
  ),
  about: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10.5V17" />
      <path d="M12 7.5h.01" />
    </>
  ),
  skills: (
    <>
      <path d="m12 3 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 17 8 4 8-4" />
    </>
  ),
  projects: (
    <path d="M3.5 7.5A1.5 1.5 0 0 1 5 6h5l2 2h7a1.5 1.5 0 0 1 1.5 1.5V18A1.5 1.5 0 0 1 19 19.5H5A1.5 1.5 0 0 1 3.5 18V7.5Z" />
  ),
  experience: (
    <>
      <rect x="4" y="7" width="16" height="12" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M4 12h16" />
    </>
  ),
  contact: (
    <>
      <path d="M16 8.5v5a4 4 0 1 1-2.1-3.52" />
      <path d="M16 13.5a2 2 0 0 0 4 0V12a8 8 0 1 0-3.2 6.4" />
    </>
  ),
};

function MenuIcon({ href }: { href: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {MENU_ICONS[href]}
    </svg>
  );
}

/**
 * Full-screen animated drawer used on mobile & tablet. Slides in from the
 * right with a blurred backdrop and closes automatically on link click.
 */
export default function MobileMenu({ isOpen, activeId, onNavigate, onClose }: MobileMenuProps) {
  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[60] min-h-dvh transition-all duration-300 md:hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!isOpen}
    >
      {/* Blurred backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-plum-950/65 backdrop-blur-md transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        className={cn(
          "fixed bottom-3 right-3 top-3 flex w-[min(82vw,320px)] flex-col rounded-[28px] border border-cream-100/15 bg-plum-950/70 px-5 pb-8 pt-24 shadow-[0_24px_70px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-2xl transition-all duration-300 ease-out",
          isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-cream-100/10 bg-cream-100/10 text-cream-100/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-colors hover:bg-cream-100/15"
        >
          <span className="relative h-5 w-5">
            <span className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
            <span className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
          </span>
        </button>

        {NAV_LINKS.map((link, index) => (
          <div key={link.href} className="relative">
            <span
              aria-hidden="true"
              className={cn(
                "absolute -left-3 top-1/2 h-10 w-1 -translate-y-1/2 rounded-full bg-coral-400 shadow-[0_0_18px_rgba(232,131,111,0.85)] transition-opacity duration-300",
                activeId === link.href ? "opacity-100" : "opacity-0"
              )}
            />
            <button
              onClick={() => onNavigate(link.href)}
              style={{ transitionDelay: isOpen ? `${index * 60}ms` : "0ms" }}
              className={cn(
                "flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-left text-base font-semibold tracking-wide transition-all duration-300",
                isOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
                activeId === link.href
                  ? "border-coral-300/35 bg-coral-500/55 text-cream-50 shadow-[0_10px_28px_rgba(232,131,111,0.42),inset_0_1px_0_rgba(255,255,255,0.22)]"
                  : "border-cream-100/0 bg-transparent text-cream-100/75 hover:border-cream-100/10 hover:bg-cream-100/10 hover:text-cream-50"
              )}
            >
              <MenuIcon href={link.href} />
              <span>{link.label}</span>
            </button>
          </div>
        ))}
      </nav>
    </div>,
    document.body
  );
}

import { NAV_LINKS } from "../data/navLinks";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/shezan.ra20/",
    path: "M12 2.2c2.7 0 3 0 4 .1 1 .1 1.7.2 2.3.5.6.2 1.1.6 1.6 1.1.5.5.8 1 1.1 1.6.3.6.4 1.3.5 2.3.1 1 .1 1.3.1 4s0 3-.1 4c-.1 1-.2 1.7-.5 2.3-.2.6-.6 1.1-1.1 1.6-.5.5-1 .8-1.6 1.1-.6.3-1.3.4-2.3.5-1 .1-1.3.1-4 .1s-3 0-4-.1c-1-.1-1.7-.2-2.3-.5a4.4 4.4 0 0 1-1.6-1.1 4.4 4.4 0 0 1-1.1-1.6c-.3-.6-.4-1.3-.5-2.3-.1-1-.1-1.3-.1-4s0-3 .1-4c.1-1 .2-1.7.5-2.3.2-.6.6-1.1 1.1-1.6.5-.5 1-.8 1.6-1.1.6-.3 1.3-.4 2.3-.5 1-.1 1.3-.1 4-.1ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-8.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61560974070543",
    path: "M13.5 21v-7.7h2.6l.4-3h-3v-1.9c0-.9.2-1.5 1.5-1.5h1.6V4.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.2H7.9v3h2.6V21h3Z",
  },
  {
    label: "GitHub",
    href: "https://github.com/shezan16",
    path: "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5.1 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/8801942959770",
    path: "M12.04 2a9.9 9.9 0 0 0-8.5 15.1L2.4 21.3l4.3-1.1A9.95 9.95 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-2.5.7.7-2.4-.2-.3a8.1 8.1 0 1 1 6.4 3.3Zm4.4-6.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8.9-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2.1-.3 0-.5 0-.1-.6-1.4-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.1 1.6.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1-.1-.2-.3-.3-.5-.4Z",
  },
];

/**
 * Footer with brand blurb, quick links, contact info and social icons
 * that glow on hover, plus a copyright bar.
 */
export default function Footer() {
  return (
    <footer id="footer" className="bg-dark-950 pt-14 text-cream-100 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-8 border-b border-cream-100/10 pb-10 text-center sm:grid-cols-3 sm:gap-10 sm:pb-12 sm:text-left">
          <div>
            <img
              src="/images/shezan-logo-cream-bold.png"
              alt="Shezan"
              className="mx-auto h-20 w-auto object-contain drop-shadow-[0_0_16px_rgba(232,131,111,0.32)] sm:mx-0 sm:h-24"
            />
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-cream-100/60 sm:mx-0">
              Building modern, responsive web experiences with clean code, intuitive UI, and seamless user interactions.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-coral-400">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col items-center gap-2 sm:items-start">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={`#${link.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-cream-100/70 transition-colors hover:text-coral-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-coral-400">
              Contact Info
            </h3>
            <ul className="mt-4 flex flex-col items-center gap-2 text-sm text-cream-100/70 sm:items-start">
              <li>
                <a
                  href="mailto:shezanridwan16220@gmail.com"
                  className="break-all transition-colors hover:text-coral-400"
                >
                  shezanridwan16220@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801942959770"
                  className="transition-colors hover:text-coral-400"
                >
                  +8801942959770
                </a>
              </li>
              <li>Daffodil Smart City, Dhaka</li>
            </ul>

            <div className="mt-5 flex justify-center gap-3 sm:justify-start">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-cream-100/10 transition-all duration-300 hover:-translate-y-1 hover:bg-coral-500 hover:shadow-lg hover:shadow-coral-500/40"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-cream-100 transition-colors group-hover:text-white"
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="py-6 text-center text-xs text-cream-100/50">
          &copy; {new Date().getFullYear()} Ridwan Ahamed Shezan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

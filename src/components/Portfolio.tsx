import { useEffect, useState } from "react";
import { PROJECTS } from "../data/projects";
import { cn } from "../utils/cn";
import Button from "./ui/Button";

const MOBILE_INITIAL_COUNT = 4;
const DESKTOP_INITIAL_COUNT = 6;
const CARD_TILTS = [
  "-rotate-3 translate-y-1",
  "rotate-2 -translate-y-2",
  "-rotate-[2deg] translate-y-3",
  "rotate-3 -translate-y-1",
  "-rotate-[2.5deg] -translate-y-2",
  "rotate-[2.2deg] translate-y-2",
];

/**
 * Projects / portfolio grid with compact preview cards and a "View More"
 * button to progressively reveal additional work.
 */
export default function Portfolio() {
  const getInitialCount = () => (
    typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches
      ? MOBILE_INITIAL_COUNT
      : DESKTOP_INITIAL_COUNT
  );
  const [visibleCount, setVisibleCount] = useState(getInitialCount);
  const projects = PROJECTS.slice(0, visibleCount);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const updateCount = () => {
      setVisibleCount((current) => (
        current >= PROJECTS.length
          ? current
          : media.matches
            ? MOBILE_INITIAL_COUNT
            : DESKTOP_INITIAL_COUNT
      ));
    };

    updateCount();
    media.addEventListener("change", updateCount);
    return () => media.removeEventListener("change", updateCount);
  }, []);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-cream-50 py-16 sm:py-28"
    >
      <div className="pointer-events-none absolute -left-28 top-24 h-64 w-64 rounded-full bg-coral-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-10 h-72 w-72 rounded-full bg-mauve-500/20 blur-3xl" />
      <span className="pointer-events-none absolute left-[8%] top-20 h-5 w-5 rotate-12 rounded-md bg-gradient-to-br from-emerald-300 to-emerald-500 shadow-lg animate-float-slow" />
      <span className="pointer-events-none absolute right-[12%] top-28 h-8 w-8 rounded-full bg-gradient-to-br from-coral-400 to-coral-600 shadow-xl animate-float-medium" />
      <span className="pointer-events-none absolute bottom-24 left-[14%] h-7 w-7 rounded-md bg-gradient-to-br from-coral-300 to-mauve-500 shadow-lg animate-float-slow" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-3 text-left sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-3xl font-bold text-plum-900 sm:text-5xl">Projects</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-coral-500/50 via-mauve-500/30 to-transparent sm:mb-3" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={index % 2 === 0 ? "animate-project-float" : "animate-project-float-delayed"}
              style={{ animationDelay: `${index * 140}ms` }}
            >
              <article
                className={cn(
                  "group relative overflow-hidden rounded-[1.65rem] bg-gradient-to-br from-coral-400/70 via-mauve-500/55 to-plum-700/70 p-1.5 shadow-[0_16px_34px_rgba(52,32,47,0.24)] transition-all duration-500",
                  "before:pointer-events-none before:absolute before:-left-16 before:top-0 before:h-full before:w-12 before:-skew-x-12 before:bg-cream-50/35 before:opacity-0 before:blur-sm before:transition-all before:duration-700",
                  "after:pointer-events-none after:absolute after:-right-8 after:-top-8 after:h-20 after:w-20 after:rounded-full after:bg-coral-400/25 after:blur-2xl after:transition-opacity after:duration-500",
                  "hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_24px_48px_rgba(52,32,47,0.34)] hover:before:left-[120%] hover:before:opacity-100 hover:after:opacity-90",
                  "max-sm:rotate-0 max-sm:translate-y-0",
                  CARD_TILTS[index % CARD_TILTS.length]
                )}
              >
                <div className="relative rounded-[1.35rem] bg-plum-950/92 p-2 shadow-inner sm:p-3">
                  <div className="absolute left-4 top-4 z-10 rounded-full bg-coral-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-lg shadow-coral-500/35 sm:left-5 sm:top-5 sm:px-2.5 sm:py-1 sm:text-[10px]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-coral-400/20">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-coral-400/20 via-transparent to-plum-950/45 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  <div className="mt-3 flex items-start justify-between gap-2 sm:gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-xs font-extrabold text-cream-50 sm:text-sm">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-[11px] font-semibold text-cream-100/65 sm:text-xs">{project.category}</p>
                      <p className="mt-1 hidden rounded-full bg-coral-500/20 px-2 py-0.5 text-[11px] font-semibold text-coral-400 sm:inline-flex">
                        Creative build
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`More options for ${project.title}`}
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream-50/10 text-cream-100/75 shadow-sm transition-all hover:bg-coral-500 hover:text-white sm:mt-1 sm:h-7 sm:w-7"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <circle cx="5" cy="12" r="1.8" />
                        <circle cx="12" cy="12" r="1.8" />
                        <circle cx="19" cy="12" r="1.8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {visibleCount < PROJECTS.length && (
          <div className="mt-8 text-center sm:mt-10">
            <Button
              variant="ghost"
              className="bg-mauve-600 px-7 text-cream-50 shadow-lg shadow-mauve-600/25 hover:bg-mauve-500"
              onClick={() => setVisibleCount(PROJECTS.length)}
            >
              View More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

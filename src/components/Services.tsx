import { SKILL_BARS, SKILL_TAGS } from "../data/skills";

/**
 * Skills section — animated progress bars paired with skill tag pills,
 * on the warm cream background used throughout the design.
 */
export default function Services() {
  return (
    <section id="skills" className="bg-cream-100 py-16 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-10">
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="font-display text-3xl font-bold text-plum-900 sm:text-5xl">Skills</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Progress bars */}
          <div className="flex flex-col gap-7 sm:gap-8">
            {SKILL_BARS.map((skill) => (
              <div key={skill.label} className="animate-slide-up">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-plum-900 sm:text-base">{skill.label}</p>
                  <span className="text-sm font-medium text-coral-600">{skill.value}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-cream-50 shadow-inner">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-coral-500 to-mauve-500 transition-all duration-1000 ease-out"
                    style={{ width: `${skill.value}%` }}
                    role="progressbar"
                    aria-valuenow={skill.value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={skill.label}
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-plum-900 px-3 py-1 text-xs font-medium text-cream-100 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-plum-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tag cloud card */}
          <div className="flex flex-col justify-center rounded-3xl bg-plum-900 p-6 shadow-xl sm:p-8">
            <h3 className="font-display text-xl font-bold text-cream-50">Badges &amp; Highlights</h3>
            <p className="mt-2 text-sm text-cream-100/70">
              A quick snapshot of the toolkits, certifications and soft skills I rely on
              every day.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              {SKILL_TAGS.map((tag, i) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-2 text-xs font-semibold tracking-wide text-white shadow-md transition-transform duration-300 hover:-translate-y-1 sm:px-4"
                  style={{
                    backgroundColor: i % 2 === 0 ? "var(--color-coral-500)" : "var(--color-mauve-600)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

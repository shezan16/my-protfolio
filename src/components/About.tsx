export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream-50 py-14 sm:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-10">
        <div className="relative mx-auto w-full max-w-3xl animate-slide-up lg:max-w-none">
          <div className="absolute -bottom-4 left-5 right-5 top-7 -rotate-3 rounded-lg bg-mauve-600 shadow-2xl sm:-bottom-5 sm:left-8 sm:right-8" />
          <div className="absolute -right-1 -top-4 h-[90%] w-[54%] rotate-6 rounded-lg bg-coral-400 shadow-xl sm:-right-3 sm:-top-5" />
          <div className="absolute -bottom-1 right-3 h-[78%] w-[48%] -rotate-2 rounded-lg bg-coral-500/75 shadow-xl sm:right-8" />

          <article className="relative rounded-lg border border-cream-200 bg-cream-100 p-5 shadow-[0_20px_45px_rgba(52,32,47,0.25)] sm:p-7">
            <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_190px] sm:gap-7 md:grid-cols-[1fr_220px]">
              <div className="max-w-md">
                <h2 className="font-display text-3xl font-extrabold leading-tight text-plum-950 sm:text-4xl">
                  About Us
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-plum-800/80">
                  As a Full Stack Web Developer, I build modern web applications that combine clean design, efficient code, and reliable performance.
                </p>
                <div className="mt-5 inline-flex flex-col">
                  <span className="font-display text-base font-semibold italic text-plum-900">
                    Ridwan Shezan
                  </span>
                  <span className="mt-1 h-1 w-28 -rotate-1 rounded-full bg-coral-500" />
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[210px] rotate-3 rounded-lg bg-cream-50 p-3 shadow-[0_16px_30px_rgba(52,32,47,0.22)] transition-transform duration-500 hover:rotate-0 sm:mx-0 sm:ml-auto">
                <img
                  src="/images/portrait.jpg"
                  alt="Portrait of Ridwan Ahamed Shezan"
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-md object-cover object-center"
                />
              </div>
            </div>
          </article>
        </div>

        <div className="animate-slide-up text-center lg:text-left">
          <h2 className="font-display text-4xl font-bold text-plum-900 sm:text-5xl">About</h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-plum-800/80 lg:mx-0">
            Hi, I'm Ridwan Ahamed Shezan, a Computer Science and Engineering (CSE) student at Daffodil International University. I am passionate about web development and enjoy creating modern, responsive, and user-friendly web applications.
          </p>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-plum-800/70 lg:mx-0">
            I completed the Complete Web Development Course from Programming Hero, where I built a strong foundation in full-stack development. Beyond structured learning, I continuously improve my skills through self-learning, hands-on projects, and exploring modern web technologies. I believe in learning by building and always strive to create clean, efficient, and impactful digital solutions.
          </p>
          <div className="mx-auto mt-6 grid max-w-md grid-cols-3 gap-3 lg:mx-0">
            {[
              { label: "Years", value: "1+" },
              { label: "Projects", value: "6+" },
              { label: "Clients", value: "4+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-cream-100 px-3 py-3 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <p className="font-display text-xl font-bold text-coral-600">{stat.value}</p>
                <p className="text-[11px] uppercase tracking-wide text-plum-800/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

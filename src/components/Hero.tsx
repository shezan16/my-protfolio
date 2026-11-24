import Button from "./ui/Button";
import CursorRevealPhoto from "./CursorRevealPhoto";
import HeroGridBackground from "./HeroGridBackground";

/**
 * Hero / landing section. Deep #251720 plum-charcoal 3D tile grid with
 * matching warm inner light when tiles separate, paired with a floating
 * portrait composition and decorative shapes.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#251720] px-0 pb-16 pt-12 sm:pb-24 sm:pt-20 lg:pt-24"
    >
      {/* Three.js 3D Grid & Inner Gap Light Background */}
      <HeroGridBackground className="pointer-events-none absolute inset-0 z-0 h-full w-full" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:gap-16 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:px-10">
        {/* Text content */}
        <div className="relative z-10 animate-slide-up text-center lg:text-left">
          <div className="mb-3 flex items-baseline justify-center gap-2 text-coral-400 lg:justify-start">
            <h2 className="font-display text-4xl font-bold sm:text-5xl">Hi</h2>
            <h4 className="font-display text-xl font-semibold sm:text-2xl">
              I&apos;m
            </h4>
          </div>
          <h1 className="font-display text-[2.75rem] font-extrabold leading-[1.05] text-cream-50 text-shadow-soft sm:text-6xl lg:text-7xl">
            Ridwan Ahamed
            <br />
            Shezan
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-cream-100/80 sm:mt-5 sm:text-lg lg:mx-0">
            Full Stack Developer / UI Designer
          </p>
          <div className="mt-6 flex flex-row flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4 lg:justify-start">
            <Button
              variant="primary"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5 animate-hire-icon"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8 7V6a4 4 0 0 1 8 0v1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M5 7h14a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 13h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Hire Me
            </Button>
            <Button
              variant="secondary"
              onClick={() => window.open("https://t.me/shezan1666", "_blank")}
            >
              <img
                src="/images/telegram.png"
                alt=""
                aria-hidden="true"
                className="h-5 w-5 animate-contact-icon object-contain invert"
              />
              Contact
            </Button>
          </div>
        </div>

        {/* Floating portrait composition */}
        <div className="relative mx-auto flex h-[312px] w-[272px] items-center justify-center sm:h-[420px] sm:w-[360px] lg:ml-auto lg:mr-0">
          {/* Decorative shapes */}
          <span className="absolute -left-6 top-6 h-6 w-6 rotate-12 rounded-md bg-gradient-to-br from-emerald-300 to-emerald-500 shadow-lg animate-float-slow" />
          <span className="absolute right-2 top-0 h-10 w-10 rounded-full bg-gradient-to-br from-coral-400 to-coral-600 shadow-xl animate-float-medium" />
          <span className="absolute -right-8 bottom-24 h-8 w-8 rounded-md bg-gradient-to-br from-coral-300 to-mauve-500 shadow-lg animate-float-slow" />
          <span className="absolute -left-10 bottom-10 h-9 w-9 rounded-full bg-gradient-to-br from-mauve-500 to-plum-700 shadow-lg animate-float-medium" />
          <span className="absolute bottom-0 left-1/3 h-14 w-14 rounded-full bg-coral-500/40 blur-xl" />

          <div className="relative h-[272px] w-[216px] rotate-3 rounded-[2rem] bg-gradient-to-br from-coral-400/60 via-mauve-500/50 to-plum-700/60 p-2 shadow-2xl transition-transform duration-500 hover:rotate-0 sm:h-[360px] sm:w-[280px]">
            <CursorRevealPhoto
              baseImage="/images/portrait.jpg"
              revealImage="/images/portrait-reveal.jpg"
              alt="Portrait of Ridwan Ahamed, creative developer and UI designer"
              brushRadius={40}
              fadeSpeed={0.012}
              className="h-full w-full rounded-[1.6rem] shadow-inner"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
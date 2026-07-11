import { useEffect, useRef, useState } from "react";
import { EXPERIENCE } from "../data/experience";

/**
 * Experience timeline section on a dark, warm-brown background with
 * alternating milestone cards connected by a vertical line.
 */
export default function Testimonials() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const previousProgressRef = useRef(0);
  const targetPositionRef = useRef(0);
  const currentPositionRef = useRef(0);
  const hasMeasuredPositionRef = useRef(false);
  const [carPosition, setCarPosition] = useState(0);
  const [carDirection, setCarDirection] = useState<"up" | "down">("down");
  const [activeLampIndex, setActiveLampIndex] = useState(0);

  useEffect(() => {
    let measureFrameId = 0;
    let motionFrameId = 0;

    const animateCarPosition = () => {
      const distance = targetPositionRef.current - currentPositionRef.current;

      if (Math.abs(distance) < 0.006) {
        currentPositionRef.current = targetPositionRef.current;
        setCarPosition(targetPositionRef.current);
        motionFrameId = 0;
        return;
      }

      currentPositionRef.current += distance * 0.02;
      setCarPosition(currentPositionRef.current);
      motionFrameId = requestAnimationFrame(animateCarPosition);
    };

    const startCarMotion = () => {
      if (!motionFrameId) {
        motionFrameId = requestAnimationFrame(animateCarPosition);
      }
    };

    const updateCarTarget = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const focusPoint = window.innerHeight * 0.74;
      const progress = (focusPoint - rect.top) / rect.height;
      const clampedProgress = Math.min(1, Math.max(0, progress));
      const scrollPosition = clampedProgress * 100;
      const lampPositions = itemRefs.current.map((item) => {
        if (!item || !timelineRef.current) return 0;
        return Math.min(100, Math.max(0, ((item.offsetTop + 8) / timelineRef.current.offsetHeight) * 100));
      });
      const closestLampIndex = lampPositions.length > 0 ? lampPositions.reduce((closestIndex, lampPosition, index) => {
        const closestDistance = Math.abs(lampPositions[closestIndex] - scrollPosition);
        const currentDistance = Math.abs(lampPosition - scrollPosition);
        return currentDistance < closestDistance ? index : closestIndex;
      }, 0) : 0;
      const nextPosition = scrollPosition;

      if (!hasMeasuredPositionRef.current) {
        hasMeasuredPositionRef.current = true;
        previousProgressRef.current = nextPosition;
        targetPositionRef.current = nextPosition;
        currentPositionRef.current = nextPosition;
        setCarPosition(nextPosition);
        setActiveLampIndex(closestLampIndex);
        return;
      }

      if (Math.abs(nextPosition - previousProgressRef.current) > 0.34) {
        setCarDirection(nextPosition > previousProgressRef.current ? "down" : "up");
        previousProgressRef.current = nextPosition;
      }

      targetPositionRef.current = nextPosition;
      setActiveLampIndex(closestLampIndex);
      startCarMotion();
    };

    const handleScroll = () => {
      cancelAnimationFrame(measureFrameId);
      measureFrameId = requestAnimationFrame(updateCarTarget);
    };

    updateCarTarget();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(measureFrameId);
      cancelAnimationFrame(motionFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section id="experience" className="relative overflow-hidden bg-dark-900 py-16 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-10">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="font-display text-3xl font-bold text-cream-50 sm:text-5xl">Experience</h2>
        </div>

        <ol ref={timelineRef} className="relative">
          <div className="absolute bottom-2 left-1/2 top-2 w-[34px] -translate-x-1/2 overflow-visible sm:w-[48px]">
            <span aria-hidden="true" className="timeline-road-track" />
            <div
              className={`timeline-car-marker pointer-events-none absolute left-1/2 z-20 h-[44px] w-[24px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:h-[58px] sm:w-[32px] ${
                carDirection === "down" ? "rotate-0" : "rotate-180"
              }`}
              style={{ top: `${carPosition}%` }}
            >
              <span aria-hidden="true" className="timeline-car-aura" />
              <span aria-hidden="true" className="timeline-car-shadow" />
              <img
                src="/images/timeline-car.png"
                alt=""
                aria-hidden="true"
                className="timeline-car-image h-full w-full animate-car-glide object-contain"
              />
            </div>
          </div>

          {EXPERIENCE.map((item, index) => {
            const isLeft = item.side === "left";
            return (
              <li
                key={`${item.period}-${item.title}`}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                className={`relative mb-10 flex min-h-[136px] items-center justify-between gap-0 last:mb-0 sm:mb-12 sm:min-h-0 ${
                  isLeft ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`timeline-streetlamp ${
                    isLeft ? "timeline-streetlamp-left" : "timeline-streetlamp-right"
                  } ${
                    activeLampIndex === index ? "timeline-streetlamp-active" : ""
                  }`}
                />
                <div className={`w-[calc(50%_-_30px)] max-w-[170px] sm:w-1/2 sm:max-w-none ${
                  isLeft ? "pr-3 text-right sm:pr-12" : "pl-3 text-left sm:pl-12"
                }`}>
                  <div className="inline-block w-full rounded-xl bg-dark-800 px-3 py-3 shadow-lg transition-transform duration-300 hover:-translate-y-1 sm:w-auto sm:rounded-2xl sm:px-5 sm:py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-coral-400 sm:text-xs sm:tracking-widest">
                      {item.period}
                    </p>
                    <h3 className="mt-1 break-words font-display text-sm font-semibold leading-snug text-cream-50 sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1 break-words text-xs leading-snug text-cream-100/60 sm:text-sm">{item.company}</p>
                  </div>
                </div>
                <div className="w-[calc(50%_-_30px)] max-w-[170px] sm:w-1/2 sm:max-w-none" />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

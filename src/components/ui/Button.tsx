import { ButtonHTMLAttributes, MouseEvent, ReactNode, useState } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

/**
 * Reusable button with a built-in ripple effect, hover animation and
 * accessible focus/disabled states. Used across the whole site.
 */
export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
  ...rest
}: ButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-coral-500 text-white hover:bg-coral-600 shadow-lg shadow-coral-500/30 focus-visible:outline-coral-600",
    secondary:
      "bg-transparent text-cream-50 border border-cream-100/60 hover:bg-cream-50/10 focus-visible:outline-cream-100",
    ghost:
      "bg-plum-900 text-cream-50 hover:bg-plum-800 focus-visible:outline-plum-800",
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const newRipple: Ripple = {
      id: Date.now(),
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top - size / 2,
      size,
    };
    setRipples((prev) => [...prev, newRipple]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 650);
    onClick?.(e);
  };

  return (
    <button
      className={cn(
        "relative isolate overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ease-out",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100",
        "hover:-translate-y-0.5 active:translate-y-0",
        variants[variant],
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap">
        {children}
      </span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/40"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animation: "ripple 0.65s ease-out",
          }}
        />
      ))}
    </button>
  );
}

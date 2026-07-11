import { FormEvent, useState } from "react";
import Button from "./ui/Button";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const INITIAL_STATE: FormState = { name: "", email: "", message: "" };

/**
 * Contact section with a lightweight, accessible controlled form.
 * Simulates a submission and shows a success confirmation.
 */
export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    setForm(INITIAL_STATE);
    window.setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="bg-cream-100 py-16 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-8 lg:px-10">
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="font-display text-3xl font-bold text-plum-900 sm:text-5xl">Contact</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-plum-800/70">
            Have a project in mind? Fill out the form below and I'll get back to you
            within a couple of days.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="animate-slide-up rounded-3xl bg-cream-50 p-5 shadow-xl sm:p-8"
          noValidate
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-plum-800/70">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange("name")}
                placeholder="Your name"
                className="rounded-xl border border-plum-900/10 bg-white px-4 py-3 text-sm text-plum-900 shadow-sm outline-none transition-all duration-300 placeholder:text-plum-800/40 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/30"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-plum-800/70">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange("email")}
                placeholder="you@example.com"
                className="rounded-xl border border-plum-900/10 bg-white px-4 py-3 text-sm text-plum-900 shadow-sm outline-none transition-all duration-300 placeholder:text-plum-800/40 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/30"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-1.5 sm:mt-5">
            <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-plum-800/70">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange("message")}
              placeholder="Tell me about your project..."
              className="resize-none rounded-xl border border-plum-900/10 bg-white px-4 py-3 text-sm text-plum-900 shadow-sm outline-none transition-all duration-300 placeholder:text-plum-800/40 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/30"
            />
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              Send
            </Button>
            <p
              role="status"
              aria-live="polite"
              className={`min-h-5 text-center text-sm font-medium text-emerald-600 transition-opacity duration-300 sm:text-left ${
                submitted ? "opacity-100" : "opacity-0"
              }`}
            >
              Message sent! I'll be in touch soon.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

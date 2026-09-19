import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Github, Facebook, Mail } from "lucide-react";
import type { Theme } from "../../theme";

interface ContactProps {
  theme: Theme;
  onNavigate: (section: string) => void;
  onViewWork: () => void;
}

const contacts = [
  {
    icon: Github,
    name: "GitHub",
    href: "https://github.com/strwbiezxcv-matt/strwbiezxcv.git",
  },
  { icon: Facebook, name: "Facebook", href: "https://www.facebook.com/share/1EBh9FixjC/" },
  {
    icon: Mail,
    name: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=mattbianzon43@gmail.com",
  },
];

const quotes = [
  {
    quote: "Technology is best when it brings people together.",
    author: "Matt Mullenweg",
  },
  {
    quote: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
  },
  {
    quote: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    quote: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
  },
  {
    quote: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
  },
  {
    quote: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    quote: "Any sufficiently advanced technology is indistinguishable from magic.",
    author: "Arthur C. Clarke",
  },
];

export default function Contact({ theme, onNavigate, onViewWork }: ContactProps) {
  const [activeQuote, setActiveQuote] = useState(0);

  /* Auto-rotate one quote every 5 seconds, cleaned up on unmount */
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);

  const q = quotes[activeQuote];
  return (
    <section id="contact" className="relative flex flex-col justify-start px-6 pt-24 pb-16 overflow-hidden">
      {/* Ambient decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-diag-lines opacity-60" />
        <span className="deco-plus" style={{ top: "18%", left: "10%" }} />
        <span className="deco-plus" style={{ bottom: "22%", right: "9%" }} />
        <span className="pulse-dot absolute size-1.5 rounded-full bg-brand/50" style={{ top: "36%", right: "16%" }} />
      </div>
      <div className="relative mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="section-num-rule" />
            <span className="section-num">09 · CONTACT</span>
            <span className="section-num-rule" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Let&apos;s Create Together
          </h2>
          <div className="mx-auto w-24 h-1 rounded-full bg-brand mb-6" />
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${theme.muted}`}>
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we can bring your vision to life.
          </p>

          {/* Status line — technical marker */}
          <div className="tech-divider mb-8">
            <span className="status-dot" aria-hidden="true" />
            <span className="tech-label">Available for projects · 2026</span>
          </div>

          <div className="flex justify-center gap-8">
            {contacts.map((social, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                onClick={() => window.open(social.href, "_blank")}
                className="flex flex-col items-center cursor-pointer group gap-2.5 will-change-transform"
              >
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-4 rounded-full border transition-all duration-300 group-hover:border-brand/60 group-hover:bg-brand/10 ${theme.chip}`}
                >
                  <social.icon size={24} className={theme.icon} />
                </motion.div>
                <span className={`text-sm group-hover:text-brand transition-colors duration-300 ${theme.muted}`}>
                  {social.name}
                </span>
              </motion.div>
            ))}
          </div>

        </motion.div>

        {/* ── Floating rotating quote ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto mt-14 w-full max-w-2xl md:max-w-3xl px-4"
        >
          {/* corner brackets — extremely subtle */}
          <span className="floating-quote-corner fqc-tl" aria-hidden="true" />
          <span className="floating-quote-corner fqc-tr" aria-hidden="true" />
          <span className="floating-quote-corner fqc-bl" aria-hidden="true" />
          <span className="floating-quote-corner fqc-br" aria-hidden="true" />

          {/* top technical line */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
            <span className="section-num">QUOTE</span>
            <span className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
          </div>

          {/* slowly floating, container-free quote */}
          <div className="quote-float relative">
            <AnimatePresence mode="wait">
              <motion.figure
                key={activeQuote}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
                className="text-center relative px-6 md:px-10 py-2"
              >
                {/* large subtle quotation mark */}
                <span
                  className="absolute -top-3 left-2 md:left-6 text-6xl leading-none text-brand/25 select-none pointer-events-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <blockquote className="text-xl md:text-2xl italic leading-relaxed text-gray-800 dark:text-gray-200">
                  {q.quote}
                </blockquote>

                <figcaption className={`mt-4 flex items-center justify-center gap-2 text-sm ${theme.muted}`}>
                  <span className="size-1 rounded-full bg-brand inline-block" aria-hidden="true" />
                  <span className="text-brand">— {q.author}</span>
                  <span className="size-1 rounded-full bg-brand inline-block" aria-hidden="true" />
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* bottom technical line + indicator */}
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
            <span className="flex items-center gap-1.5" aria-label={`Quote ${activeQuote + 1} of ${quotes.length}`}>
              {quotes.map((_, i) => (
                <span
                  key={i}
                  className={`rounded-full transition-all duration-500 ${
                    i === activeQuote
                      ? "size-1.5 bg-brand"
                      : "size-1 bg-gray-300 dark:bg-white/25"
                  }`}
                />
              ))}
            </span>
            <span className="section-num">{String(activeQuote + 1).padStart(2, "0")} / {String(quotes.length).padStart(2, "0")}</span>
            <span className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
          </div>
        </motion.div>

        <div className="mt-12">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate("about")}
            className={`${theme.btnGhost} will-change-transform`}
          >
            Back to Top
          </motion.button>
        </div>
      </div>
    </section>
  );
}
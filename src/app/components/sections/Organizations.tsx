import { motion } from "motion/react";
import type { CSSProperties } from "react";
import type { Theme } from "../../theme";
import { organizations } from "../../data";

interface OrganizationsProps {
  theme: Theme;
  isDark: boolean;
  onNavigate: (section: string) => void;
}

export default function Organizations({ theme, isDark, onNavigate }: OrganizationsProps) {
  const blendFor = (blend: string): CSSProperties["mixBlendMode"] => {
    // "screen" blends a logo into white and becomes invisible on light backgrounds.
    // Use it only in dark mode; fall back to "multiply" in light mode.
    if (blend === "screen") return isDark ? "screen" : "multiply";
    return blend as CSSProperties["mixBlendMode"];
  };

  return (
    <section id="work" className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Ambient decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="deco-plus" style={{ top: "14%", left: "6%" }} />
        <span className="deco-plus" style={{ bottom: "18%", right: "5%" }} />
        <span className="pulse-dot absolute size-1.5 rounded-full bg-brand/50" style={{ top: "24%", right: "12%" }} />
        <span className="pulse-dot absolute size-1.5 rounded-full bg-brand/40" style={{ bottom: "30%", left: "10%", animationDelay: "2s" }} />
      </div>
      <div className="relative mx-auto max-w-5xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="section-num-rule" />
            <span className="section-num">04 · COMMITTEES</span>
            <span className="section-num-rule" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Committees, Organizations, and Work
          </h2>
          <p className={`mb-10 text-sm uppercase tracking-[0.2em] ${theme.muted}`}>
            That I&apos;ve been part of.
          </p>
          

          <div className="corner-frame inline-grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {organizations.map((org, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex flex-col items-center gap-4"
              >
                <div className={`w-full rounded-lg border p-4 h-28 flex items-center justify-center transition-all duration-300 group-hover:border-brand/50 group-hover:-translate-y-1 group-hover:shadow-lg ${theme.card} ${theme.cardHover}`}>
                  <img
                    src={org.image}
                    alt={org.name}
                    className="logo-glow max-h-full max-w-full object-contain rounded p-1 grayscale contrast-100 mix-blend-[var(--logo-blend)] transition-all duration-500 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:bg-white"
                    style={{ "--logo-blend": blendFor(org.blend) } as CSSProperties}
                  />
                </div>
                <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] leading-snug ${theme.muted} transition-colors duration-300 group-hover:text-brand`}>
                  {org.name}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <button onClick={() => onNavigate("certifications")} className={theme.btnGhost}>
              View Certifications &amp; Trainings
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
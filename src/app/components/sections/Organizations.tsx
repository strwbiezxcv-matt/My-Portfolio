import { motion } from "motion/react";
import type { Theme } from "../../theme";
import { organizations } from "../../data";

interface OrganizationsProps {
  theme: Theme;
  isDark: boolean;
  onNavigate: (section: string) => void;
}

export default function Organizations({ theme, isDark, onNavigate }: OrganizationsProps) {
  const blendFor = (blend: string) => {
    // "screen" blends a logo into white and becomes invisible on light backgrounds.
    // Use it only in dark mode; fall back to "multiply" in light mode.
    if (blend === "screen") return isDark ? "screen" : "multiply";
    return blend;
  };

  return (
    <section id="work" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="mx-auto max-w-5xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Committees, Organizations, and Work
          </h2>
          <p className={`mb-10 text-sm uppercase tracking-[0.2em] ${theme.muted}`}>
            That I&apos;ve been part of.
          </p>
          

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {organizations.map((org, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex flex-col items-center gap-4"
              >
                <div className={`w-full rounded-lg border p-4 h-28 flex items-center justify-center transition-all duration-300 group-hover:border-brand/50 ${theme.card} ${theme.cardHover}`}>
                  <img
                    src={org.image}
                    alt={org.name}
                    className="max-h-full max-w-full object-contain transition-all duration-500"
                    style={{ filter: "grayscale(1) contrast(1)", mixBlendMode: blendFor(org.blend) }}
                    onMouseEnter={(e) => e.currentTarget.style.filter = "grayscale(0) contrast(1)"}
                    onMouseLeave={(e) => e.currentTarget.style.filter = "grayscale(1) contrast(1)"}
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
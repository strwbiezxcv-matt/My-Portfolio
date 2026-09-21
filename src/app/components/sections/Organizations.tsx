import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { organizations } from "../../data";
import type { Theme } from "../../theme";

const reveal = { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const };

/* ── Logo compositing ──────────────────────────────────────────────────────────
   `mix-blend-mode: multiply` is what seats two of the logos (the BulSU crest and
   BSCPE 4B) seamlessly on the tile: both ship as 24-bit PNGs with an opaque
   white/cream box, so multiply drops the box into the tile while keeping the
   artwork. It is only correct over a LIGHT surface, though — multiplied against
   this card's dark background every pixel collapses toward black and the marks
   (including ICPEP's near-black badge) vanish. Multiply is therefore scoped to
   light mode, dark mode composites normally, and the tile itself stays light in
   both themes (see the logo tile in the card below). Same rule as the logo strip
   in About.tsx. */
type OrgBlend = (typeof organizations)[number]["blend"];

const blendFor = (blend: OrgBlend, isDark: boolean): CSSProperties["mixBlendMode"] =>
  isDark ? "normal" : blend;

interface OrganizationsProps {
  theme: Theme;
  isDark: boolean;
  /* Reserved for future in-section navigation (passed by App). */
  onNavigate?: (section: string) => void;
}

/* Organizations & Affiliations — alternating futuristic timeline.
   Affiliations are grouped inline within their organization card.
   Cards are perfectly straight; desktop alternates left/right around a
   glowing central spine, mobile collapses to a single readable column. */
export default function Organizations({ theme, isDark }: OrganizationsProps) {
  return (
    <section id="work" className={`relative overflow-hidden px-6 py-16 lg:py-20 ${theme.tintAlt}`}>
      {/* Ambient accents */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-fine opacity-50" />
        <span className="deco-shape size-40 rounded-full float-slow absolute" style={{ top: "6%", left: "4%" }} />
        <span className="deco-plus absolute" style={{ bottom: "12%", right: "6%" }} />
        <span className="pulse-dot absolute size-1.5 rounded-full bg-brand/50" style={{ top: "18%", right: "10%" }} />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reveal}
          className="mb-10 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="section-num-rule" />
            <span className="section-num">04 · ORGANIZATIONS &amp; AFFILIATIONS</span>
            <span className="section-num-rule" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Organizations &amp; Affiliations</h2>
          <p className={`mt-3 text-lg ${theme.muted}`}>
            The communities I&apos;ve been part of — and the roles I&apos;ve carried in each.
          </p>
        </motion.div>

        {/* Alternating timeline */}
        <div className="relative">
          {/* Central spine (desktop only) */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 origin-top bg-gradient-to-b from-brand/0 via-brand/30 to-brand/0 md:block"
          />

          {organizations.map((org, index) => {
            const left = index % 2 === 0;
            return (
              <div key={org.name} className="relative mb-8 last:mb-0 md:grid md:grid-cols-2 md:items-stretch md:gap-10">
                {/* Node on the spine (desktop) / rail dot (mobile) */}
                <span
                  aria-hidden="true"
                  className="absolute left-4 top-8 z-10 flex size-4 -translate-x-1/2 items-center justify-center md:left-1/2"
                >
                  <motion.span
                    className="absolute size-4 rounded-full bg-brand/20"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.35 }}
                  />
                  <span className="relative size-2 rounded-full bg-brand ring-2 ring-brand/25" />
                </span>

                <motion.div
                  initial={{ opacity: 0, x: left ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ ...reveal, delay: 0.05 }}
                  whileHover={{ y: -4 }}
                  className={`group ml-10 flex h-full min-h-[10.5rem] w-full flex-col rounded-xl border p-5 backdrop-blur-sm transition-shadow duration-300 will-change-transform md:ml-0 ${theme.card} ${
                    left ? "md:col-start-1 md:mr-auto md:max-w-[95%]" : "md:col-start-2 md:ml-auto md:max-w-[95%]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Logo tile — deliberately LIGHT in both themes: multiply only
                        works over a light surface, and the two logos that ship with an
                        opaque white/cream box plus ICPEP's dark badge need a light
                        backdrop to stay legible on the dark card (see blendFor above). */}
                    <div
                      className={`flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border p-2 transition-colors duration-500 dark:border-white/20 dark:bg-[#f4f6f1] ${theme.chip}`}
                    >
                      <img
                        src={org.image}
                        alt={org.name}
                        width={160}
                        height={160}
                        className="max-h-full max-w-full object-contain"
                        style={{ mixBlendMode: blendFor(org.blend, isDark) }}
                        draggable={false}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold leading-tight tracking-tight">{org.name}</h3>
                      {org.period && (
                        <span className={`mt-1 inline-block font-mono text-[10px] uppercase tracking-[0.2em] ${theme.faint}`}>
                          {org.period}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Grouped affiliations */}
                  {org.affiliations && org.affiliations.length > 0 && (
                    <ul className="mt-4 space-y-2 border-t border-dashed border-brand/20 pt-3">
                      {org.affiliations.map((aff, i) => (
                        <li key={i} className="flex items-baseline justify-between gap-3">
                          <span className={`flex items-baseline gap-2 text-sm ${theme.text}`}>
                            <span className="size-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                            {aff.role}
                          </span>
                          {aff.period && (
                            <span className={`shrink-0 font-mono text-[10px] uppercase tracking-wider ${theme.faint}`}>
                              {aff.period}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

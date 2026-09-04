import { motion } from "motion/react";
import { Award } from "lucide-react";
import type { Theme } from "../../theme";
import { affiliations } from "../../data";

interface AffiliationsProps {
  theme: Theme;
  onNavigate: (section: string) => void;
}

export default function Affiliations({ theme, onNavigate }: AffiliationsProps) {
  return (
    <section id="affiliations" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="mx-auto max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Affiliations &amp; Leadership
          </h2>
          <p className={`mb-4 text-sm uppercase tracking-[0.2em] ${theme.muted}`}>
            Roles that shaped my journey
          </p>
          <div className="mx-auto w-24 h-1 rounded-full bg-brand" />
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-6 md:pl-10">
          <span className={`absolute left-2 md:left-4 top-0 bottom-0 w-0.5 ${theme.borderAccent}`} />
          <div className="space-y-7">
            {affiliations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="relative pl-2"
              >
                {/* dot */}
                <span className={`absolute -left-7 md:-left-10 top-1.5 h-2.5 w-2.5 rounded-full ${theme.dot}`} />
                <span className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wider mb-1.5 ${theme.chip}`}>
                  {item.period}
                </span>
                <h3 className="text-lg font-semibold leading-snug">{item.role}</h3>
                <p className={`text-sm ${theme.muted}`}>{item.org}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <button onClick={() => onNavigate("certifications")} className={theme.btnGhost}>
            View Certifications &amp; Trainings
          </button>
        </div>
      </div>
    </section>
  );
}
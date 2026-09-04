import { motion } from "motion/react";
import { Briefcase } from "lucide-react";
import type { Theme } from "../../theme";
import { experience } from "../../data";

interface ExperienceProps {
  theme: Theme;
  onNavigate: (section: string) => void;
}

export default function Experience({ theme, onNavigate }: ExperienceProps) {
  return (
    <section id="experience" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="mx-auto max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Experience</h2>
          <div className="mx-auto w-24 h-1 rounded-full bg-brand" />
        </motion.div>

        <div className="space-y-8">
          {experience.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6 }}
              className={`p-7 md:p-8 rounded-lg ${theme.card} ${theme.cardHover} transition-shadow duration-300 will-change-transform`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-md ${theme.chip}`}>
                    <Briefcase size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{job.company}</h3>
                    <p className={`font-medium mt-0.5 ${theme.text}`}>{job.role}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full ${theme.chip}`}>
                  {job.period}
                </span>
              </div>

              <ul className="mt-5 space-y-2.5">
                {job.details.map((detail, idx) => (
                  <li key={idx} className={`flex gap-3 text-sm leading-relaxed ${theme.muted}`}>
                    <span className={`mt-2 h-1.5 w-1.5 rounded-full shrink-0 ${theme.dot}`} />
                    <span className="text-base">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button onClick={() => onNavigate("affiliations")} className={theme.btnGhost}>
            View Affiliations &amp; Leadership
          </button>
        </div>
      </div>
    </section>
  );
}
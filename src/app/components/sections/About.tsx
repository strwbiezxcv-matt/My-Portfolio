import { motion } from "motion/react";
import { Code, Palette, Zap } from "lucide-react";
import type { Theme } from "../../theme";

interface AboutProps {
  theme: Theme;
  onViewPubmats: () => void;
  onNavigate: (section: string) => void;
}

const skills = [
  {
    icon: Code,
    title: "Development",
    desc: "Turning ideas into bold, functional digital experiences.",
  },
  {
    icon: Palette,
    title: "Design",
    desc: "Crafting meaningful visuals through creativity, balance,and storytelling.",
  },
  {
    icon: Zap,
    title: "Performance",
    desc: "Designing with purpose, precision,and attention to every detail.",
  },
];

export default function About({ theme, onViewPubmats, onNavigate }: AboutProps) {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="mx-auto max-w-6xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            About Me
          </h2>
          <div className="mx-auto w-24 h-1 rounded-full bg-brand mb-10" />
          <div className="mx-auto max-w-2xl text-center space-y-5">
            <p className={`text-xl leading-relaxed ${theme.text}`}>
              I&apos;m a passionate creative designer and layout artist with 3 years of experience crafting memorable digital designs. I believe in transforming ideas into reality.
            </p>
            <p className={`text-xl leading-relaxed ${theme.muted}`}>
              My approach combines strategic thinking, innovative design,and technical excellence to create solutions that not only look beautiful but deliver measurable results.
            </p>
          </div>

          {/* Pubmats + Experience buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-10 mb-14">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onViewPubmats()}
              className={`${theme.btnPrimary} will-change-transform`}
            >
              <Palette size={18} /> View Pubmats
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("experience")}
              className={`${theme.btnGhost} will-change-transform`}
            >
              See My Experience
            </motion.button>
          </div>

          {/* Skills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {skills.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -6, scale: 1.015 }}
                className={`p-7 rounded-lg ${theme.card} ${theme.cardHover} transition-shadow duration-300 will-change-transform`}
              >
                <item.icon size={32} strokeWidth={1.5} className={`mb-3 ${theme.icon}`} />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className={`text-sm leading-relaxed ${theme.muted}`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
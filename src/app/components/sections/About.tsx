import { motion } from "motion/react";
import { Code, Palette, Zap, ArrowRight, Instagram, Facebook, Mail } from "lucide-react";
import type { Theme } from "../../theme";
import ProfilePhoto from "../ProfilePhoto";

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

const socials = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/_strwbiezxcv?igsh=MWdubWIzNm9qYTM0Yw==",
  },
  { icon: Facebook, href: "https://www.facebook.com/share/1EBh9FixjC/" },
  {
    icon: Mail,
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=mattbianzon43@gmail.com&su=Portfolio%20Inquiry&body=Hello",
  },
];

const reveal = { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const };

export default function About({ theme, onViewPubmats, onNavigate }: AboutProps) {
  return (
    <section id="about" className={`relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden ${theme.tintAlt}`}>
      {/* Ambient decorations — merged hero + about accents */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-fine opacity-60" />
        <div className="absolute inset-0 bg-dots-green opacity-50" />
        <span className="deco-shape size-44 rounded-full float-slow absolute" style={{ top: "8%", right: "5%" }} />
        <span className="deco-shape size-24 float-slow-rev absolute" style={{ bottom: "14%", left: "4%" }} />
        <span className="deco-plus" style={{ top: "16%", left: "8%" }} />
        <span className="deco-plus" style={{ bottom: "20%", right: "7%" }} />
        <span className="pulse-dot absolute size-1.5 rounded-full bg-brand/50" style={{ top: "30%", right: "14%" }} />
        <span className="pulse-dot absolute size-1.5 rounded-full bg-brand/40" style={{ bottom: "26%", left: "10%", animationDelay: "1.6s" }} />
        <span className="tech-label absolute top-6 left-8 hidden md:block">// Creative Designer</span>
        <span className="tech-label absolute top-6 right-8 hidden md:block">// Computer Engineering</span>
      </div>
      <div className="relative mx-auto max-w-6xl w-full text-center corner-frame">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="section-num-rule" />
            <span className="section-num">01 · ABOUT</span>
            <span className="section-num-rule" />
          </div>

          {/* ── Intro block (former Home hero, merged into About) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex justify-center order-first lg:order-none"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                className="will-change-transform"
              >
                <ProfilePhoto />
              </motion.div>
            </motion.div>

            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...reveal, delay: 0.3 }}
                className="mb-4"
              >
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${theme.chip}`}>
                  Computer Engineer / Graphic Artist / Layout Artist / Creatives
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...reveal, delay: 0.35 }}
                className="text-5xl md:text-6xl font-bold tracking-tight mb-3"
              >
                Hi! I&apos;m Matt
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...reveal, delay: 0.45 }}
                className={`text-xl md:text-2xl font-medium mb-4 ${theme.text}`}
              >
                Web Developer and Graphic Designer
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...reveal, delay: 0.55 }}
                className={`text-lg leading-relaxed mb-8 max-w-xl max-lg:mx-auto ${theme.muted}`}
              >
                A creative graphic artist with a strong eye for visual storytelling and hands-on experience in graphic design, branding, digital content, and creative media turning ideas into engaging and impactful visual solutions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...reveal, delay: 0.65 }}
                className="flex flex-wrap gap-3 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate("work")}
                  className={`${theme.btnPrimary} will-change-transform`}
                >
                  View My Work <ArrowRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate("contact")}
                  className={`${theme.btnGhost} will-change-transform`}
                >
                  Get In Touch
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...reveal, delay: 0.75 }}
                className="flex gap-3 mt-8 justify-center lg:justify-start"
              >
                {socials.map((social, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => window.open(social.href, "_blank")}
                    className={`p-3 rounded-full border transition-colors duration-300 ${theme.chip} hover:bg-brand/20 will-change-transform`}
                    aria-label={social.icon.name}
                  >
                    <social.icon size={18} />
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ── About narrative ── */}
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            About Me
          </h2>
          <div className="mx-auto w-24 h-1 rounded-full bg-brand mb-10" />
          <div className="mx-auto max-w-2xl text-center space-y-5">
            <p className={`text-xl leading-relaxed ${theme.text}`}>
              I'm a passionate creative designer, layout artist, and web developer with 3 years of experience turning ideas into engaging digital experiences. I combine visual creativity with technical expertise to create designs and websites that are both visually compelling and functional.
            </p>
            <p className={`text-xl leading-relaxed ${theme.muted}`}>
              My approach combines strategic thinking, innovative design, and technical excellence to create solutions that not only look beautiful but deliver measurable results.
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
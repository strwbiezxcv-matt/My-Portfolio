import { type ComponentType } from "react";
import { motion } from "motion/react";
import { Code, Palette, Zap, ArrowRight, Instagram, Facebook, Mail, Cpu, SquareCode } from "lucide-react";
import {
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTypescript,
  SiNodedotjs,
  SiMysql,
  SiSupabase,
  SiFigma,
  SiBlender,
  SiApachenetbeanside,
  SiArduino,
} from "react-icons/si";
/* Authentic brand marks: Devicons Java coffee-cup logo + Adobe Photoshop "Ps" */
import { DiJava, DiPhotoshop } from "react-icons/di";
import type { Theme } from "../../theme";
import ProfilePhoto from "../ProfilePhoto";
import { organizations } from "../../data";

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

/* ── Organization-logo carousel ─────────────────────────────────────────────────
   Straight horizontal strip that lives in the Hero. The logos stay upright (no
   rotation, no curve), keep their own aspect ratio and float on no
   background/container of their own. The complete set is repeated (see
   LOGO_SET_COPIES) and drifts exactly one set to the left on a slow linear loop,
   so a set is always entering as the previous one leaves. Motion uses `left`
   (not transform) on purpose: a transformed ancestor would isolate the logos from
   the page backdrop and reveal the opaque box of the two logos that ship with a
   white/cream background.
   `multiply` is scoped to LIGHT mode only (`dark:mix-blend-normal`): over the dark
   page backdrop multiply would crush every pixel toward black and leave the logos
   invisible, so dark mode composites normally and keeps each logo's true colors. */
const LOGO_SET_COPIES = 7; // covers wide/ultra-wide strip viewports with no gap

function OrgLogoGroup() {
  return (
    <div className="org-marquee-group">
      {organizations.map((org) => (
        <img
          key={org.name}
          src={org.image}
          alt={org.name}
          draggable={false}
          className={`org-marquee-logo ${org.blend === "multiply" ? "mix-blend-multiply dark:mix-blend-normal" : ""}`}
        />
      ))}
    </div>
  );
}

function OrgCarousel() {
  return (
    <div className="org-marquee">
      {/* The complete set is repeated enough times that the track always covers the
          strip viewport — as copy #1 scrolls away, the identical copies behind it
          are already in place (loop distance = exactly ONE set, see --org-shift). */}
      {Array.from({ length: LOGO_SET_COPIES }, (_, copy) => (
        <OrgLogoGroup key={copy} />
      ))}
    </div>
  );
}

/* ── Official Canva brand mark (disc with the Canva script glyph knocked out) ── */
function CanvaMark({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80ZM57.2691 48.2052C56.939 48.2052 56.6485 48.484 56.3462 49.0928C52.9323 56.0153 47.0358 60.9134 40.2125 60.9134C32.3228 60.9134 27.437 53.7913 27.437 43.9522C27.437 27.2855 36.7232 17.6491 44.8796 17.6491C48.691 17.6491 51.0186 20.0443 51.0186 23.8559C51.0186 28.3796 48.4485 30.7748 48.4485 32.3702C48.4485 33.0864 48.8939 33.5201 49.7773 33.5201C53.3264 33.5201 57.4918 29.4419 57.4918 23.6808C57.4918 18.0947 52.63 13.9888 44.4737 13.9888C30.994 13.9888 19.0142 26.4858 19.0142 43.777C19.0142 57.1614 26.6572 66.0061 38.45 66.0061C50.9668 66.0061 58.2043 53.5526 58.2043 49.5105C58.2043 48.6153 57.7466 48.2052 57.2691 48.2052Z"
      />
    </svg>
  );
}

type SkillItem = {
  name: string;
  years: string;
  icon: ComponentType<{ size?: number; className?: string }>;
};

const techStack: SkillItem[] = [
  { name: "C++", years: "1 yr", icon: SiCplusplus },
  { name: "Python", years: "1 yr", icon: SiPython },
  { name: "Java", years: "1 yr", icon: DiJava },
  { name: "JavaScript", years: "½ yr", icon: SiJavascript },
  { name: "HTML", years: "½ yr", icon: SiHtml5 },
  { name: "CSS", years: "½ yr", icon: SiCss },
  { name: "TypeScript", years: "½ yr", icon: SiTypescript },
  { name: "Node.js", years: "½ yr", icon: SiNodedotjs },
  { name: "SQL", years: "½ yr", icon: SiMysql },
  { name: "Supabase", years: "½ yr", icon: SiSupabase },
];

const tools: SkillItem[] = [
  { name: "Canva", years: "3 yrs", icon: CanvaMark },
  { name: "Figma", years: "2 yrs", icon: SiFigma },
  { name: "Blender", years: "½ yr", icon: SiBlender },
  { name: "Photoshop", years: "", icon: DiPhotoshop },
];

const ides: { name: string; icon: ComponentType<{ size?: number; className?: string }> }[] = [
  { name: "VS Code", icon: SquareCode },
  { name: "NetBeans", icon: SiApachenetbeanside },
  { name: "Arduino IDE", icon: SiArduino },
  { name: "Proteus", icon: Cpu },
];

/* Unified futuristic chip/card style shared by Tech Stack, Tools and IDE */
const skillChipClass =
  "group inline-flex items-center gap-2.5 rounded-lg border border-gray-200/80 dark:border-white/[0.08] bg-white/40 dark:bg-white/[0.03] px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-[0_4px_16px_rgba(78,115,51,0.18)] dark:hover:shadow-[0_4px_16px_rgba(161,196,127,0.12)] will-change-transform";

export default function About({ theme, onViewPubmats, onNavigate }: AboutProps) {
  return (
    <div className={`relative overflow-hidden ${theme.tintAlt}`}>
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
      
      {/* ── HERO: one viewport tall, centered, with the organization-logo strip
             docked at its bottom so the carousel is visible without scrolling ── */}
      <section id="home" className="relative flex min-h-[100svh] w-full items-center justify-center px-6 pt-24 pb-32">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center text-left">
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
                  onClick={() => onNavigate("projects")}
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
                    className={`p-3 rounded-full border transition-colors duration-100 ${theme.chip} hover:bg-brand/20 will-change-transform`}
                    aria-label={social.icon.name}
                  >
                    <social.icon size={18} />
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>
          </motion.div>
        </div>

        {/* Organization logos — full-bleed drifting strip docked at the bottom of
            the hero (no transform ancestor, so the logos keep blending cleanly). */}
        <section
          aria-label="Organizations"
          className="absolute inset-x-0 bottom-8 w-full overflow-hidden py-3"
        >
          <OrgCarousel />
        </section>
      </section>

      {/* ── ABOUT: separate section below the hero — revealed only after scrolling ── */}
      <section id="about" className="relative w-full px-6 pt-16 pb-24">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mx-auto w-full max-w-6xl"
        >
          {/* ── About Me — futuristic developer interface ── */}
          <div className="mx-auto max-w-5xl text-left">
            <div className="mb-3 flex items-center gap-3">
              <span className="section-num-rule" />
              <span className="section-num">ABOUT</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight [text-shadow:0_0_28px_rgba(122,159,84,0.18)]">
              About Me
            </h2>
            {/* Two visual lines on desktop — width-driven only, no manual <br> tags. */}
            <p className={`text-lg md:text-xl leading-relaxed max-w-[50rem] ${theme.text}`}>
              I&apos;m a passionate creative designer, layout artist, and web developer with 3 years of experience turning ideas into engaging digital experiences.
            </p>
          </div>

          {/* TECH STACK — horizontal wrap */}
          <div className="mx-auto max-w-5xl mt-8 text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="size-1 rounded-full bg-brand inline-block" aria-hidden="true" />
              <span className="section-num">TECH STACK</span>
              <span className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {techStack.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className={skillChipClass}
                >
                  <t.icon size={20} className="shrink-0 text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-brand" />
                  <span className="text-sm font-medium leading-tight">{t.name}</span>
                  {t.years && <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{t.years}</span>}
                </motion.div>
              ))}
            </div>
          </div>

          {/* TOOLS — horizontal wrap, directly below Tech Stack */}
          <div className="mx-auto max-w-5xl mt-8 text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="size-1 rounded-full bg-brand inline-block" aria-hidden="true" />
              <span className="section-num">TOOLS</span>
              <span className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {tools.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className={skillChipClass}
                >
                  <t.icon size={20} className="shrink-0 text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-brand" />
                  <span className="text-sm font-medium leading-tight">{t.name}</span>
                  {t.years && <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{t.years}</span>}
                </motion.div>
              ))}
            </div>
          </div>

          {/* IDE — centered below Tools, same chip design */}
          <div className="mx-auto max-w-5xl mt-8 text-left">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-16 bg-gray-200 dark:bg-white/10" />
              <span className="size-1 rounded-full bg-brand inline-block" aria-hidden="true" />
              <span className="section-num">IDE</span>
              <span className="size-1 rounded-full bg-brand inline-block" aria-hidden="true" />
              <span className="h-px w-16 bg-gray-200 dark:bg-white/10" />
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {ides.map((ide, i) => (
                <motion.div
                  key={ide.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className={skillChipClass}
                >
                  <ide.icon size={20} className="shrink-0 text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-brand" />
                  <span className="text-sm font-medium leading-tight">{ide.name}</span>
                </motion.div>
              ))}
            </div>
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
                <div className="mb-3 flex items-center justify-between">
                  <item.icon size={30} strokeWidth={1.5} className={theme.icon} />
                  <span className="font-mono text-[10px] tracking-widest opacity-40">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className={`text-sm leading-relaxed ${theme.muted}`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Instagram, Facebook, Mail } from "lucide-react";
import type { Theme } from "../../theme";
import ProfilePhoto from "../ProfilePhoto";

interface HeroProps {
  theme: Theme;
  onNavigate: (section: string) => void;
}

const socials = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/_strwbiezxcv?igsh=MWdubWIzNm9qYTM0Yw==",
  },
  { icon: Facebook, href: "https://www.facebook.com/share/1EBh9FixjC/" },
  {
    icon: Mail,
    href:
      "https://mail.google.com/mail/?view=cm&fs=1&to=mattbianzon43@gmail.com&su=Portfolio%20Inquiry&body=Hello",
  },
];

const intro = { delay: 0.35, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const };

export default function Hero({ theme, onNavigate }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setParallax({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouse}
      className="relative min-h-screen flex items-center justify-center px-6 py-20 will-change-transform overflow-hidden"
    >
      {/* Subtle decorative background — grid + dots + floating geometry, mouse-parallaxed */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-fine opacity-70" />
        <motion.div
          animate={{ x: parallax.x * 10, y: parallax.y * 10 }}
          transition={{ type: "spring", stiffness: 40, damping: 20 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-dots-green opacity-60" />
          <div className="deco-shape size-44 rounded-full float-slow" style={{ top: "10%", right: "6%" }} />
          <div className="deco-shape size-24 float-slow-rev" style={{ bottom: "16%", left: "5%" }} />
          <div className="deco-shape size-3 rounded-full bg-brand/40 border-0 float-slow" style={{ top: "32%", left: "14%" }} />
          <div className="deco-shape size-6 float-slow-rev" style={{ top: "22%", left: "8%", transform: "rotate(45deg)" }} />
        </motion.div>
        {/* Technical crosshair marks */}
        <span className="deco-plus" style={{ top: "12%", left: "20%" }} />
        <span className="deco-plus" style={{ bottom: "14%", right: "18%" }} />
        <span className="deco-plus" style={{ top: "48%", right: "8%" }} />
        {/* Pulsing ambient dots */}
        <span className="pulse-dot absolute size-1.5 rounded-full bg-brand/60" style={{ top: "20%", left: "30%" }} />
        <span className="pulse-dot absolute size-1.5 rounded-full bg-brand/50" style={{ bottom: "26%", right: "30%", animationDelay: "1.6s" }} />
        {/* Technical corner labels */}
        <span className="tech-label absolute top-6 left-8 hidden md:block">// Creative Designer</span>
        <span className="tech-label absolute top-6 right-8 hidden md:block">// Computer Engineering</span>
        <span className="tech-label absolute bottom-6 left-8 hidden md:block">Web · Digital · Systems</span>
        <span className="tech-label absolute bottom-6 right-8 hidden md:block">EST. 2026 — Portfolio v2</span>
      </div>

      <div className="relative mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center corner-frame">
        {/* Profile photo with gentle float */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex justify-center lg:order-none order-first"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
            className="will-change-transform"
          >
            <ProfilePhoto />
          </motion.div>
        </motion.div>

        {/* Intro */}
        <div className="text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...intro, delay: 0.3 }} className="mb-4">
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${theme.chip}`}>
              Computer Engineer / Graphic Artist / Layout Artist / Creatives
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={intro} className="text-5xl md:text-6xl font-bold tracking-tight mb-3">
            Hi! I&apos;m Matt
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...intro, delay: 0.5 }} className={`text-xl md:text-2xl font-medium mb-4 ${theme.text}`}>
            Web Developer and Graphic Designer
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...intro, delay: 0.6 }} className={`text-lg leading-relaxed mb-8 max-w-xl ${theme.muted}`}>
            A creative graphic artist with a strong eye for visual storytelling and hands-on experience in graphic design, branding, digital content, and creative media turning ideas into engaging and impactful visual solutions.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...intro, delay: 0.7 }} className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => onNavigate("work")} className={`${theme.btnPrimary} will-change-transform`}>
              View My Work <ArrowRight size={18} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => onNavigate("contact")} className={`${theme.btnGhost} will-change-transform`}>
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...intro, delay: 0.8 }} className="flex gap-3 mt-8 justify-center lg:justify-start">
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
    </section>
  );
}
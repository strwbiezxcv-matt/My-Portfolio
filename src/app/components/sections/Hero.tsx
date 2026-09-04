import { motion } from "motion/react";
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
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20 will-change-transform">
      <div className="mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
            Creative Publications and Graphic Designer
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
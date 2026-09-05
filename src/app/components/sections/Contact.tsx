import { motion } from "motion/react";
import { Github, Facebook, Mail } from "lucide-react";
import type { Theme } from "../../theme";

interface ContactProps {
  theme: Theme;
  onNavigate: (section: string) => void;
  onViewWork: () => void;
}

const contacts = [
  {
    icon: Github,
    name: "GitHub",
    href: "https://github.com/strwbiezxcv-matt/strwbiezxcv.git",
  },
  { icon: Facebook, name: "Facebook", href: "https://www.facebook.com/share/1EBh9FixjC/" },
  {
    icon: Mail,
    name: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=mattbianzon43@gmail.com",
  },
];

export default function Contact({ theme, onNavigate, onViewWork }: ContactProps) {
  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Ambient decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-diag-lines opacity-60" />
        <span className="deco-plus" style={{ top: "18%", left: "10%" }} />
        <span className="deco-plus" style={{ bottom: "22%", right: "9%" }} />
        <span className="pulse-dot absolute size-1.5 rounded-full bg-brand/50" style={{ top: "36%", right: "16%" }} />
      </div>
      <div className="relative mx-auto max-w-3xl w-full text-center corner-frame">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="section-num-rule" />
            <span className="section-num">07 · CONTACT</span>
            <span className="section-num-rule" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Let&apos;s Create Together
          </h2>
          <div className="mx-auto w-24 h-1 rounded-full bg-brand mb-8" />
          <p className={`text-xl mb-10 max-w-2xl mx-auto ${theme.muted}`}>
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we can bring your vision to life.
          </p>

          <div className="flex justify-center gap-8">
            {contacts.map((social, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                onClick={() => window.open(social.href, "_blank")}
                className="flex flex-col items-center cursor-pointer group gap-2.5 will-change-transform"
              >
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-4 rounded-full border transition-all duration-300 group-hover:border-brand/60 group-hover:bg-brand/10 ${theme.chip}`}
                >
                  <social.icon size={24} className={theme.icon} />
                </motion.div>
                <span className={`text-sm group-hover:text-brand transition-colors duration-300 ${theme.muted}`}>
                  {social.name}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onViewWork()}
              className={`${theme.btnGhost} will-change-transform`}
            >
              Back to Top
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
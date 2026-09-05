import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BadgeCheck, GraduationCap, ArrowUpRight, Award, X, Maximize2 } from "lucide-react";
import type { Theme } from "../../theme";
import { certificates, seminars } from "../../data";
import { playSelect } from "../../utils/sound";

interface CertificationsProps {
  theme: Theme;
  onNavigate: (section: string) => void;
}

type CertItem = {
  title: string;
  category: string;
  type: string;
  period: string;
  description: string;
  image?: string;
};

/* Reusable interactive card inspired by a "browse & explore" project gallery. */
function CertCard({
  item,
  index,
  theme,
  onOpen,
}: {
  item: CertItem;
  index: number;
  theme: Theme;
  onOpen: (item: CertItem) => void;
}) {
  const hasImage = Boolean(item.image);
  const clickable = hasImage;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col overflow-hidden rounded-xl ${theme.thumb} ${theme.cardHover} transition-shadow duration-300 will-change-transform`}
    >
      {/* Image / thumbnail area */}
      <div className={`relative aspect-[4/3] w-full overflow-hidden ${theme.thumb}`}>
        {hasImage ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <Award size={40} strokeWidth={1.3} className="text-brand/70 transition-transform duration-500 group-hover:scale-110" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
              Certificate
            </span>
          </div>
        )}

        {/* Hover overlay with arrow */}
        <div className="absolute inset-0 bg-brand/0 transition-colors duration-300 group-hover:bg-brand/10" />
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/80 text-brand-strong opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100 dark:bg-white/90">
          <ArrowUpRight size={18} />
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${theme.chip}`}>
            {item.period}
          </span>
          <span className={`text-[11px] font-medium uppercase tracking-wider ${theme.muted}`}>
            {item.category}
          </span>
        </div>

        <h4 className="text-base font-semibold leading-snug transition-colors duration-300 group-hover:text-brand">
          {item.title}
        </h4>
        <p className={`mt-2 text-sm leading-relaxed ${theme.muted}`}>
          {item.description}
        </p>
      </div>

      {/* Clickable certificate overlay (only when the certificate has an image) */}
      {clickable && (
        <button
          type="button"
          aria-label={`View certificate: ${item.title}`}
          onClick={() => {
            playSelect();
            onOpen(item);
          }}
          className="absolute inset-0 z-10 cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          {/* "View certificate" hint pill, revealed on hover */}
          <span className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-2 items-center gap-1.5 rounded-full border border-white/40 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-strong shadow-sm backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-[#161c18]/85">
            <Maximize2 size={13} />
            View Certificate
          </span>
        </button>
      )}
    </motion.article>
  );
}

export default function Certifications({ theme, onNavigate }: CertificationsProps) {
  const [lightbox, setLightbox] = useState<CertItem | null>(null);

  /* Close on Escape and lock page scroll while the lightbox is open */
  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

  return (
    <section id="certifications" className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Ambient decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-diag-lines opacity-70" />
        <span className="deco-plus" style={{ top: "12%", right: "8%" }} />
        <span className="deco-plus" style={{ bottom: "16%", left: "7%" }} />
      </div>
      <div className="relative mx-auto max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="section-num-rule" />
            <span className="section-num">06 · CERTIFICATIONS</span>
            <span className="section-num-rule" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Certifications &amp; Trainings
          </h2>
          <div className="mx-auto w-24 h-1 rounded-full bg-brand" />
        </motion.div>

        {/* Certificates */}
        <div className="mb-14">
          <div className="mb-6 flex items-center gap-2.5">
            <span className={`flex h-8 w-8 items-center justify-center rounded-md ${theme.chip}`}>
              <BadgeCheck size={18} />
            </span>
            <h3 className="text-lg font-semibold tracking-tight">Certificates</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <CertCard key={cert.title} item={cert} index={index} theme={theme} onOpen={setLightbox} />
            ))}
          </div>
        </div>

        {/* Seminars & Trainings */}
        <div>
          <div className="mb-6 flex items-center gap-2.5">
            <span className={`flex h-8 w-8 items-center justify-center rounded-md ${theme.chip}`}>
              <GraduationCap size={18} />
            </span>
            <h3 className="text-lg font-semibold tracking-tight">Seminars &amp; Trainings</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {seminars.map((sem, index) => (
              <CertCard key={sem.title} item={sem} index={index} theme={theme} onOpen={setLightbox} />
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <button onClick={() => onNavigate("contact")} className={theme.btnGhost}>
            Get In Touch with Me
          </button>
        </div>
      </div>

      {/* Certificate Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate: ${lightbox.title}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative flex max-h-full w-full max-w-3xl flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close certificate view"
                className="absolute -top-12 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/90 text-gray-800 shadow-sm transition-colors duration-200 hover:bg-white dark:bg-[#161c18]/90 dark:text-gray-200 dark:hover:bg-[#1d2420]"
              >
                <X size={20} />
              </button>

              {/* Certificate image — preserves aspect ratio, no distortion */}
              <div className={`overflow-hidden rounded-xl shadow-2xl ${theme.card}`}>
                <img
                  src={lightbox.image}
                  alt={lightbox.title}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>

              {/* Caption */}
              <div className="mt-3 flex flex-wrap items-center gap-2 px-1">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${theme.chip}`}>
                  {lightbox.period}
                </span>
                <span className={`text-[11px] font-medium uppercase tracking-wider ${theme.muted}`}>
                  {lightbox.category}
                </span>
              </div>
              <h4 className="mt-2 px-1 text-sm font-semibold leading-snug">
                {lightbox.title}
              </h4>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
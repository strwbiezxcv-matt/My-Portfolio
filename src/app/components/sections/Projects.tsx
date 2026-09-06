import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Github, ExternalLink, Star, Volume2, VolumeX } from "lucide-react";
import type { Theme } from "../../theme";
import { projects, type Project } from "../../data";
import { initSoundPrefs, isMuted, setMuted, playHover, playSelect } from "../../utils/sound";

/* Learnix is the featured project — it is always the default active/front card.
   We look it up by title so it stays featured regardless of array position. */
const learnixStartIndex = projects.findIndex((p) => p.title === "Learnix");

interface ProjectsProps {
  theme: Theme;
  isDark: boolean;
  onNavigate: (section: string) => void;
}

type Slot = {
  x: number;        // % translateX
  y: number;        // px translateY
  rotate: number;   // deg
  scale: number;
  opacity: number;
  zIndex: number;
};

/* Stacked slot layout: [far-left] [left] [ACTIVE] [right] [far-right] */
function slotFor(offset: number, reduced: boolean): Slot {
  const r = (deg: number) => (reduced ? 0 : deg);
  switch (offset) {
    case 0:
      return { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 50 };
    case -1:
      return { x: -58, y: 14, rotate: r(-7), scale: 0.9, opacity: 0.75, zIndex: 40 };
    case 1:
      return { x: 58, y: 14, rotate: r(7), scale: 0.9, opacity: 0.75, zIndex: 40 };
    case -2:
      return { x: -102, y: 30, rotate: r(-13), scale: 0.8, opacity: 0.35, zIndex: 30 };
    case 2:
      return { x: 102, y: 30, rotate: r(13), scale: 0.8, opacity: 0.35, zIndex: 30 };
    default:
      return { x: 0, y: 60, rotate: 0, scale: 0.7, opacity: 0, zIndex: 0 };
  }
}

function ProjectCardBody({ project, isActive, theme }: { project: Project; isActive: boolean; theme: Theme }) {
    return (
    <div className="flex h-full w-full flex-col p-5 sm:p-7">
      {/* Project image (optional â€” only renders when provided) */}
      {project.image && (
        <div className="mb-4 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <img src={project.image} alt={`${project.title} screenshot`} className="w-full object-contain" />
        </div>
      )}

      {/* Tags */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-gray-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white dark:bg-gray-100 dark:text-gray-900">
          {project.category}
        </span>
        {project.year && (
          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-wider ${theme.chip}`}>
            {project.year}
          </span>
        )}
        {project.featured && (
          <span className="inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-strong">
            <Star size={11} /> Featured
          </span>
        )}
        {project.comingSoon && (
          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-wider ${theme.chip}`}>
            Not Available Yet
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{project.title}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${theme.muted}`}>{project.description}</p>

      {/* Tech + links */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className={`rounded border px-2 py-0.5 text-[11px] font-medium ${theme.muted} border-gray-200 dark:border-white/10`}
          >
            {tech}
          </span>
        ))}
      </div>

      {isActive && (project.liveUrl || project.githubUrl) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className={theme.btnPrimary}>
              <ExternalLink size={15} /> {project.liveLabel ?? "Live Demo"}
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className={theme.btnGhost}>
              <Github size={15} /> {project.githubLabel ?? "GitHub"}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function Projects({ theme, isDark, onNavigate }: ProjectsProps) {
  const [active, setActive] = useState(() => (learnixStartIndex >= 0 ? learnixStartIndex : 0));
  const [soundOn, setSoundOn] = useState<boolean>(() => (typeof window === "undefined" ? true : !isMuted()));
  const [reduced, setReduced] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = projects.length;

  useEffect(() => {
    initSoundPrefs();
    setSoundOn(!isMuted());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const goTo = useCallback(
    (index: number, announce: boolean) => {
      setActive(((index % count) + count) % count);
      if (announce) playSelect();
    },
    [count]
  );

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setMuted(!next);
    if (next) playSelect();
  };

  const offsetFor = (index: number) => {
    let offset = index - active;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset;
  };

  /* Touch swipe */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    goTo(active + (dx < 0 ? 1 : -1), true);
  };

  const duration = reduced ? 0.15 : 0.5;
  const ease = [0.25, 0.46, 0.45, 0.94] as const;

  return (
    <section id="projects" className={`relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-20 sm:px-6 ${theme.tintAlt}`}>
      {/* Technical grid backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-60" aria-hidden="true" />
      <span className="deco-plus pointer-events-none absolute" style={{ top: "10%", left: "5%" }} aria-hidden="true" />
      <span className="deco-plus pointer-events-none absolute" style={{ bottom: "12%", right: "6%" }} aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-6 flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleSound}
                aria-label={soundOn ? "Mute interaction sounds" : "Enable interaction sounds"}
                title={soundOn ? "Mute sounds" : "Enable sounds"}
                className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition-colors duration-300 ${
                  isDark
                    ? "border-white/15 text-gray-300 hover:border-brand/50 hover:text-brand"
                    : "border-gray-300 text-gray-500 hover:border-brand/50 hover:text-brand"
                }`}
              >
                {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <button
                type="button"
                onClick={() => onNavigate("contact")}
                className={`cursor-pointer text-xs uppercase tracking-[0.25em] font-pixel transition-colors duration-300 sm:text-sm ${theme.link}`}
              >
                ALL PROJECTS â†’
              </button>
            </div>
          </div>

          {/* Title + subtitle â€” same style as the other sections */}
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="section-num-rule" />
              <span className="section-num">03 Â· PROJECTS</span>
              <span className="section-num-rule" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Projects</h2>
            <p className={`mb-10 text-sm uppercase tracking-[0.2em] ${theme.muted}`}>
              Things I&apos;ve built, designed, and worked on.
            </p>
          </div>

          {/* Card stack */}
          <div
            className="relative mx-auto h-[540px] w-full max-w-xl select-none sm:h-[520px]"
            style={{ perspective: "1200px" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {projects.map((project, index) => {
              const offset = offsetFor(index);
              const slot = slotFor(offset, reduced);
              const isActive = offset === 0;
              return (
                <motion.div
                  key={project.title}
                  initial={false}
                  animate={{
                    x: `${slot.x}%`,
                    y: slot.y,
                    rotate: slot.rotate,
                    scale: slot.scale,
                    opacity: slot.opacity,
                  }}
                  transition={{ duration, ease }}
                  style={{ zIndex: slot.zIndex }}
                  whileHover={
                    isActive
                      ? { y: -12, scale: 1.02, rotate: 0 }
                      : {
                          y: slot.y - 10,
                          rotate: slot.rotate * 0.4,
                          scale: slot.scale + 0.02,
                          opacity: Math.min(slot.opacity + 0.2, 1),
                        }
                  }
                  onMouseEnter={() => {
                    if (!reduced) playHover();
                  }}
                  onClick={() => !isActive && goTo(index, true)}
                  role={isActive ? "group" : "button"}
                  aria-label={isActive ? `Active project: ${project.title}` : `Show project: ${project.title}`}
                  className={`absolute inset-x-0 top-0 mx-auto w-full cursor-pointer rounded-2xl border shadow-lg transition-shadow duration-300 will-change-transform hover:shadow-2xl ${
                    isDark
                      ? "border-white/10 bg-[#161c18] hover:shadow-black/50"
                      : "border-gray-200 bg-white hover:shadow-black/10"
                  }`}
                >
                  <ProjectCardBody project={project} isActive={isActive} theme={theme} />
                </motion.div>
              );
            })}
          </div>

          {/* Prev / next controls + dots */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo(active - 1, true)}
              aria-label="Previous project"
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors duration-300 ${
                isDark
                  ? "border-white/15 text-gray-300 hover:border-brand/50 hover:text-brand"
                  : "border-gray-300 text-gray-600 hover:border-brand/50 hover:text-brand"
              }`}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  aria-label={`Go to project: ${project.title}`}
                  onClick={() => goTo(index, true)}
                  className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                    index === active ? "w-6 bg-brand" : isDark ? "w-2 bg-white/20 hover:bg-white/40" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(active + 1, true)}
              aria-label="Next project"
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors duration-300 ${
                isDark
                  ? "border-white/15 text-gray-300 hover:border-brand/50 hover:text-brand"
                  : "border-gray-300 text-gray-600 hover:border-brand/50 hover:text-brand"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </motion.div>
      </div>
    </section>
  );
}



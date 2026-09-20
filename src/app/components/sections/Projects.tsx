import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Github, ExternalLink, Star, Volume2, VolumeX, Sparkles } from "lucide-react";
import { SiReact, SiTypescript, SiSupabase } from "react-icons/si";
import type { ComponentType } from "react";
import type { Theme } from "../../theme";
import { projects, type Project } from "../../data";
import { initSoundPrefs, isMuted, setMuted, playHover, playSelect } from "../../utils/sound";

const techIcons: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  React: SiReact,
  TypeScript: SiTypescript,
  Supabase: SiSupabase,
  AI: Sparkles,
};

function TechChip({ name, theme }: { name: string; theme: Theme }) {
  const Icon = techIcons[name];
  return (
    <span
      className={`tech-chip group/tech ring-glow inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[11px] font-medium tracking-wide ${theme.chip}`}
    >
      {Icon ? (
        <Icon size={14} className="shrink-0 text-brand transition-colors duration-300 group-hover/tech:text-brand-strong" />
      ) : (
        <span className="size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
      )}
      {name}
    </span>
  );
}

interface ProjectsProps {
  theme: Theme;
  isDark: boolean;
  onNavigate: (section: string) => void;
}

function ProjectCardBody({ project, theme }: { project: Project; theme: Theme }) {
  return (
    <div className="flex h-full w-full flex-col p-5 sm:p-7">
      {project.image && (
        <div className="group/img relative mb-5 w-full overflow-hidden rounded-lg border border-gray-200/70 bg-gray-100 dark:border-white/10 dark:bg-gray-800">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full object-contain transition-transform duration-500 ease-out group-hover/img:scale-[1.02]"
          />
        </div>
      )}

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-md bg-gray-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white dark:bg-gray-100 dark:text-gray-900">
          {project.category}
        </span>
        {project.year && (
          <span className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${theme.chip}`}>
            {project.year}
          </span>
        )}
        {project.featured && (
          <span className="inline-flex items-center gap-1 rounded-md border border-brand/30 bg-brand/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-strong">
            <Star size={11} /> Featured
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{project.title}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${theme.muted}`}>{project.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {project.technologies.map((tech) => (
          <TechChip key={tech} name={tech} theme={theme} />
        ))}
      </div>

      {(project.liveUrl || project.githubUrl) && (
        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-2">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={theme.btnPrimary}>
                <ExternalLink size={15} /> {project.liveLabel ?? "Live Demo"}
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={theme.btnGhost}>
                <Github size={15} /> {project.githubLabel ?? "GitHub"}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Projects({ theme, isDark }: ProjectsProps) {
  const [soundOn, setSoundOn] = useState<boolean>(() => (typeof window === "undefined" ? true : !isMuted()));

  useEffect(() => {
    initSoundPrefs();
    setSoundOn(!isMuted());
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setMuted(!next);
    if (next) playSelect();
  };

  return (
    <section id="projects" className={`relative flex items-center justify-center overflow-hidden px-4 py-20 sm:px-6 ${theme.tintAlt}`}>
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
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="section-num-rule" />
              <span className="section-num">03 · PROJECTS</span>
              <span className="section-num-rule" />
            </div>
            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundOn ? "Mute sound effects" : "Unmute sound effects"}
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition-colors duration-300 ${theme.navBtn}`}
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: 44, y: 44 }}
                whileInView={{
                  opacity: 1,
                  /* circle-roll entrance: the card glides along a quarter-arc
                     (offset x+y in sync) while staying perfectly upright. */
                  x: [44, 18, 0],
                  y: [44, 10, 0],
                }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.9,
                  times: [0, 0.55, 1],
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ y: -6 }}
                onMouseEnter={() => playHover()}
                className={`group relative cursor-default rounded-2xl border shadow-lg transition-shadow duration-300 will-change-transform hover:shadow-2xl ${
                  isDark
                    ? "border-white/10 bg-[#161c18] hover:shadow-black/50"
                    : "border-gray-200 bg-white hover:shadow-black/10"
                }`}
              >
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-3 hidden md:block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 1, 0] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.12, duration: 1.6, ease: "easeInOut" }}
                >
                  <motion.span
                    className="absolute inset-0 block"
                    initial={{ rotate: 0 }}
                    whileInView={{ rotate: 360 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.12, duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-brand ring-glow" />
                  </motion.span>
                </motion.span>

                <ProjectCardBody project={project} theme={theme} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

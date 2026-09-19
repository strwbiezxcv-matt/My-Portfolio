import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, ArrowUpRight, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Theme } from "../../theme";
import ResumeTemplateDetail from "../ResumeTemplateDetail";

interface MaterialsProps {
  theme: Theme;
}

/* ── Materials registry — append new templates/materials here ────
   Set `action: "resume-template"` to open the template detail view
   (product page with preview + "Download free"); future entries can
   add their own actions. `comingSoon` renders a locked card.  */

interface Material {
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  action?: "resume-template";
  comingSoon?: boolean;
}

const materials: Material[] = [
  {
    title: "Resume Template",
    description: "Editable Microsoft Word resume template designed for students and applicants.",
    tags: ["Editable", "DOCX"],
    icon: FileText,
    action: "resume-template",
  },
];

export default function Materials({ theme }: MaterialsProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const openMaterial = (material: Material) => {
    if (material.action === "resume-template") setIsPreviewOpen(true);
  };

  return (
    <section
      id="materials"
      className={`relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden ${theme.tintAlt}`}
    >
      {/* Ambient decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="deco-plus" style={{ top: "14%", left: "7%" }} />
        <span className="deco-plus" style={{ bottom: "18%", right: "6%" }} />
        <span className="pulse-dot absolute size-1.5 rounded-full bg-brand/50" style={{ top: "26%", right: "12%" }} />
        <span className="pulse-dot absolute size-1.5 rounded-full bg-brand/40" style={{ bottom: "30%", left: "9%", animationDelay: "1.8s" }} />
      </div>

      <div className="relative mx-auto max-w-5xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="section-num-rule" />
            <span className="section-num">08 · MATERIALS</span>
            <span className="section-num-rule" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Materials</h2>
          <p className={`mb-4 text-sm uppercase tracking-[0.2em] ${theme.muted}`}>
            Templates &amp; resources you can use
          </p>
          <div className="mx-auto w-24 h-1 rounded-full bg-brand mb-12" />
        </motion.div>

        {/* Material cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {materials.map((material, index) => {
            const Icon = material.icon;
            return (
              <motion.div
                key={material.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -6 }}
                className={`group flex flex-col p-6 rounded-xl ${theme.card} ${theme.cardHover} transition-shadow duration-300 will-change-transform`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className={`p-3 rounded-md ${theme.chip}`}>
                    <Icon size={24} className={theme.icon} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">
                    RES-{String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1 tracking-tight">{material.title}</h3>
                <p className={`text-sm leading-relaxed mb-4 flex-1 ${theme.muted}`}>{material.description}</p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {material.tags.map((tag) => (
                    <span key={tag} className={`rounded-md border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] ${theme.chip}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                {material.comingSoon ? (
                  <span className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold ${theme.btnGhost} opacity-70`}>
                    <Lock size={15} /> Coming Soon
                  </span>
                ) : material.action ? (
                  <motion.button
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => openMaterial(material)}
                    className={`inline-flex w-fit cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white transition will-change-transform ${theme.btnPrimary}`}
                  >
                    Open Template <ArrowUpRight size={15} />
                  </motion.button>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Resume template detail view (Open Template → wireframe preview + Download free) */}
      <AnimatePresence>
        {isPreviewOpen && (
          <ResumeTemplateDetail theme={theme} onBack={() => setIsPreviewOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

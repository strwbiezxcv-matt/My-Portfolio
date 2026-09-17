import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Check, Download } from "lucide-react";
import type { Theme } from "../../theme";

interface ResumeTemplateDetailProps {
  theme: Theme;
  onBack: () => void;
}

/* The actual DOCX file served from public/materials/ — only touched
   when the user clicks "Download free". The preview is a generic
   wireframe mockup; no real resume content is ever displayed. */
const DOCX_URL = "/materials/Resume_Template_Dev.docx";

/* Simple gray bars standing in for resume lines — no readable text.
   Bars sit on a white paper that stays white in both themes, so plain
   grays remain clearly visible in light and dark mode. */
function Bar({ w, h = "h-1", tone = "bg-gray-200" }: { w: string; h?: string; tone?: string }) {
  return <span className={`block rounded-full ${h} ${w} ${tone}`} />;
}

function SectionBlock({ lines }: { lines: number }) {
  return (
    <div className="space-y-1.5">
      <Bar w="w-16" h="h-1.5" tone="bg-gray-300" />
      {Array.from({ length: lines }).map((_, i) => (
        <Bar key={i} w={i % 3 === 2 ? "w-4/5" : "w-full"} />
      ))}
    </div>
  );
}

export default function ResumeTemplateDetail({ theme, onBack }: ResumeTemplateDetailProps) {
  /* Esc returns to Materials. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBack]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`fixed inset-0 z-[90] overflow-y-auto ${theme.root}`}
      role="dialog"
      aria-modal="true"
      aria-label="Resume Template"
    >
      {/* Compact editorial page — centered with generous whitespace */}
      <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        {/* Back link */}
        <button
          onClick={onBack}
          className={`inline-flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors ${theme.link}`}
        >
          <ArrowLeft size={16} /> Back to Materials
        </button>

        {/* ── Hero: wireframe preview + product info ── */}
        <div className="mt-10 grid grid-cols-1 items-start gap-10 sm:grid-cols-2 sm:gap-12">
          {/* LEFT — light-gray rounded container with the wireframe mockup */}
          <div className={`flex min-h-[420px] items-center justify-center rounded-2xl p-8 ${theme.thumb}`}>
            <div className="w-[240px] rotate-0">
              {/* White paper shape — generic resume wireframe, no content */}
              <div className="rounded-md bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
                {/* Name + contact lines */}
                <div className="flex flex-col items-center gap-2 pb-3">
                  <Bar w="w-32" h="h-2" tone="bg-gray-800" />
                  <Bar w="w-24" h="h-1" />
                </div>
                <div className="mb-4 border-t border-gray-200" />
                {/* Body sections */}
                <div className="space-y-4">
                  <SectionBlock lines={3} />
                  <SectionBlock lines={4} />
                  {/* Two-column skills boxes */}
                  <div className="grid grid-cols-2 gap-3">
                    {[0, 1].map((col) => (
                      <div key={col} className="space-y-1.5 rounded-sm bg-gray-50 p-2 ring-1 ring-gray-100">
                        <Bar w="w-12" h="h-1.5" tone="bg-gray-300" />
                        <Bar w="w-full" />
                        <Bar w="w-3/4" />
                      </div>
                    ))}
                  </div>
                  <SectionBlock lines={2} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — product info */}
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${theme.muted}`}>
              Template
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-tight">
              Resume Template
            </h1>
            <p className="mt-5 text-3xl font-semibold">Free</p>

            <a
              href={DOCX_URL}
              download
              className="mt-7 inline-flex cursor-pointer items-center gap-2.5 rounded-xl bg-brand-bg px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#7aa349]"
            >
              <Download size={18} /> Download free
            </a>

            <p className={`mt-4 flex items-center gap-2 text-sm ${theme.muted}`}>
              <Check size={16} className={theme.icon} /> Instant digital delivery
            </p>
          </div>
        </div>

        {/* ── Short description ── */}
        <p className={`mt-14 max-w-2xl text-base leading-relaxed ${theme.muted}`}>
          A clean, ATS-friendly resume template for all students or fresh graduates — editable in
          Microsoft Word or Google Docs.
        </p>

        {/* ── What's inside ── */}
        <div className={`mt-12 border-t pt-10 ${theme.divider}`}>
          <h2 className="text-xl font-bold tracking-tight">What's inside</h2>
          <ul className="mt-5 space-y-3.5">
            {[
              "A one-page .docx template with a professional, recruiter-friendly layout",
              "Pre-filled example content for students — just swap in your own",
              "Clear sections and sensible defaults that parse well in applicant tracking systems",
            ].map((item) => (
              <li key={item} className={`flex items-start gap-3 text-base ${theme.muted}`}>
                <Check size={17} className={`mt-1 shrink-0 ${theme.icon}`} />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Sections ── */}
        <div className={`mt-10 border-t pt-10 ${theme.divider}`}>
          <h2 className="text-xl font-bold tracking-tight">Sections</h2>
          <p className={`mt-4 text-base ${theme.muted}`}>
            Education · Work Experience · Projects · Activities · Skills &amp; Certifications
          </p>
        </div>

        {/* ── Bottom back link ── */}
        <div className={`mt-12 border-t pt-8 ${theme.divider}`}>
          <button
            onClick={onBack}
            className={`inline-flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors ${theme.link}`}
          >
            <ArrowLeft size={16} /> Back to Materials
          </button>
        </div>
      </div>
    </motion.div>
  );
}

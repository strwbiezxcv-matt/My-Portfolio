import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import {
  Quote,
  Send,
  MessageSquareHeart,
  ArrowRight,
  X,
  Loader2,
  Check,
} from "lucide-react";
import type { Theme } from "../../theme";
import { fetchApprovedRecommendations, insertRecommendation } from "../../../lib/supabase";

interface RecommendationsProps {
  theme: Theme;
}

export type Recommendation = {
  id: string;
  name: string;
  from: string;
  message: string;
};

const MAX_VISIBLE = 5;

/* Asymmetrical size pattern — cycles by index so the wall stays balanced
   but never looks like a uniform grid. span2 = wider card. */
const SIZE_PATTERN = [
  { span: 1, minH: "min-h-[150px]" },
  { span: 2, minH: "min-h-[150px]" },
  { span: 1, minH: "min-h-[170px]" },
  { span: 1, minH: "min-h-[150px]" },
  { span: 1, minH: "min-h-[150px]" },
];

function initialOf(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function RecCard({
  rec,
  index,
  theme,
  isNew,
}: {
  rec: Recommendation;
  index: number;
  theme: Theme;
  isNew?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const size = SIZE_PATTERN[index % SIZE_PATTERN.length];

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.08, 0.4) }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -4, scale: 1.01, transition: { duration: 0.2 } }
      }
      style={{ gridColumn: `span ${size.span}` }}
      className={`flex flex-col justify-between rounded-2xl p-5 ${size.minH} ${theme.card} ${theme.cardHover} shadow-sm hover:shadow-lg will-change-transform`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/15 text-xs font-bold text-brand-strong ring-1 ring-brand/30">
            {initialOf(rec.name)}
          </span>
          <Quote size={18} className="text-brand/50" />
        </div>
        <p className={`mt-3 text-sm leading-relaxed ${theme.muted}`}>&ldquo;{rec.message}&rdquo;</p>
      </div>

      <div className="mt-4 border-t border-gray-200/60 pt-3 dark:border-white/10">
        <p className="text-sm font-semibold">&mdash; {rec.name}</p>
        {rec.from && <p className={`text-xs ${theme.faint}`}>From: {rec.from}</p>}
      </div>
    </motion.article>
  );
}
export default function Recommendations({ theme }: RecommendationsProps) {
  const reduceMotion = useReducedMotion();

  const [items, setItems] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const [showAll, setShowAll] = useState(false);

  const loadApproved = useMemo(
    () => async () => {
      try {
        const rows = await fetchApprovedRecommendations();
        setItems(
          rows.map((r) => ({ id: r.id, name: r.name, from: r.from, message: r.message })),
        );
        setLoadError(null);
      } catch {
        setLoadError("Recommendations are temporarily unavailable.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    loadApproved();
  }, [loadApproved]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) return;

    setSubmitting(true);
    setFormStatus("idle");
    setFormError("");
    try {
      const saved = await insertRecommendation({
        name: trimmedName,
        from: from.trim(),
        message: trimmedMessage,
      });
      // Immediately show the new recommendation on the right side, newest first.
      const newRec: Recommendation = {
        id: saved.id,
        name: saved.name,
        from: saved.from,
        message: saved.message,
      };
      setItems((prev) => [newRec, ...prev]);
      setFormStatus("success");
      setName("");
      setFrom("");
      setMessage("");
    } catch (err) {
      setFormStatus("error");
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const sorted = items;
  const visible = sorted.slice(0, MAX_VISIBLE);

  const inputClass = `w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-brand/40 ${theme.card} ${theme.muted} focus:border-brand/60 focus:shadow-[0_0_0_3px_rgba(163,197,133,0.15)]`;
  return (
    <section id="recommendations" className="relative px-6 py-20 md:py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-dots-green opacity-40" />
        <Quote size={220} strokeWidth={0.5} className="absolute -top-8 right-4 text-brand/10" />
        <Quote size={140} strokeWidth={0.5} className="absolute bottom-10 -left-4 rotate-180 text-brand/10" />
        <span className="deco-plus" style={{ top: "18%", left: "5%" }} />
        <span className="deco-plus" style={{ bottom: "24%", right: "4%" }} />
        <span className="pulse-dot absolute size-1.5 rounded-full bg-brand/50" style={{ top: "40%", right: "10%" }} />
      </div>
      <div className="relative mx-auto max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand-strong">
            <MessageSquareHeart size={14} className="text-brand" />
            Recommendation
          </span>
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="section-num-rule" />
            <span className="section-num">08 · RECOMMENDATIONS</span>
            <span className="section-num-rule" />
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">Recommendations</h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-brand" />
          <p className={`mt-3 text-base ${theme.muted}`}>Have something to say? Leave a recommendation.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-14 items-start">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`rounded-2xl p-5 md:p-6 lg:sticky lg:top-24 ${theme.card} shadow-sm`}
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand" />
              <span className={`text-xs font-medium uppercase tracking-wider ${theme.faint}`}>Leave a recommendation</span>
            </div>

            <div className="space-y-3">
              <div>
                <label htmlFor="rec-name" className={`mb-1 block text-xs font-medium ${theme.muted}`}>Name</label>
                <input id="rec-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" maxLength={60} className={inputClass} required />
              </div>
              <div>
                <label htmlFor="rec-from" className={`mb-1 block text-xs font-medium ${theme.muted}`}>From</label>
                <input id="rec-from" type="text" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Company, school, or position" maxLength={60} className={inputClass} />
              </div>
              <div>
                <label htmlFor="rec-message" className={`mb-1 block text-xs font-medium ${theme.muted}`}>Message</label>
                <textarea id="rec-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Say something nice…" rows={4} maxLength={280} className={`${inputClass} resize-none`} required />
              </div>

              {formStatus === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-2 rounded-lg border border-brand/30 bg-brand/10 px-3 py-2 text-sm font-medium text-brand-strong"
                >
                  <Check size={15} />
                  Recommendation submitted successfully!
                </motion.p>
              )}
              {formStatus === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  aria-live="assertive"
                  className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-500"
                >
                  {formError}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={reduceMotion || submitting ? undefined : { scale: 1.02, y: -1 }}
                whileTap={reduceMotion || submitting ? undefined : { scale: 0.98 }}
                className={`w-full justify-center ${theme.btnPrimary} cursor-pointer disabled:opacity-60`}
              >
                {submitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Submitting&hellip;
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Submit Recommendation
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {loading ? (
              <div className={`flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed p-10 text-center ${theme.card} ${theme.muted}`} aria-live="polite">
                <Loader2 size={22} className="animate-spin text-brand" />
              </div>
            ) : loadError ? (
              <div className={`flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed p-10 text-center ${theme.card} ${theme.muted}`}>
                <Quote size={24} className="mb-3 text-brand/60" />
                <p className="text-sm">{loadError}</p>
              </div>
            ) : visible.length === 0 ? (
              <div className={`flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed p-10 text-center ${theme.card} ${theme.muted}`}>
                <Quote size={24} className="mb-3 text-brand/60" />
                <p className="text-sm">No recommendations yet. Be the first to leave one!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {visible.map((rec, index) => (
                  <RecCard key={rec.id} rec={rec} index={index} theme={theme} />
                ))}
              </div>
            )}

            {sorted.length > MAX_VISIBLE && (
              <motion.button
                onClick={() => setShowAll(true)}
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className={`mt-6 inline-flex items-center gap-2 ${theme.btnGhost} cursor-pointer`}
              >
                View All Recommendations
                <ArrowRight size={15} />
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-black/40 backdrop-blur-sm"
            onClick={() => setShowAll(false)}
          >
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={reduceMotion ? false : { scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { scale: 0.94, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className={`relative w-full max-w-5xl rounded-2xl shadow-2xl ${theme.card}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`flex items-center justify-between px-6 py-5 border-b ${theme.divider}`}>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">All Recommendations</h3>
                    <p className={`mt-1 text-sm ${theme.muted}`}>{sorted.length} {sorted.length === 1 ? "recommendation" : "recommendations"}</p>
                  </div>
                  <button onClick={() => setShowAll(false)} className={`p-2.5 rounded-full border transition-all cursor-pointer ${theme.chip} hover:bg-brand/15`} aria-label="Close">
                    <X size={18} />
                  </button>
                </div>
                <div className="max-h-[70vh] overflow-y-auto p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sorted.map((rec, index) => (
                      <RecCard key={rec.id} rec={rec} index={index} theme={theme} />
                    ))}
                  </div>
                </div>
                <div className={`px-6 py-4 border-t ${theme.divider}`}>
                  <button onClick={() => setShowAll(false)} className={`inline-flex items-center gap-2 ${theme.btnGhost} cursor-pointer`}>
                    &larr; Back to Recommendations
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

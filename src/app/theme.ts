export type Theme = { [key: string]: string };

/* ─────────────────────────────────────────────────────────────
   2026 redesign tokens — 70% minimal, 20% futuristic, 10% creative.
   Light: warm off-white + charcoal + matte green.
   Dark:  deep charcoal + soft white + matte green.
   ───────────────────────────────────────────────────────────── */
export function getTheme(isDark: boolean): Theme {
  return {
    root: isDark
      ? "bg-[#0b0d0c] text-gray-100"
      : "bg-[#fafaf8] text-gray-900",
    nav: isDark
      ? "bg-[#0b0d0c]/85 border-b border-white/10"
      : "bg-[#fafaf8]/80 border-b border-gray-200",
    navBtn: isDark
      ? "text-gray-400 hover:text-white hover:bg-white/[0.06]"
      : "text-gray-500 hover:text-gray-900 hover:bg-gray-900/[0.04]",
    navActive: isDark
      ? "bg-brand/15 text-brand-strong"
      : "bg-brand/10 text-brand-strong",
    text: isDark ? "text-gray-300" : "text-gray-600",
    muted: isDark ? "text-gray-400" : "text-gray-500",
    faint: isDark ? "text-gray-500" : "text-gray-400",
    card: isDark
      ? "bg-[#121613]/80 border border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
      : "bg-white/85 border border-gray-200/80 shadow-[0_1px_2px_rgba(16,24,16,0.04)]",
    cardHover: isDark
      ? "hover:border-brand/40 hover:shadow-[0_14px_36px_rgba(0,0,0,0.45)]"
      : "hover:border-brand/35 hover:shadow-[0_14px_36px_rgba(16,24,16,0.08)]",
    chip: "bg-brand/10 text-brand-strong border border-brand/25",
    icon: "text-brand",
    link: "text-brand hover:text-brand-strong",
    thumb: isDark
      ? "bg-[#121613] border border-white/[0.08]"
      : "bg-zinc-100 border border-gray-200/80",
    overlay: isDark ? "bg-[#0b0d0c]/0" : "bg-white/0",
    btnPrimary: isDark
      ? "inline-flex items-center gap-2 rounded-md bg-brand-bg px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7aa349] hover:shadow-[0_6px_20px_rgba(107,143,67,0.35)]"
      : "inline-flex items-center gap-2 rounded-md bg-brand-bg px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7aa349] hover:shadow-[0_6px_20px_rgba(107,143,67,0.28)]",
    btnGhost: isDark
      ? "inline-flex items-center gap-2 rounded-md border border-white/15 px-5 py-2.5 text-sm font-semibold text-gray-200 transition hover:border-brand/50 hover:text-brand hover:bg-brand/[0.06]"
      : "inline-flex items-center gap-2 rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-brand/50 hover:text-brand-strong hover:bg-brand/[0.05]",
    sectionTitle: "text-brand-strong",
    divider: isDark ? "border-white/10" : "border-gray-200",
    footer: isDark ? "border-t border-white/10 text-gray-500" : "border-t border-gray-200 text-gray-500",
    dot: "bg-brand",
    borderAccent: isDark ? "border-brand/40" : "border-brand/30",
    tintAlt: isDark
      ? "bg-[#0e1110] border-y border-white/[0.04]"
      : "bg-[#f4f6f1] border-y border-gray-200/60",
  };
}
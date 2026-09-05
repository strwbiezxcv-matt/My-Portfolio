export type Theme = { [key: string]: string };

export function getTheme(isDark: boolean): Theme {
  return {
    root: isDark
      ? "bg-[#0f1311] text-gray-100"
      : "bg-white text-gray-900",
    nav: isDark
      ? "bg-[#0f1311]/85 border-b border-white/10"
      : "bg-white/80 border-b border-gray-200",
    navBtn: isDark
      ? "text-gray-300 hover:text-white hover:bg-white/10"
      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
    navActive:isDark
      ? "bg-brand/20 text-brand ring-1 ring-brand/40"
      : "bg-brand/10 text-brand-strong ring-1 ring-brand/30",
    text:isDark ? "text-gray-300 font-pixel" : "text-gray-600 font-pixel",
    muted:isDark ? "text-gray-400 font-pixel" : "text-gray-500 font-pixel",
    faint:isDark ? "text-gray-500 font-pixel" : "text-gray-400 font-pixel",
    card:isDark
      ? "bg-[#161c18] border border-white/10"
      : "bg-white border border-gray-200",
    cardHover:isDark
      ? "hover:border-brand/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
      : "hover:border-brand/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
    chip:"bg-brand/10 text-brand border border-brand/30",
    icon:"text-brand",
    link:"text-brand hover:text-brand-strong",
    thumb:isDark
      ? "bg-[#161c18] border border-white/10"
      : "bg-zinc-100 border border-gray-200",
    overlay:isDark ? "bg-[#0f1311]/0" : "bg-white/0",
    btnPrimary:isDark
      ? "inline-flex items-center gap-2 rounded-md bg-brand-bg px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#82a055]"
      : "inline-flex items-center gap-2 rounded-md bg-brand-bg px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#93b06b]",
    btnGhost:isDark
      ? "inline-flex items-center gap-2 rounded-md border border-white/15 px-5 py-2.5 text-sm font-semibold text-gray-200 transition hover:border-brand/50 hover:text-brand"
      : "inline-flex items-center gap-2 rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-brand/50 hover:text-brand",
    sectionTitle:"text-brand-strong",
    divider:isDark ? "border-white/10" : "border-gray-200",
    footer:isDark ? "border-t border-white/10 text-gray-500" : "border-t border-gray-200 text-gray-500",
    dot:"bg-brand",
    borderAccent:isDark ? "border-brand/40" : "border-brand/30",
    tintAlt:isDark
      ? "bg-[#121813] border-y border-white/5"
      : "bg-[#f8faf4] border-y border-gray-100",
  };
}
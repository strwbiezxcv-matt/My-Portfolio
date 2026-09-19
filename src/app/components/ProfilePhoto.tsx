/**
 * Square profile photo.
 *
 * Uses the same image as the browser-favicon (`/imagee.jpg`).
 * To use a different photo:
 *  1. Place your own image in src/imports/ (e.g. src/imports/profile.jpg).
 *  2. Import it above, e.g.:
 *        import profilePhoto from "../../imports/profile.jpg";
 *  3. Change the <img src=...> below to: <img src={profilePhoto} ... />
 */
export default function ProfilePhoto() {
  return (
    <div className="group relative mx-auto w-full max-w-[320px] sm:max-w-[360px] px-4 py-6">
      {/* Thin technical frame + corner marks (never touches the avatar) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-2xl border border-brand/20 transition-colors duration-500 group-hover:border-brand/40"
      />
      <span aria-hidden="true" className="pointer-events-none absolute -top-1 left-8 size-3 border-t border-l border-brand/50" />
      <span aria-hidden="true" className="pointer-events-none absolute -top-1 right-8 size-3 border-t border-r border-brand/50" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-1 left-8 size-3 border-b border-l border-brand/50" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-1 right-8 size-3 border-b border-r border-brand/50" />
      <span aria-hidden="true" className="status-dot pulse-dot absolute -right-1 top-8" />

      {/* Avatar — transparent PNG sticker, no crop / no filters */}
      <img
        src="/avatar-sticker.png"
        alt="Matt Bianzon"
        className="h-auto w-full object-contain p-3 motion-safe:transition-transform motion-safe:duration-500 motion-safe:hover:scale-[1.02]"
        draggable={false}
      />

      {/* Coordinate-style metadata */}
      <span className="tech-label absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
        MJB · 2026
      </span>
    </div>
  );
}
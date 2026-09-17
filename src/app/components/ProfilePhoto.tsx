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
    <div className="mx-auto w-full max-w-[320px] sm:max-w-[380px] px-4 py-6">
      <img
        src="/avatar-sticker.png"
        alt="Matt Bianzon"
        className="h-auto w-full object-contain motion-safe:transition-transform motion-safe:hover:scale-[1.03]"
        draggable={false}
      />
    </div>
  );
}
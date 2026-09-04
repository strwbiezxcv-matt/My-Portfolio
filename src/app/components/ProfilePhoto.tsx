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
    <div className="aspect-square w-full max-w-[380px] overflow-hidden rounded-xl border border-brand/30 bg-brand/5">
      <img
        src="/imagee.jpg"
        alt="Matt Bianzon"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
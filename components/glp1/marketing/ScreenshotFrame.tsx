import Image from "next/image";
import { ImageIcon } from "lucide-react";

/**
 * Screenshot slot. Drop a real image by passing `src` (file under /public);
 * otherwise a labelled device-frame placeholder renders — never a broken image.
 *
 * Device chrome: `frame="browser"` (default) or `frame="phone"`.
 */
export function ScreenshotFrame({
  label,
  src,
  alt,
  frame = "browser",
  className = "",
  aspect = "aspect-[16/10]",
}: {
  label: string;
  src?: string;
  alt?: string;
  frame?: "browser" | "phone";
  className?: string;
  aspect?: string;
}) {
  const rounded = frame === "phone" ? "rounded-[2rem]" : "rounded-2xl";
  return (
    <div
      className={`relative overflow-hidden border border-line bg-white shadow-[0_8px_24px_rgba(15,23,42,.10)] ${rounded} ${className}`}
    >
      {/* chrome */}
      <div className="flex items-center gap-1.5 border-b border-line bg-surface px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-heart/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold-light/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
        <span className="ml-2 hidden truncate text-[11px] text-faint sm:inline">{label}</span>
      </div>

      {src ? (
        <Image src={src} alt={alt ?? label} width={1280} height={800} className="h-auto w-full" />
      ) : (
        <div className={`flex ${aspect} items-center justify-center bg-gradient-to-br from-brand-50 to-white p-6 text-center`}>
          <div>
            <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-sm">
              <ImageIcon className="h-6 w-6" />
            </span>
            <p className="text-sm font-semibold text-ink">{label}</p>
            <p className="mt-0.5 text-xs text-faint">Add your screenshot here</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Launcher icon tile: custom image from app.yaml when present, else F4's
 * letter+color fallback hashed from the slug (`appIconFallback`).
 */

import { appIconFallback } from "../../../../../packages/ui/src/apps/app-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GATEWAY_BASE } from "@/lib/gateway";
import { cn } from "@/lib/utils";

function looksLikeImagePath(icon: string): boolean {
  if (icon.startsWith("http://") || icon.startsWith("https://") || icon.startsWith("data:")) {
    return true;
  }
  return /[./]/.test(icon) || /\.(svg|png|jpe?g|webp|gif)$/i.test(icon);
}

function resolveIconSrc(icon: string, appRoot?: string): string | undefined {
  if (icon.startsWith("http://") || icon.startsWith("https://") || icon.startsWith("data:")) {
    return icon;
  }
  if (!looksLikeImagePath(icon)) return undefined;
  if (!appRoot || !GATEWAY_BASE) return undefined;
  const root = appRoot.replace(/^\/+|\/+$/g, "");
  const rel = icon.replace(/^\/+/, "");
  return `${GATEWAY_BASE}/fs/${root}/${rel}`;
}

export function AppIconTile({
  slug,
  icon,
  appRoot,
  className,
}: {
  /** Slug (or name) used for the deterministic letter+color fallback. */
  slug: string;
  /** Custom icon from app.yaml — named id or app-root-relative path. */
  icon?: string;
  /** App root workspace path — needed to resolve relative icon paths. */
  appRoot?: string;
  className?: string;
}) {
  const fallback = appIconFallback(slug || "a");
  const src = icon ? resolveIconSrc(icon, appRoot) : undefined;

  return (
    <Avatar className={cn("h-4 w-4 rounded-sm", className)}>
      {src ? <AvatarImage src={src} alt="" className="object-cover" /> : null}
      <AvatarFallback
        className="rounded-sm text-[0.55rem] font-semibold leading-none text-white"
        style={{ backgroundColor: fallback.color }}
      >
        {fallback.letter}
      </AvatarFallback>
    </Avatar>
  );
}

/** Skeleton placeholder matching {@link AppIconTile} size. */
export function AppIconTileSkeleton({ className }: { className?: string }) {
  return <div className={cn("h-4 w-4 shrink-0 rounded-sm bg-muted animate-pulse", className)} />;
}

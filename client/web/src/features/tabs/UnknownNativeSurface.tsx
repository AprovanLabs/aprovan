/**
 * Graceful landing for a `native://` tab whose surface is no longer in the
 * registry (playground-removal). One notice card; playground gets a catalog link.
 */

import { Button } from "@/components/ui/button";
import { playgroundUrl } from "@/lib/registry";
import { NATIVE_TAB_PREFIX } from "@/lib/native-surfaces";

/** Extract the surface id from a `native://…` tab path, or null if not native. */
export function nativeTabId(path: string): string | null {
  if (!path.startsWith(NATIVE_TAB_PREFIX)) return null;
  const id = path.slice(NATIVE_TAB_PREFIX.length);
  return id || null;
}

export function isNativeTabPath(path: string): boolean {
  return nativeTabId(path) !== null;
}

/** Copy + optional catalog link for an unresolvable native surface id. */
export function unknownNativeNotice(id: string): {
  title: string;
  body: string;
  catalogHref?: string;
} {
  if (id === "playground") {
    return {
      title: "Playground moved",
      body: "The playground now lives in the registry catalog.",
      catalogHref: playgroundUrl(),
    };
  }
  return {
    title: "Surface unavailable",
    body: `This panel (${id}) is no longer available.`,
  };
}

/** Notice card for a stale / unknown `native://` tab. */
export function UnknownNativeSurface({
  path,
  onClose,
}: {
  path: string;
  onClose: () => void;
}) {
  const id = nativeTabId(path) ?? "unknown";
  const notice = unknownNativeNotice(id);

  return (
    <div className="flex-1 min-h-0 flex items-start justify-center p-6">
      <div className="max-w-md w-full rounded-lg border bg-background p-5 space-y-3">
        <h2 className="text-sm font-medium text-foreground">{notice.title}</h2>
        <p className="text-sm text-muted-foreground">{notice.body}</p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {notice.catalogHref ? (
            <Button asChild size="sm" variant="outline">
              <a href={notice.catalogHref} target="_blank" rel="noreferrer">
                Open catalog playground
              </a>
            </Button>
          ) : null}
          <Button size="sm" variant="secondary" onClick={onClose}>
            Close tab
          </Button>
        </div>
      </div>
    </div>
  );
}

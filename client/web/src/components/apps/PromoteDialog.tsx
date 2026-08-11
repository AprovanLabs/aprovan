/**
 * Promote-out dialog — turn a Personal (or any) VFS subtree into a standalone
 * app via `apps.promote {source, slug}` (stream 6 / ux.md).
 *
 * Slug collision → field-scoped error. Any other failure → retry-safe banner
 * (source subtree untouched per server atomicity).
 */

import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { invokeAppsTool, type ToolsInvoke } from "@/lib/tools";
import { cn } from "@/lib/utils";
import { classifyPromoteError } from "./errors";

export interface PromoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** VFS subtree to promote (e.g. `apps/personal/budget`). */
  source: string;
  /**
   * Prefill for the slug field. Defaults to the last path segment of
   * `source` (the folder name).
   */
  defaultSlug?: string;
  invokeApps?: ToolsInvoke;
  onPromoted?: (result: unknown) => void;
}

function folderNameFromSource(source: string): string {
  const cleaned = source.replace(/\/+$/, "");
  const parts = cleaned.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "";
}

export function PromoteDialog({
  open,
  onOpenChange,
  source,
  defaultSlug,
  invokeApps = invokeAppsTool,
  onPromoted,
}: PromoteDialogProps) {
  const prefill = defaultSlug ?? folderNameFromSource(source);
  const [slug, setSlug] = useState(prefill);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [bannerError, setBannerError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSlug(defaultSlug ?? folderNameFromSource(source));
    setSlugError(null);
    setBannerError(null);
    setBusy(false);
  }, [open, source, defaultSlug]);

  const previewPath = useMemo(() => {
    const s = slug.trim();
    return s ? `/a/${s}` : "/a/…";
  }, [slug]);

  const canSubmit = Boolean(slug.trim()) && !busy && Boolean(source.trim());

  const handleOpenChange = (next: boolean) => {
    if (!next && busy) return;
    onOpenChange(next);
  };

  const runPromote = async () => {
    if (!canSubmit) return;
    setBusy(true);
    setSlugError(null);
    setBannerError(null);
    try {
      const result = await invokeApps("promote", {
        source,
        slug: slug.trim(),
      });
      onPromoted?.(result);
      onOpenChange(false);
    } catch (err) {
      const classified = classifyPromoteError(err);
      if (classified.kind === "slug-collision") {
        setSlugError(classified.message);
      } else {
        setBannerError(
          `${classified.message} Your source folder was left untouched — you can retry.`,
        );
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogHeader>
        <DialogTitle>Make this its own app</DialogTitle>
        {!busy ? <DialogClose onClose={() => handleOpenChange(false)} /> : <span />}
      </DialogHeader>
      <DialogContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Source</span>
          <code className="block truncate rounded-md border bg-muted/40 px-3 py-2 text-sm">
            {source}
          </code>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="promote-slug" className="text-sm font-medium">
            Slug
          </label>
          <Input
            id="promote-slug"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugError(null);
            }}
            disabled={busy}
            aria-invalid={Boolean(slugError)}
            aria-describedby={
              slugError ? "promote-slug-error promote-slug-preview" : "promote-slug-preview"
            }
            autoComplete="off"
          />
          <p id="promote-slug-preview" className="text-xs text-muted-foreground">
            Preview URL: <code className="text-foreground">{previewPath}</code>
          </p>
          {slugError ? (
            <p id="promote-slug-error" className="text-sm text-destructive" role="alert">
              {slugError}
            </p>
          ) : null}
        </div>

        {bannerError ? (
          <div
            className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive"
            role="alert"
          >
            {bannerError}
          </div>
        ) : null}

        <div className="flex justify-end gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            disabled={busy}
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" disabled={!canSubmit} onClick={() => void runPromote()}>
            {busy ? (
              <>
                <Loader2 className={cn("mr-2 h-4 w-4 animate-spin")} aria-hidden />
                Promoting…
              </>
            ) : (
              "Promote"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

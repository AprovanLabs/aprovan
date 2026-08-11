/**
 * Install dialog — hosting pick (when multi-mode), explicit slug on collision,
 * wired to `apps.install` (stream 6). Never auto-suffixes a colliding slug.
 */

import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { classifyInstallError } from "./errors";
import {
  needsHostingPick,
  soleHostingBucket,
  type HostModeDecl,
  type HostingBucket,
} from "./hosting";
import { HostingModePicker } from "./HostingModePicker";

export interface InstallAppTarget {
  /** Display title. */
  title: string;
  /** Host identity for the hosted disclosure (publisher / creator name). */
  publisher: string;
  /** Optional icon URL. */
  iconUrl?: string;
  /** F4 `hostModes` (or already-collapsed buckets including `"hosted"`). */
  hostModes: readonly (HostModeDecl | HostingBucket | string)[];
  /** Origin app alias or ULID. */
  app?: string;
  /** Directory entry appId (alias for app). */
  directoryRef?: string;
  /** Suggested slug (shown only after a collision 400). */
  defaultSlug?: string;
  /** Extra install args (bindings, config, pin, workspace). */
  installArgs?: Record<string, unknown>;
}

export interface InstallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target: InstallAppTarget;
  /** Defaults to `invokeAppsTool`. */
  invokeApps?: ToolsInvoke;
  onInstalled?: (result: unknown) => void;
}

function initialLetter(title: string): string {
  const t = title.trim();
  return t ? t[0]!.toUpperCase() : "?";
}

export function InstallDialog({
  open,
  onOpenChange,
  target,
  invokeApps = invokeAppsTool,
  onInstalled,
}: InstallDialogProps) {
  const multiMode = needsHostingPick(target.hostModes);
  const sole = soleHostingBucket(target.hostModes);

  const [mode, setMode] = useState<HostingBucket | null>(() =>
    multiMode ? null : sole,
  );
  const [showPicker, setShowPicker] = useState(multiMode);
  const [pickerOptions, setPickerOptions] = useState<HostingBucket[]>(["managed", "hosted"]);
  const [slug, setSlug] = useState(target.defaultSlug ?? "");
  const [showSlug, setShowSlug] = useState(false);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [bannerError, setBannerError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Reset ephemeral state whenever the dialog opens for a new target.
  useEffect(() => {
    if (!open) return;
    const needsPick = needsHostingPick(target.hostModes);
    const only = soleHostingBucket(target.hostModes);
    setMode(needsPick ? null : only);
    setShowPicker(needsPick);
    setPickerOptions(["managed", "hosted"]);
    setSlug(target.defaultSlug ?? "");
    setShowSlug(false);
    setSlugError(null);
    setBannerError(null);
    setBusy(false);
  }, [open, target]);

  const canSubmit = useMemo(() => {
    if (busy) return false;
    if (showPicker && mode == null) return false;
    if (showSlug && !slug.trim()) return false;
    return Boolean(target.app || target.directoryRef);
  }, [busy, showPicker, mode, showSlug, slug, target.app, target.directoryRef]);

  const handleOpenChange = (next: boolean) => {
    if (!next && busy) return;
    onOpenChange(next);
  };

  const runInstall = async () => {
    if (!canSubmit) return;
    setBusy(true);
    setSlugError(null);
    setBannerError(null);

    const args: Record<string, unknown> = {
      ...(target.installArgs ?? {}),
    };
    if (target.app) args.app = target.app;
    if (target.directoryRef) args.directoryRef = target.directoryRef;
    if (mode) args.mode = mode;
    if (showSlug && slug.trim()) args.slug = slug.trim();

    try {
      const result = await invokeApps("install", args);
      onInstalled?.(result);
      onOpenChange(false);
    } catch (err) {
      const classified = classifyInstallError(err);
      if (classified.kind === "hosting-required") {
        setShowPicker(true);
        setPickerOptions(classified.options);
        setMode(null);
        setBannerError(
          `Choose where this app's data lives (${classified.options.join(" or ")}).`,
        );
      } else if (classified.kind === "slug-collision") {
        setShowSlug(true);
        setSlugError(classified.message);
      } else {
        setBannerError(classified.message);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogHeader>
        <DialogTitle>Install {target.title}</DialogTitle>
        {!busy ? <DialogClose onClose={() => handleOpenChange(false)} /> : <span />}
      </DialogHeader>
      <DialogContent className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 rounded-lg">
            {target.iconUrl ? <AvatarImage src={target.iconUrl} alt="" /> : null}
            <AvatarFallback className="rounded-lg text-base">
              {initialLetter(target.title)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="truncate font-medium">{target.title}</div>
            <div className="truncate text-sm text-muted-foreground">{target.publisher}</div>
          </div>
        </div>

        {showPicker ? (
          <HostingModePicker
            value={mode}
            onChange={setMode}
            publisher={target.publisher}
            options={pickerOptions}
            disabled={busy}
          />
        ) : null}

        {showSlug ? (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="install-slug" className="text-sm font-medium">
              Slug
            </label>
            <Input
              id="install-slug"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugError(null);
              }}
              disabled={busy}
              aria-invalid={Boolean(slugError)}
              aria-describedby={slugError ? "install-slug-error" : undefined}
              placeholder="unique-slug"
              autoComplete="off"
            />
            <p className="text-xs text-muted-foreground">
              Installs to <code className="text-foreground">apps/{slug.trim() || "…"}</code>
              . Pick a free slug — we never auto-suffix.
            </p>
            {slugError ? (
              <p id="install-slug-error" className="text-sm text-destructive" role="alert">
                {slugError}
              </p>
            ) : null}
          </div>
        ) : null}

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
          <Button type="button" disabled={!canSubmit} onClick={() => void runInstall()}>
            {busy ? (
              <>
                <Loader2 className={cn("mr-2 h-4 w-4 animate-spin")} aria-hidden />
                Copying app…
              </>
            ) : (
              "Install"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

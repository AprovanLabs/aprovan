/**
 * Speech settings: list / install / remove STT models via the helper.
 * Bundled default has no remove action (ux.md — offline path).
 */

import { useCallback, useEffect, useState } from "react";
import { Check, Loader2, Mic, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  capabilitySummary,
  deleteSttModel,
  fetchSttModels,
  formatModelSize,
  installSttModel,
  loadSelectedSttModel,
  resolveHelperOrigin,
  saveSelectedSttModel,
  type SttInstallProgress,
  type SttModelInfo,
} from "@/components/stt-models";

function installProgressLabel(progress: SttInstallProgress | null): string {
  if (!progress) return "Starting…";
  if (progress.phase === "download") {
    const recv = progress.bytesReceived ?? 0;
    const total = progress.totalBytes ?? 0;
    if (total > 0) {
      return `Downloading… ${Math.min(100, Math.round((recv / total) * 100))}%`;
    }
    return "Downloading…";
  }
  if (progress.phase === "verify") return "Verifying…";
  if (progress.phase === "complete") return "Installed";
  if (progress.phase === "error") return progress.message ?? "Install failed";
  return progress.phase;
}

export function SpeechSettingsButton({
  selectedModel,
  onSelectedModelChange,
}: {
  selectedModel: string | null;
  onSelectedModelChange: (id: string | null) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground"
        onClick={() => setOpen(true)}
        title="Speech settings"
        aria-label="Speech settings"
      >
        <Mic className="h-3.5 w-3.5" />
        Speech
      </button>
      <SpeechSettingsDialog
        open={open}
        onOpenChange={setOpen}
        selectedModel={selectedModel}
        onSelectedModelChange={onSelectedModelChange}
      />
    </>
  );
}

export function SpeechSettingsDialog({
  open,
  onOpenChange,
  selectedModel,
  onSelectedModelChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedModel: string | null;
  onSelectedModelChange: (id: string | null) => void;
}) {
  const [models, setModels] = useState<SttModelInfo[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
  const [installingId, setInstallingId] = useState<string | null>(null);
  const [installProgress, setInstallProgress] = useState<SttInstallProgress | null>(
    null,
  );
  const [actionError, setActionError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoadError(null);
    setActionError(null);
    const origin = await resolveHelperOrigin();
    if (!origin) {
      setOffline(true);
      setModels([]);
      return;
    }
    setOffline(false);
    try {
      const list = await fetchSttModels(origin);
      setModels(list);
    } catch (err) {
      setModels([]);
      setLoadError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    void refresh();
  }, [open, refresh]);

  const handleSelect = (id: string) => {
    saveSelectedSttModel(id);
    onSelectedModelChange(id);
  };

  const handleInstall = async (id: string) => {
    setActionError(null);
    setInstallingId(id);
    setInstallProgress(null);
    try {
      const origin = await resolveHelperOrigin();
      if (!origin) {
        throw new Error(
          "Install unavailable while offline — the bundled model remains usable.",
        );
      }
      for await (const event of installSttModel(origin, id)) {
        setInstallProgress(event);
        if (event.phase === "error") {
          throw new Error(event.message ?? "Install failed verification");
        }
      }
      await refresh();
      handleSelect(id);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : String(err));
      // Existing models untouched — re-list to confirm catalogue state.
      await refresh().catch(() => {});
    } finally {
      setInstallingId(null);
      setInstallProgress(null);
    }
  };

  const handleRemove = async (model: SttModelInfo) => {
    if (model.bundled) return;
    setActionError(null);
    setRemovingId(model.id);
    try {
      const origin = await resolveHelperOrigin();
      if (!origin) {
        throw new Error("Helper unavailable — cannot remove models right now.");
      }
      await deleteSttModel(origin, model.id);
      if (selectedModel === model.id) {
        const bundled = models?.find((m) => m.bundled)?.id ?? null;
        saveSelectedSttModel(bundled);
        onSelectedModelChange(bundled);
      }
      await refresh();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : String(err));
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Speech settings</DialogTitle>
        <DialogClose onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogContent className="space-y-3 max-h-[60vh]">
        <p className="text-xs text-muted-foreground">
          Choose which on-device transcription model to use. Larger models improve
          quality; diarization requires a model that advertises it.
        </p>

        {offline && (
          <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            Install unavailable — the desktop helper is not reachable. The bundled
            offline model remains usable when the helper is running.
          </div>
        )}

        {loadError && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {loadError}
          </div>
        )}

        {actionError && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {actionError}
          </div>
        )}

        {models === null ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground py-6 justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading models…
          </div>
        ) : models.length === 0 && !offline ? (
          <p className="text-xs text-muted-foreground py-4 text-center">
            No models reported by the helper.
          </p>
        ) : (
          <ul className="space-y-2">
            {models.map((model) => {
              const selected =
                selectedModel === model.id || (!selectedModel && model.bundled);
              const installing = installingId === model.id;
              const removing = removingId === model.id;
              return (
                <li
                  key={model.id}
                  className="rounded-md border px-3 py-2 space-y-1.5"
                >
                  <div className="flex items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <span className="truncate font-mono">{model.id}</span>
                        {model.bundled && (
                          <span className="shrink-0 text-[10px] uppercase tracking-wide text-muted-foreground">
                            bundled
                          </span>
                        )}
                        {selected && model.installed && (
                          <span className="inline-flex items-center gap-0.5 shrink-0 text-[10px] text-emerald-700 dark:text-emerald-400">
                            <Check className="h-3 w-3" /> selected
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {formatModelSize(model.sizeBytes)} ·{" "}
                        {capabilitySummary(model.capabilities)}
                        {model.installed ? "" : " · not installed"}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      {model.installed ? (
                        <>
                          <Button
                            type="button"
                            size="sm"
                            variant={selected ? "secondary" : "outline"}
                            className="h-7 px-2 text-xs"
                            disabled={selected}
                            onClick={() => handleSelect(model.id)}
                          >
                            {selected ? "Selected" : "Select"}
                          </Button>
                          {!model.bundled && (
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                              disabled={removing || installingId !== null}
                              title="Remove model"
                              aria-label={`Remove ${model.id}`}
                              onClick={() => void handleRemove(model)}
                            >
                              {removing ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="h-3.5 w-3.5" />
                              )}
                            </Button>
                          )}
                        </>
                      ) : (
                        <Button
                          type="button"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          disabled={offline || installingId !== null}
                          onClick={() => void handleInstall(model.id)}
                        >
                          {installing ? (
                            <span className="inline-flex items-center gap-1">
                              <Loader2 className="h-3 w-3 animate-spin" />
                              {installProgressLabel(installProgress)}
                            </span>
                          ) : (
                            "Install"
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  {installing && installProgress && (
                    <p className="text-[11px] text-muted-foreground">
                      {installProgressLabel(installProgress)}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}

/** Hook: selected model preference for capture + speech settings. */
export function useSelectedSttModel() {
  const [selectedModel, setSelectedModel] = useState<string | null>(() =>
    typeof window !== "undefined" ? loadSelectedSttModel() : null,
  );
  return { selectedModel, setSelectedModel };
}

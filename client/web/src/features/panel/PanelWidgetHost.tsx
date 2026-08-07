import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type {
  Compiler,
  Manifest,
  MountedWidget,
  MountOptions,
  PluginRegistry,
} from "@aprovan/patchwork";
import { buildWidgetMountOptions } from "./widget-mount-contract";

function createManifest(services?: string[]): Manifest {
  return {
    name: "preview",
    version: "1.0.0",
    platform: "browser",
    image: "@aprovan/patchwork-image-shadcn",
    services,
  };
}

/**
 * Floating-panel widget host — same `compiler.mount` iframe contract as chat's
 * `WidgetPreview` (mode + sandbox from {@link buildWidgetMountOptions}).
 */
export function PanelWidgetHost({
  code,
  compiler,
  services,
  enabled = true,
  sourcePath,
  plugins,
  onError,
  onMountedHeight,
}: {
  code: string;
  compiler: Compiler | null;
  services?: string[];
  enabled?: boolean;
  sourcePath?: string;
  plugins?: PluginRegistry;
  onError?: (error: string) => void;
  /** Fired when the mounted iframe reports a content height. */
  onMountedHeight?: (height: number) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef<MountedWidget | null>(null);
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  const onHeightRef = useRef(onMountedHeight);
  onHeightRef.current = onMountedHeight;

  useEffect(() => {
    if (!enabled || !compiler || !code || !containerRef.current) return;

    let cancelled = false;

    const compileAndMount = async () => {
      setLoading(true);
      setError(null);
      try {
        const widget = await compiler.compile(code, createManifest(services), {
          typescript: true,
          ...(sourcePath ? { sourcePath } : {}),
        });
        if (cancelled || !containerRef.current) return;

        const mountOpts = buildWidgetMountOptions(containerRef.current, "panel", {
          ...(sourcePath ? { sourcePath } : {}),
          ...(plugins ? { plugins } : {}),
        }) as MountOptions;

        const mounted = await compiler.mount(widget, mountOpts);

        if (cancelled) {
          compiler.unmount(mounted);
          return;
        }

        if (mountedRef.current) compiler.unmount(mountedRef.current);
        mountedRef.current = mounted;
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : "Failed to render widget";
          setError(message);
          onErrorRef.current?.(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void compileAndMount();

    return () => {
      cancelled = true;
      if (mountedRef.current && compiler) {
        compiler.unmount(mountedRef.current);
        mountedRef.current = null;
      }
    };
  }, [code, compiler, enabled, services, sourcePath, plugins]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const height = entry.contentRect.height;
      if (height > 0) onHeightRef.current?.(height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [code, loading, error]);

  return (
    <div className="w-full">
      {error && (
        <div className="text-sm text-destructive flex items-center gap-2 p-3">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {loading && (
        <div className="p-3 flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Rendering…</span>
        </div>
      )}
      <div ref={containerRef} className="w-full" />
    </div>
  );
}

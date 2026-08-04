import { AlertCircle, Loader2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type {
  Checker,
  Compiler,
  Manifest,
  MountedWidget,
  PluginRegistry,
} from '@aprovan/patchwork';

export interface WidgetPreviewProps {
  code: string;
  compiler: Compiler | null;
  services?: string[];
  enabled?: boolean;
  /** Workspace path of the widget's source, for telemetry attribution. */
  sourcePath?: string;
  /**
   * Notified when the preview fails — compile errors, iframe mount failures
   * (the mount promise rejects on the widget-error postMessage), timeouts.
   * Lets a host react (e.g. chat's self-heal loop) instead of the error just
   * sitting in the preview body.
   */
  onError?: (error: string) => void;
  /** Host plugins (telemetry override, notification payload, …). */
  plugins?: PluginRegistry;
  /** Injected typechecker — runs on the compile that precedes preview. */
  checker?: Checker;
}

function createManifest(services?: string[]): Manifest {
  return {
    name: 'preview',
    version: '1.0.0',
    platform: 'browser',
    image: '@aprovan/patchwork-image-shadcn',
    services,
  };
}

export function WidgetPreview({
  code,
  compiler,
  services,
  enabled = true,
  sourcePath,
  onError,
  plugins: pluginsProp,
  checker,
}: WidgetPreviewProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef<MountedWidget | null>(null);
  // Read through a ref so an inline callback prop doesn't retrigger the
  // compile-and-mount effect on every parent render.
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const plugins = useMemo(() => pluginsProp, [pluginsProp]);

  useEffect(() => {
    if (!enabled || !compiler || !containerRef.current) return;

    let cancelled = false;

    const compileAndMount = async () => {
      const hadMounted = mountedRef.current !== null;
      if (!hadMounted) {
        setLoading(true);
      }
      setError(null);

      try {
        const started = performance.now();
        const widget = await compiler.compile(code, createManifest(services), {
          typescript: true,
          // Attribution for the compiler's own error telemetry: a failed
          // compile is recorded against this file, so it reaches the Logs
          // panel and the problem digest that "fix it" prompts carry.
          ...(sourcePath ? { sourcePath } : {}),
          ...(checker ? { checker } : {}),
        });
        if (checker) {
          // Latency signal for compile-before-preview typecheck (Stream 8.4).
          console.debug(
            `[editor] compile+typecheck ${Math.round(performance.now() - started)}ms`,
            sourcePath ?? '(anonymous)',
          );
        }

        if (cancelled || !containerRef.current) return;

        // Iframe mode keeps the widget's runtime styles (Tailwind Play CDN,
        // image :root variables, preflight resets) from leaking into the host
        // page. allow-same-origin is required for the dev-server package proxy
        // (/_local-packages) and is not a security regression: these widgets
        // previously mounted fully embedded in the host DOM.
        const mounted = await compiler.mount(widget, {
          target: containerRef.current,
          mode: 'iframe',
          sandbox: ['allow-scripts', 'allow-same-origin'],
          ...(sourcePath ? { sourcePath } : {}),
          ...(plugins ? { plugins } : {}),
        });

        if (cancelled) {
          compiler.unmount(mounted);
          return;
        }

        if (mountedRef.current) {
          compiler.unmount(mountedRef.current);
        }
        mountedRef.current = mounted;
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to render preview';
          if (!mountedRef.current) {
            setError(message);
          }
          onErrorRef.current?.(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
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
  }, [code, compiler, enabled, services, sourcePath, plugins, checker]);

  return (
    <>
      {error && (
        <div className="text-sm text-destructive flex items-center gap-2 p-3">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {loading && (
        <div className="p-3 flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Rendering preview...</span>
        </div>
      )}
      {!compiler && enabled && !loading && !error && (
        <div className="p-3 text-sm text-muted-foreground">Compiler not initialized</div>
      )}
      <div ref={containerRef} className="w-full" />
    </>
  );
}

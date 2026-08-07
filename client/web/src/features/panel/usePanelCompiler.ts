import { useEffect, useState } from "react";
import { createCompiler, type Compiler } from "@aprovan/patchwork";
import {
  IMAGE_CDN_URL,
  IMAGE_SPEC,
  PROXY_URL,
  resolveWidgetCdnBaseUrl,
} from "@/features/widgets/useCompilerBootstrap";
import { gatewayFetch } from "@/lib/gateway-fetch";
import { recordWidgetEvent } from "@/lib/telemetry";

/**
 * Same compiler bootstrap chat uses (`createCompiler` + pinned image + sandbox
 * telemetry), scoped for the floating panel realm.
 */
export function usePanelCompiler(): {
  compiler: Compiler | null;
  error: string | null;
} {
  const [compiler, setCompiler] = useState<Compiler | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const widgetCdnBaseUrl = await resolveWidgetCdnBaseUrl();
        const created = await createCompiler({
          image: IMAGE_SPEC,
          proxyUrl: PROXY_URL,
          proxyFetch: gatewayFetch,
          cdnBaseUrl: IMAGE_CDN_URL,
          widgetCdnBaseUrl,
          telemetry: recordWidgetEvent,
        });
        if (!cancelled) {
          setCompiler(created);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load the widget compiler",
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { compiler, error };
}

import { useEffect, useMemo, useState } from "react";
import { WidgetPreview } from "@aprovan/patchwork-editor";
import type { Compiler } from "@aprovan/patchwork";
import { readFile } from "@/lib/workspace-vfs";
import {
  createWidgetPlugins,
  registerNotificationOverride,
} from "@/lib/widget-plugins";

/**
 * A workspace-path notification widget: the file compiles through the
 * ordinary patchwork pipeline (sandboxed iframe). The notification payload
 * is delivered as a plugin-provided `tools.notification` namespace.
 */
export function NotificationPathWidget({
  path,
  data,
  compiler,
  services,
}: {
  path: string;
  data: unknown;
  compiler: Compiler | null;
  services: string[];
}) {
  const [code, setCode] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    readFile(path)
      .then((content) => {
        if (active) setCode(content);
      })
      .catch(() => {
        if (active) setCode(null);
      });
    return () => {
      active = false;
    };
  }, [path]);

  const plugins = useMemo(() => {
    const registry = createWidgetPlugins({ path, sourcePath: path });
    registerNotificationOverride(registry, data);
    return registry;
  }, [data, path]);

  if (!code || !compiler) return null;
  return (
    <div className="mt-2 overflow-hidden rounded-md border">
      <WidgetPreview
        code={code}
        compiler={compiler}
        services={services}
        sourcePath={path}
        plugins={plugins}
      />
    </div>
  );
}

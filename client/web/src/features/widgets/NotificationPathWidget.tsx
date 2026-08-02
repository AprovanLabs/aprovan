import { useEffect, useState } from "react";
import { WidgetPreview } from "@aprovan/patchwork-editor";
import type { Compiler } from "@aprovan/patchwork-compiler";
import { readFile } from "@/lib/workspace-vfs";

/**
 * A workspace-path notification widget: the file compiles through the
 * ordinary patchwork pipeline (sandboxed iframe). The notification's payload
 * is delivered through the same import convention as every namespace —
 * `import notification from "notification"` — bound here by rewriting that
 * import to a const before compile (prepending is legal because ESM imports
 * hoist). This is what lets a workflow ship its own notification UI as a
 * plain widget file.
 */
const NOTIFICATION_IMPORT_RE =
  /^[ \t]*import\s+([A-Za-z_$][\w$]*)\s+from\s+["']notification["'][ \t]*;?[ \t]*$/m;

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
  if (!code || !compiler) return null;
  const bound = code.replace(
    NOTIFICATION_IMPORT_RE,
    (_whole, binding: string) => `const ${binding} = ${JSON.stringify(data ?? null)};`,
  );
  return (
    <div className="mt-2 overflow-hidden rounded-md border">
      <WidgetPreview code={bound} compiler={compiler} services={services} sourcePath={path} />
    </div>
  );
}

import { useEffect, useState } from "react";
import type { Checker } from "@aprovan/patchwork";

/**
 * Lazy-load `@aprovan/editor/ts` and build a per-project Checker for the
 * given namespace set. Disposes the environment on teardown / namespace change.
 * Keeps the typechecker out of the app-shell module graph until preview/edit
 * actually needs it.
 */
export function useCompileChecker(namespaces: string[]): Checker | undefined {
  const [checker, setChecker] = useState<Checker | undefined>(undefined);
  const key = namespaces.slice().sort().join(",");

  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    const ns = key ? key.split(",") : [];

    void (async () => {
      const { createProjectChecker } = await import("@aprovan/editor/ts");
      const built = await createProjectChecker({ namespaces: ns });
      if (cancelled) {
        built.dispose();
        return;
      }
      dispose = built.dispose;
      setChecker(() => built.checker);
    })();

    return () => {
      cancelled = true;
      dispose?.();
      setChecker(undefined);
    };
  }, [key]);

  return checker;
}

import { useEffect, useState } from 'react';

/** True when the host app has `.dark` on `<html>` (shadcn convention). */
function readIsDark(): boolean {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
}

/**
 * Tracks the host page's dark-mode class on `<html>`. Mirrors the same
 * `.dark` ancestor convention used by WorkspaceTree and widget iframes so
 * code surfaces stay in sync when the theme toggles.
 */
export function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(readIsDark);

  useEffect(() => {
    const sync = () => setIsDark(readIsDark());
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

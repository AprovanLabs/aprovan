/**
 * Document app tile — shared launcher icon path only (iw9-f4 D6).
 * Declared icon from app.yaml when resolvable; otherwise letter+color via
 * `appIconFallback` inside AppIconTile. No Document-specific icon chrome.
 */

import { AppIconTile } from "../sidebar/AppIconTile";

const DOCUMENT_SLUG = "document";
/** Matches `Apps/document/app.yaml` `icon`. */
const DOCUMENT_ICON = "document.svg";

export function DocumentAppTile({
  icon = DOCUMENT_ICON,
  appRoot,
  className,
}: {
  /** Custom icon from app.yaml — path or named id. */
  icon?: string;
  /** App root workspace path — needed to resolve relative icon paths. */
  appRoot?: string;
  className?: string;
}) {
  return (
    <AppIconTile slug={DOCUMENT_SLUG} icon={icon} appRoot={appRoot} className={className} />
  );
}

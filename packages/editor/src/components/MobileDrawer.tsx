/**
 * MobileDrawer — shared off-canvas pattern for a side panel (file explorer,
 * app browser, …): a static column at `md+` widths, and below that an
 * overlay that slides over the content with a scrim, hidden until toggled
 * open. Both the chat page's workspace sidebar and the full-view editor's
 * file tree render the same explorer at two densities, so they share this
 * one recipe instead of two hand-rolled off-canvas implementations that can
 * drift apart.
 *
 * The host must give the panel a `relative`-positioned ancestor (or rely on
 * being inside a `fixed`/`absolute` ancestor already, e.g. a full-screen
 * modal) so the mobile overlay's `absolute inset-y-0 left-0` resolves
 * against the content area it should cover, not the viewport.
 */
import { cn } from '../lib/utils';

export interface MobileDrawerProps {
  /** Whether the *mobile* (below `md`) overlay is open. At `md+` the panel
   *  is always a static column, independent of this flag — callers that
   *  also want the panel hidden on desktop should not render
   *  `MobileDrawer` at all rather than pass `open={false}`. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  /** Extra classes on the panel itself (borders, background, …). */
  className?: string;
  /** Panel width below `md` (also the max width once opened as an overlay). */
  widthClassName?: string;
}

export function MobileDrawer({
  open,
  onOpenChange,
  children,
  className,
  widthClassName = 'w-72 max-w-[85vw]',
}: MobileDrawerProps) {
  return (
    <>
      {/* Scrim: mobile-only, dismisses the drawer on tap-outside. */}
      {open && (
        <div
          className="md:hidden absolute inset-0 z-20 bg-black/40"
          onClick={() => onOpenChange(false)}
        />
      )}
      <div
        className={cn(
          open ? 'flex' : 'hidden',
          // Below md: an absolutely-positioned overlay above the scrim.
          // At md+: a normal static column, back in flow.
          'absolute inset-y-0 left-0 z-30 flex-col min-h-0 shadow-lg',
          'md:relative md:z-10 md:flex md:shadow-none md:max-w-none',
          widthClassName,
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}

/**
 * Lightweight DropdownMenu — same local pattern as dialog.tsx (no Radix).
 * Enough for SessionBar overflow; shadcn-shaped exports for call-site familiarity.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

type DropdownContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  rootRef: React.RefObject<HTMLDivElement | null>;
};

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

function useDropdown() {
  const ctx = React.useContext(DropdownContext);
  if (!ctx) throw new Error("DropdownMenu components must be used within DropdownMenu");
  return ctx;
}

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  return (
    <DropdownContext.Provider value={{ open, setOpen, rootRef }}>
      <div ref={rootRef} className="relative inline-flex">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({
  children,
  asChild,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { open, setOpen } = useDropdown();
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>, {
      onClick: (event: React.MouseEvent) => {
        (children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>).props.onClick?.(event);
        setOpen(!open);
      },
    });
  }
  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      className={className}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  children,
  align = "end",
  className,
}: {
  children: React.ReactNode;
  align?: "start" | "end";
  className?: string;
}) {
  const { open, setOpen, rootRef } = useDropdown();

  React.useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen, rootRef]);

  if (!open) return null;

  return (
    <div
      role="menu"
      className={cn(
        "absolute top-full z-50 mt-1 min-w-[10rem] overflow-hidden rounded-md border bg-background p-1 text-xs shadow-md",
        align === "end" ? "right-0" : "left-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  className,
  disabled,
  destructive,
  onSelect,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onSelect?: () => void;
  destructive?: boolean;
}) {
  const { setOpen } = useDropdown();
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      className={cn(
        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left outline-none hover:bg-muted disabled:pointer-events-none disabled:opacity-50",
        destructive && "text-destructive hover:bg-destructive/10",
        className,
      )}
      onClick={(event) => {
        props.onClick?.(event);
        if (disabled) return;
        onSelect?.();
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div role="separator" className={cn("my-1 h-px bg-border", className)} />;
}

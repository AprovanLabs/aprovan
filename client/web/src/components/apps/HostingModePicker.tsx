/**
 * Two-option hosting picker — managed vs hosted cards (ux.md / app-data-hosting).
 *
 * Hosted is never pre-selected and is visually secondary with a persistent
 * warning glyph. Not a plain radio row.
 */

import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  hostedDisclosure,
  MANAGED_DISCLOSURE,
  type HostingBucket,
} from "./hosting";

export interface HostingModePickerProps {
  value: HostingBucket | null;
  onChange: (mode: HostingBucket) => void;
  /** Host identity named in the hosted disclosure (publisher / creator). */
  publisher: string;
  /** Which buckets to offer (defaults to both). */
  options?: readonly HostingBucket[];
  disabled?: boolean;
  className?: string;
}

export function HostingModePicker({
  value,
  onChange,
  publisher,
  options = ["managed", "hosted"],
  disabled,
  className,
}: HostingModePickerProps) {
  const showManaged = options.includes("managed");
  const showHosted = options.includes("hosted");

  return (
    <div
      role="radiogroup"
      aria-label="Where this app's data lives"
      className={cn("flex flex-col gap-2", className)}
    >
      {showManaged ? (
        <button
          type="button"
          role="radio"
          aria-checked={value === "managed"}
          disabled={disabled}
          onClick={() => onChange("managed")}
          className={cn(
            "rounded-lg border p-3 text-left transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            value === "managed"
              ? "border-primary bg-primary/5"
              : "border-input bg-background hover:bg-accent/40",
            disabled && "opacity-50",
          )}
        >
          <div className="text-sm font-medium">Managed</div>
          <p className="mt-1 text-sm text-muted-foreground">
            Data lives <span className="font-semibold text-foreground">in your own space</span>.
            You can read, export, or delete it any time.
          </p>
          <span className="sr-only">{MANAGED_DISCLOSURE}</span>
        </button>
      ) : null}

      {showHosted ? (
        <button
          type="button"
          role="radio"
          aria-checked={value === "hosted"}
          disabled={disabled}
          onClick={() => onChange("hosted")}
          className={cn(
            "rounded-lg border p-3 text-left transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            // Visually secondary vs managed — muted surface, never the default pick.
            value === "hosted"
              ? "border-destructive/60 bg-destructive/5"
              : "border-dashed border-muted-foreground/40 bg-muted/30 hover:bg-muted/50",
            disabled && "opacity-50",
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Hosted</span>
            <Badge variant="destructive" className="gap-1 font-normal">
              <AlertTriangle className="h-3 w-3" aria-hidden />
              Warning
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Data lives in{" "}
            <span className="font-semibold text-foreground">
              {(publisher.trim() || "the publisher") + "'s"}
            </span>{" "}
            space. Everything they promise about it is a promise — not something you can
            verify or delete yourself.
          </p>
          <span className="sr-only">{hostedDisclosure(publisher)}</span>
        </button>
      ) : null}
    </div>
  );
}

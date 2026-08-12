/**
 * Fallback payload body when an app widget is missing or fails to mount.
 * Decision buttons stay on the shell — this card never carries them.
 */

import { cn } from "@/lib/utils";

export function GenericPayloadCard({
  payload,
  className,
  onEdit,
}: {
  payload: unknown;
  className?: string;
  /** Optional inline edit — emits the full payload object after a field change. */
  onEdit?: (next: unknown) => void;
}) {
  if (payload == null) {
    return (
      <div
        data-testid="generic-payload-card"
        className={cn("rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground", className)}
      >
        No payload
      </div>
    );
  }

  if (typeof payload !== "object" || Array.isArray(payload)) {
    return (
      <pre
        data-testid="generic-payload-card"
        className={cn(
          "overflow-auto rounded-md border bg-muted/30 p-3 text-xs font-mono",
          className,
        )}
      >
        {JSON.stringify(payload, null, 2)}
      </pre>
    );
  }

  const entries = Object.entries(payload as Record<string, unknown>);

  return (
    <div
      data-testid="generic-payload-card"
      className={cn("rounded-md border bg-muted/30 p-3 text-sm", className)}
    >
      <dl className="grid gap-2">
        {entries.map(([key, value]) => (
          <div key={key} className="grid grid-cols-[minmax(6rem,8rem)_1fr] gap-2">
            <dt className="text-muted-foreground font-medium">{key}</dt>
            <dd>
              {onEdit && (typeof value === "string" || typeof value === "number") ? (
                <input
                  className="w-full rounded border bg-background px-2 py-1 text-sm"
                  value={String(value)}
                  aria-label={key}
                  onChange={(e) => {
                    const next = {
                      ...(payload as Record<string, unknown>),
                      [key]: typeof value === "number" ? Number(e.target.value) : e.target.value,
                    };
                    onEdit(next);
                  }}
                />
              ) : (
                <span className="break-all font-mono text-xs">
                  {typeof value === "string" ? value : JSON.stringify(value)}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

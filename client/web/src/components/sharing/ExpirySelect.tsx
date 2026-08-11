import { cn } from "@/lib/utils";
import type { ExpiryChoice } from "./types";

const OPTIONS: Array<{ value: ExpiryChoice; label: string; deemphasize?: boolean }> = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
  { value: "none", label: "No expiry", deemphasize: true },
];

interface ExpirySelectProps {
  value: ExpiryChoice;
  onChange: (value: ExpiryChoice) => void;
  disabled?: boolean;
  id?: string;
}

/** Link-share expiry selector. Defaults to 7 days; "No expiry" is an explicit opt-in. */
export function ExpirySelect({ value, onChange, disabled, id }: ExpirySelectProps) {
  return (
    <select
      id={id}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value as ExpiryChoice)}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        value === "none" && "text-muted-foreground",
      )}
      aria-label="Link expiry"
    >
      {OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value} className={opt.deemphasize ? "text-muted-foreground" : undefined}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MOUNT_READONLY_TITLE } from "./format";

/**
 * Compact read-only mount marker for surfaces that can host React (tables,
 * panels). The file tree uses text decorations via `useMountTreeTitles`
 * instead — pierre trees only support text inside the shadow host.
 */
export function MountReadOnlyBadge({
  className,
  label = "Read-only",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <Badge
      variant="secondary"
      title={MOUNT_READONLY_TITLE}
      className={cn(
        "rounded-sm px-1.5 py-0 text-[0.65rem] font-normal tracking-wide",
        className,
      )}
    >
      {label}
    </Badge>
  );
}

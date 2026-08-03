import { Button } from "@aprovan/ui";
import { useEffect, useRef, useState } from "react";

/**
 * Two-step destructive control: first click arms, second confirms. Disarms
 * after `disarmMs` (default 3s). Mirrors the product shell ArmedButton.
 */
export function ArmedButton({
  label,
  armedLabel,
  onConfirm,
  size = "sm",
  disarmMs = 3000,
  disabled,
}: {
  label: string;
  armedLabel: string;
  onConfirm: () => void;
  size?: "sm" | "icon";
  disarmMs?: number;
  disabled?: boolean;
}): React.ReactElement {
  const [armed, setArmed] = useState(false);
  const timerRef = useRef(0);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  return (
    <Button
      disabled={disabled}
      size={size}
      variant={armed ? "destructive" : "ghost"}
      className={size === "sm" ? "h-7 px-2 text-xs" : undefined}
      onClick={() => {
        if (!armed) {
          setArmed(true);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => setArmed(false), disarmMs);
          return;
        }
        window.clearTimeout(timerRef.current);
        setArmed(false);
        onConfirm();
      }}
    >
      {armed ? armedLabel : label}
    </Button>
  );
}

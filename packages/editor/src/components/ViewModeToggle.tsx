import { Code, Eye } from 'lucide-react';
import { cn } from '../lib/utils';

export interface ViewModeToggleProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function ViewModeToggle({ label, active, onClick }: ViewModeToggleProps) {
  const Icon = active ? Eye : Code;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-2 py-1 text-xs rounded flex items-center gap-1',
        active
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-primary/20 text-primary',
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </button>
  );
}

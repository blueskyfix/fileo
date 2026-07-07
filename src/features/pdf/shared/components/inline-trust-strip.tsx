import type { LucideIcon } from "lucide-react";

interface TrustPoint {
  label: string;
  icon: LucideIcon;
}

interface InlineTrustStripProps {
  points: TrustPoint[];
}

export function InlineTrustStrip({ points }: InlineTrustStripProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {points.map(({ label, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center gap-1.5 text-sm font-medium text-foreground-muted"
        >
          <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
          {label}
        </div>
      ))}
    </div>
  );
}
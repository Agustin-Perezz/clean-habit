import type { FocusMetrics } from "../mock-data";

type FocusMomentumPillsProps = {
  metrics: FocusMetrics;
};

export function FocusMomentumPills({ metrics }: FocusMomentumPillsProps) {
  return (
    <>
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-ink-primary shadow-sm">
        <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
        <span className="font-caption text-caption text-ink-secondary">
          Momentum:
        </span>
        <span className="font-caption-strong text-caption-strong text-ink-primary">
          {metrics.momentumPercent}%
        </span>
      </div>
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-ink-primary shadow-sm border border-hairline-subtle">
        <span
          className="material-symbols-outlined text-[16px] text-primary-container"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          local_fire_department
        </span>
        <span className="font-caption text-caption text-ink-secondary">
          Streak:
        </span>
        <span className="font-caption-strong text-caption-strong text-ink-primary font-mono">
          {metrics.streakLabel}
        </span>
      </div>
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-ink-primary shadow-sm">
        <span className="material-symbols-outlined text-[16px] text-primary-container">
          stars
        </span>
        <span className="font-caption-strong text-caption-strong text-primary-container">
          +{metrics.pointsToday} Points Today
        </span>
      </div>
    </>
  );
}

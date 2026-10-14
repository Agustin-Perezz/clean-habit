import type { FocusMetrics } from "../mock-data";
import { FocusSummitRing } from "./FocusSummitRing";

type FocusSummitCardProps = {
  metrics: FocusMetrics;
};

export function FocusSummitCard({ metrics }: FocusSummitCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-focus-2xl p-space-lg flex flex-col gap-space-md shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-caption-strong text-caption-strong text-ink-tertiary uppercase tracking-wider">
          Today's Summit
        </span>
        <span className="material-symbols-outlined text-primary-container text-[20px]">
          flag
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <span className="font-display-md text-display-md text-ink-primary">
            {metrics.summitEarned}
          </span>
          <span className="font-body text-body text-ink-tertiary">
            / {metrics.summitTotal} Points Earned
          </span>
        </div>
        <p className="font-caption text-caption text-ink-secondary">
          {metrics.summitMessage}
        </p>
      </div>
      <div className="pt-space-xs flex items-center justify-center">
        <FocusSummitRing
          offset={metrics.ringOffset}
          percent={metrics.momentumPercent}
        />
      </div>
    </div>
  );
}

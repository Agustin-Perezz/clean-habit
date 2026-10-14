import { CURRENT_USER, HEATMAP_TREND_LABEL } from "../mock-data";
import { FocusHeatmapGrid } from "./FocusHeatmapGrid";

export function FocusHeatmap() {
  return (
    <div className="bg-surface-container-lowest rounded-focus-2xl p-space-lg flex flex-col gap-space-md shadow-sm border border-hairline-subtle">
      <div className="flex items-center justify-between">
        <span className="font-caption-strong text-caption-strong text-ink-tertiary uppercase tracking-wider text-[11px]">
          Activity Momentum
        </span>
        <span className="font-caption-strong text-caption-strong text-primary-container font-mono">
          {CURRENT_USER.streak}
        </span>
      </div>
      <FocusHeatmapGrid />
      <div className="flex items-center justify-between text-ink-tertiary pt-2 border-t border-hairline-subtle">
        <span className="font-caption text-caption">Daily Velocity</span>
        <span className="font-caption-strong text-caption-strong text-ink-primary font-mono">
          {HEATMAP_TREND_LABEL} vs avg
        </span>
      </div>
    </div>
  );
}

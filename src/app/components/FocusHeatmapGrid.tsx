import {
  HEATMAP_ACTIVE_COLOR,
  HEATMAP_ACTIVE_INDICES,
  HEATMAP_CELLS,
  HEATMAP_INACTIVE_COLOR,
  HEATMAP_TREND_COLOR,
  HEATMAP_TREND_LABEL,
} from "../mock-data";

export function FocusHeatmapGrid() {
  return (
    <div className="relative flex flex-col items-center justify-center py-2 px-1 bg-surface-container-low/50 rounded-focus-xl overflow-hidden">
      <div className="absolute z-10 top-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-hairline-subtle">
        <span
          className="text-[11px] leading-none font-bold"
          style={{ color: HEATMAP_TREND_COLOR }}
        >
          ▲
        </span>
        <span className="font-caption-strong text-[12px] font-semibold text-ink-primary tracking-tight">
          {HEATMAP_TREND_LABEL}
        </span>
      </div>
      <div className="grid grid-flow-col grid-rows-5 gap-1 pt-6 pb-1 select-none">
        {HEATMAP_CELLS.map((index) => (
          <div
            className="w-3 h-3 rounded-[2px]"
            key={`heat-${index}`}
            style={{
              backgroundColor: HEATMAP_ACTIVE_INDICES.includes(index)
                ? HEATMAP_ACTIVE_COLOR
                : HEATMAP_INACTIVE_COLOR,
            }}
          />
        ))}
      </div>
    </div>
  );
}

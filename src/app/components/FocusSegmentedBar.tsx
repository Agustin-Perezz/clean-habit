type FocusSegmentedBarProps = {
  segments: readonly string[];
  completedCount: number;
  totalCount: number;
  earnedPoints: number;
};

export function FocusSegmentedBar({
  segments,
  completedCount,
  totalCount,
  earnedPoints,
}: FocusSegmentedBarProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="grid grid-cols-6 gap-2 w-full">
        {segments.map((color, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static six-segment scale, order never changes
            key={`segment-${index}`}
            className="h-3.5 rounded-focus-md"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="flex justify-between items-center text-ink-tertiary">
        <span className="card-counter font-caption text-caption text-ink-secondary">
          {completedCount} of {totalCount} completed
        </span>
        <span className="card-points-label font-micro-legal text-micro-legal text-ink-tertiary">
          +{earnedPoints} pts earned
        </span>
      </div>
    </div>
  );
}

import { DASHBOARD_DATE, type FocusMetrics } from "../mock-data";
import { FocusHeaderActions } from "./FocusHeaderActions";

type FocusDashboardHeaderProps = {
  metrics: FocusMetrics;
  onNewObjective: () => void;
};

export function FocusDashboardHeader({
  metrics,
  onNewObjective,
}: FocusDashboardHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg pb-space-md mt-4">
      <div className="flex flex-col gap-space-xs">
        <span className="font-caption-strong text-caption-strong text-ink-tertiary uppercase tracking-wider">
          {DASHBOARD_DATE}
        </span>
        <h1 className="font-display-lg text-display-lg text-ink-primary tracking-tight">
          Focus & Habits
        </h1>
      </div>
      <FocusHeaderActions metrics={metrics} onNewObjective={onNewObjective} />
    </header>
  );
}

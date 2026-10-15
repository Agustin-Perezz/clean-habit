import type { FocusMetrics, FocusObjective } from "../mock-data";
import { FocusMetricsAside } from "./FocusMetricsAside";
import { FocusObjectiveList } from "./FocusObjectiveList";
import type { FocusQuickIngestProps } from "./focus-quick-ingest-types";

type FocusObjectiveBoardProps = {
  objectives: readonly FocusObjective[];
  metrics: FocusMetrics;
  quickIngest: FocusQuickIngestProps;
  activeHabitId: string | null;
  onToggleHabit: (objectiveId: string, habitId: string) => void;
  onToggleFocus: (habitId: string) => void;
  onEdit: (objective: FocusObjective) => void;
};

export function FocusObjectiveBoard({
  objectives,
  metrics,
  quickIngest,
  activeHabitId,
  onToggleHabit,
  onToggleFocus,
  onEdit,
}: FocusObjectiveBoardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
      <FocusObjectiveList
        objectives={objectives}
        activeHabitId={activeHabitId}
        onToggleHabit={onToggleHabit}
        onToggleFocus={onToggleFocus}
        onEdit={onEdit}
      />
      <FocusMetricsAside metrics={metrics} quickIngest={quickIngest} />
    </div>
  );
}

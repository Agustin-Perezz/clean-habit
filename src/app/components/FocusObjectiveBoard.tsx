import type { FormEvent } from "react";
import {
  deriveQuickIngestOptions,
  type FocusMetrics,
  type FocusObjective,
} from "../mock-data";
import { FocusMetricsAside } from "./FocusMetricsAside";
import { FocusObjectiveList } from "./FocusObjectiveList";

type FocusObjectiveBoardProps = {
  objectives: readonly FocusObjective[];
  metrics: FocusMetrics;
  selectedObjectiveId: string;
  draft: string;
  onToggleHabit: (objectiveId: string, habitId: string) => void;
  onEdit: (objective: FocusObjective) => void;
  onDraftChange: (draft: string) => void;
  onObjectiveChange: (objectiveId: string) => void;
  onSubmitDraft: (event: FormEvent<HTMLFormElement>) => void;
};

export function FocusObjectiveBoard({
  objectives,
  metrics,
  selectedObjectiveId,
  draft,
  onToggleHabit,
  onEdit,
  onDraftChange,
  onObjectiveChange,
  onSubmitDraft,
}: FocusObjectiveBoardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
      <FocusObjectiveList
        objectives={objectives}
        onToggleHabit={onToggleHabit}
        onEdit={onEdit}
      />
      <FocusMetricsAside
        metrics={metrics}
        quickIngest={{
          draft,
          selectedObjectiveId,
          options: deriveQuickIngestOptions(objectives),
          onDraftChange,
          onObjectiveChange,
          onSubmit: onSubmitDraft,
        }}
      />
    </div>
  );
}

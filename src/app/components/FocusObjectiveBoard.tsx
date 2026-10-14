import type { FormEvent } from "react";
import {
  type FocusMetrics,
  type FocusObjective,
  QUICK_INGEST_CATEGORIES,
} from "../mock-data";
import { FocusMetricsAside } from "./FocusMetricsAside";
import { FocusObjectiveList } from "./FocusObjectiveList";

type FocusObjectiveBoardProps = {
  objectives: readonly FocusObjective[];
  metrics: FocusMetrics;
  categoryIndex: number;
  draft: string;
  onToggleHabit: (objectiveId: string, habitId: string) => void;
  onEdit: (objective: FocusObjective) => void;
  onDraftChange: (draft: string) => void;
  onCategoryChange: (index: number) => void;
  onSubmitDraft: (event: FormEvent<HTMLFormElement>) => void;
};

export function FocusObjectiveBoard({
  objectives,
  metrics,
  categoryIndex,
  draft,
  onToggleHabit,
  onEdit,
  onDraftChange,
  onCategoryChange,
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
          categories: QUICK_INGEST_CATEGORIES,
          categoryIndex,
          draft,
          onCategoryChange,
          onDraftChange,
          onSubmit: onSubmitDraft,
        }}
      />
    </div>
  );
}

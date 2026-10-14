"use client";

import { useFocusDashboard } from "../hooks/useFocusDashboard";
import { QUICK_INGEST_CATEGORIES } from "../mock-data";
import { FocusDashboardHeader } from "./FocusDashboardHeader";
import { FocusMetricsAside } from "./FocusMetricsAside";
import { FocusObjectiveList } from "./FocusObjectiveList";

export function FocusWorkspace() {
  const {
    objectives,
    metrics,
    draft,
    categoryIndex,
    setDraft,
    setCategoryIndex,
    toggleHabit,
    submitDraft,
  } = useFocusDashboard();

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-space-xl max-w-[1440px] mx-auto w-full">
        <FocusDashboardHeader metrics={metrics} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <FocusObjectiveList
            objectives={objectives}
            onToggleHabit={toggleHabit}
          />
          <FocusMetricsAside
            metrics={metrics}
            quickIngest={{
              categories: QUICK_INGEST_CATEGORIES,
              categoryIndex,
              draft,
              onCategoryChange: setCategoryIndex,
              onDraftChange: setDraft,
              onSubmit: submitDraft,
            }}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useFocusDashboard } from "../hooks/useFocusDashboard";
import type { FocusObjective } from "../mock-data";
import { FocusDashboardHeader } from "./FocusDashboardHeader";
import { FocusObjectiveBoard } from "./FocusObjectiveBoard";
import { FocusWorkspaceDialog } from "./FocusWorkspaceDialog";
import { FOCUS_CONTENT_MAX_WIDTH } from "./focus-layout";
import type { FocusObjectiveDialogState } from "./focus-objective-dialog-types";

type FocusWorkspaceProps = {
  initialObjectives: readonly FocusObjective[];
};

export function FocusWorkspace({ initialObjectives }: FocusWorkspaceProps) {
  const {
    objectives,
    metrics,
    draft,
    selectedObjectiveId,
    setDraft,
    setSelectedObjectiveId,
    toggleHabit,
    submitDraft,
  } = useFocusDashboard(initialObjectives);
  const [dialog, setDialog] = useState<FocusObjectiveDialogState>(null);

  return (
    <div className="flex flex-col w-full">
      <div
        className={`flex flex-col gap-space-xl ${FOCUS_CONTENT_MAX_WIDTH} mx-auto w-full`}
      >
        <FocusDashboardHeader
          metrics={metrics}
          onNewObjective={() => setDialog({ mode: "create", objective: null })}
        />
        <FocusObjectiveBoard
          objectives={objectives}
          metrics={metrics}
          selectedObjectiveId={selectedObjectiveId}
          draft={draft}
          onToggleHabit={toggleHabit}
          onEdit={(objective) => setDialog({ mode: "edit", objective })}
          onDraftChange={setDraft}
          onObjectiveChange={setSelectedObjectiveId}
          onSubmitDraft={submitDraft}
        />
      </div>
      <FocusWorkspaceDialog dialog={dialog} onClose={() => setDialog(null)} />
    </div>
  );
}

"use client";

import {
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { playCompletionSound } from "../components/completion-sound";
import type { FocusQuickIngestProps } from "../components/focus-quick-ingest-types";
import {
  createHabit,
  deriveFocusMetrics,
  deriveQuickIngestOptions,
  type FocusObjective,
} from "../mock-data";

export function useFocusDashboard(
  initialObjectives: readonly FocusObjective[],
) {
  const [objectives, setObjectives] =
    useState<readonly FocusObjective[]>(initialObjectives);
  const [draft, setDraft] = useState("");
  const [selectedObjectiveId, setSelectedObjectiveId] = useState(
    initialObjectives[0]?.id ?? "",
  );
  const [activeHabitId, setActiveHabitId] = useState<string | null>(null);

  // Server data is the source of truth: absorb revalidated reads (create,
  // update, delete). Habit toggles and quick-ingest additions stay ephemeral.
  useEffect(() => {
    setObjectives(initialObjectives);
    setSelectedObjectiveId((current) =>
      initialObjectives.some((objective) => objective.id === current)
        ? current
        : (initialObjectives[0]?.id ?? ""),
    );
  }, [initialObjectives]);

  const toggleHabit = useCallback(
    (objectiveId: string, habitId: string) => {
      const habit = objectives
        .find((objective) => objective.id === objectiveId)
        ?.habits.find((candidate) => candidate.id === habitId);

      // Feedback belongs to the transition into completion, not to undone work.
      if (habit && !habit.completed) {
        playCompletionSound();
      }

      setObjectives((previous) =>
        previous.map((objective) =>
          objective.id === objectiveId
            ? {
                ...objective,
                habits: objective.habits.map((candidate) =>
                  candidate.id === habitId
                    ? { ...candidate, completed: !candidate.completed }
                    : candidate,
                ),
              }
            : objective,
        ),
      );
    },
    [objectives],
  );

  // One task is "being worked on" at a time; the completion checkbox is a
  // separate control and never changes this state.
  const toggleActiveHabit = useCallback((habitId: string) => {
    setActiveHabitId((current) => (current === habitId ? null : habitId));
  }, []);

  const submitDraft = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const title = draft.trim();
      if (title.length === 0 || selectedObjectiveId.length === 0) {
        return;
      }
      setObjectives((previous) =>
        previous.map((objective) =>
          objective.id === selectedObjectiveId
            ? {
                ...objective,
                habits: [...objective.habits, createHabit(title)],
              }
            : objective,
        ),
      );
      setDraft("");
    },
    [draft, selectedObjectiveId],
  );

  const metrics = useMemo(() => deriveFocusMetrics(objectives), [objectives]);

  const quickIngest: FocusQuickIngestProps = {
    draft,
    selectedObjectiveId,
    options: deriveQuickIngestOptions(objectives),
    onDraftChange: setDraft,
    onObjectiveChange: setSelectedObjectiveId,
    onSubmit: submitDraft,
  };

  return {
    objectives,
    metrics,
    activeHabitId,
    quickIngest,
    toggleHabit,
    toggleActiveHabit,
  };
}

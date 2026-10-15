"use client";

import {
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createHabit,
  deriveFocusMetrics,
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

  const toggleHabit = useCallback((objectiveId: string, habitId: string) => {
    setObjectives((previous) =>
      previous.map((objective) =>
        objective.id === objectiveId
          ? {
              ...objective,
              habits: objective.habits.map((habit) =>
                habit.id === habitId
                  ? { ...habit, completed: !habit.completed }
                  : habit,
              ),
            }
          : objective,
      ),
    );
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

  return {
    objectives,
    metrics,
    draft,
    selectedObjectiveId,
    setDraft,
    setSelectedObjectiveId,
    toggleHabit,
    submitDraft,
  };
}

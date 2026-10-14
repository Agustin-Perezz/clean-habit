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
  QUICK_INGEST_CATEGORIES,
} from "../mock-data";

export function useFocusDashboard(
  initialObjectives: readonly FocusObjective[],
) {
  const [objectives, setObjectives] =
    useState<readonly FocusObjective[]>(initialObjectives);
  const [draft, setDraft] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(
    QUICK_INGEST_CATEGORIES[0].value,
  );

  // Server data is the source of truth: absorb revalidated reads (create,
  // update, delete). Habit toggles and quick-ingest additions stay ephemeral.
  useEffect(() => {
    setObjectives(initialObjectives);
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
      if (title.length === 0) {
        return;
      }
      setObjectives((previous) =>
        previous.map((objective, index) =>
          index === categoryIndex
            ? {
                ...objective,
                habits: [...objective.habits, createHabit(title)],
              }
            : objective,
        ),
      );
      setDraft("");
    },
    [draft, categoryIndex],
  );

  const metrics = useMemo(() => deriveFocusMetrics(objectives), [objectives]);

  return {
    objectives,
    metrics,
    draft,
    categoryIndex,
    setDraft,
    setCategoryIndex,
    toggleHabit,
    submitDraft,
  };
}

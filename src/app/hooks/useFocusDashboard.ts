"use client";

import { type FormEvent, useCallback, useMemo, useState } from "react";
import {
  createHabit,
  deriveFocusMetrics,
  type FocusObjective,
  INITIAL_OBJECTIVES,
  QUICK_INGEST_CATEGORIES,
} from "../mock-data";

export function useFocusDashboard() {
  const [objectives, setObjectives] =
    useState<readonly FocusObjective[]>(INITIAL_OBJECTIVES);
  const [draft, setDraft] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(
    QUICK_INGEST_CATEGORIES[0].value,
  );

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

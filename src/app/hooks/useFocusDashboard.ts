"use client";

import {
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { updateObjectiveHabitsAction } from "../actions";
import { playCompletionSound } from "../components/completion-sound";
import type { FocusQuickIngestProps } from "../components/focus-quick-ingest-types";
import {
  createHabit,
  deriveFocusMetrics,
  deriveQuickIngestOptions,
  type FocusHabit,
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
  const [habitError, setHabitError] = useState<string | null>(null);

  // Server data is the source of truth: absorb revalidated reads (create,
  // update, delete). Habit edits are applied optimistically and then written
  // through `persistHabits`, so a reload never drops a subtask.
  useEffect(() => {
    setObjectives(initialObjectives);
    setSelectedObjectiveId((current) =>
      initialObjectives.some((objective) => objective.id === current)
        ? current
        : (initialObjectives[0]?.id ?? ""),
    );
  }, [initialObjectives]);

  // Two subtask edits in a row are two requests, and nothing stops an older
  // one from landing last. Chaining the writes keeps the server on the user's
  // order of intent, so the newest edit always wins.
  const writeQueue = useRef<Promise<void>>(Promise.resolve());

  const persistHabits = useCallback(
    (
      objectiveId: string,
      habits: readonly FocusHabit[],
      previousObjectives: readonly FocusObjective[],
    ) => {
      writeQueue.current = writeQueue.current
        .catch(() => undefined)
        .then(async () => {
          const result = await updateObjectiveHabitsAction({
            id: objectiveId,
            habits: [...habits],
          });

          if (result.error) {
            // The write failed: fall back to the last known server state so the
            // board never shows a subtask that was not saved.
            setObjectives(previousObjectives);
            setHabitError(result.error);
            return;
          }

          setHabitError(null);
        });

      return writeQueue.current;
    },
    [],
  );

  const toggleHabit = useCallback(
    (objectiveId: string, habitId: string) => {
      const objective = objectives.find(
        (candidate) => candidate.id === objectiveId,
      );
      const habit = objective?.habits.find(
        (candidate) => candidate.id === habitId,
      );

      if (!objective || !habit) {
        return;
      }

      // Feedback belongs to the transition into completion, not to undone work.
      if (!habit.completed) {
        playCompletionSound();
      }

      const nextObjectives = objectives.map((candidate) =>
        candidate.id === objectiveId
          ? {
              ...candidate,
              habits: candidate.habits.map((entry) =>
                entry.id === habitId
                  ? { ...entry, completed: !entry.completed }
                  : entry,
              ),
            }
          : candidate,
      );
      setObjectives(nextObjectives);

      const updated = nextObjectives.find(
        (candidate) => candidate.id === objectiveId,
      );

      if (updated) {
        void persistHabits(objectiveId, updated.habits, objectives);
      }
    },
    [objectives, persistHabits],
  );

  const deleteHabit = useCallback(
    (objectiveId: string, habitId: string) => {
      const nextObjectives = objectives.map((candidate) =>
        candidate.id === objectiveId
          ? {
              ...candidate,
              habits: candidate.habits.filter((entry) => entry.id !== habitId),
            }
          : candidate,
      );
      setObjectives(nextObjectives);

      // A deleted task cannot still be the one being worked on.
      setActiveHabitId((current) => (current === habitId ? null : current));

      const updated = nextObjectives.find(
        (candidate) => candidate.id === objectiveId,
      );

      if (updated) {
        void persistHabits(objectiveId, updated.habits, objectives);
      }
    },
    [objectives, persistHabits],
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

      const nextObjectives = objectives.map((objective) =>
        objective.id === selectedObjectiveId
          ? {
              ...objective,
              habits: [...objective.habits, createHabit(title)],
            }
          : objective,
      );
      setObjectives(nextObjectives);
      setDraft("");

      const updated = nextObjectives.find(
        (objective) => objective.id === selectedObjectiveId,
      );

      if (updated) {
        void persistHabits(selectedObjectiveId, updated.habits, objectives);
      }
    },
    [draft, objectives, selectedObjectiveId, persistHabits],
  );

  const metrics = useMemo(() => deriveFocusMetrics(objectives), [objectives]);

  const quickIngest: FocusQuickIngestProps = {
    draft,
    selectedObjectiveId,
    options: deriveQuickIngestOptions(objectives),
    error: habitError,
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
    deleteHabit,
    toggleActiveHabit,
  };
}

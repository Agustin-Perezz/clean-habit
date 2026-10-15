import type { FocusObjective } from "../mock-data";
import { FocusObjectiveCard } from "./FocusObjectiveCard";
import { FocusObjectiveEmptyState } from "./FocusObjectiveEmptyState";

type FocusObjectiveListProps = {
  objectives: readonly FocusObjective[];
  activeHabitId: string | null;
  onToggleHabit: (objectiveId: string, habitId: string) => void;
  onToggleFocus: (habitId: string) => void;
  onEdit: (objective: FocusObjective) => void;
};

export function FocusObjectiveList({
  objectives,
  activeHabitId,
  onToggleHabit,
  onToggleFocus,
  onEdit,
}: FocusObjectiveListProps) {
  if (objectives.length === 0) {
    return <FocusObjectiveEmptyState />;
  }

  return (
    <section className="lg:col-span-8 flex flex-col gap-space-lg">
      {objectives.map((objective) => (
        <FocusObjectiveCard
          key={objective.id}
          objective={objective}
          activeHabitId={activeHabitId}
          onToggleHabit={(habitId) => onToggleHabit(objective.id, habitId)}
          onToggleFocus={onToggleFocus}
          onEdit={() => onEdit(objective)}
        />
      ))}
    </section>
  );
}

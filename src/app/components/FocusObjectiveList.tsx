import type { FocusObjective } from "../mock-data";
import { FocusObjectiveCard } from "./FocusObjectiveCard";
import { FocusObjectiveEmptyState } from "./FocusObjectiveEmptyState";

type FocusObjectiveListProps = {
  objectives: readonly FocusObjective[];
  onToggleHabit: (objectiveId: string, habitId: string) => void;
  onEdit: (objective: FocusObjective) => void;
};

export function FocusObjectiveList({
  objectives,
  onToggleHabit,
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
          onToggleHabit={(habitId) => onToggleHabit(objective.id, habitId)}
          onEdit={() => onEdit(objective)}
        />
      ))}
    </section>
  );
}

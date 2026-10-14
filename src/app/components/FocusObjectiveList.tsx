import type { FocusObjective } from "../mock-data";
import { FocusObjectiveCard } from "./FocusObjectiveCard";

type FocusObjectiveListProps = {
  objectives: readonly FocusObjective[];
  onToggleHabit: (objectiveId: string, habitId: string) => void;
};

export function FocusObjectiveList({
  objectives,
  onToggleHabit,
}: FocusObjectiveListProps) {
  return (
    <section className="lg:col-span-8 flex flex-col gap-space-lg">
      {objectives.map((objective) => (
        <FocusObjectiveCard
          key={objective.id}
          objective={objective}
          onToggleHabit={(habitId) => onToggleHabit(objective.id, habitId)}
        />
      ))}
    </section>
  );
}

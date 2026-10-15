import { type FocusObjective, getObjectiveStats } from "../mock-data";
import { FocusHabitRow } from "./FocusHabitRow";
import { FocusObjectiveHeader } from "./FocusObjectiveHeader";
import { FocusSegmentedBar } from "./FocusSegmentedBar";

type FocusObjectiveCardProps = {
  objective: FocusObjective;
  activeHabitId: string | null;
  onToggleHabit: (habitId: string) => void;
  onToggleFocus: (habitId: string) => void;
  onDeleteHabit: (habitId: string) => void;
  onEdit: () => void;
};

export function FocusObjectiveCard({
  objective,
  activeHabitId,
  onToggleHabit,
  onToggleFocus,
  onDeleteHabit,
  onEdit,
}: FocusObjectiveCardProps) {
  const stats = getObjectiveStats(objective);
  return (
    <article className="objective-card bg-surface-container-lowest rounded-focus-2xl p-space-lg flex flex-col gap-space-md shadow-sm transition-all">
      <FocusObjectiveHeader
        category={objective.category}
        percent={stats.percent}
        priorityLabel={objective.priorityLabel}
        title={objective.title}
        onEdit={onEdit}
      />
      <FocusSegmentedBar
        completedCount={stats.completedCount}
        earnedPoints={stats.earnedPoints}
        segments={objective.segments}
        totalCount={stats.totalCount}
      />
      <div className="flex flex-col divide-y divide-hairline-subtle pt-1">
        {objective.habits.map((habit) => (
          <FocusHabitRow
            accentColor={objective.accentColor}
            active={habit.id === activeHabitId}
            habit={habit}
            key={habit.id}
            onDelete={() => onDeleteHabit(habit.id)}
            onToggle={() => onToggleHabit(habit.id)}
            onToggleFocus={() => onToggleFocus(habit.id)}
          />
        ))}
      </div>
    </article>
  );
}

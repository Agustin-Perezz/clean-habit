import { type FocusObjective, getObjectiveStats } from "../mock-data";
import { FocusHabitRow } from "./FocusHabitRow";
import { FocusObjectiveHeader } from "./FocusObjectiveHeader";
import { FocusSegmentedBar } from "./FocusSegmentedBar";

type FocusObjectiveCardProps = {
  objective: FocusObjective;
  onToggleHabit: (habitId: string) => void;
};

export function FocusObjectiveCard({
  objective,
  onToggleHabit,
}: FocusObjectiveCardProps) {
  const stats = getObjectiveStats(objective);
  return (
    <article className="objective-card bg-surface-container-lowest rounded-focus-2xl p-space-lg flex flex-col gap-space-md shadow-sm transition-all">
      <FocusObjectiveHeader
        category={objective.category}
        percent={stats.percent}
        priorityLabel={objective.priorityLabel}
        title={objective.title}
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
            habit={habit}
            key={habit.id}
            onToggle={() => onToggleHabit(habit.id)}
          />
        ))}
      </div>
    </article>
  );
}

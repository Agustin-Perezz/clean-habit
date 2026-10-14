import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { FocusHabit } from "../mock-data";
import { FocusHabitCheck } from "./FocusHabitCheck";
import { FocusHabitControls } from "./FocusHabitControls";

type FocusHabitRowProps = {
  habit: FocusHabit;
  accentColor: string;
  onToggle: () => void;
};

export function FocusHabitRow({
  habit,
  accentColor,
  onToggle,
}: FocusHabitRowProps) {
  return (
    <Label className="group flex items-center justify-between gap-0 py-3 cursor-pointer select-none">
      <div className="flex items-center gap-3">
        <input
          checked={habit.completed}
          className="sr-only"
          onChange={onToggle}
          type="checkbox"
        />
        <FocusHabitCheck
          accentColor={accentColor}
          completed={habit.completed}
        />
        <span
          className={cn(
            "task-title font-body text-body transition-colors",
            habit.completed
              ? "text-ink-tertiary line-through"
              : "text-ink-primary",
          )}
        >
          {habit.title}
        </span>
      </div>
      <FocusHabitControls completed={habit.completed} points={habit.points} />
    </Label>
  );
}

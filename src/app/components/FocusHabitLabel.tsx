import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { FocusHabit } from "../mock-data";
import { FocusHabitCheck } from "./FocusHabitCheck";

type FocusHabitLabelProps = {
  habit: FocusHabit;
  accentColor: string;
  active: boolean;
  onToggle: () => void;
};

/** The completion affordance: checkbox, check mark, and the task title. */
export function FocusHabitLabel({
  habit,
  accentColor,
  active,
  onToggle,
}: FocusHabitLabelProps) {
  return (
    <Label className="flex items-center gap-3 cursor-pointer">
      <input
        checked={habit.completed}
        className="sr-only"
        onChange={onToggle}
        type="checkbox"
      />
      <FocusHabitCheck accentColor={accentColor} completed={habit.completed} />
      <span
        className={cn(
          "task-title font-body text-body transition-colors",
          habit.completed
            ? "text-ink-tertiary line-through"
            : "text-ink-primary",
          !habit.completed && active && "text-primary-container",
        )}
      >
        {habit.title}
      </span>
    </Label>
  );
}

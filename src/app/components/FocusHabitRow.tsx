import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { FocusHabit } from "../mock-data";
import { FocusHabitCheck } from "./FocusHabitCheck";
import { FocusHabitControls } from "./FocusHabitControls";

type FocusHabitRowProps = {
  habit: FocusHabit;
  accentColor: string;
  active: boolean;
  onToggle: () => void;
  onToggleFocus: () => void;
};

export function FocusHabitRow({
  habit,
  accentColor,
  active,
  onToggle,
  onToggleFocus,
}: FocusHabitRowProps) {
  return (
    <div className="group flex items-center justify-between gap-0 py-3 select-none">
      <Label className="flex items-center gap-3 cursor-pointer">
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
            !habit.completed && active && "text-primary-container",
          )}
        >
          {habit.title}
        </span>
      </Label>
      <FocusHabitControls
        active={active}
        points={habit.points}
        onToggleFocus={onToggleFocus}
      />
    </div>
  );
}

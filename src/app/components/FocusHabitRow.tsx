import type { FocusHabit } from "../mock-data";
import { FocusHabitControls } from "./FocusHabitControls";
import { FocusHabitLabel } from "./FocusHabitLabel";

type FocusHabitRowProps = {
  habit: FocusHabit;
  accentColor: string;
  active: boolean;
  onToggle: () => void;
  onToggleFocus: () => void;
  onDelete: () => void;
};

export function FocusHabitRow({
  habit,
  accentColor,
  active,
  onToggle,
  onToggleFocus,
  onDelete,
}: FocusHabitRowProps) {
  return (
    <div className="group flex items-center justify-between gap-0 py-3 select-none">
      <FocusHabitLabel
        accentColor={accentColor}
        active={active}
        habit={habit}
        onToggle={onToggle}
      />
      <FocusHabitControls
        active={active}
        points={habit.points}
        title={habit.title}
        onDelete={onDelete}
        onToggleFocus={onToggleFocus}
      />
    </div>
  );
}

import { FocusToggle } from "./FocusToggle";

type FocusHabitControlsProps = {
  completed: boolean;
  points: number;
};

export function FocusHabitControls({
  completed,
  points,
}: FocusHabitControlsProps) {
  return (
    <div className="flex items-center gap-2.5">
      <FocusToggle completed={completed} />
      <span className="font-caption text-caption text-ink-tertiary font-mono group-hover:text-ink-secondary">
        +{points} pt
      </span>
    </div>
  );
}

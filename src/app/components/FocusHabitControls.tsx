import { FocusToggle } from "./FocusToggle";

type FocusHabitControlsProps = {
  active: boolean;
  points: number;
  onToggleFocus: () => void;
};

export function FocusHabitControls({
  active,
  points,
  onToggleFocus,
}: FocusHabitControlsProps) {
  return (
    <div className="flex items-center gap-2.5">
      <FocusToggle active={active} onToggle={onToggleFocus} />
      <span className="font-caption text-caption text-ink-tertiary font-mono group-hover:text-ink-secondary">
        +{points} pt
      </span>
    </div>
  );
}

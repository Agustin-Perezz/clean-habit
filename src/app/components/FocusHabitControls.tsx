import { FocusToggle } from "./FocusToggle";

type FocusHabitControlsProps = {
  active: boolean;
  points: number;
  title: string;
  onToggleFocus: () => void;
  onDelete: () => void;
};

export function FocusHabitControls({
  active,
  points,
  title,
  onToggleFocus,
  onDelete,
}: FocusHabitControlsProps) {
  return (
    <div className="flex items-center gap-2.5">
      <button
        aria-label={`Delete ${title}`}
        className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity text-ink-tertiary hover:text-error"
        onClick={onDelete}
        type="button"
      >
        <span
          aria-hidden="true"
          className="material-symbols-outlined text-[18px]"
        >
          delete
        </span>
      </button>
      <FocusToggle active={active} onToggle={onToggleFocus} />
      <span className="font-caption text-caption text-ink-tertiary font-mono group-hover:text-ink-secondary">
        +{points} pt
      </span>
    </div>
  );
}

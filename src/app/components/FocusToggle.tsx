import { cn } from "@/lib/utils";
import { TOGGLE_INACTIVE_COLOR } from "../mock-data";

type FocusToggleProps = {
  active: boolean;
  onToggle: () => void;
};

export function FocusToggle({ active, onToggle }: FocusToggleProps) {
  return (
    <button
      aria-label="Work on this task"
      aria-pressed={active}
      className={cn(
        "relative w-11 h-6 rounded-full transition-colors duration-200 flex items-center p-0.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] cursor-pointer",
        active ? "bg-primary-container" : "",
      )}
      onClick={onToggle}
      style={active ? undefined : { backgroundColor: TOGGLE_INACTIVE_COLOR }}
      type="button"
    >
      <span
        className={cn(
          "w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200",
          active ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  );
}

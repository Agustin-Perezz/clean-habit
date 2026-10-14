import { cn } from "@/lib/utils";
import { TOGGLE_INACTIVE_COLOR } from "../mock-data";

type FocusToggleProps = {
  completed: boolean;
};

export function FocusToggle({ completed }: FocusToggleProps) {
  return (
    <div
      className={cn(
        "relative w-11 h-6 rounded-full transition-colors duration-200 flex items-center p-0.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]",
        completed ? "bg-primary-container" : "",
      )}
      style={completed ? undefined : { backgroundColor: TOGGLE_INACTIVE_COLOR }}
    >
      <div
        className={cn(
          "w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200",
          completed ? "translate-x-5" : "translate-x-0",
        )}
      />
    </div>
  );
}

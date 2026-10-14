import { CHECK_ACTIVE_COLOR } from "../mock-data";

type FocusHabitCheckProps = {
  completed: boolean;
  accentColor: string;
};

export function FocusHabitCheck({
  completed,
  accentColor,
}: FocusHabitCheckProps) {
  if (completed) {
    return (
      <div
        className="check-box w-6 h-6 rounded-full flex items-center justify-center transition-all text-on-primary"
        style={{ backgroundColor: CHECK_ACTIVE_COLOR }}
      >
        <span className="material-symbols-outlined text-[16px]">check</span>
      </div>
    );
  }
  return (
    <div className="check-box w-6 h-6 flex items-center justify-center">
      <svg
        aria-hidden="true"
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeDasharray="3 2.5"
        strokeWidth={1.8}
        style={{ color: accentColor }}
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="9" />
      </svg>
    </div>
  );
}

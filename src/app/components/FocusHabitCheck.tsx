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
      <span className="relative flex w-6 h-6 items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full animate-check-burst motion-reduce:animate-none"
          style={{ backgroundColor: CHECK_ACTIVE_COLOR, opacity: 0 }}
        />
        <span
          className="check-box flex w-6 h-6 items-center justify-center rounded-full text-on-primary animate-check-pop transition-all motion-reduce:animate-none"
          style={{ backgroundColor: CHECK_ACTIVE_COLOR }}
        >
          <span className="material-symbols-outlined text-[16px]">check</span>
        </span>
      </span>
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

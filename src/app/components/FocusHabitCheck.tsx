import { FocusCompletionMark } from "./FocusCompletionMark";

type FocusHabitCheckProps = {
  completed: boolean;
  accentColor: string;
};

export function FocusHabitCheck({
  completed,
  accentColor,
}: FocusHabitCheckProps) {
  if (completed) {
    return <FocusCompletionMark />;
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

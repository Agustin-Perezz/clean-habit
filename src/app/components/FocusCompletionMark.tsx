import { CHECK_ACTIVE_COLOR } from "../mock-data";
import { FocusCompletionBurst } from "./FocusCompletionBurst";

/** Completed state: the circle pops in, the check draws itself, sparks burst. */
export function FocusCompletionMark() {
  return (
    <span className="relative flex w-6 h-6 items-center justify-center">
      <FocusCompletionBurst />
      <span
        className="check-box relative flex w-6 h-6 items-center justify-center rounded-full text-on-primary animate-check-pop motion-reduce:animate-none"
        style={{ backgroundColor: CHECK_ACTIVE_COLOR }}
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.6}
          viewBox="0 0 24 24"
        >
          <path
            className="animate-check-draw motion-reduce:animate-none"
            d="M5 13l4 4L19 7"
            strokeDasharray={26}
            strokeDashoffset={0}
          />
        </svg>
      </span>
    </span>
  );
}

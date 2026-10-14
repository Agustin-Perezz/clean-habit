import { RING_CIRCUMFERENCE } from "../mock-data";

type FocusSummitRingProps = {
  percent: number;
  offset: number;
};

export function FocusSummitRing({ percent, offset }: FocusSummitRingProps) {
  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg
        aria-hidden="true"
        className="w-full h-full -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle
          className="text-surface-container"
          cx="50"
          cy="50"
          fill="transparent"
          r="42"
          stroke="currentColor"
          strokeWidth={8}
        />
        <circle
          className="text-primary-container transition-all duration-500 ease-out"
          cx="50"
          cy="50"
          fill="transparent"
          r="42"
          stroke="currentColor"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth={8}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-body-strong text-body-strong text-ink-primary">
          {percent}%
        </span>
        <span className="font-micro-legal text-micro-legal text-ink-tertiary uppercase">
          Target
        </span>
      </div>
    </div>
  );
}

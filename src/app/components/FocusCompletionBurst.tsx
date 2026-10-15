import type { CSSProperties } from "react";
import { CHECK_ACTIVE_COLOR } from "../mock-data";

const SPARK_ANGLES: readonly number[] = [0, 60, 120, 180, 240, 300];
const SPARK_DELAY_MS = 35;

/** Rings and sparks that burst outward behind the completed check. */
export function FocusCompletionBurst() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-0 animate-check-burst motion-reduce:animate-none"
        style={{ backgroundColor: CHECK_ACTIVE_COLOR }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-0 animate-check-burst-far motion-reduce:animate-none"
        style={{ backgroundColor: CHECK_ACTIVE_COLOR }}
      />
      {SPARK_ANGLES.map((angle, index) => (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 animate-check-spark motion-reduce:animate-none"
          key={angle}
          style={
            {
              "--spark-angle": `${angle}deg`,
              animationDelay: `${index * SPARK_DELAY_MS}ms`,
            } as CSSProperties
          }
        >
          <span
            className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: CHECK_ACTIVE_COLOR }}
          />
        </span>
      ))}
    </>
  );
}

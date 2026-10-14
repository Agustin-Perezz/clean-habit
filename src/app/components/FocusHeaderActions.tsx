import { Button } from "@/components/ui/button";
import type { FocusMetrics } from "../mock-data";
import { FocusMomentumPills } from "./FocusMomentumPills";

type FocusHeaderActionsProps = {
  metrics: FocusMetrics;
};

export function FocusHeaderActions({ metrics }: FocusHeaderActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-space-sm">
      <FocusMomentumPills metrics={metrics} />
      <Button
        className="ml-auto md:ml-2 inline-flex items-center gap-1.5 bg-primary-container text-on-primary hover:bg-focus-primary font-caption-strong text-[14px] font-semibold px-5 py-2 h-auto rounded-full transition-transform active:scale-[0.96]"
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
        <span>New Objective</span>
      </Button>
    </div>
  );
}

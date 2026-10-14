import type { FocusMetrics } from "../mock-data";
import { FocusHeatmap } from "./FocusHeatmap";
import { FocusQuickIngest } from "./FocusQuickIngest";
import { FocusQuoteNote } from "./FocusQuoteNote";
import { FocusSummitCard } from "./FocusSummitCard";
import type { FocusQuickIngestProps } from "./focus-quick-ingest-types";

type FocusMetricsAsideProps = {
  metrics: FocusMetrics;
  quickIngest: FocusQuickIngestProps;
};

export function FocusMetricsAside({
  metrics,
  quickIngest,
}: FocusMetricsAsideProps) {
  return (
    <aside className="lg:col-span-4 flex flex-col gap-space-lg">
      <FocusSummitCard metrics={metrics} />
      <FocusHeatmap />
      <FocusQuickIngest {...quickIngest} />
      <FocusQuoteNote />
    </aside>
  );
}

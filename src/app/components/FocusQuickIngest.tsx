import { FocusQuickIngestForm } from "./FocusQuickIngestForm";
import type { FocusQuickIngestProps } from "./focus-quick-ingest-types";

export function FocusQuickIngest(props: FocusQuickIngestProps) {
  return (
    <div className="bg-surface-container-lowest rounded-focus-2xl p-space-lg flex flex-col gap-space-sm shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-caption-strong text-caption-strong text-ink-tertiary uppercase tracking-wider">
          Quick Ingest
        </span>
        <span className="material-symbols-outlined text-ink-tertiary text-[18px]">
          bolt
        </span>
      </div>
      <FocusQuickIngestForm {...props} />
    </div>
  );
}

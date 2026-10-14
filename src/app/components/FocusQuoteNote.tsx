import { FOCUS_QUOTE } from "../mock-data";

export function FocusQuoteNote() {
  return (
    <div className="bg-surface-container-low rounded-focus-2xl p-space-md flex items-start gap-3">
      <span className="material-symbols-outlined text-primary-container text-[20px] mt-0.5">
        {FOCUS_QUOTE.icon}
      </span>
      <div className="flex flex-col">
        <span className="font-caption-strong text-caption-strong text-ink-primary">
          {FOCUS_QUOTE.title}
        </span>
        <span className="font-caption text-caption text-ink-secondary">
          {FOCUS_QUOTE.body}
        </span>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FocusQuickIngestCategorySelect } from "./FocusQuickIngestCategorySelect";
import type { FocusQuickIngestProps } from "./focus-quick-ingest-types";

export function FocusQuickIngestForm({
  draft,
  categoryIndex,
  categories,
  onDraftChange,
  onCategoryChange,
  onSubmit,
}: FocusQuickIngestProps) {
  return (
    <form className="flex flex-col gap-3 mt-1" onSubmit={onSubmit}>
      <div className="relative flex items-center">
        <Input
          className="w-full h-11 rounded-full border-0 bg-surface-container-low pl-4 pr-10 py-0 font-caption text-[14px] md:text-[14px] text-ink-primary placeholder:text-ink-tertiary focus:outline-none focus:bg-surface-container focus-visible:ring-0 transition-all"
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder="Draft new daily ritual..."
          type="text"
          value={draft}
        />
        <Button
          className="absolute right-1.5 w-8 h-8 rounded-full bg-primary-container text-on-primary hover:bg-focus-primary transition-transform active:scale-90"
          type="submit"
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_upward
          </span>
        </Button>
      </div>
      <FocusQuickIngestCategorySelect
        categories={categories}
        categoryIndex={categoryIndex}
        onCategoryChange={onCategoryChange}
      />
    </form>
  );
}

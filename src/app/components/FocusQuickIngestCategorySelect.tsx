import type { QuickIngestCategory } from "../mock-data";

type FocusQuickIngestCategorySelectProps = {
  categories: readonly QuickIngestCategory[];
  categoryIndex: number;
  onCategoryChange: (index: number) => void;
};

export function FocusQuickIngestCategorySelect({
  categories,
  categoryIndex,
  onCategoryChange,
}: FocusQuickIngestCategorySelectProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-full">
        <select
          className="w-full h-9 px-4 pr-8 rounded-full bg-surface-container-low hover:bg-surface-container border border-hairline-subtle font-caption text-caption text-ink-secondary focus:outline-none focus:border-primary-container cursor-pointer transition-colors appearance-none"
          onChange={(event) => onCategoryChange(Number(event.target.value))}
          value={categoryIndex}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-3 top-2.5 text-ink-tertiary text-[18px] pointer-events-none">
          expand_more
        </span>
      </div>
    </div>
  );
}

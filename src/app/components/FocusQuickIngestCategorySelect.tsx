import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <Select
      items={categories}
      value={categoryIndex}
      onValueChange={(value) => onCategoryChange(Number(value))}
    >
      <SelectTrigger className="w-full h-9 px-4 rounded-full bg-surface-container-low hover:bg-surface-container border border-hairline-subtle font-caption text-caption text-ink-secondary cursor-pointer transition-colors focus-visible:border-primary-container focus-visible:ring-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.value} value={category.value}>
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

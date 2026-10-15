import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { QuickIngestObjectiveOption } from "../mock-data";

type FocusQuickIngestObjectiveSelectProps = {
  options: readonly QuickIngestObjectiveOption[];
  selectedObjectiveId: string;
  onObjectiveChange: (objectiveId: string) => void;
};

export function FocusQuickIngestObjectiveSelect({
  options,
  selectedObjectiveId,
  onObjectiveChange,
}: FocusQuickIngestObjectiveSelectProps) {
  return (
    <Select
      items={options}
      value={selectedObjectiveId}
      onValueChange={(value) => onObjectiveChange(String(value))}
    >
      <SelectTrigger className="w-full h-9 px-4 rounded-full bg-surface-container-low hover:bg-surface-container border border-hairline-subtle font-caption text-caption text-ink-secondary cursor-pointer transition-colors focus-visible:border-primary-container focus-visible:ring-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

import { Button } from "@/components/ui/button";
import { FocusObjectiveDeleteControl } from "./FocusObjectiveDeleteControl";

type FocusObjectiveHeaderActionsProps = {
  objectiveId: string;
  percent: number;
  title: string;
  onEdit: () => void;
};

export function FocusObjectiveHeaderActions({
  objectiveId,
  percent,
  title,
  onEdit,
}: FocusObjectiveHeaderActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Edit ${title}`}
        onClick={onEdit}
      >
        <span className="material-symbols-outlined text-[18px]">edit</span>
      </Button>
      <FocusObjectiveDeleteControl objectiveId={objectiveId} title={title} />
      <span className="card-percent font-caption-strong text-caption-strong text-primary-container">
        {percent}%
      </span>
    </div>
  );
}

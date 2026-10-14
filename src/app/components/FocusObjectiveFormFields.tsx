import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  OBJECTIVE_CATEGORY_MAX_LENGTH,
  OBJECTIVE_PRIORITY_LABEL_MAX_LENGTH,
  OBJECTIVE_TITLE_MAX_LENGTH,
} from "@/domain/entities/objective.entity";
import { OBJECTIVE_FORM_FIELDS } from "../objective-defaults";
import type { FocusObjectiveFormFieldsProps } from "./focus-objective-dialog-types";

export function FocusObjectiveFormFields({
  objective,
}: FocusObjectiveFormFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor={OBJECTIVE_FORM_FIELDS.title}>Title</Label>
        <Input
          id={OBJECTIVE_FORM_FIELDS.title}
          name={OBJECTIVE_FORM_FIELDS.title}
          defaultValue={objective?.title}
          placeholder="Deep Work & Focus"
          required
          maxLength={OBJECTIVE_TITLE_MAX_LENGTH}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={OBJECTIVE_FORM_FIELDS.category}>Category</Label>
        <Input
          id={OBJECTIVE_FORM_FIELDS.category}
          name={OBJECTIVE_FORM_FIELDS.category}
          defaultValue={objective?.category}
          placeholder="Cognitive Discipline"
          required
          maxLength={OBJECTIVE_CATEGORY_MAX_LENGTH}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={OBJECTIVE_FORM_FIELDS.priorityLabel}>
          Priority label (optional)
        </Label>
        <Input
          id={OBJECTIVE_FORM_FIELDS.priorityLabel}
          name={OBJECTIVE_FORM_FIELDS.priorityLabel}
          defaultValue={objective?.priorityLabel}
          placeholder="Priority"
          maxLength={OBJECTIVE_PRIORITY_LABEL_MAX_LENGTH}
        />
      </div>
    </div>
  );
}

import type { FocusObjective } from "../mock-data";

export type FocusObjectiveFormFieldsProps = {
  objective?: FocusObjective | null;
};

export type FocusObjectiveDialogMode = "create" | "edit";

export type FocusObjectiveDialogState = {
  mode: FocusObjectiveDialogMode;
  objective: FocusObjective | null;
} | null;

export type FocusObjectiveFormDialogProps = {
  mode: FocusObjectiveDialogMode;
  objective: FocusObjective | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export type FocusObjectiveDialogFormProps = {
  mode: FocusObjectiveDialogMode;
  objective: FocusObjective | null;
  onDone: () => void;
};

export type FocusObjectiveDeleteFormProps = {
  objectiveId: string;
  onDeleted: () => void;
};

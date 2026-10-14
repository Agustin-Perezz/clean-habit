"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FocusObjectiveDeleteForm } from "./FocusObjectiveDeleteForm";
import { FocusObjectiveDialogForm } from "./FocusObjectiveDialogForm";
import type { FocusObjectiveFormDialogProps } from "./focus-objective-dialog-types";

export function FocusObjectiveFormDialog({
  mode,
  objective,
  open,
  onOpenChange,
}: FocusObjectiveFormDialogProps) {
  const isEdit = mode === "edit" && objective !== null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit objective" : "New objective"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the objective details, or delete it."
              : "Add a new objective card to your dashboard."}
          </DialogDescription>
        </DialogHeader>
        <FocusObjectiveDialogForm
          mode={mode}
          objective={objective}
          onDone={() => onOpenChange(false)}
        />
        {isEdit && objective ? (
          <DialogFooter>
            <FocusObjectiveDeleteForm
              objectiveId={objective.id}
              onDeleted={() => onOpenChange(false)}
            />
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

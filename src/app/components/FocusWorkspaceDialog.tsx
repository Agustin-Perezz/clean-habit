"use client";

import { FocusObjectiveFormDialog } from "./FocusObjectiveFormDialog";
import type { FocusObjectiveDialogState } from "./focus-objective-dialog-types";

type FocusWorkspaceDialogProps = {
  dialog: FocusObjectiveDialogState;
  onClose: () => void;
};

export function FocusWorkspaceDialog({
  dialog,
  onClose,
}: FocusWorkspaceDialogProps) {
  if (!dialog) {
    return null;
  }

  return (
    <FocusObjectiveFormDialog
      mode={dialog.mode}
      objective={dialog.objective}
      open
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    />
  );
}

"use client";

import { useActionState, useEffect } from "react";
import { deleteObjectiveAction } from "../actions";
import { OBJECTIVE_FORM_FIELDS } from "../objective-defaults";
import { FocusObjectivePendingButton } from "./FocusObjectivePendingButton";
import type { FocusObjectiveDeleteFormProps } from "./focus-objective-dialog-types";

export function FocusObjectiveDeleteForm({
  objectiveId,
  onDeleted,
}: FocusObjectiveDeleteFormProps) {
  const [state, formAction] = useActionState(deleteObjectiveAction, {});

  useEffect(() => {
    if (state.success) {
      onDeleted();
    }
  }, [state.success, onDeleted]);

  return (
    <form action={formAction} className="w-full">
      <input
        type="hidden"
        name={OBJECTIVE_FORM_FIELDS.id}
        value={objectiveId}
      />
      <FocusObjectivePendingButton
        label="Delete objective"
        pendingLabel="Deleting..."
        variant="destructive"
      />
      {state.error ? (
        <p role="alert" className="text-sm text-destructive mt-2">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}

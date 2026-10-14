"use client";

import { useActionState, useEffect } from "react";
import { createObjectiveAction, updateObjectiveAction } from "../actions";
import { OBJECTIVE_FORM_FIELDS } from "../objective-defaults";
import { FocusObjectiveFormFields } from "./FocusObjectiveFormFields";
import { FocusObjectivePendingButton } from "./FocusObjectivePendingButton";
import type { FocusObjectiveDialogFormProps } from "./focus-objective-dialog-types";

export function FocusObjectiveDialogForm({
  mode,
  objective,
  onDone,
}: FocusObjectiveDialogFormProps) {
  const isEdit = mode === "edit" && objective !== null;
  const [state, formAction] = useActionState(
    isEdit ? updateObjectiveAction : createObjectiveAction,
    {},
  );

  useEffect(() => {
    if (state.success) {
      onDone();
    }
  }, [state.success, onDone]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {isEdit && objective ? (
        <>
          <input
            type="hidden"
            name={OBJECTIVE_FORM_FIELDS.id}
            value={objective.id}
          />
          <input
            type="hidden"
            name={OBJECTIVE_FORM_FIELDS.accentColor}
            value={objective.accentColor}
          />
        </>
      ) : null}
      <FocusObjectiveFormFields objective={isEdit ? objective : null} />
      {state.error ? (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      <FocusObjectivePendingButton
        label={isEdit ? "Save changes" : "Create objective"}
        pendingLabel={isEdit ? "Saving..." : "Creating..."}
      />
    </form>
  );
}

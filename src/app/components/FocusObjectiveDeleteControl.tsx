"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { deleteObjectiveAction } from "../actions";
import { OBJECTIVE_FORM_FIELDS } from "../objective-defaults";

type FocusObjectiveDeleteControlProps = {
  objectiveId: string;
  title: string;
};

type DeleteObjectiveSubmitProps = {
  title: string;
};

function DeleteObjectiveSubmit({ title }: DeleteObjectiveSubmitProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="ghost"
      size="icon-sm"
      aria-label={`Delete ${title}`}
      disabled={pending}
      className="text-ink-tertiary hover:text-error"
    >
      <span className="material-symbols-outlined text-[18px]">delete</span>
    </Button>
  );
}

export function FocusObjectiveDeleteControl({
  objectiveId,
  title,
}: FocusObjectiveDeleteControlProps) {
  const [state, formAction] = useActionState(deleteObjectiveAction, {});

  return (
    <form action={formAction} className="flex items-center">
      <input
        type="hidden"
        name={OBJECTIVE_FORM_FIELDS.id}
        value={objectiveId}
      />
      <DeleteObjectiveSubmit title={title} />
      {state.error ? (
        <p role="alert" className="text-micro-legal text-error ml-1">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}

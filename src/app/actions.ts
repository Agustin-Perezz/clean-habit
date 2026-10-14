"use server";

import { revalidatePath } from "next/cache";
import { createObjectiveRequestDto } from "@/application/use-cases/objectives/create-objective/create-objective.request.dto";
import { deleteObjectiveRequestDto } from "@/application/use-cases/objectives/delete-objective/delete-objective.request.dto";
import { updateObjectiveRequestDto } from "@/application/use-cases/objectives/update-objective/update-objective.request.dto";
import { createObjectivesContainer } from "@/lib/containers/objectives.container";
import { requireUser } from "@/lib/shared/infrastructure/auth.server";
import { createSupabaseServerClient } from "@/lib/shared/infrastructure/supabase.server";
import {
  createDefaultObjectiveHabits,
  NEW_OBJECTIVE_SEGMENTS,
  OBJECTIVE_FORM_FIELDS,
  pickObjectiveAccentColor,
} from "./objective-defaults";

export type ObjectiveActionState = {
  error?: string;
  success?: boolean;
};

const INVALID_OBJECTIVE_MESSAGE = "Invalid objective";

function readOptionalField(
  formData: FormData,
  field: string,
): string | undefined {
  const value = formData.get(field);
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export async function createObjectiveAction(
  _prevState: ObjectiveActionState,
  formData: FormData,
): Promise<ObjectiveActionState> {
  await requireUser();

  const parsed = createObjectiveRequestDto.safeParse({
    title: formData.get(OBJECTIVE_FORM_FIELDS.title),
    category: formData.get(OBJECTIVE_FORM_FIELDS.category),
    priorityLabel: readOptionalField(
      formData,
      OBJECTIVE_FORM_FIELDS.priorityLabel,
    ),
    accentColor: pickObjectiveAccentColor(),
    segments: NEW_OBJECTIVE_SEGMENTS,
    habits: createDefaultObjectiveHabits(),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? INVALID_OBJECTIVE_MESSAGE,
    };
  }

  const supabase = await createSupabaseServerClient();
  const { create } = createObjectivesContainer(supabase);
  await create.execute(parsed.data);

  revalidatePath("/");
  return { success: true };
}

export async function updateObjectiveAction(
  _prevState: ObjectiveActionState,
  formData: FormData,
): Promise<ObjectiveActionState> {
  await requireUser();

  const parsed = updateObjectiveRequestDto.safeParse({
    id: formData.get(OBJECTIVE_FORM_FIELDS.id),
    title: formData.get(OBJECTIVE_FORM_FIELDS.title),
    category: formData.get(OBJECTIVE_FORM_FIELDS.category),
    priorityLabel: readOptionalField(
      formData,
      OBJECTIVE_FORM_FIELDS.priorityLabel,
    ),
    accentColor: formData.get(OBJECTIVE_FORM_FIELDS.accentColor),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? INVALID_OBJECTIVE_MESSAGE,
    };
  }

  const supabase = await createSupabaseServerClient();
  const { update } = createObjectivesContainer(supabase);
  await update.execute(parsed.data);

  revalidatePath("/");
  return { success: true };
}

export async function deleteObjectiveAction(
  _prevState: ObjectiveActionState,
  formData: FormData,
): Promise<ObjectiveActionState> {
  await requireUser();

  const parsed = deleteObjectiveRequestDto.safeParse({
    id: formData.get(OBJECTIVE_FORM_FIELDS.id),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? INVALID_OBJECTIVE_MESSAGE,
    };
  }

  const supabase = await createSupabaseServerClient();
  const { remove } = createObjectivesContainer(supabase);
  await remove.execute(parsed.data);

  revalidatePath("/");
  return { success: true };
}

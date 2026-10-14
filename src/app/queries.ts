import type { Objective } from "@/domain/entities/objective.entity";
import { createObjectivesContainer } from "@/lib/containers/objectives.container";
import { createSupabaseServerClient } from "@/lib/shared/infrastructure/supabase.server";
import type { FocusObjective } from "./mock-data";

function toFocusObjective(objective: Objective): FocusObjective {
  const props = objective.toObject();
  return {
    id: props.id,
    title: props.title,
    category: props.category,
    priorityLabel: props.priorityLabel,
    accentColor: props.accentColor,
    segments: props.segments,
    habits: props.habits,
  };
}

export async function getObjectives(): Promise<FocusObjective[]> {
  const supabase = await createSupabaseServerClient();
  const { getObjectives: getObjectivesUseCase } =
    createObjectivesContainer(supabase);

  const { objectives } = await getObjectivesUseCase.execute();

  return objectives.map(toFocusObjective);
}

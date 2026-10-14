import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  UpdateObjectiveChanges,
  UpdateObjectiveRepository,
} from "@/application/use-cases/objectives/update-objective/update-objective.repository.interface";
import type { Objective } from "@/domain/entities/objective.entity";
import type { Database } from "../../database.types";
import { objectiveMapper } from "../../mappers/objective.mapper";

export class SupabaseUpdateObjectiveRepository
  implements UpdateObjectiveRepository
{
  constructor(private readonly supabase: SupabaseClient<Database>) {}

  async update(
    id: string,
    changes: UpdateObjectiveChanges,
  ): Promise<Objective> {
    const { data, error } = await this.supabase
      .from("objectives")
      .update({
        title: changes.title,
        category: changes.category,
        priority_label: changes.priorityLabel ?? null,
        accent_color: changes.accentColor,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update objective: ${error.message}`);
    }

    return objectiveMapper.toDomain(data);
  }
}

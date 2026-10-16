import type { SupabaseClient } from "@supabase/supabase-js";
import type { UpdateObjectiveHabitsRepository } from "@/application/use-cases/objectives/update-objective-habits/update-objective-habits.repository.interface";
import type {
  Objective,
  ObjectiveHabitProps,
} from "@/domain/entities/objective.entity";
import type { Database } from "../../database.types";
import { objectiveMapper } from "../../mappers/objective.mapper";

export class SupabaseUpdateObjectiveHabitsRepository
  implements UpdateObjectiveHabitsRepository
{
  constructor(private readonly supabase: SupabaseClient<Database>) {}

  async updateHabits(
    id: string,
    habits: readonly ObjectiveHabitProps[],
  ): Promise<Objective> {
    const { data, error } = await this.supabase
      .from("objectives")
      .update({ habits: habits.map((habit) => ({ ...habit })) })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update objective habits: ${error.message}`);
    }

    return objectiveMapper.toDomain(data);
  }
}

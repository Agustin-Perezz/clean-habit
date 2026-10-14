import type { SupabaseClient } from "@supabase/supabase-js";
import type { CreateObjectiveRepository } from "@/application/use-cases/objectives/create-objective/create-objective.repository.interface";
import type { Objective } from "@/domain/entities/objective.entity";
import type { Database } from "../../database.types";
import { objectiveMapper } from "../../mappers/objective.mapper";

export class SupabaseCreateObjectiveRepository
  implements CreateObjectiveRepository
{
  constructor(private readonly supabase: SupabaseClient<Database>) {}

  async create(objective: Objective): Promise<Objective> {
    const insertPayload = objectiveMapper.toPersistence(objective);

    const { data, error } = await this.supabase
      .from("objectives")
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create objective: ${error.message}`);
    }

    return objectiveMapper.toDomain(data);
  }
}

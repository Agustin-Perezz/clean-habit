import type { SupabaseClient } from "@supabase/supabase-js";
import type { GetObjectivesRepository } from "@/application/use-cases/objectives/get-objectives/get-objectives.repository.interface";
import type { Objective } from "@/domain/entities/objective.entity";
import type { Database } from "../../database.types";
import { objectiveMapper } from "../../mappers/objective.mapper";

export class SupabaseGetObjectivesRepository
  implements GetObjectivesRepository
{
  constructor(private readonly supabase: SupabaseClient<Database>) {}

  async findAll(limit?: number): Promise<Objective[]> {
    let query = this.supabase
      .from("objectives")
      .select("*")
      .order("created_at", { ascending: false });

    if (limit !== undefined) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch objectives: ${error.message}`);
    }

    return data.map((row) => objectiveMapper.toDomain(row));
  }
}

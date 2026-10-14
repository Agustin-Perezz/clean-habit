import type { SupabaseClient } from "@supabase/supabase-js";
import type { DeleteObjectiveRepository } from "@/application/use-cases/objectives/delete-objective/delete-objective.repository.interface";
import type { Database } from "../../database.types";

export class SupabaseDeleteObjectiveRepository
  implements DeleteObjectiveRepository
{
  constructor(private readonly supabase: SupabaseClient<Database>) {}

  async remove(id: string): Promise<void> {
    const { error } = await this.supabase
      .from("objectives")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`Failed to delete objective: ${error.message}`);
    }
  }
}

import type { SupabaseClient } from "@supabase/supabase-js";
import { CreateObjectiveUseCase } from "@/application/use-cases/objectives/create-objective/create-objective.use-case";
import { DeleteObjectiveUseCase } from "@/application/use-cases/objectives/delete-objective/delete-objective.use-case";
import { GetObjectivesUseCase } from "@/application/use-cases/objectives/get-objectives/get-objectives.use-case";
import { UpdateObjectiveUseCase } from "@/application/use-cases/objectives/update-objective/update-objective.use-case";
import { UpdateObjectiveHabitsUseCase } from "@/application/use-cases/objectives/update-objective-habits/update-objective-habits.use-case";
import type { Database } from "@/infrastructure/database/postgres/database.types";
import { SupabaseCreateObjectiveRepository } from "@/infrastructure/database/postgres/repositories/objectives/supabase-create-objective.repository";
import { SupabaseDeleteObjectiveRepository } from "@/infrastructure/database/postgres/repositories/objectives/supabase-delete-objective.repository";
import { SupabaseGetObjectivesRepository } from "@/infrastructure/database/postgres/repositories/objectives/supabase-get-objectives.repository";
import { SupabaseUpdateObjectiveRepository } from "@/infrastructure/database/postgres/repositories/objectives/supabase-update-objective.repository";
import { SupabaseUpdateObjectiveHabitsRepository } from "@/infrastructure/database/postgres/repositories/objectives/supabase-update-objective-habits.repository";

export function createObjectivesContainer(supabase: SupabaseClient<Database>) {
  return {
    create: new CreateObjectiveUseCase(
      new SupabaseCreateObjectiveRepository(supabase),
    ),
    getObjectives: new GetObjectivesUseCase(
      new SupabaseGetObjectivesRepository(supabase),
    ),
    update: new UpdateObjectiveUseCase(
      new SupabaseUpdateObjectiveRepository(supabase),
    ),
    updateHabits: new UpdateObjectiveHabitsUseCase(
      new SupabaseUpdateObjectiveHabitsRepository(supabase),
    ),
    remove: new DeleteObjectiveUseCase(
      new SupabaseDeleteObjectiveRepository(supabase),
    ),
  };
}

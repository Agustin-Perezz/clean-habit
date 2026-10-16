import type {
  Objective,
  ObjectiveHabitProps,
} from "@/domain/entities/objective.entity";

export interface UpdateObjectiveHabitsRepository {
  updateHabits(
    id: string,
    habits: readonly ObjectiveHabitProps[],
  ): Promise<Objective>;
}

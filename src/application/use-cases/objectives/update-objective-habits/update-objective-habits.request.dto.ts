import { z } from "zod";
import { objectiveHabitsSchema } from "@/domain/entities/objective.schema";

export const updateObjectiveHabitsRequestDto = z.object({
  id: z.string().uuid(),
  habits: objectiveHabitsSchema,
});

export type UpdateObjectiveHabitsRequestDto = z.infer<
  typeof updateObjectiveHabitsRequestDto
>;

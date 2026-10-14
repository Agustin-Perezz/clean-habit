import { z } from "zod";
import {
  objectiveAccentColorSchema,
  objectiveCategorySchema,
  objectivePriorityLabelSchema,
  objectiveTitleSchema,
} from "@/domain/entities/objective.schema";

export const updateObjectiveRequestDto = z.object({
  id: z.string().uuid(),
  title: objectiveTitleSchema,
  category: objectiveCategorySchema,
  priorityLabel: objectivePriorityLabelSchema.optional(),
  accentColor: objectiveAccentColorSchema,
});

export type UpdateObjectiveRequestDto = z.infer<
  typeof updateObjectiveRequestDto
>;

import { z } from "zod";
import {
  objectiveAccentColorSchema,
  objectiveCategorySchema,
  objectiveHabitsSchema,
  objectivePriorityLabelSchema,
  objectiveSegmentsSchema,
  objectiveTitleSchema,
} from "@/domain/entities/objective.schema";

export const createObjectiveRequestDto = z.object({
  title: objectiveTitleSchema,
  category: objectiveCategorySchema,
  priorityLabel: objectivePriorityLabelSchema.optional(),
  accentColor: objectiveAccentColorSchema,
  segments: objectiveSegmentsSchema,
  habits: objectiveHabitsSchema,
});

export type CreateObjectiveRequestDto = z.infer<
  typeof createObjectiveRequestDto
>;

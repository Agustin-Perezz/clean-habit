import { z } from "zod";
import {
  OBJECTIVE_ACCENT_COLOR_PATTERN,
  OBJECTIVE_CATEGORY_MAX_LENGTH,
  OBJECTIVE_PRIORITY_LABEL_MAX_LENGTH,
  OBJECTIVE_TITLE_MAX_LENGTH,
} from "./objective.entity";

export const objectiveTitleSchema = z
  .string()
  .min(1)
  .max(OBJECTIVE_TITLE_MAX_LENGTH);
export const objectiveCategorySchema = z
  .string()
  .min(1)
  .max(OBJECTIVE_CATEGORY_MAX_LENGTH);
export const objectivePriorityLabelSchema = z
  .string()
  .max(OBJECTIVE_PRIORITY_LABEL_MAX_LENGTH);
export const objectiveAccentColorSchema = z
  .string()
  .regex(OBJECTIVE_ACCENT_COLOR_PATTERN);

export const objectiveHabitSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  completed: z.boolean(),
  points: z.number().int().nonnegative(),
});
export const objectiveHabitsSchema = z.array(objectiveHabitSchema);
export const objectiveSegmentsSchema = z.array(z.string());

export const objectiveSchema = z.object({
  id: z.string().uuid(),
  title: objectiveTitleSchema,
  category: objectiveCategorySchema,
  priorityLabel: objectivePriorityLabelSchema.optional(),
  accentColor: objectiveAccentColorSchema,
  segments: objectiveSegmentsSchema,
  habits: objectiveHabitsSchema,
  createdAt: z.string(),
});

export type ObjectiveSchema = z.infer<typeof objectiveSchema>;

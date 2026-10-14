import { Objective } from "@/domain/entities/objective.entity";
import {
  objectiveHabitsSchema,
  objectiveSegmentsSchema,
} from "@/domain/entities/objective.schema";
import type {
  ObjectiveInsert,
  ObjectiveRow,
} from "../entities/objective.entity";

export const objectiveMapper = {
  toDomain(row: ObjectiveRow): Objective {
    return Objective.create({
      id: row.id,
      title: row.title,
      category: row.category,
      priorityLabel: row.priority_label ?? undefined,
      accentColor: row.accent_color,
      segments: objectiveSegmentsSchema.parse(row.segments),
      habits: objectiveHabitsSchema.parse(row.habits),
      createdAt: row.created_at,
    });
  },

  toPersistence(objective: Objective): ObjectiveInsert {
    const props = objective.toObject();
    return {
      id: props.id,
      title: props.title,
      category: props.category,
      priority_label: props.priorityLabel ?? null,
      accent_color: props.accentColor,
      segments: [...props.segments],
      habits: props.habits.map((habit) => ({ ...habit })),
      created_at: props.createdAt,
    };
  },
};

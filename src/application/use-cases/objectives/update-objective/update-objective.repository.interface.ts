import type { Objective } from "@/domain/entities/objective.entity";

export type UpdateObjectiveChanges = {
  readonly title: string;
  readonly category: string;
  readonly priorityLabel?: string;
  readonly accentColor: string;
};

export interface UpdateObjectiveRepository {
  update(id: string, changes: UpdateObjectiveChanges): Promise<Objective>;
}

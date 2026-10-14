import type { Objective } from "@/domain/entities/objective.entity";

export interface CreateObjectiveRepository {
  create(objective: Objective): Promise<Objective>;
}

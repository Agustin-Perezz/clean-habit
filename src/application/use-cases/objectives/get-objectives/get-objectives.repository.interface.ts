import type { Objective } from "@/domain/entities/objective.entity";

export interface GetObjectivesRepository {
  findAll(limit?: number): Promise<Objective[]>;
}

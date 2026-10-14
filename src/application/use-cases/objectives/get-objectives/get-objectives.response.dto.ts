import type { Objective } from "@/domain/entities/objective.entity";

export type GetObjectivesResponseDto = {
  objectives: Objective[];
};

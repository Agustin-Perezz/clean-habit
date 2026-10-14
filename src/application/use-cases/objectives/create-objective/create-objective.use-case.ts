import { Objective } from "@/domain/entities/objective.entity";
import type { CreateObjectiveRepository } from "./create-objective.repository.interface";
import type { CreateObjectiveRequestDto } from "./create-objective.request.dto";
import type { CreateObjectiveResponseDto } from "./create-objective.response.dto";

export class CreateObjectiveUseCase {
  constructor(private readonly repository: CreateObjectiveRepository) {}

  async execute(
    objectiveDto: CreateObjectiveRequestDto,
  ): Promise<CreateObjectiveResponseDto> {
    const objective = Objective.create(objectiveDto);
    const savedObjective = await this.repository.create(objective);
    return { objective: savedObjective };
  }
}

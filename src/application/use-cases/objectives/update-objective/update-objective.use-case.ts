import type { UpdateObjectiveRepository } from "./update-objective.repository.interface";
import type { UpdateObjectiveRequestDto } from "./update-objective.request.dto";
import type { UpdateObjectiveResponseDto } from "./update-objective.response.dto";

export class UpdateObjectiveUseCase {
  constructor(private readonly repository: UpdateObjectiveRepository) {}

  async execute(
    request: UpdateObjectiveRequestDto,
  ): Promise<UpdateObjectiveResponseDto> {
    const { id, ...changes } = request;
    const updatedObjective = await this.repository.update(id, changes);
    return { objective: updatedObjective };
  }
}

import type { DeleteObjectiveRepository } from "./delete-objective.repository.interface";
import type { DeleteObjectiveRequestDto } from "./delete-objective.request.dto";
import type { DeleteObjectiveResponseDto } from "./delete-objective.response.dto";

export class DeleteObjectiveUseCase {
  constructor(private readonly repository: DeleteObjectiveRepository) {}

  async execute(
    request: DeleteObjectiveRequestDto,
  ): Promise<DeleteObjectiveResponseDto> {
    await this.repository.remove(request.id);
    return { id: request.id };
  }
}

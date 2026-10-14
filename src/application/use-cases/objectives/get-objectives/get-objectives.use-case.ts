import type { GetObjectivesRepository } from "./get-objectives.repository.interface";
import type { GetObjectivesRequestDto } from "./get-objectives.request.dto";
import type { GetObjectivesResponseDto } from "./get-objectives.response.dto";

export class GetObjectivesUseCase {
  constructor(private readonly repository: GetObjectivesRepository) {}

  async execute(
    request?: GetObjectivesRequestDto,
  ): Promise<GetObjectivesResponseDto> {
    const objectives = await this.repository.findAll(request?.limit);
    return { objectives };
  }
}

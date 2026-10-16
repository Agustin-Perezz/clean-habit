import type { UpdateObjectiveHabitsRepository } from "./update-objective-habits.repository.interface";
import type { UpdateObjectiveHabitsRequestDto } from "./update-objective-habits.request.dto";
import type { UpdateObjectiveHabitsResponseDto } from "./update-objective-habits.response.dto";

export class UpdateObjectiveHabitsUseCase {
  constructor(private readonly repository: UpdateObjectiveHabitsRepository) {}

  async execute(
    request: UpdateObjectiveHabitsRequestDto,
  ): Promise<UpdateObjectiveHabitsResponseDto> {
    const { id, habits } = request;
    const updatedObjective = await this.repository.updateHabits(id, habits);
    return { objective: updatedObjective };
  }
}

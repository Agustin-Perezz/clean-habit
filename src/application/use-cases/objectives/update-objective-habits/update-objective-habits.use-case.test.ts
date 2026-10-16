import { describe, expect, it, vi } from "vitest";
import { Objective } from "@/domain/entities/objective.entity";
import type { UpdateObjectiveHabitsRepository } from "./update-objective-habits.repository.interface";
import { UpdateObjectiveHabitsUseCase } from "./update-objective-habits.use-case";

describe("UpdateObjectiveHabitsUseCase", () => {
  it("persists the whole habit list for the objective and returns it", async () => {
    const habits = [
      {
        id: "objective-habit-00000000-0000-4000-8000-000000000001",
        title: "Define the first milestone",
        completed: true,
        points: 1,
      },
    ];
    const updatedObjective = Objective.create({
      id: "00000000-0000-4000-8000-000000000001",
      title: "Daily Goals",
      category: "Daily",
      accentColor: "#5856D6",
      segments: [],
      habits,
      createdAt: "2026-01-01T00:00:00.000Z",
    });
    const updateHabits = vi.fn().mockResolvedValue(updatedObjective);
    const repository: UpdateObjectiveHabitsRepository = { updateHabits };
    const useCase = new UpdateObjectiveHabitsUseCase(repository);

    const result = await useCase.execute({
      id: "00000000-0000-4000-8000-000000000001",
      habits,
    });

    expect(updateHabits).toHaveBeenCalledTimes(1);
    expect(updateHabits).toHaveBeenCalledWith(
      "00000000-0000-4000-8000-000000000001",
      habits,
    );
    expect(result).toEqual({ objective: updatedObjective });
  });
});

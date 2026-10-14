import { describe, expect, it, vi } from "vitest";
import { Objective } from "@/domain/entities/objective.entity";
import type { UpdateObjectiveRepository } from "./update-objective.repository.interface";
import { UpdateObjectiveUseCase } from "./update-objective.use-case";

describe("UpdateObjectiveUseCase", () => {
  it("sends the editable fields to the repository and returns the updated objective", async () => {
    const updatedObjective = Objective.create({
      id: "00000000-0000-4000-8000-000000000001",
      title: "Renamed Objective",
      category: "Skill Acquisition",
      accentColor: "#5856D6",
      segments: [],
      habits: [],
      createdAt: "2026-01-01T00:00:00.000Z",
    });
    const update = vi.fn().mockResolvedValue(updatedObjective);
    const repository: UpdateObjectiveRepository = { update };
    const useCase = new UpdateObjectiveUseCase(repository);

    const result = await useCase.execute({
      id: "00000000-0000-4000-8000-000000000001",
      title: "Renamed Objective",
      category: "Skill Acquisition",
      accentColor: "#5856D6",
    });

    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(
      "00000000-0000-4000-8000-000000000001",
      {
        title: "Renamed Objective",
        category: "Skill Acquisition",
        accentColor: "#5856D6",
      },
    );
    expect(result).toEqual({ objective: updatedObjective });
  });
});

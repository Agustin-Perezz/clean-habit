import { describe, expect, it, vi } from "vitest";
import { Objective } from "@/domain/entities/objective.entity";
import type { GetObjectivesRepository } from "./get-objectives.repository.interface";
import { GetObjectivesUseCase } from "./get-objectives.use-case";

describe("GetObjectivesUseCase", () => {
  it("fetches all objectives from the repository and returns them", async () => {
    const objectives = [
      Objective.create({
        id: "00000000-0000-4000-8000-000000000001",
        title: "Deep Work & Focus",
        category: "Cognitive Discipline",
        accentColor: "#d98218",
        segments: [],
        habits: [],
        createdAt: "2026-01-01T00:00:00.000Z",
      }),
    ];
    const findAll = vi.fn().mockResolvedValue(objectives);
    const repository: GetObjectivesRepository = { findAll };
    const useCase = new GetObjectivesUseCase(repository);

    const result = await useCase.execute();

    expect(findAll).toHaveBeenCalledTimes(1);
    expect(findAll).toHaveBeenCalledWith(undefined);
    expect(result).toEqual({ objectives });
  });

  it("passes the limit to the repository when provided", async () => {
    const findAll = vi.fn().mockResolvedValue([]);
    const repository: GetObjectivesRepository = { findAll };
    const useCase = new GetObjectivesUseCase(repository);

    await useCase.execute({ limit: 5 });

    expect(findAll).toHaveBeenCalledWith(5);
  });
});

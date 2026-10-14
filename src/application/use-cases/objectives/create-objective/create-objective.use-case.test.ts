import { describe, expect, it, vi } from "vitest";
import { Objective } from "@/domain/entities/objective.entity";
import type { CreateObjectiveRepository } from "./create-objective.repository.interface";
import { CreateObjectiveUseCase } from "./create-objective.use-case";

describe("CreateObjectiveUseCase", () => {
  it("builds an Objective from the DTO, persists it, and returns the saved objective", async () => {
    const savedObjective = Objective.create({
      id: "00000000-0000-4000-8000-000000000001",
      title: "Deep Work & Focus",
      category: "Cognitive Discipline",
      priorityLabel: "Priority",
      accentColor: "#d98218",
      segments: ["#22c55e", "#e5e5ea"],
      habits: [
        { id: "habit-1", title: "Morning sprint", completed: false, points: 1 },
      ],
      createdAt: "2026-01-01T00:00:00.000Z",
    });
    const create = vi.fn().mockResolvedValue(savedObjective);
    const repository: CreateObjectiveRepository = { create };
    const useCase = new CreateObjectiveUseCase(repository);

    const result = await useCase.execute({
      title: "Deep Work & Focus",
      category: "Cognitive Discipline",
      priorityLabel: "Priority",
      accentColor: "#d98218",
      segments: ["#22c55e", "#e5e5ea"],
      habits: [
        { id: "habit-1", title: "Morning sprint", completed: false, points: 1 },
      ],
    });

    expect(create).toHaveBeenCalledTimes(1);
    const [persisted] = create.mock.calls[0];
    expect(persisted).toBeInstanceOf(Objective);
    expect(persisted.toObject()).toMatchObject({
      title: "Deep Work & Focus",
      category: "Cognitive Discipline",
    });
    expect(result).toEqual({ objective: savedObjective });
  });
});

import { describe, expect, it, vi } from "vitest";
import type { DeleteObjectiveRepository } from "./delete-objective.repository.interface";
import { DeleteObjectiveUseCase } from "./delete-objective.use-case";

describe("DeleteObjectiveUseCase", () => {
  it("removes the objective by id and returns the removed id", async () => {
    const remove = vi.fn().mockResolvedValue(undefined);
    const repository: DeleteObjectiveRepository = { remove };
    const useCase = new DeleteObjectiveUseCase(repository);

    const result = await useCase.execute({
      id: "00000000-0000-4000-8000-000000000001",
    });

    expect(remove).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledWith("00000000-0000-4000-8000-000000000001");
    expect(result).toEqual({ id: "00000000-0000-4000-8000-000000000001" });
  });
});

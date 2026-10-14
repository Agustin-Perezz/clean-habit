import { z } from "zod";

export const deleteObjectiveRequestDto = z.object({
  id: z.string().uuid(),
});

export type DeleteObjectiveRequestDto = z.infer<
  typeof deleteObjectiveRequestDto
>;

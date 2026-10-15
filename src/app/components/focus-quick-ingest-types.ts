import type { FormEvent } from "react";
import type { QuickIngestObjectiveOption } from "../mock-data";

export type FocusQuickIngestProps = {
  draft: string;
  selectedObjectiveId: string;
  options: readonly QuickIngestObjectiveOption[];
  onDraftChange: (value: string) => void;
  onObjectiveChange: (objectiveId: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

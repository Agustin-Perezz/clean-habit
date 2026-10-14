import type { FormEvent } from "react";
import type { QuickIngestCategory } from "../mock-data";

export type FocusQuickIngestProps = {
  draft: string;
  categoryIndex: number;
  categories: readonly QuickIngestCategory[];
  onDraftChange: (value: string) => void;
  onCategoryChange: (index: number) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

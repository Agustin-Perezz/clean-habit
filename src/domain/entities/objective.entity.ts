import { InvalidObjectiveError } from "./errors";

export const OBJECTIVE_TITLE_MAX_LENGTH = 80;
export const OBJECTIVE_CATEGORY_MAX_LENGTH = 60;
export const OBJECTIVE_PRIORITY_LABEL_MAX_LENGTH = 40;
export const OBJECTIVE_ACCENT_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

export type ObjectiveHabitProps = {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
  readonly points: number;
};

export type ObjectiveProps = {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly priorityLabel?: string;
  readonly accentColor: string;
  readonly segments: readonly string[];
  readonly habits: readonly ObjectiveHabitProps[];
  readonly createdAt: string;
};

export class Objective {
  private constructor(private readonly props: ObjectiveProps) {}

  static create(input: {
    title: string;
    category: string;
    accentColor: string;
    priorityLabel?: string;
    segments: readonly string[];
    habits: readonly ObjectiveHabitProps[];
    id?: string;
    createdAt?: string;
  }): Objective {
    if (
      input.title.length === 0 ||
      input.title.length > OBJECTIVE_TITLE_MAX_LENGTH
    ) {
      throw new InvalidObjectiveError(
        `Title must be between 1 and ${OBJECTIVE_TITLE_MAX_LENGTH} characters`,
      );
    }

    if (
      input.category.length === 0 ||
      input.category.length > OBJECTIVE_CATEGORY_MAX_LENGTH
    ) {
      throw new InvalidObjectiveError(
        `Category must be between 1 and ${OBJECTIVE_CATEGORY_MAX_LENGTH} characters`,
      );
    }

    if (
      input.priorityLabel !== undefined &&
      input.priorityLabel.length > OBJECTIVE_PRIORITY_LABEL_MAX_LENGTH
    ) {
      throw new InvalidObjectiveError(
        `Priority label must be at most ${OBJECTIVE_PRIORITY_LABEL_MAX_LENGTH} characters`,
      );
    }

    if (!OBJECTIVE_ACCENT_COLOR_PATTERN.test(input.accentColor)) {
      throw new InvalidObjectiveError(
        "Accent color must be a 6-digit hex color like #004e9f",
      );
    }

    return new Objective({
      id: input.id ?? crypto.randomUUID(),
      title: input.title,
      category: input.category,
      priorityLabel: input.priorityLabel,
      accentColor: input.accentColor,
      segments: input.segments,
      habits: input.habits,
      createdAt: input.createdAt ?? new Date().toISOString(),
    });
  }

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get category(): string {
    return this.props.category;
  }

  get priorityLabel(): string | undefined {
    return this.props.priorityLabel;
  }

  get accentColor(): string {
    return this.props.accentColor;
  }

  get segments(): readonly string[] {
    return this.props.segments;
  }

  get habits(): readonly ObjectiveHabitProps[] {
    return this.props.habits;
  }

  get createdAt(): string {
    return this.props.createdAt;
  }

  toObject(): ObjectiveProps {
    return { ...this.props };
  }
}

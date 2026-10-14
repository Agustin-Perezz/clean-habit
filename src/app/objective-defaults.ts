import { DEFAULT_HABIT_POINTS, type FocusHabit } from "./mock-data";

// Form field names shared by the objective dialog form and the server actions.
export const OBJECTIVE_FORM_FIELDS = {
  id: "id",
  title: "title",
  category: "category",
  priorityLabel: "priorityLabel",
  accentColor: "accentColor",
} as const;

// Accent palette for newly created objectives (Focus OS design tokens).
export const OBJECTIVE_ACCENT_COLORS: readonly string[] = [
  "#d98218",
  "#FF9F0A",
  "#5856D6",
  "#004e9f",
  "#15803d",
];

// Segmented-bar template for newly created objectives (mock display content).
export const NEW_OBJECTIVE_SEGMENTS: readonly string[] = [
  "#22c55e",
  "#facc15",
  "#f59e0b",
  "#f97316",
  "#e5e5ea",
  "#e5e5ea",
];

// Default habits seeded on new objectives (mock display content per the ticket).
const NEW_OBJECTIVE_HABIT_TITLES: readonly string[] = [
  "Define the first milestone",
  "Schedule the first session",
  "Track the first completion",
];

export function pickObjectiveAccentColor(): string {
  const [random] = crypto.getRandomValues(new Uint32Array(1));
  const color =
    OBJECTIVE_ACCENT_COLORS[random % OBJECTIVE_ACCENT_COLORS.length];
  if (color === undefined) {
    throw new Error("Objective accent palette is empty");
  }
  return color;
}

export function createDefaultObjectiveHabits(): FocusHabit[] {
  return NEW_OBJECTIVE_HABIT_TITLES.map((title) => ({
    id: `objective-habit-${crypto.randomUUID()}`,
    title,
    completed: false,
    points: DEFAULT_HABIT_POINTS,
  }));
}

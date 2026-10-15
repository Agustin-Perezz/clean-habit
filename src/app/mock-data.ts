export type FocusHabit = {
  id: string;
  title: string;
  completed: boolean;
  points: number;
};

export type FocusObjective = {
  id: string;
  title: string;
  category: string;
  priorityLabel?: string;
  accentColor: string;
  segments: readonly string[];
  habits: readonly FocusHabit[];
};

export type FocusStats = {
  completedCount: number;
  totalCount: number;
  earnedPoints: number;
  totalPoints: number;
  percent: number;
};

export type FocusMetrics = {
  momentumPercent: number;
  pointsToday: number;
  summitEarned: number;
  summitTotal: number;
  remainingTasks: number;
  summitMessage: string;
  streakLabel: string;
  ringOffset: number;
};

export type FocusNavItemData = {
  path: string;
  label: string;
  icon: string;
};

export type QuickIngestObjectiveOption = {
  /** Objective id — the value the quick-ingest selector submits. */
  value: string;
  label: string;
};

export type FocusQuote = {
  icon: string;
  title: string;
  body: string;
};

export type FocusUser = {
  name: string;
  subtitle: string;
  streak: string;
  streakLabel: string;
};

export const DEFAULT_HABIT_POINTS = 1;
export const RING_CIRCUMFERENCE = 264;
export const HEATMAP_CELL_COUNT = 90;

// Hex colors that live in TS/JS logic (not Tailwind classes) are named here.
export const HEATMAP_ACTIVE_COLOR = "#1d1d1f";
export const HEATMAP_INACTIVE_COLOR = "#e5e5ea";
export const CHECK_ACTIVE_COLOR = "#15803d";
export const TOGGLE_INACTIVE_COLOR = "#e5e5ea";
export const HEATMAP_TREND_COLOR = "#34C759";
export const HEATMAP_TREND_LABEL = "+3.45%";
export const TRAFFIC_LIGHTS: readonly string[] = [
  "#ff5f56",
  "#ffbd2e",
  "#27c93f",
];

export const DASHBOARD_DATE = "Tuesday, October 24";
export const SUMMIT_COMPLETE_MESSAGE =
  "Daily summit reached. All rituals completed.";
export const SUMMIT_REMAINING_SUFFIX = "remaining to hit your daily summit.";

export const HEATMAP_ACTIVE_INDICES: readonly number[] = [
  3, 4, 8, 9, 14, 25, 30, 33, 34, 35, 39, 43, 44, 45, 46, 50, 55, 60, 61, 66,
  67, 68, 72, 76, 79, 80,
];
export const HEATMAP_CELLS: readonly number[] = Array.from(
  { length: HEATMAP_CELL_COUNT },
  (_, index) => index,
);

export const CURRENT_USER: FocusUser = {
  name: "Julian Vance",
  subtitle: "Daily Rituals",
  streak: "5/7 Streak",
  streakLabel: "5 Days",
};

export const TRACKING_NAV: readonly FocusNavItemData[] = [
  { path: "todays-habits", label: "Today's Habits", icon: "check_circle" },
  { path: "core-objectives", label: "Core Objectives", icon: "flag" },
  {
    path: "weekly-streaks",
    label: "Weekly Streaks",
    icon: "local_fire_department",
  },
  { path: "analytics", label: "Analytics", icon: "insights" },
];

export const LIBRARY_NAV: readonly FocusNavItemData[] = [
  { path: "archive", label: "Archive", icon: "archive" },
  { path: "settings", label: "Settings", icon: "settings" },
];

export const QUICK_INGEST_OPTION_PREFIX = "Add to ";

export function deriveQuickIngestOptions(
  objectives: readonly FocusObjective[],
): readonly QuickIngestObjectiveOption[] {
  return objectives.map((objective) => ({
    value: objective.id,
    label: `${QUICK_INGEST_OPTION_PREFIX}${objective.title}`,
  }));
}

export const FOCUS_QUOTE: FocusQuote = {
  icon: "spa",
  title: "Deliberate Practice",
  body: "Consistency compounds silently. Focus on daily completion without emotional attachment to outcomes.",
};

export function getObjectiveStats(objective: FocusObjective): FocusStats {
  let completedCount = 0;
  let earnedPoints = 0;
  let totalPoints = 0;
  for (const habit of objective.habits) {
    totalPoints += habit.points;
    if (habit.completed) {
      completedCount += 1;
      earnedPoints += habit.points;
    }
  }
  const totalCount = objective.habits.length;
  const percent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  return { completedCount, totalCount, earnedPoints, totalPoints, percent };
}

export function deriveFocusMetrics(
  objectives: readonly FocusObjective[],
): FocusMetrics {
  let earnedPoints = 0;
  let totalPoints = 0;
  for (const objective of objectives) {
    const stats = getObjectiveStats(objective);
    earnedPoints += stats.earnedPoints;
    totalPoints += stats.totalPoints;
  }
  const momentumPercent =
    totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  const remainingTasks = totalPoints - earnedPoints;
  const summitMessage =
    remainingTasks > 0
      ? `${remainingTasks} ${remainingTasks === 1 ? "task" : "tasks"} ${SUMMIT_REMAINING_SUFFIX}`
      : SUMMIT_COMPLETE_MESSAGE;
  const ringOffset =
    RING_CIRCUMFERENCE - (momentumPercent / 100) * RING_CIRCUMFERENCE;
  return {
    momentumPercent,
    pointsToday: earnedPoints,
    summitEarned: earnedPoints,
    summitTotal: totalPoints,
    remainingTasks,
    summitMessage,
    streakLabel: CURRENT_USER.streakLabel,
    ringOffset,
  };
}

export function createHabit(title: string): FocusHabit {
  return {
    id: `custom-${crypto.randomUUID()}`,
    title,
    completed: false,
    points: DEFAULT_HABIT_POINTS,
  };
}

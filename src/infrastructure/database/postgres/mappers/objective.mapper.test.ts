import { describe, expect, it } from "vitest";
import type { ObjectiveRow } from "../entities/objective.entity";
import { objectiveMapper } from "./objective.mapper";

const row: ObjectiveRow = {
  id: "00000000-0000-4000-8000-000000000001",
  title: "Deep Work & Focus",
  category: "Cognitive Discipline",
  priority_label: "Priority",
  accent_color: "#d98218",
  segments: ["#22c55e", "#e5e5ea"],
  habits: [
    { id: "habit-1", title: "Morning sprint", completed: true, points: 1 },
  ],
  created_at: "2026-01-01T00:00:00.000Z",
};

describe("objectiveMapper", () => {
  it("maps a persistence row to a domain Objective", () => {
    const objective = objectiveMapper.toDomain(row);

    expect(objective.id).toBe(row.id);
    expect(objective.title).toBe(row.title);
    expect(objective.category).toBe(row.category);
    expect(objective.priorityLabel).toBe(row.priority_label);
    expect(objective.accentColor).toBe(row.accent_color);
    expect(objective.segments).toEqual(row.segments);
    expect(objective.habits).toEqual(row.habits);
    expect(objective.createdAt).toBe(row.created_at);
  });

  it("maps a null priority_label to an undefined domain priorityLabel", () => {
    const objective = objectiveMapper.toDomain({
      ...row,
      priority_label: null,
    });

    expect(objective.priorityLabel).toBeUndefined();
  });

  it("maps a domain Objective back to a persistence insert", () => {
    const objective = objectiveMapper.toDomain(row);

    expect(objectiveMapper.toPersistence(objective)).toEqual({
      id: row.id,
      title: row.title,
      category: row.category,
      priority_label: row.priority_label,
      accent_color: row.accent_color,
      segments: row.segments,
      habits: row.habits,
      created_at: row.created_at,
    });
  });

  it("round-trips an Objective through persistence without loss", () => {
    const objective = objectiveMapper.toDomain(row);
    const restored = objectiveMapper.toDomain(
      objectiveMapper.toPersistence(objective) as unknown as ObjectiveRow,
    );

    expect(restored.toObject()).toEqual(objective.toObject());
  });
});

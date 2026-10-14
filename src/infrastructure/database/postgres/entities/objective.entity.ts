import type { Database } from "../database.types";

export type ObjectiveRow = Database["public"]["Tables"]["objectives"]["Row"];
export type ObjectiveInsert =
  Database["public"]["Tables"]["objectives"]["Insert"];
export type ObjectiveUpdate =
  Database["public"]["Tables"]["objectives"]["Update"];

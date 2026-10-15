import { supabaseTestClient } from "./supabase-test-client";

type SeedObjectivesInput = {
  titles: readonly string[];
  category: string;
};

export async function seedObjectives({
  titles,
  category,
}: SeedObjectivesInput): Promise<void> {
  const { error } = await supabaseTestClient.from("objectives").insert(
    titles.map((title) => ({
      title,
      category,
      accent_color: "#d98218",
      segments: [],
      habits: [],
    })),
  );

  if (error) {
    throw new Error(`Failed to seed objectives: ${error.message}`);
  }
}

export async function deleteObjectivesByPrefix(prefix: string): Promise<void> {
  const { error } = await supabaseTestClient
    .from("objectives")
    .delete()
    .like("title", `${prefix}%`);

  if (error) {
    throw new Error(
      `Failed to clean up objectives with prefix: ${error.message}`,
    );
  }
}

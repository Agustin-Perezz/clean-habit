import { getObjectives } from "../queries";
import { FocusWorkspace } from "./FocusWorkspace";

export async function FocusObjectivesSection() {
  const objectives = await getObjectives();

  return <FocusWorkspace initialObjectives={objectives} />;
}

import { LIBRARY_NAV, TRACKING_NAV } from "../mock-data";
import { FocusNavSection } from "./FocusNavSection";
import { FocusTrafficLights } from "./FocusTrafficLights";
import { FocusUserRow } from "./FocusUserRow";

export function FocusSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-canvas-parchment/90 backdrop-blur-2xl border-r border-hairline-subtle z-50 flex flex-col justify-between py-space-lg px-space-md">
      <div className="flex flex-col gap-space-lg">
        <FocusTrafficLights />
        <FocusNavSection label="Tracking" items={TRACKING_NAV} />
        <FocusNavSection label="Library" items={LIBRARY_NAV} />
      </div>
      <FocusUserRow />
    </aside>
  );
}

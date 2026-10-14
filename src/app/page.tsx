import { Suspense } from "react";
import { FocusObjectivesSection } from "./components/FocusObjectivesSection";
import { FocusSidebar } from "./components/FocusSidebar";
import { FocusTopbar } from "./components/FocusTopbar";
import { FocusWorkspaceSkeleton } from "./components/FocusWorkspaceSkeleton";

export default function Home() {
  return (
    <div className="bg-canvas-parchment font-body text-ink-primary antialiased min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
      <FocusSidebar />
      <div className="pl-[260px]">
        <FocusTopbar />
        <main className="relative pt-16 min-h-screen bg-canvas-parchment px-space-xl py-space-xl">
          <Suspense fallback={<FocusWorkspaceSkeleton />}>
            <FocusObjectivesSection />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

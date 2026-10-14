import { FOCUS_CONTENT_MAX_WIDTH } from "./focus-layout";

export function FocusWorkspaceSkeleton() {
  return (
    <div
      className={`flex flex-col gap-space-xl ${FOCUS_CONTENT_MAX_WIDTH} mx-auto w-full animate-pulse`}
      aria-busy="true"
    >
      <div className="h-8 w-48 rounded-full bg-surface-container" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-8 flex flex-col gap-space-lg">
          <div className="h-48 rounded-focus-2xl bg-surface-container" />
          <div className="h-48 rounded-focus-2xl bg-surface-container" />
        </div>
        <div className="lg:col-span-4 h-48 rounded-focus-2xl bg-surface-container" />
      </div>
    </div>
  );
}

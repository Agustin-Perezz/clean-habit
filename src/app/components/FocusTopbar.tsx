import { Input } from "@/components/ui/input";
import { FocusTopbarActions } from "./FocusTopbarActions";
import { FOCUS_CONTENT_MAX_WIDTH } from "./focus-layout";

export function FocusTopbar() {
  return (
    <header className="fixed top-0 left-[260px] right-0 h-16 bg-canvas-parchment/80 backdrop-blur-xl border-b border-hairline-subtle z-40 flex items-center px-space-xl">
      <div
        className={`flex w-full items-center justify-between ${FOCUS_CONTENT_MAX_WIDTH} mx-auto`}
      >
        <div className="flex items-center gap-space-md">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-ink-tertiary text-[16px]">
              search
            </span>
            <Input
              className="h-9 w-64 rounded-full bg-surface-container-lowest border border-hairline-subtle pl-9 pr-4 py-0 font-caption text-[14px] md:text-[14px] text-ink-primary placeholder:text-ink-tertiary focus:outline-none focus:border-primary-container focus-visible:border-primary-container focus-visible:ring-0 transition-all"
              placeholder="Quick search habits or metrics..."
              type="text"
            />
          </div>
          <span className="font-caption text-caption text-ink-tertiary hidden sm:inline-block">
            <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-micro-legal text-micro-legal text-ink-secondary border border-hairline-subtle">
              ⌘K
            </kbd>
          </span>
        </div>
        <FocusTopbarActions />
      </div>
    </header>
  );
}

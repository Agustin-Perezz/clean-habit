import { Button } from "@/components/ui/button";

export function FocusTopbarActions() {
  return (
    <div className="flex items-center gap-space-sm">
      <Button
        className="w-9 h-9 rounded-full text-ink-secondary hover:bg-surface-container-high hover:text-ink-primary"
        type="button"
        variant="ghost"
      >
        <span className="material-symbols-outlined text-[20px]">
          calendar_today
        </span>
      </Button>
      <Button
        className="w-9 h-9 rounded-full text-ink-secondary hover:bg-surface-container-high hover:text-ink-primary"
        type="button"
        variant="ghost"
      >
        <span className="material-symbols-outlined text-[20px]">tune</span>
      </Button>
      <div className="w-8 h-8 rounded-full bg-focus-primary flex items-center justify-center">
        <span className="material-symbols-outlined text-on-primary text-[18px]">
          person
        </span>
      </div>
    </div>
  );
}

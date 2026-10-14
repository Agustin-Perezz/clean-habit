import { Separator } from "@/components/ui/separator";
import { CURRENT_USER } from "../mock-data";

export function FocusUserRow() {
  return (
    <div>
      <Separator className="bg-hairline-subtle" />
      <div className="pt-space-md">
        <div className="flex items-center justify-between p-space-xs rounded-focus-xl hover:bg-surface-container-high transition-colors cursor-pointer">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-full bg-focus-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-caption-strong text-caption-strong text-ink-primary leading-tight">
                {CURRENT_USER.name}
              </span>
              <span className="font-micro-legal text-micro-legal text-ink-tertiary">
                {CURRENT_USER.subtitle}
              </span>
            </div>
          </div>
          <span className="font-caption-strong text-caption-strong text-primary-container font-mono">
            {CURRENT_USER.streak}
          </span>
        </div>
      </div>
    </div>
  );
}

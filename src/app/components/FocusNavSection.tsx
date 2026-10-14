import type { FocusNavItemData } from "../mock-data";
import { FocusNavItem } from "./FocusNavItem";

type FocusNavSectionProps = {
  label: string;
  items: readonly FocusNavItemData[];
};

export function FocusNavSection({ label, items }: FocusNavSectionProps) {
  return (
    <>
      <div className="px-space-xs pt-space-xs">
        <span className="font-caption-strong text-caption-strong text-ink-tertiary tracking-tight uppercase">
          {label}
        </span>
      </div>
      <nav className="flex flex-col gap-space-xs">
        {items.map((item) => (
          <FocusNavItem key={item.path} item={item} />
        ))}
      </nav>
    </>
  );
}

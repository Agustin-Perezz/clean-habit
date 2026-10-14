import type { FocusNavItemData } from "../mock-data";

type FocusNavItemProps = {
  item: FocusNavItemData;
};

export function FocusNavItem({ item }: FocusNavItemProps) {
  return (
    <a
      className="flex items-center gap-space-sm px-space-sm py-2 rounded-focus-lg text-ink-secondary hover:bg-surface-container-high hover:text-ink-primary transition-all duration-150"
      data-path={item.path}
      href={`#${item.path}`}
    >
      <span className="material-symbols-outlined text-[19px] text-ink-tertiary">
        {item.icon}
      </span>
      <span className="font-body text-body">{item.label}</span>
    </a>
  );
}

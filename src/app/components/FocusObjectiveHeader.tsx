type FocusObjectiveHeaderProps = {
  category: string;
  priorityLabel?: string;
  title: string;
  percent: number;
};

export function FocusObjectiveHeader({
  category,
  priorityLabel,
  title,
  percent,
}: FocusObjectiveHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-space-md">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-ink-secondary font-micro-legal text-micro-legal uppercase tracking-wider font-semibold">
            {category}
          </span>
          {priorityLabel ? (
            <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-micro-legal text-micro-legal font-medium">
              {priorityLabel}
            </span>
          ) : null}
        </div>
        <h2 className="font-tagline text-tagline text-ink-primary mt-1">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <span className="card-percent font-caption-strong text-caption-strong text-primary-container">
          {percent}%
        </span>
      </div>
    </div>
  );
}

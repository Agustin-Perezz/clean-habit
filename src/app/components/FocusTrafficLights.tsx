import { TRAFFIC_LIGHTS } from "../mock-data";

export function FocusTrafficLights() {
  return (
    <div className="flex items-center gap-space-sm px-space-xs">
      {TRAFFIC_LIGHTS.map((color) => (
        <div
          key={color}
          className="w-3 h-3 rounded-full opacity-80"
          style={{ backgroundColor: color }}
        />
      ))}
      <div className="ml-auto flex items-center">
        <span className="font-caption-strong text-caption-strong text-ink-tertiary uppercase tracking-wider">
          Focus OS
        </span>
      </div>
    </div>
  );
}

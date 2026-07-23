import type { ReactNode } from "react";
import { ChevronIcon } from "../icons/ChevronIcon";

interface StepHeaderProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  icon: ReactNode;
  selectedCount: number;
  isOpen: boolean;
  onToggle: () => void;
}

export function StepHeader({
  stepNumber,
  totalSteps,
  title,
  icon,
  selectedCount,
  isOpen,
  onToggle,
}: StepHeaderProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className={`w-full px-2 py-2 text-left transition hover:bg-hover  border-b border-text-muted ${isOpen ? " border-none bg-surface-muted hover:bg-surface-hover" : ""}`}
    >
      <p className="-mx-4 border-b border-text-muted px-4 pb-1 md:text-[12px] font-medium uppercase  text-text-muted text-[10px]">
        Step {stepNumber} of {totalSteps}
      </p>

      <div className="mt-3 flex items-center gap-3">
        <span className="shrink-0 text-text-muted">{icon}</span>
        <h2 className="min-w-0 flex-1 truncate text-[18px] font-semibold text-text  md:text-[22px]">
          {title}
        </h2>

        <div className="flex shrink-0 items-center gap-2">
          <span className="whitespace-nowrap text-sm font-semibold text-primary">
            {selectedCount} selected
          </span>

          <ChevronIcon up={isOpen} />
        </div>
      </div>
    </button>
  );
}

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  disabled?: boolean;
  compact?: boolean;
  "aria-label"?: string;
  variant?: "primary" | "secondary";
}

export function QuantityStepper({
  value,
  onChange,
  min = 0,
  disabled = false,
  compact = false,
  variant = "primary",
  "aria-label": ariaLabel = "Quantity",
}: QuantityStepperProps) {
  const canDecrement = !disabled && value > min;
  const size = compact ? "h-6 w-6 text-sm" : "h-8 w-8 text-base";
  const buttonBg =
    variant === "secondary"
      ? "bg-surface hover:bg-border/60"
      : "bg-control enabled:hover:bg-border";

  return (
    <div
      className="inline-flex items-center gap-2 text-text"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className={`flex ${size} items-center justify-center rounded-md ${buttonBg} leading-none text-text-muted transition disabled:cursor-not-allowed disabled:opacity-35`}
        onClick={() => onChange(value - 1)}
        disabled={!canDecrement}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span
        className={`min-w-4 text-center font-semibold tabular-nums ${
          compact ? "text-xs" : "text-[16px]"
        }`}
      >
        {value}
      </span>
      <button
        type="button"
        className={`flex ${size} items-center justify-center rounded-md ${buttonBg} leading-none text-text-muted transition disabled:cursor-not-allowed disabled:opacity-35`}
        onClick={() => onChange(value + 1)}
        disabled={disabled}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

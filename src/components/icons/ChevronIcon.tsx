export function ChevronIcon({ up }: { up?: boolean }) {
  return (
    <svg
      className={`h-3 w-3 text-primary transition ${up ? "rotate-180" : ""}`}
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6 9 1.5 3.5h9L6 9Z" />
    </svg>
  );
}

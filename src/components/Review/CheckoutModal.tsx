import { useEffect } from "react";

interface CheckoutModalProps {
  open: boolean;
  totalLabel: string;
  onClose: () => void;
}

export function CheckoutModal({
  open,
  totalLabel,
  onClose,
}: CheckoutModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="checkout-title" className="text-xl font-bold text-text">
          Ready to checkout
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          This is a prototype — no payment is processed. Your system total is{" "}
          <span className="font-semibold text-primary">{totalLabel}</span>.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition hover:brightness-110"
        >
          Close
        </button>
      </div>
    </div>
  );
}

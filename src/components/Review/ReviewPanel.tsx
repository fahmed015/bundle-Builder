import { useEffect, useState } from "react";
import { products } from "../../data/catalog";
import { formatMoney, getCartTotals, getReviewGroups } from "../../lib/pricing";
import { useCartStore } from "../../state/cartStore";
import { CheckoutModal } from "./CheckoutModal";
import { ReviewLineItem } from "./ReviewLineItem";
import { TruckIcon } from "../icons/TruckIcon";

const FINANCING_MONTHLY = 19.19;
const SHIPPING_COMPARE_AT = 5.99;

export function ReviewPanel() {
  const lines = useCartStore((s) => s.lines);
  const saveSystem = useCartStore((s) => s.saveSystem);
  const restoredFromSave = useCartStore((s) => s.restoredFromSave);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [showRestored, setShowRestored] = useState(false);

  const groups = getReviewGroups(lines, products);
  const { total, compareAtTotal, savings } = getCartTotals(lines, products);
  const isEmpty = groups.length === 0;

  useEffect(() => {
    if (!restoredFromSave) return;
    setShowRestored(true);
    const timer = window.setTimeout(() => setShowRestored(false), 3500);
    return () => window.clearTimeout(timer);
  }, [restoredFromSave]);

  const handleSave = () => {
    saveSystem();
    setSaveMessage("System saved!");
    window.setTimeout(() => setSaveMessage(null), 2200);
  };

  return (
    <section className="md:rounded-[10px] bg-surface-muted p-3.75">
      {showRestored ? (
        <p
          className="mb-3 rounded-lg bg-success/10 px-3 py-2 text-xs font-medium text-success"
          role="status"
        >
          Restored your saved system.
        </p>
      ) : null}

      <p className="text-[12px] font-medium uppercase text-text-muted ">
        Review
      </p>
      <h2 className="mt-5 text-[22px] font-semibold  text-text ">
        Your security system
      </h2>
      <p className=" text-[14px]leading-relaxed text-text-soft ">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-1.25 md:gap-13 lg:gap-2.5 px-1.25 md:grid-cols-2 lg:grid-cols-1">
        <div className="space-y-2.5">
          {isEmpty ? (
            <div className="border-t border-[#CED6DE] py-8 text-center">
              <p className="mt-1 text-[13px] text-text-muted">
                Add cameras, a plan, or accessories to see them here.
              </p>
            </div>
          ) : (
            groups.map((group) => (
              <div key={group.id}>
                <h3 className="border-t border-[#CED6DE] pb-1 pt-2 text-[12px] font-medium uppercase tracking-widest text-[#A8B2BD]">
                  {group.label}
                </h3>
                <div>
                  {group.lines.map((line) => (
                    <ReviewLineItem
                      key={line.key}
                      line={line}
                      showStepper={group.id !== "plan"}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-border-muted pt-3.75">
          <div className="flex flex-col gap-2">
            {!isEmpty ? (
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-surface text-success">
                  <TruckIcon />
                </div>
                <p className="min-w-0 flex-1 text-[12px] md:text-[16px] font-medium text-text">
                  Fast Shipping
                </p>
                <div className="shrink-0 text-right leading-tight">
                  <div className="text-xs text-text-muted line-through">
                    {formatMoney(SHIPPING_COMPARE_AT)}
                  </div>
                  <div className="text-sm font-bold text-primary">FREE</div>
                </div>
              </div>
            ) : null}

            <div className="flex items-center justify-between gap-4">
              <img
                src="/images/satisfaction-badge.png"
                alt="100% Wyze satisfaction guarantee. Try worry-free for 30 days."
                className="h-19 w-19 shrink-0 object-contain"
              />
              <div className="flex min-w-0 flex-col items-end">
                <span className="inline-block w-fit rounded-[3px] bg-primary px-2.5 py-1 text-[11px] font-semibold leading-none text-on-primary">
                  as low as {formatMoney(FINANCING_MONTHLY)}/mo
                </span>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  {compareAtTotal > total ? (
                    <span className="text-[18px] font-medium text-[#6F7882] line-through">
                      {formatMoney(compareAtTotal)}
                    </span>
                  ) : null}
                  <span className="text-[24px] font-bold leading-none text-primary">
                    {formatMoney(total)}
                  </span>
                </div>
              </div>
            </div>

            {savings > 0 ? (
              <p className="text-center text-[12px] font-medium text-[#0AA288]">
                Congrats! You&apos;re saving {formatMoney(savings)} on your
                security bundle!
              </p>
            ) : null}

            <button
              type="button"
              onClick={() => setCheckoutOpen(true)}
              disabled={isEmpty}
              className="w-full rounded-lg bg-primary px-4 py-3.5 text-sm font-semibold text-on-primary transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary"
            >
              Checkout
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="text-center text-sm font-medium text-[#484848] underline underline-offset-2 transition hover:text-text"
            >
              {saveMessage ?? "Save my system for later"}
            </button>
          </div>
        </div>
      </div>

      <CheckoutModal
        open={checkoutOpen}
        totalLabel={formatMoney(total)}
        onClose={() => setCheckoutOpen(false)}
      />
    </section>
  );
}

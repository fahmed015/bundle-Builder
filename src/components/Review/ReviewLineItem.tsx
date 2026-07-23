import { formatMoney } from "../../lib/pricing";
import type { ReviewLine } from "../../types/catalog";
import { useCartStore } from "../../state/cartStore";
import { CamPlusIcon } from "../icons/CamPlusIcon";
import { CameraUnlimitedIcon } from "../icons/CameraUnlimitedIcon";
import { QuantityStepper } from "../shared/QuantityStepper";

interface ReviewLineItemProps {
  line: ReviewLine;
  showStepper?: boolean;
}

export function ReviewLineItem({
  line,
  showStepper = true,
}: ReviewLineItemProps) {
  const setQuantity = useCartStore((s) => s.setQuantity);

  const priceLabel = line.isFree
    ? "FREE"
    : `${formatMoney(line.lineTotal)}${line.product.priceSuffix ?? ""}`;

  const compareLabel =
    line.lineCompareAt != null
      ? `${formatMoney(line.lineCompareAt)}${line.product.priceSuffix ?? ""}`
      : null;

  return (
    <div className="flex items-center gap-2.5 pt-2.5">
      {line.product.icon === "cam-plus" ? (
        <CamPlusIcon className="h-8 w-auto shrink-0 sm:h-9" />
      ) : line.product.icon === "cam-unlimited" ? (
        <CameraUnlimitedIcon className="h-8 w-auto shrink-0 sm:h-9" />
      ) : line.product.image ? (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface sm:h-12 sm:w-12">
          <img
            src={line.product.image}
            alt=""
            className="max-h-full max-w-full object-contain p-0.5"
            onError={(event) => {
              event.currentTarget.src = "/images/placeholder.svg";
            }}
          />
        </div>
      ) : null}

      <p className="min-w-0 flex-1 text-[12px] md:text-[16px] font-medium text-text">
        {line.product.icon === "cam-plus" ? (
          <>
            <span className="font-bold text-text">Cam </span>
            <span className="font-bold text-primary">Plus</span>
          </>
        ) : line.product.icon === "cam-unlimited" ? (
          <>
            <span className="font-bold text-text">Cam </span>
            <span className="font-bold text-primary">Unlimited</span>
          </>
        ) : (
          line.name
        )}
      </p>

      {showStepper ? (
        <QuantityStepper
          compact
          variant="secondary"
          value={line.quantity}
          onChange={(next) =>
            setQuantity(line.product.id, line.variantId, next)
          }
          aria-label={`${line.name} quantity`}
        />
      ) : null}

      <div className="shrink-0 text-right leading-tight">
        {compareLabel &&
        (line.isFree || line.lineCompareAt !== line.lineTotal) ? (
          <div className="text-[11px] text-[#6F7882] line-through sm:text-xs">
            {compareLabel}
          </div>
        ) : null}
        <div className="text-[13px] font-semibold text-primary sm:text-sm">
          {priceLabel}
        </div>
      </div>
    </div>
  );
}

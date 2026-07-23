import { useMemo, useState } from "react";
import { formatMoney, getQuantity } from "../../lib/pricing";
import { useCartStore } from "../../state/cartStore";
import type { CartLine, Product } from "../../types/catalog";
import { CamPlusIcon } from "../icons/CamPlusIcon";
import { CameraUnlimitedIcon } from "../icons/CameraUnlimitedIcon";
import { QuantityStepper } from "../shared/QuantityStepper";
import { VariantSelector } from "./VariantSelector";

interface ProductCardProps {
  product: Product;
}

function defaultVariantId(product: Product, lines: CartLine[]) {
  if (!product.variants?.length) return null;

  const withQty = product.variants.find((variant) =>
    lines.some(
      (line) =>
        line.productId === product.id &&
        line.variantId === variant.id &&
        line.quantity > 0,
    ),
  );
  return withQty?.id ?? product.variants[0].id;
}

export function ProductCard({ product }: ProductCardProps) {
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const hasVariants = Boolean(product.variants?.length);

  const [activeVariantId, setActiveVariantId] = useState(() =>
    defaultVariantId(product, lines),
  );

  const boundVariantId = hasVariants ? activeVariantId : null;
  const quantity = getQuantity(lines, product.id, boundVariantId);
  const selected = lines.some(
    (line) => line.productId === product.id && line.quantity > 0,
  );

  const priceLabel = useMemo(() => {
    if (product.free) return "FREE";
    const base = formatMoney(product.price);
    return product.priceSuffix ? `${base}${product.priceSuffix}` : base;
  }, [product]);

  return (
    <article
      className={`relative flex h-auto min-h-41.5 w-full flex-row gap-3.25 overflow-hidden rounded-[10px] border-2 bg-surface p-2.75 transition md:h-82.75 md:min-h-0 md:flex-col lg:h-auto lg:min-h-41.5 lg:flex-row ${
        selected ? "border-primary-border" : "border-none"
      }`}
    >
      <div className="relative flex w-25 shrink-0 items-center justify-center md:h-40 md:w-full lg:h-auto lg:w-25">
        {product.badge ? (
          <span className="absolute left-0 top-0 z-10 flex h-4.75 w-16.25 items-center justify-center rounded-[10px] bg-primary-badge px-1.5 py-0.5 text-[12px] font-semibold leading-none text-on-primary">
            {product.badge}
          </span>
        ) : null}
        {product.icon === "cam-plus" ? (
          <CamPlusIcon className="h-18 w-auto md:h-28 lg:h-18" />
        ) : product.icon === "cam-unlimited" ? (
          <CameraUnlimitedIcon className="h-18 w-auto md:h-28 lg:h-18" />
        ) : product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain md:max-h-36 lg:max-h-full"
            onError={(event) => {
              event.currentTarget.src = "/images/placeholder.svg";
            }}
          />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="shrink-0 text-base font-semibold text-text">
          {product.name}
        </h3>
        <p className="mt-0.5 shrink-0 text-[12px] font-normal leading-[130%] tracking-[0.6px] text-text-muted align-middle">
          {product.description}
          {product.learnMoreUrl ? (
            <>
              {" "}
              <a
                href={product.learnMoreUrl}
                className="text-[12px] font-medium text-primary underline underline-offset-2"
              >
                Learn More
              </a>
            </>
          ) : null}
        </p>

        {hasVariants && activeVariantId ? (
          <div className="mt-1.5 shrink-0">
            <VariantSelector
              variants={product.variants!}
              activeId={activeVariantId}
              productImage={product.image}
              onSelect={setActiveVariantId}
            />
          </div>
        ) : null}

        <div className="mt-auto flex shrink-0 items-center justify-between gap-2 pt-1">
          <QuantityStepper
            value={quantity}
            onChange={(next) => setQuantity(product.id, boundVariantId, next)}
            aria-label={`${product.name} quantity`}
            compact
          />
          <div className="flex flex-col items-end leading-tight md:flex-row md:items-baseline md:gap-1.5 lg:flex-col lg:gap-0">
            {product.compareAtPrice != null && !product.free ? (
              <span className="text-[16px] font-medium text-danger line-through">
                {formatMoney(product.compareAtPrice)}
                {product.priceSuffix ?? ""}
              </span>
            ) : null}
            <span className="text-[16px] font-medium text-text-price">
              {priceLabel}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

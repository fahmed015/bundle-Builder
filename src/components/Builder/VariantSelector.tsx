import type { ProductVariant } from "../../types/catalog";

interface VariantSelectorProps {
  variants: ProductVariant[];
  activeId: string;
  productImage?: string;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({
  variants,
  activeId,
  productImage,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1" role="listbox" aria-label="Color">
      {variants.map((variant) => {
        const selected = variant.id === activeId;
        return (
          <button
            key={variant.id}
            type="button"
            role="option"
            aria-selected={selected}
            onClick={() => onSelect(variant.id)}
            className={`inline-flex h-6.5 w-13.75 items-center justify-center gap-1 rounded-xs border-[0.5px] px-0.75 py-px text-[10px] font-medium text-text transition ${
              selected
                ? "border-selected-border bg-selected-bg"
                : "border-border bg-surface hover:border-border-strong"
            }`}
          >
            {productImage ? (
              <img
                src={productImage}
                alt=""
                className="h-3.5 w-3.5 rounded-full object-cover"
                style={{ backgroundColor: variant.swatch }}
              />
            ) : (
              <span
                className="h-3.5 w-3.5 rounded-full border border-text/10"
                style={{ backgroundColor: variant.swatch }}
                aria-hidden
              />
            )}
            {variant.label}
          </button>
        );
      })}
    </div>
  );
}

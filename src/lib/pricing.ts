import type {
  CartLine,
  Product,
  ProductCategory,
  ReviewLine,
  Step,
} from "../types/catalog";

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getCartTotals(
  lines: CartLine[],
  products: Product[],
): { total: number; compareAtTotal: number; savings: number } {
  const byId = new Map(products.map((product) => [product.id, product]));

  let total = 0;
  let compareAtTotal = 0;

  for (const line of lines) {
    if (line.quantity <= 0) continue;

    const product = byId.get(line.productId);
    if (!product) continue;

    const unitPrice = product.free ? 0 : product.price;
    const unitCompareAt = product.compareAtPrice ?? unitPrice;

    total += unitPrice * line.quantity;
    compareAtTotal += unitCompareAt * line.quantity;
  }

  total = roundMoney(total);
  compareAtTotal = roundMoney(compareAtTotal);

  return {
    total,
    compareAtTotal,
    savings: roundMoney(Math.max(0, compareAtTotal - total)),
  };
}

export function getQuantity(
  lines: CartLine[],
  productId: string,
  variantId: string | null,
): number {
  return (
    lines.find(
      (line) => line.productId === productId && line.variantId === variantId,
    )?.quantity ?? 0
  );
}

export function getSelectedCount(lines: CartLine[], step: Step): number {
  const selected = new Set<string>();

  for (const line of lines) {
    if (line.quantity <= 0) continue;
    if (!step.productIds.includes(line.productId)) continue;
    selected.add(line.productId);
  }

  return selected.size;
}

const CATEGORY_ORDER: { id: ProductCategory; label: string }[] = [
  { id: "cameras", label: "Cameras" },
  { id: "sensors", label: "Sensors" },
  { id: "accessories", label: "Accessories" },
  { id: "plan", label: "Plan" },
];

export function getReviewGroups(
  lines: CartLine[],
  products: Product[],
): { id: ProductCategory; label: string; lines: ReviewLine[] }[] {
  const byId = new Map(products.map((product) => [product.id, product]));
  const byCategory = new Map<ProductCategory, ReviewLine[]>();

  for (const line of lines) {
    if (line.quantity <= 0) continue;
    const product = byId.get(line.productId);
    if (!product) continue;

    const variant = product.variants?.find((v) => v.id === line.variantId);
    const unitPrice = product.free ? 0 : product.price;
    const unitCompareAt = product.compareAtPrice ?? null;
    const isFree = Boolean(product.free) || unitPrice === 0;

    const reviewLine: ReviewLine = {
      key: line.variantId
        ? `${line.productId}::${line.variantId}`
        : line.productId,
      product,
      variantId: line.variantId,
      quantity: line.quantity,
      name: variant ? `${product.name} (${variant.label})` : product.name,
      lineTotal: roundMoney(unitPrice * line.quantity),
      lineCompareAt:
        unitCompareAt == null
          ? null
          : roundMoney(unitCompareAt * line.quantity),
      isFree,
    };

    const existing = byCategory.get(product.category) ?? [];
    existing.push(reviewLine);
    byCategory.set(product.category, existing);
  }

  return CATEGORY_ORDER.filter(
    (group) => (byCategory.get(group.id)?.length ?? 0) > 0,
  ).map((group) => ({
    ...group,
    lines: byCategory.get(group.id)!,
  }));
}

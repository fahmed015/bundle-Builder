import catalogJson from "./catalog.json";
import type { CartLine, Product, Step } from "../types/catalog";

export const steps = catalogJson.steps as Step[];
export const products = catalogJson.products as Product[];
export const seedLines = catalogJson.seed as CartLine[];

export function cloneSeedLines(): CartLine[] {
  return seedLines.map((line) => ({ ...line }));
}

export function getProductById(productId: string) {
  return products.find((product) => product.id === productId);
}

export function getProductsForStep(stepId: string) {
  const step = steps.find((item) => item.id === stepId);
  if (!step) return [];
  return step.productIds
    .map((id) => getProductById(id))
    .filter((product): product is Product => product != null);
}

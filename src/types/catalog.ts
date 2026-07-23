export type ProductCategory = "cameras" | "sensors" | "accessories" | "plan";

export type StepIcon = "camera" | "shield" | "sensor" | "grid";

export type ProductIcon = "cam-plus" | "cam-unlimited";

export interface ProductVariant {
  id: string;
  label: string;
  swatch: string;
}

export interface Product {
  id: string;
  stepId: string;
  category: ProductCategory;
  name: string;
  description: string;
  image?: string;
  icon?: ProductIcon;
  badge?: string;
  learnMoreUrl?: string;
  compareAtPrice?: number;
  price: number;
  priceSuffix?: string;
  free?: boolean;
  variants?: ProductVariant[];
}

export interface Step {
  id: string;
  title: string;
  icon: StepIcon;
  nextLabel?: string;
  productIds: string[];
}

export interface CartLine {
  productId: string;
  variantId: string | null;
  quantity: number;
}
export interface ReviewLine {
  key: string;
  product: Product;
  variantId: string | null;
  quantity: number;
  name: string;
  lineTotal: number;
  lineCompareAt: number | null;
  isFree: boolean;
}

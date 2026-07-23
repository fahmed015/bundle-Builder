import { create } from "zustand";
import { cloneSeedLines } from "../data/catalog";
import type { CartLine } from "../types/catalog";

export const STORAGE_KEY = "bundle-builder-system";

function loadInitialLines(): { lines: CartLine[]; restored: boolean } {
  try {
    if (typeof localStorage === "undefined") {
      return { lines: cloneSeedLines(), restored: false };
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lines: cloneSeedLines(), restored: false };

    const parsed = JSON.parse(raw) as { lines?: CartLine[] };
    if (Array.isArray(parsed.lines)) {
      return { lines: parsed.lines, restored: true };
    }
  } catch {
    // ignore bad storage
  }
  return { lines: cloneSeedLines(), restored: false };
}

const initial = loadInitialLines();

interface CartStore {
  lines: CartLine[];
  restoredFromSave: boolean;
  setQuantity: (
    productId: string,
    variantId: string | null,
    quantity: number,
  ) => void;
  saveSystem: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  lines: initial.lines,
  restoredFromSave: initial.restored,

  setQuantity: (productId, variantId, quantity) => {
    const nextQty = Math.max(0, quantity);

    set((state) => {
      const index = state.lines.findIndex(
        (line) => line.productId === productId && line.variantId === variantId,
      );

      if (nextQty === 0) {
        if (index === -1) return state;
        return { lines: state.lines.filter((_, i) => i !== index) };
      }

      if (index === -1) {
        return {
          lines: [...state.lines, { productId, variantId, quantity: nextQty }],
        };
      }

      return {
        lines: state.lines.map((line, i) =>
          i === index ? { ...line, quantity: nextQty } : line,
        ),
      };
    });
  },

  saveSystem: () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ lines: get().lines, savedAt: Date.now() }),
    );
  },
}));

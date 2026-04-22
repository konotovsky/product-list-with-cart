import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Product } from "@/components/ProductCard";

interface ProductsStoreState {
  products: Product[];

  setProducts: (products: Product[]) => void;
}

export const useProductsStore = create<ProductsStoreState>()(
  immer((set) => ({
    products: [],

    setProducts: (products) =>
      set((state) => {
        state.products = products;
      }),
  })),
);

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import type { Product } from "@/components/ProductCard";

interface ProductCartItem extends Pick<Product, "name" | "price"> {
  quantity: number;
}

interface ProductCartStoreState {
  cart: ProductCartItem[];

  addToCart: (product: Pick<Product, "name" | "price">) => void;
  increaseQuantity: (name: string) => void;
  decreaseQuantity: (name: string) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
}

export const useProductCart = create<ProductCartStoreState>()(
  persist(
    immer((set) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((p) => p.name === product.name);

          if (existing) {
            existing.quantity += 1;
          } else {
            state.cart.push({
              name: product.name,
              price: product.price,
              quantity: 1,
            });
          }
        }),
      increaseQuantity: (name) =>
        set((state) => {
          const item = state.cart.find((p) => p.name === name);
          if (item) item.quantity += 1;
        }),

      decreaseQuantity: (name) =>
        set((state) => {
          const item = state.cart.find((p) => p.name === name);
          if (!item) return;

          if (item.quantity === 1) {
            state.cart = state.cart.filter((p) => p.name !== name);
          } else {
            item.quantity -= 1;
          }
        }),
      removeFromCart: (name) =>
        set((state) => {
          state.cart = state.cart.filter((p) => p.name !== name);
        }),
      clearCart: () =>
        set((state) => {
          state.cart = [];
        }),
    })),
    {
      name: "product-list-with-cart",
    },
  ),
);

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Product } from "@/components/ProductCard";

interface ProductCartItem extends Pick<Product, "name" | "price"> {
  quantity: number;
}

interface ProductCartStoreState {
  cart: ProductCartItem[];

  addToCart: (product: Product) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
}

export const useProductCart = create<ProductCartStoreState>()(
  immer((set) => ({
    cart: [
      { name: "Waffle with Berries", quantity: 2, price: 3.5 },
      { name: "Vanilla Bean Crème Brûlée", quantity: 4, price: 7 },
    ],

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
    removeFromCart: (name) =>
      set((state) => {
        state.cart = state.cart.filter((p) => p.name !== name);
      }),
    clearCart: () =>
      set((state) => {
        state.cart = [];
      }),
  })),
);

import { ShoppingCart } from "lucide-react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";
import { useProductCart } from "@/stores/productCartStore";

interface AddToCartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  productName: string;
  productPrice: number;
}

function AddToCartButton({
  productName,
  productPrice,
  className,
  ...props
}: AddToCartButtonProps) {
  const cart = useProductCart((state) => state.cart);
  const addToCart = useProductCart((state) => state.addToCart);
  const increase = useProductCart((state) => state.increaseQuantity);
  const decrease = useProductCart((state) => state.decreaseQuantity);
  const quantity =
    cart.find((item) => item.name === productName)?.quantity ?? 0;

  return (
    <button
      onClick={
        quantity === 0
          ? () => addToCart({ name: productName, price: productPrice })
          : undefined
      }
      className={cn(
        "font-red-hat-text inline-flex h-[44px] w-full max-w-[160px] items-center justify-center gap-100 rounded-full p-150 text-sm font-semibold",
        {
          "hover:text-red hover:border-red border border-rose-400 bg-white text-rose-900":
            quantity === 0,
          "bg-red text-white": quantity > 0,
        },
        className,
      )}
      {...props}
    >
      {quantity === 0 ? (
        <>
          <ShoppingCart className="text-red h-auto w-[20px]" />
          Add to Cart
        </>
      ) : (
        <div className="flex w-full items-center justify-between">
          <span
            onClick={(e) => {
              e.stopPropagation();
              decrease(productName);
            }}
            className="hover:text-red inline-flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-white hover:bg-white"
          >
            <Minus />
          </span>
          {quantity}
          <span
            onClick={(e) => {
              e.stopPropagation();
              increase(productName);
            }}
            className="hover:text-red inline-flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-white hover:bg-white"
          >
            <Plus />
          </span>
        </div>
      )}
    </button>
  );
}

export { AddToCartButton };

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

function AddToCartButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const [quantity, setQuantity] = useState(0);

  return (
    <button
      onClick={quantity === 0 ? () => setQuantity(1) : undefined}
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
            onClick={() => setQuantity((quantity) => Math.max(0, quantity - 1))}
            className="hover:text-red inline-flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-white hover:bg-white"
          >
            <Minus />
          </span>
          {quantity}
          <span
            onClick={() => setQuantity((quantity) => quantity + 1)}
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

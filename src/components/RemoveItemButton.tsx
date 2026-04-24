import { X } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

function RemoveItemButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 text-rose-400 hover:border-rose-900 hover:text-rose-900",
        className,
      )}
      {...props}
    >
      <X />
    </button>
  );
}

export { RemoveItemButton };

import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function PrimaryButton({ children, className, ...props }: PrimaryButtonProps) {
  return (
    <button
      className={cn(
        "bg-red font-red-hat-text hover:bg-red/75 inline-flex h-[53px] w-full max-w-[138px] items-center justify-center rounded-full px-300 py-200 text-base font-semibold text-white",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { PrimaryButton };

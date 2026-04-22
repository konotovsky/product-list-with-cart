import { X } from "lucide-react";

function RemoveItemButton() {
  return (
    <button className="inline-flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 text-rose-400 hover:border-rose-900 hover:text-rose-900">
      <X />
    </button>
  );
}

export { RemoveItemButton };

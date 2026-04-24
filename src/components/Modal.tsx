import { PrimaryButton } from "@/components/PrimaryButton";
import { CircleCheck } from "lucide-react";
import { useProductCart } from "@/stores/productCartStore";
import { useProductsStore } from "@/stores/productsStore";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface ModalProps {
  setIsOpen: (value: boolean) => void;
  onConfirm: () => void;
}

function Modal({ setIsOpen, onConfirm }: ModalProps) {
  const cart = useProductCart((state) => state.cart);
  const products = useProductsStore((state) => state.products);
  const total = cart.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex items-end bg-black/50 md:items-center md:justify-center md:p-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setIsOpen(false)}
    >
      <motion.div
        className="flex max-h-[90vh] w-full flex-col gap-400 rounded-t-xl bg-white p-300 pt-500 md:rounded-xl lg:max-w-[592px]"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-300">
          <CircleCheck className="text-green h-[42px] w-[42px]" />
          <div className="font-red-hat-text space-y-100">
            <h1 className="text-[40px] leading-[120%] font-bold text-rose-900">
              Order Confirmed
            </h1>
            <p className="text-rose-500">We hope you enjoy your food!</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden rounded-lg bg-rose-50 p-300">
          <ul className="no-scrollbar flex flex-col gap-200 overflow-y-auto">
            {cart.map((item) => (
              <li key={item.name} className="space-y-200">
                <div className="flex items-center gap-200">
                  <div className="h-[48px] w-[48px] shrink-0 overflow-hidden rounded-sm">
                    <img
                      className="h-full w-full object-cover"
                      src={
                        products.find((product) => product.name === item.name)
                          ?.image.thumbnail
                      }
                      alt={item.name}
                    />
                  </div>
                  <div className="min-w-0 space-y-100">
                    <h3 className="truncate text-sm font-semibold text-rose-900">
                      {item.name}
                    </h3>
                    <p className="flex items-center gap-100">
                      <span className="text-red text-sm font-semibold">
                        {item.quantity}x
                      </span>
                      <span className="text-sm text-rose-500">
                        @ ${item.price.toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <span className="ml-auto font-semibold text-rose-900">
                    {" "}
                    ${(item.quantity * item.price).toFixed(2)}
                  </span>
                </div>
                <hr className="text-rose-100" />
              </li>
            ))}
            <div className="flex items-center justify-between">
              <p className="text-sm text-rose-900">Order Total</p>
              <span className="text-2xl font-bold text-rose-900">
                ${total.toFixed(2)}
              </span>
            </div>
          </ul>
        </div>
        <PrimaryButton onClick={onConfirm} className="max-w-full">
          Start New Order
        </PrimaryButton>
      </motion.div>
    </motion.div>
  );
}

export { Modal };

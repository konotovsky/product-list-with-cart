import illustrationEmptyCart from "@/assets/images/illustration-empty-cart.svg";
import { useProductCart } from "@/stores/productCartStore";
import { RemoveItemButton } from "@/components/RemoveItemButton";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Trees } from "lucide-react";

interface CartProps {
  onClick: () => void;
}

function Cart({ onClick }: CartProps) {
  const cart = useProductCart((state) => state.cart);
  const removeFromCart = useProductCart((state) => state.removeFromCart);
  const total = cart.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  return (
    <div className="space-y-300 rounded-xl bg-white p-300 xl:sticky xl:top-1100">
      <h2 className="text-red text-2xl font-bold">
        Your Cart (
        <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>)
      </h2>
      <div>
        <div className="flex flex-col gap-200">
          {cart.length ? (
            <>
              <ul className="flex flex-col gap-200">
                {cart.map((item) => (
                  <li key={item.name} className="space-y-200">
                    <div className="flex items-center justify-between">
                      <div className="space-y-100">
                        <h3 className="text-sm font-semibold text-rose-900">
                          {item.name}
                        </h3>
                        <p>
                          <span className="text-red text-sm font-semibold">
                            {item.quantity}x
                          </span>
                          <span className="text-sm text-rose-500">
                            {" "}
                            @ ${item.price.toFixed(2)}
                          </span>
                          <span className="text-sm font-semibold text-rose-500">
                            {" "}
                            ${(item.quantity * item.price).toFixed(2)}
                          </span>
                        </p>
                      </div>
                      <RemoveItemButton
                        onClick={() => removeFromCart(item.name)}
                      />
                    </div>
                    <hr className="text-rose-100" />
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <p className="text-sm text-rose-900">Order Total</p>
                <span className="text-2xl font-bold text-rose-900">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-center gap-100 rounded-lg bg-rose-50 p-200">
                <Trees className="text-green h-[20px] w-[20px]" />
                <p className="text-sm text-rose-900">
                  This is a{" "}
                  <span className="font-semibold">carbon-neutral</span> delivery
                </p>
              </div>
              <PrimaryButton onClick={onClick} className="max-w-full">
                Confirm Order
              </PrimaryButton>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-200">
              <img src={illustrationEmptyCart} alt="Empty cart" />
              <p className="text-sm font-semibold text-rose-500">
                Your added items will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { Cart };

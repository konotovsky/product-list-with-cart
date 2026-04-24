import { useState, useEffect } from "react";
import { useProductsStore } from "@/stores/productsStore";
import { ProductList } from "@/components/ProductList";
import { Cart } from "@/components/Cart";
import { Modal } from "@/components/Modal";
import { useProductCart } from "@/stores/productCartStore";
import { AnimatePresence } from "framer-motion";

function App() {
  const products = useProductsStore((state) => state.products);
  const setProducts = useProductsStore((state) => state.setProducts);
  const clearCart = useProductCart((state) => state.clearCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/data.json")
      .then((result) => result.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container mx-auto p-300 md:p-500 xl:py-1100">
      <div className="grid gap-400 xl:grid-cols-[1fr_384px]">
        <main>
          <ProductList products={products} />
        </main>
        <aside>
          <Cart onClick={() => setIsOpen(true)} />
        </aside>
      </div>
      <AnimatePresence>
        {isOpen && (
          <Modal
            setIsOpen={setIsOpen}
            onConfirm={() => {
              clearCart();
              setIsOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export { App };

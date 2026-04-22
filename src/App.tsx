import { useEffect } from "react";
import { useProductsStore } from "@/stores/productsStore";
import { ProductList } from "@/components/ProductList";
import { Cart } from "@/components/Cart";

function App() {
  const products = useProductsStore((state) => state.products);
  const setProducts = useProductsStore((state) => state.setProducts);

  useEffect(() => {
    fetch("/data.json")
      .then((result) => result.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container grid gap-400 p-300">
      <main>
        <ProductList products={products} />
      </main>
      <aside>
        <Cart />
      </aside>
    </div>
  );
}

export { App };

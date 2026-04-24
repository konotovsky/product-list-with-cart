import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/components/ProductCard";

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <>
      <div className="space-y-400">
        <h2 className="text-[40px] leading-[120%] font-bold text-rose-900">
          Desserts
        </h2>
        <div className="grid gap-400 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              image={product.image}
              name={product.name}
              category={product.category}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export { ProductList };

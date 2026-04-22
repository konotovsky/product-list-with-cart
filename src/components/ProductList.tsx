import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/components/ProductCard";

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid gap-300 md:grid-cols-3">
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
  );
}

export { ProductList };

import { AddToCartButton } from "@/components/AddToCartButton";
import { cn } from "@/lib/utils";
import { useProductCart } from "@/stores/productCartStore";

export interface Product {
  image: { thumbnail: string; mobile: string; tablet: string; desktop: string };
  name: string;
  category: string;
  price: number;
}

function ProductCard({ image, name, category, price }: Product) {
  const cart = useProductCart((state) => state.cart);
  const quantity = cart.find((item) => item.name === name)?.quantity ?? 0;

  return (
    <div>
      <div className="relative mb-400">
        <picture>
          <source media="(min-width: 1024px)" srcSet={image.desktop} />
          <source media="(min-width: 768px)" srcSet={image.tablet} />
          <img
            src={image.mobile}
            alt={name}
            className={cn(
              "h-auto w-full rounded-lg border-2 border-transparent",
              { "border-red": quantity > 0 },
            )}
          />
        </picture>
        <AddToCartButton
          productName={name}
          productPrice={price}
          className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="space-y-50">
        <h3 className="text-sm text-rose-500">{category}</h3>
        <h2 className="font-semibold text-rose-900">{name}</h2>
        <p className="text-red font-semibold">${price}</p>
      </div>
    </div>
  );
}

export { ProductCard };

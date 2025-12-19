import { ProductCard } from "./ProductCard";
import { products } from "@/data/products";

export const ProductGrid = () => {
  return (
    <section id="products" className="py-20 relative">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-gradient">Premium PDF Guides</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expertly crafted guides to accelerate your IT career. Instant download after purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

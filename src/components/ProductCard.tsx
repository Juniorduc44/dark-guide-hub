import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  emoji?: string;
}

export const ProductCard = ({ id, title, description, price, image, emoji }: ProductCardProps) => {
  return (
    <div className="group relative bg-card rounded-lg border border-border overflow-hidden card-hover">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title} {emoji}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-primary font-mono">
            ${price.toFixed(2)}
          </span>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow transition-all duration-300 hover:glow-intense"
          >
            <Link to={`/product/${id}`}>
              Buy Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute inset-0 rounded-lg border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-300 pointer-events-none" />
    </div>
  );
};

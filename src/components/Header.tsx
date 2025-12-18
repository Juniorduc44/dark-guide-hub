import { Terminal, ShoppingCart } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Terminal className="h-8 w-8 text-primary animate-pulse-glow rounded" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            <span className="text-gradient">IT</span>
            <span className="text-foreground">Hub</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#products"
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Shop
          </a>
          <a
            href="#about"
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            About
          </a>
          <a
            href="#fulfillment"
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            How It Works
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

import { ChevronDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: "3s" }} />

      <div className="container relative z-10 text-center space-y-8 py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
          <Zap className="h-4 w-4" />
          Premium IT Learning Resources
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className="text-foreground">Level Up Your</span>
          <br />
          <span className="text-gradient">Tech Skills</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Your place for the latest computer knowledge, IT solutions, and tech tips.
          Expert guides on networking, cloud computing, security, and more.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow hover:glow-intense transition-all duration-300 text-lg px-8"
          >
            <a href="#products">
              Browse Guides
              <ChevronDown className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-primary font-mono font-bold">💻</span>
            Computer Basics & Advanced
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-mono font-bold">⚙️</span>
            IT Tricks & Fixes
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-mono font-bold">📱</span>
            Mobile & Software Tips
          </div>
        </div>
      </div>
    </section>
  );
};

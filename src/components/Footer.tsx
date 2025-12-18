import { Terminal, Github, Twitter, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="about" className="py-12 border-t border-border bg-card/50">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">
                <span className="text-gradient">IT</span>Hub
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your place for the latest computer knowledge, IT solutions, and tech tips.
              Quality PDF guides for aspiring IT professionals.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#products" className="hover:text-primary transition-colors">
                  Shop Guides
                </a>
              </li>
              <li>
                <a href="#fulfillment" className="hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="https://pay.zaprite.com/pl_iT3k7W4JRo" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Payment (Zaprite)
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:contact@ithub.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Payments processed securely via Zaprite.
              <br />
              Bitcoin & Lightning accepted.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} IT Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { FulfillmentInfo } from "@/components/FulfillmentInfo";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProductGrid />
        <FulfillmentInfo />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

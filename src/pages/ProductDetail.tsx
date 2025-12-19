import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LightningPaywall } from '@/components/LightningPaywall';
import { products } from '@/data/products';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <Button onClick={() => navigate('/')} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-8 md:py-12">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-8 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <div className="text-4xl mb-2">{product.emoji}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{product.description}</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Price</p>
                <p className="text-3xl font-bold text-primary font-mono">${product.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Instant Download</p>
                  <p className="font-semibold">PDF Guide</p>
                </div>
                <div className="text-2xl">📄</div>
              </div>
            </div>

            <div className="bg-secondary/50 border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                This premium guide will be instantly available for download after payment confirmation via Lightning Network. No email required.
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <LightningPaywall
              productId={product.id}
              productTitle={product.title}
              priceSats={product.priceSats}
              pdfPath={product.pdfPath}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

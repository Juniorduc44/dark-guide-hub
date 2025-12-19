import { useState, useEffect, useRef } from 'react';
import { requestProvider } from 'webln';
import QRCodeGenerator from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Copy, CheckCircle2, Zap } from 'lucide-react';
import { lnbitsService } from '@/services/lnbits';
import { supabase } from '@/services/supabase';

interface LightningPaywallProps {
  productId: string;
  productTitle: string;
  priceSats: number;
  pdfPath: string;
}

export const LightningPaywall = ({
  productId,
  productTitle,
  priceSats,
  pdfPath,
}: LightningPaywallProps) => {
  const [state, setState] = useState<'initial' | 'invoice' | 'checking' | 'paid' | 'error'>('initial');
  const [invoice, setInvoice] = useState<{ paymentRequest: string; paymentHash: string } | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const pollIntervalRef = useRef<number | null>(null);
  const sessionIdRef = useRef<string>(crypto.getRandomUUID());

  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  const createAndCheckInvoice = async () => {
    setState('initial');
    setError('');

    try {
      const inv = await lnbitsService.createInvoice(
        priceSats,
        `Dark Guide Hub - ${productTitle}`
      );

      await supabase.from('purchases').insert({
        payment_hash: inv.payment_hash,
        product_id: productId,
        product_title: productTitle,
        amount_sats: priceSats,
        session_id: sessionIdRef.current,
        verified: false,
      });

      setInvoice(inv);

      try {
        const qrUrl = await QRCodeGenerator.toDataURL(inv.payment_request);
        setQrDataUrl(qrUrl);
      } catch (qrErr) {
        console.error('QR generation failed:', qrErr);
      }

      setState('invoice');

      try {
        const webln = await requestProvider();
        setState('checking');
        await webln.sendPayment(inv.payment_request);
        pollForPayment(inv.payment_hash);
      } catch {
        pollForPayment(inv.payment_hash);
      }
    } catch (err) {
      setError((err as Error).message || 'Failed to create invoice');
      setState('error');
    }
  };

  const pollForPayment = (paymentHash: string) => {
    setState('checking');

    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }

    let attempts = 0;
    const maxAttempts = 200;

    pollIntervalRef.current = window.setInterval(async () => {
      attempts++;

      try {
        const payment = await lnbitsService.checkPayment(paymentHash);

        if (payment.paid) {
          await supabase
            .from('purchases')
            .update({ verified: true })
            .eq('payment_hash', paymentHash);

          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
          }
          setState('paid');
          return;
        }
      } catch {
        // Silent retry
      }

      if (attempts >= maxAttempts) {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
        setState('error');
        setError('Invoice expired. Please try again.');
      }
    }, 3000);

    setTimeout(() => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
      if (state === 'checking') {
        setState('error');
        setError('Payment verification timeout. Please try again.');
      }
    }, 600000);
  };

  const copyToClipboard = () => {
    if (invoice?.paymentRequest) {
      navigator.clipboard.writeText(invoice.paymentRequest);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (state === 'paid') {
    return (
      <Card className="bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Payment Received!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-muted-foreground">Your purchase is confirmed. Download your guide now.</p>
          <a href={pdfPath} download={`${productTitle}.pdf`}>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto px-8 py-2 glow transition-all duration-300 hover:glow-intense">
              <Zap className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </a>
        </CardContent>
      </Card>
    );
  }

  if (state === 'invoice' || state === 'checking') {
    return (
      <Card className="bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle>Pay {priceSats.toLocaleString()} sats</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="my-6 flex justify-center p-4 bg-secondary rounded-lg">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Payment QR Code" className="w-64 h-64" />
            ) : (
              <div className="w-64 h-64 bg-muted animate-pulse rounded" />
            )}
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Payment Request (click to copy):</p>
            <div
              onClick={copyToClipboard}
              className="p-3 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors text-xs break-all font-mono text-foreground"
            >
              {invoice?.paymentRequest}
              {copied && <span className="ml-2 text-green-500">Copied!</span>}
            </div>
          </div>

          {state === 'checking' && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-transparent border-t-primary" />
                <span className="text-sm">Confirming payment...</span>
              </div>
            </div>
          )}

          <p className="text-sm text-muted-foreground">
            Scan with any Lightning wallet (Alby, Wallet of Satoshi, etc.) or click the pay button if you have a WebLN wallet extension.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (state === 'error') {
    return (
      <Card className="bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle>Payment Error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button
            onClick={createAndCheckInvoice}
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card text-card-foreground border-border">
      <CardHeader>
        <CardTitle>Unlock the Full Guide</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{productTitle}</h3>
          <p className="text-3xl font-bold text-primary font-mono">{priceSats.toLocaleString()} sats</p>
          <p className="text-sm text-muted-foreground">≈ $0.02 USD (varies with BTC price)</p>
        </div>

        <Button
          onClick={createAndCheckInvoice}
          className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 w-full px-8 py-2 glow transition-all duration-300 hover:glow-intense text-base"
        >
          <Zap className="mr-2 h-4 w-4" />
          Pay with Lightning
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <p className="text-xs text-muted-foreground">
          Best experience with Alby WebLN wallet. Fallback QR code accepts any Lightning wallet.
        </p>
      </CardContent>
    </Card>
  );
};

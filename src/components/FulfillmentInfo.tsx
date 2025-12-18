import { Zap, Mail, FileText, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Purchase Guide",
    description: "Select your PDF guide and complete payment via Zaprite (Bitcoin/Lightning accepted).",
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Zaprite webhook triggers automatically when payment is confirmed.",
  },
  {
    icon: Mail,
    title: "Email Delivery",
    description: "Zapier catches the webhook, extracts your email, and sends your PDF attachment.",
  },
  {
    icon: CheckCircle2,
    title: "Start Learning",
    description: "Check your inbox for the customized email with your PDF guide attached.",
  },
];

export const FulfillmentInfo = () => {
  return (
    <section id="fulfillment" className="py-20 relative bg-secondary/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-gradient">How It Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Automated PDF delivery via Zaprite webhooks and Zapier integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-card border border-border rounded-lg p-6 h-full card-hover">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-card border border-border rounded-lg max-w-3xl mx-auto">
          <h3 className="font-semibold text-lg mb-3 text-center text-primary">Fulfillment Setup Notes</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Zaprite Webhooks:</strong> Configure "Order Paid" webhook in Zaprite dashboard</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Zapier Integration:</strong> Create Zap with "Catch Hook" trigger → parse buyer email</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>PDF Hosting:</strong> Host PDFs on Google Drive or Dropbox with shareable links</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Email Action:</strong> Use Zapier's email action with PDF attachment or download link</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

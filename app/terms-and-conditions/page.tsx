import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Server,
  ShoppingCart,
  Copyright,
  Ban,
  Lock,
  AlertTriangle,
  Scaling,
  Shield,
  RefreshCw,
  XCircle,
  Link as LinkIcon,
  Gavel,
  Wrench,
  Mail,
  FileCheck2,
  BookUser,
} from "lucide-react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Terms and Conditions - Calqulate",
  description: "Terms and Conditions for Calqulate’s calculators, tools, and services.",
  keywords: "terms, terms and conditions, terms of service, Calqulate",
};

// Reusable Section Header Component
const SectionHeader = ({ id, title, icon: Icon }: { id: string; title: string; icon: React.ElementType }) => (
  <h2 id={id} className="flex items-center gap-3 text-2xl font-bold mb-6 pt-8" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}>
    <Icon className="w-8 h-8 text-primary" />
    {title}
  </h2>
);

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}>
      <Header />

      <main className="flex-1 bg-gray-50/50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}>
                Terms & Conditions
              </h1>
              <p className="text-muted-foreground text-lg" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}>
                Last updated: September 24, 2025
              </p>
               <p className="text-sm mt-2">
                Contact: <a href="mailto:shreerise@gmail.com" className="underline text-primary">shreerise@gmail.com</a> 
                {" "}or use our <a href="/contact-us" className="underline text-primary">Contact Us</a> form.
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-10">
              
              <SectionHeader id="intro" title="1. Introduction / Agreement to Terms" icon={FileText} />
              <Card className="border-l-4 border-primary rounded-lg">
                <CardContent className="p-6 text-lg leading-relaxed">
                  <p>
                    Welcome to <strong>Calqulate</strong> ("we", "us", "our"). These Terms & Conditions ("Terms") define how you can access and use our website, calculators, tools, and related services (collectively, the "Site" or "Services"). Accessing this Site or requesting custom services signifies acceptance of these Terms.
                  </p>
                </CardContent>
              </Card>

              <SectionHeader id="services" title="2. Our Services" icon={Server} />
              <Card className="rounded-lg">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2.1 Free Calculators</h3>
                    <p className="text-lg leading-relaxed">All calculators on Calqulate are free to access without login or fees.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2.2 Custom Calculator & Development Services</h3>
                    <p className="text-lg leading-relaxed">
                      We offer custom calculator development for entrepreneurs or organizations. Contact us via email at <a href="mailto:shreerise@gmail.com" className="text-primary hover:underline">shreerise@gmail.com</a> or through our <a href="/contact-us" className="text-primary hover:underline">Contact Us</a> page.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2.3 Product Description</h3>
                    <p className="text-lg leading-relaxed">Features, timelines, and specific terms for custom services are defined in each written proposal or agreement.</p>
                  </div>
                </CardContent>
              </Card>

              <SectionHeader id="orders" title="3. Custom Services Orders, Quotes & Remit" icon={ShoppingCart} />
              <Card className="rounded-lg">
                <CardContent className="p-6 text-lg leading-relaxed">
                  <p className="mb-4">Requests begin with a quote inquiry via email or contact form. A binding agreement is only formed once both parties sign off in writing.</p>
                  <ul className="list-disc list-inside space-y-2 marker:text-primary">
                    <li><strong>Payment:</strong> Fees and payment terms are included in written proposals.</li>
                    <li><strong>Cancellations/Refunds:</strong> Terms are specified in each contract.</li>
                  </ul>
                </CardContent>
              </Card>
              
              <SectionHeader id="ip" title="4. Intellectual Property" icon={Copyright} />
              <Card className="rounded-lg">
                <CardContent className="p-6 text-lg leading-relaxed">
                   <ul className="list-disc list-inside space-y-3 marker:text-primary">
                    <li><strong>Our Ownership:</strong> All rights to the Site, design, source code, and calculators remain with Calqulate.</li>
                    <li><strong>Your Content/Data:</strong> You own your data but grant us rights to use it solely to deliver services.</li>
                    <li><strong>Deliverables:</strong> Licensing and reuse of non-confidential components may be specified in contracts.</li>
                  </ul>
                </CardContent>
              </Card>

              <SectionHeader id="conduct" title="5. User Conduct & Acceptable Use" icon={Ban} />
              <Card className="rounded-lg">
                <CardContent className="p-6 text-lg leading-relaxed">
                  <p className="mb-4">You agree not to:</p>
                  <ul className="list-disc list-inside space-y-2 marker:text-primary">
                    <li>Violate laws or regulations.</li>
                    <li>Upload harmful code or viruses.</li>
                    <li>Exploit or resell our logic and algorithms unlawfully.</li>
                    <li>Use calculators in high-risk scenarios where errors could cause harm.</li>
                  </ul>
                </CardContent>
              </Card>

              <SectionHeader id="privacy" title="6. Privacy and Data" icon={Lock} />
              <Card className="border-l-4 border-primary rounded-lg">
                <CardContent className="p-6 text-lg leading-relaxed">
                  <p>We collect minimal data needed to provide services. See our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> for full details.</p>
                </CardContent>
              </Card>

              <SectionHeader id="disclaimer" title="7. Disclaimers — No Warranty" icon={AlertTriangle} />
              <Card className="rounded-lg bg-amber-50 border-amber-200">
                <CardContent className="p-6 text-lg leading-relaxed">
                  <ul className="list-disc list-inside space-y-2 marker:text-amber-500">
                    <li>No guarantee of 100% accuracy in calculator results.</li>
                    <li>Not professional advice in finance, law, medicine, etc.</li>
                    <li>All services are provided “as-is” with no implied warranties.</li>
                  </ul>
                </CardContent>
              </Card>

              <SectionHeader id="liability" title="8. Limit on Responsibility" icon={Scaling} />
              <Card className="rounded-lg">
                <CardContent className="p-6 text-lg leading-relaxed">
                  <p>Calqulate is not liable for indirect, incidental, or consequential damages. Liability is limited to fees paid (if any) in the 12 months before a claim.</p>
                </CardContent>
              </Card>

              <SectionHeader id="indemnification" title="9. Indemnification" icon={Shield} />
              <Card className="rounded-lg">
                <CardContent className="p-6 text-lg leading-relaxed">
                  <p>You agree to indemnify and hold harmless Calqulate and its team from claims or damages resulting from violations of these Terms or misuse of the Site.</p>
                </CardContent>
              </Card>

              <SectionHeader id="changes" title="10. Changes to Site and Terms" icon={RefreshCw} />
              <Card className="rounded-lg">
                <CardContent className="p-6 text-lg leading-relaxed">
                  <p>We may revise these Terms at any time. Updates will be posted here with an updated "Last updated" date.</p>
                </CardContent>
              </Card>

              <SectionHeader id="termination" title="11. Ending" icon={XCircle} />
              <Card className="rounded-lg">
                <CardContent className="p-6 text-lg leading-relaxed">
                  <p>We may terminate or suspend access at any time. Provisions regarding intellectual property, disclaimers, liability, and indemnification survive termination.</p>
                </CardContent>
              </Card>

              <SectionHeader id="thirdparty" title="12. Third-Party Links and Services" icon={LinkIcon} />
              <Card className="rounded-lg">
                <CardContent className="p-6 text-lg leading-relaxed">
                  <p>External sites may have their own policies. We are not responsible for third-party content or practices.</p>
                </CardContent>
              </Card>

              <SectionHeader id="law" title="13. Governing Law & Dispute Resolution" icon={Gavel} />
              <Card className="rounded-lg">
                <CardContent className="p-6 text-lg leading-relaxed">
                  <p>These Terms are governed by applicable local laws. Disputes are resolved in courts of our location, unless otherwise agreed in writing.</p>
                </CardContent>
              </Card>

              <SectionHeader id="modifications" title="14. Product Statement & Calculator Modifications" icon={Wrench} />
              <Card className="rounded-lg">
                <CardContent className="p-6 text-lg leading-relaxed">
                  <p>We may modify calculators or features at any time. Marketing terms like “fast” or “easy” are not guarantees of performance.</p>
                </CardContent>
              </Card>

              <SectionHeader id="contact" title="15. Contact & Notices" icon={Mail} />
              <Card className="rounded-lg">
                <CardContent className="p-6 text-lg leading-relaxed">
                  <p>
                    For questions or notices, contact us at: <br />
                    <strong>Email:</strong> <a href="mailto:shreerise@gmail.com" className="text-primary hover:underline">shreerise@gmail.com</a> <br />
                    <strong>Contact Form:</strong> <a href="/contact-us" className="text-primary hover:underline">Contact Us</a>
                  </p>
                </CardContent>
              </Card>

              <SectionHeader id="agreement" title="16. Complete Agreement" icon={FileCheck2} />
              <Card className="rounded-lg">
                <CardContent className="p-6 text-lg leading-relaxed">
                  <p>These Terms, along with any written agreements, represent the entire understanding between you and Calqulate.</p>
                </CardContent>
              </Card>

              <SectionHeader id="legal" title="17. Legal Advice" icon={BookUser} />
              <Card className="rounded-lg">
                <CardContent className="p-6 text-lg leading-relaxed">
                  <p>These Terms are provided as a model. Please seek legal advice to ensure compliance with local laws, especially regarding payment, intellectual property, and consumer protection.</p>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

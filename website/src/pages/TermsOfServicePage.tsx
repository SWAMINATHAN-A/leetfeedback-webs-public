import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { DockDemo } from '../components/DockDemo';

const TermsOfServicePage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service for Traverse</h1>
            <p className="text-muted-foreground mb-8">Effective Date: January 1, 2025</p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Agreement to Terms</h2>
              <p className="text-foreground mb-4">
                Welcome to Traverse (the "Service"), provided by Traverse ("we," "us," or "our"). 
                These Terms of Service ("Terms") govern your access to and use of our website, applications, and services.
              </p>
              <p className="text-foreground mb-4">
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part 
                of the terms, then you may not access the Service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Use of Our Service</h2>
              <p className="text-foreground mb-4">
                We grant you a limited, non-exclusive, non-transferable, and revocable license to use our Service 
                for your personal, non-commercial purposes, subject to these Terms.
              </p>
              <p className="text-foreground mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 mb-4 text-foreground">
                <li>Use the Service for any illegal or unauthorized purpose.</li>
                <li>Modify, adapt, hack, or reverse-engineer the Service.</li>
                <li>Introduce any viruses, worms, trojan horses, or other malicious code to the Service.</li>
                <li>Attempt to gain unauthorized access to our systems or networks.</li>
                <li>Scrape, crawl, or otherwise collect data from the Service without our express written permission.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Intellectual Property</h2>
              <p className="text-foreground mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive 
                property of Traverse and its licensors. Our trademarks and trade dress may not be used in 
                connection with any product or service without our prior written consent.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. No User-Generated Content</h2>
              <p className="text-foreground mb-4">
                Our service does not allow users to post, link, store, share, or otherwise make available any content. 
                As such, you are not permitted to upload or transmit any information to the Service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Termination</h2>
              <p className="text-foreground mb-4">
                We may terminate or suspend your access to our Service immediately, without prior notice or liability, 
                for any reason whatsoever, including, without limitation, if you breach the Terms. Upon termination, 
                your right to use the Service will immediately cease.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Disclaimer of Warranties; Limitation of Liability</h2>
              <p className="text-foreground mb-4">
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Your use of the Service is at your 
                sole risk. The Service is provided without warranties of any kind, whether express or implied, 
                including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, 
                non-infringement, or course of performance.
              </p>
              <p className="text-foreground mb-4">
                In no event shall Traverse, nor its directors, employees, partners, or agents, be liable for any 
                indirect, incidental, special, consequential, or punitive damages, including without limitation, 
                loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or 
                use of or inability to access or use the Service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Governing Law</h2>
              <p className="text-foreground mb-4">
                These Terms shall be governed and construed in accordance with the laws of the United States, 
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Changes to Terms</h2>
              <p className="text-foreground mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                We will provide notice of any changes by posting the new Terms on this page. By continuing to 
                access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Contact Us</h2>
              <p className="text-foreground mb-4">
                If you have any questions about these Terms, you can contact us at:
              </p>
              <div className="bg-muted/10 p-4 rounded-lg border border-border">
                <p className="text-foreground mb-2">
                  <strong>Discord Server:</strong>{' '}
                  <a 
                    href="https://discord.gg/BZDb22gz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 underline"
                  >
                    https://discord.gg/BZDb22gz
                  </a>
                </p>
                <p className="text-muted-foreground text-sm">
                  Join our Discord community for support and updates.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <DockDemo />
    </>
  );
};

export default TermsOfServicePage; 
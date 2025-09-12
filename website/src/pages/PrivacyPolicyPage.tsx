import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { DockDemo } from '../components/DockDemo';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy for Traverse</h1>
            <p className="text-muted-foreground mb-8">Effective Date: January 1, 2025</p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Our Commitment to Privacy</h2>
              <p className="text-foreground mb-4">
                Welcome to Traverse ("we," "us," or "our"). We are committed to protecting your privacy. 
                This Privacy Policy is designed to be as simple as possible because our approach is simple: 
                <strong> we do not collect, store, share, or process any of your personal data.</strong>
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. No Personal Data Collection</h2>
              <p className="text-foreground mb-4">
                We do not require you to provide any personal information to use our service. We do not collect, 
                log, or store any information that can be used to personally identify you, such as:
              </p>
              <ul className="list-disc pl-6 mb-4 text-foreground">
                <li>Name</li>
                <li>Email address</li>
                <li>Physical address</li>
                <li>Phone number</li>
                <li>IP address</li>
                <li>Geolocation data</li>
                <li>Device identifiers</li>
              </ul>
              <p className="text-foreground mb-4">
                Since we do not collect your personal data, we have no data to sell, share with third parties, 
                or use for advertising purposes. We cannot provide your data to law enforcement because we do not have it.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Non-Personal / Anonymous Information</h2>
              <p className="text-foreground mb-4">
                To improve our service and understand how it is used, we may collect a minimal amount of anonymous, 
                non-personal information. This information cannot be linked back to an individual user. This may include:
              </p>
              <ul className="list-disc pl-6 mb-4 text-foreground">
                <li>Aggregated usage statistics (e.g., number of visits)</li>
                <li>General browser type or operating system (e.g., "Desktop Firefox" or "Mobile Safari")</li>
              </ul>
              <p className="text-foreground mb-4">
                This information helps us maintain and improve the service's functionality and performance.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Cookies</h2>
              <p className="text-foreground mb-4">
                Our service does not use cookies for tracking, advertising, or collecting personal information. 
                We may use essential, temporary cookies (session cookies) that are required for the basic functionality 
                of the website, which are deleted when you close your browser.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Third-Party Links</h2>
              <p className="text-foreground mb-4">
                Our service may contain links to other websites or services that are not operated by us. 
                If you click on a third-party link, you will be directed to that third party's site. 
                We strongly advise you to review the Privacy Policy of every site you visit. We have no control 
                over and assume no responsibility for the content, privacy policies, or practices of any 
                third-party sites or services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Children's Privacy</h2>
              <p className="text-foreground mb-4">
                Our service does not address anyone under the age of 13. As we do not collect personal information, 
                we do not knowingly collect it from children.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Changes to This Privacy Policy</h2>
              <p className="text-foreground mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically 
                for any changes.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Contact Us</h2>
              <p className="text-foreground mb-4">
                If you have any questions about this Privacy Policy, you can contact us at:
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

export default PrivacyPolicyPage; 
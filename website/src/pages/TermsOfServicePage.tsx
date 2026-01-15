import React from "react";
import Footer from "../components/Footer";
import { PolicyNavbar } from "../components/PolicyNavbar";

const sections = [
  { id: "agreement", title: "Agreement" },
  { id: "use-license", title: "Use License" },
  { id: "user-accounts", title: "User Accounts" },
  { id: "user-responsibilities", title: "Responsibilities" },
  { id: "prohibited-conduct", title: "Prohibited Conduct" },
  { id: "intellectual-property", title: "IP Rights" },
  { id: "user-content", title: "User Content" },
  { id: "recruiter-terms", title: "Recruiter Terms" },
  { id: "integrity-enforcement", title: "Integrity" },
  { id: "subscriptions", title: "Subscriptions" },
  { id: "limitation-liability", title: "Liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "disclaimer", title: "Disclaimers" },
  { id: "termination", title: "Termination" },
  { id: "modifications", title: "Modifications" },
  { id: "governing-law", title: "Governing Law" },
  { id: "contact", title: "Contact" },
];

const TermsOfServicePage: React.FC = () => {
  return (
    <>
      <PolicyNavbar sections={sections} />
      <main className="min-h-screen bg-background">
        <div className="container lg:pl-80 py-16">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold mb-4 text-foreground">
                Terms of Service
              </h1>
              <p className="text-muted-foreground">
                Effective Date: January 1, 2025
              </p>
              <p className="text-muted-foreground">
                Last Updated: January 15, 2026
              </p>
            </div>
          </div>
        </div>

        <div className="container lg:pl-80 pb-16">
          <div className="space-y-8">
            {/* 1. Agreement to Terms */}
            <section id="agreement" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                1. Agreement to Terms
              </h2>
              <p className="text-foreground leading-relaxed">
                By accessing and using LeetFeedback ("Platform"), you accept and
                agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use
                this service. We reserve the right to modify these Terms of
                Service at any time without notice.
              </p>
              <p className="text-foreground leading-relaxed">
                Your continued use of the Platform following the posting of
                revised Terms means you accept and agree to the changes.
              </p>
            </section>

            {/* 2. Use License */}
            <section id="use-license" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                2. Use License
              </h2>
              <p className="text-foreground leading-relaxed">
                Permission is granted to temporarily download one copy of the
                materials (information or software) on LeetFeedback for
                personal, non-commercial transitory viewing only. This is the
                grant of a license, not a transfer of title, and under this
                license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li>Modifying or copying the materials</li>
                <li>
                  Using the materials for any commercial purpose or for any
                  public display
                </li>
                <li>
                  Attempting to decompile or reverse engineer any software
                  contained on the Platform
                </li>
                <li>
                  Removing any copyright or other proprietary notations from the
                  materials
                </li>
                <li>
                  Transferring the materials to another person or "mirroring"
                  the materials on any other server
                </li>
                <li>Violating any applicable laws or regulations</li>
              </ul>
            </section>

            {/* 3. User Accounts */}
            <section id="user-accounts" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                3. User Accounts
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    3.1 Account Creation
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    To use certain features of LeetFeedback, you must create an
                    account. You agree to provide accurate, current, and
                    complete information during registration and to update such
                    information to keep it accurate, current, and complete.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    3.2 Account Security
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    You are responsible for maintaining the confidentiality of
                    your account credentials and password. You agree to accept
                    responsibility for all activities that occur under your
                    account. You agree to notify us immediately of any
                    unauthorized use of your account or any other breach of
                    security.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    3.3 Age Requirement
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    By creating an account, you represent that you are at least
                    13 years of age. If you are under 18, you represent that you
                    have obtained parental or guardian consent to use the
                    Platform.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. User Responsibilities */}
            <section id="user-responsibilities" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                4. User Responsibilities
              </h2>
              <p className="text-foreground leading-relaxed">
                You agree to use the Platform only for lawful purposes and in a
                way that does not infringe upon the rights of others or restrict
                their use and enjoyment of the Platform. You are solely
                responsible for the quality and legality of any content you
                submit to the Platform.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li>Complete problems accurately and honestly</li>
                <li>Not use unfair means or cheat in any form</li>
                <li>Respect the intellectual property rights of others</li>
                <li>Follow guidelines for social features (Friend Requests, Streaks)</li>
                <li>Engage respectfully with other users</li>
                <li>Maintain the integrity and security of your account</li>
              </ul>
            </section>

            {/* 5. Prohibited Conduct */}
            <section id="prohibited-conduct" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                5. Prohibited Conduct
              </h2>
              <p className="text-foreground leading-relaxed">
                You agree not to engage in any of the following prohibited
                conduct:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li>
                  <strong>Cheating/Unfair Means:</strong> Using external
                  solutions, automated tools, or copying code from other sources
                  without attribution
                </li>
                <li>
                  <strong>Plagiarism:</strong> Submitting code or content that
                  belongs to others
                </li>
                <li>
                  <strong>Harassment:</strong> Harassing, threatening, or
                  abusing other users
                </li>
                <li>
                  <strong>System Abuse:</strong> Attempting to gain unauthorized
                  access or disrupt the Platform
                </li>
                <li>
                  <strong>Spam:</strong> Posting spam, advertisements, or
                  promotional content
                </li>
                <li>
                  <strong>Malicious Activity:</strong> Uploading viruses,
                  malware, or any malicious code
                </li>
                <li>
                  <strong>Account Sharing:</strong> Sharing your account
                  credentials or subscription access with others
                </li>
                <li>
                  <strong>Data Mining/Extraction:</strong> Attempting to scrape, extract, or
                  automate the collection of data or source code from the Platform
                  using unauthorized tools or browser extensions
                </li>
              </ul>
            </section>

            {/* 6. Intellectual Property Rights */}
            <section id="intellectual-property" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                6. Intellectual Property Rights
              </h2>
              <p className="text-foreground leading-relaxed">
                All content on LeetFeedback, including but not limited to text,
                graphics, logos, images, audio clips, video clips, digital
                downloads, data compilations, and software, is the property of
                LeetFeedback or its content suppliers and is protected by
                international copyright laws.
              </p>
              <p className="text-foreground leading-relaxed">
                You may not reproduce, republish, distribute, or transmit any
                content from the Platform without prior written permission from
                LeetFeedback or the copyright holder.
              </p>
            </section>

            {/* 7. User-Generated Content */}
            <section id="user-content" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                7. User-Generated Content
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    7.1 Your Content Rights
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    You retain all rights to any content you submit to the
                    Platform. By submitting content, you grant LeetFeedback a
                    worldwide, non-exclusive, royalty-free license to use your
                    content solely for improving and operating the Platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    7.2 No Harmful Content
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    You agree not to submit any content that is illegal,
                    offensive, defamatory, infringing, or violates any
                    third-party rights. We reserve the right to remove such
                    content at any time.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Recruiter Platform Terms */}
            <section id="recruiter-terms" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                8. Recruiter Platform Terms
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    8.1 Data Visibility
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    If you opt into the recruiter analytics platform, recruiters
                    may see anonymized aggregate data about your performance.
                    You can opt-out at any time in your account settings.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    8.2 Recruiter Conduct
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Recruiters using our platform agree to use the data only for
                    legitimate hiring purposes and to respect user privacy. They
                    may not share, sell, or misuse any data obtained from the
                    Platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    8.3 Communication
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Communication between recruiters and students is handled
                    anonymously through our platform unless you choose to reveal
                    your identity. We are not responsible for communications
                    conducted outside our platform.
                  </p>
                </div>
              </div>
            </section>

            {/* 9. Integrity & Enforcement */}
            <section id="integrity-enforcement" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                9. Integrity & Enforcement
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    9.1 AI Monitoring
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    We use AI and machine learning to detect unfair means and
                    maintain platform integrity. Our systems analyze submission
                    patterns, code similarities, and behavioral anomalies.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    9.2 Enforcement Actions
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    If we detect violations of these Terms, we may:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    <li>Issue a warning or notification</li>
                    <li>Temporarily suspend your account</li>
                    <li>Permanently terminate your account</li>
                    <li>
                      Report violations to relevant authorities if required by
                      law
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    9.3 Right to Appeal
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    If we flag your account for violations, you have the right
                    to appeal within 14 days. You can provide context, request
                    human review, or present evidence to dispute the allegation.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    9.4 Confidentiality
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Integrity investigation findings are kept confidential and
                    disclosed only as required by law or as part of legal
                    proceedings.
                  </p>
                </div>
              </div>
            </section>

            {/* 10. Subscriptions and Payments */}
            <section id="subscriptions" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                10. Subscriptions and Payments
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    10.1 Subscription Plans
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    We offer various subscription plans for premium features.
                    By subscribing, you agree to pay the fees associated with
                    your chosen plan.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    10.2 Billing and Payments
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Payments are processed through <strong>Razorpay</strong>.
                    You must provide accurate billing information. Subscriptions
                    automatically renew unless cancelled at least 24 hours before
                    the end of the current period.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    10.3 Refunds
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Unless required by law, subscription fees are non-refundable.
                    If you believe you have been charged in error, please contact
                    our support team immediately.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    10.4 Cancellation
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    You can cancel your subscription at any time through your
                    account settings. Cancellation will take effect at the end
                    of the current billing cycle.
                  </p>
                </div>
              </div>
            </section>

            {/* 11. Limitation of Liability */}
            <section id="limitation-liability" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                11. Limitation of Liability
              </h2>
              <p className="text-foreground leading-relaxed">
                IN NO EVENT SHALL LEETFEEDBACK, ITS DIRECTORS, EMPLOYEES, OR
                AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, EVEN
                IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p className="text-foreground leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, LEETFEEDBACK SHALL NOT
                BE LIABLE FOR ANY DAMAGES EXCEEDING THE TOTAL AMOUNT PAID BY YOU
                TO LEETFEEDBACK IN THE 12 MONTHS PRECEDING THE CLAIM.
              </p>
            </section>

            {/* 12. Indemnification */}
            <section id="indemnification" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                12. Indemnification
              </h2>
              <p className="text-foreground leading-relaxed">
                You agree to indemnify and hold harmless LeetFeedback, its
                directors, employees, and agents from any claim, demand, loss,
                liability, or expense (including reasonable attorneys' fees)
                arising out of or related to: (a) your use of the Platform; (b)
                your violation of these Terms; (c) your violation of any law or
                the rights of a third party; or (d) any content you submit.
              </p>
            </section>

            {/* 13. Disclaimers */}
            <section id="disclaimer" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                13. Disclaimers
              </h2>
              <p className="text-foreground leading-relaxed">
                THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY
                WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED. LEETFEEDBACK
                DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO THE
                IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className="text-foreground leading-relaxed">
                LEETFEEDBACK DOES NOT GUARANTEE THAT THE PLATFORM WILL BE
                ERROR-FREE, UNINTERRUPTED, OR SECURE.
              </p>
            </section>

            {/* 14. Termination */}
            <section id="termination" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                14. Termination
              </h2>
              <p className="text-foreground leading-relaxed">
                LeetFeedback reserves the right to terminate or suspend your
                account and access to the Platform at any time, for any reason,
                with or without notice, including if you violate these Terms.
              </p>
              <p className="text-foreground leading-relaxed">
                Upon termination, your right to use the Platform immediately
                ceases. LeetFeedback is not liable for any consequences of
                termination, including loss of data.
              </p>
            </section>

            {/* 15. Modifications to Service */}
            <section id="modifications" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                15. Modifications to Service
              </h2>
              <p className="text-foreground leading-relaxed">
                LeetFeedback reserves the right to modify or discontinue the
                Platform (or any part thereof) at any time, with or without
                notice. We will not be liable to you or any third party for any
                modification, suspension, or discontinuation of the Platform.
              </p>
            </section>

            {/* 16. Governing Law */}
            <section id="governing-law" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                16. Governing Law
              </h2>
              <p className="text-foreground leading-relaxed">
                These Terms of Service are governed by and construed in
                accordance with the laws of [Your Jurisdiction], and you
                irrevocably submit to the exclusive jurisdiction of the courts
                located in [Your Jurisdiction].
              </p>
            </section>

            {/* 17. Contact Us */}
            <section id="contact" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                17. Contact Us
              </h2>
              <p className="text-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className="p-6 bg-muted/10 rounded-lg border border-border space-y-3">
                <p className="text-foreground">
                  <strong>Email:</strong> legal@leetfeedback.com
                </p>
                <p className="text-foreground">
                  <strong>Support:</strong> support@leetfeedback.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsOfServicePage;

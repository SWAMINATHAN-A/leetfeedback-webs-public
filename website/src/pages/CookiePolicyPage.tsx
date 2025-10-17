import React from "react";
import Footer from "../components/Footer";

const CookiePolicyPage: React.FC = () => {
  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold mb-4 text-foreground">
                Cookie Policy
              </h1>
              <p className="text-muted-foreground">
                Effective Date: January 1, 2027
              </p>
              <p className="text-muted-foreground">
                Last Updated: October 17, 2025
              </p>
            </div>

            {/* Table of Contents */}
            <section className="p-8 bg-muted/10 rounded-2xl border border-border">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Table of Contents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ol className="list-decimal pl-6 space-y-2 text-foreground text-sm">
                  <li>
                    <a
                      href="#introduction"
                      className="text-blue-500 hover:underline"
                    >
                      Introduction
                    </a>
                  </li>
                  <li>
                    <a
                      href="#what-are-cookies"
                      className="text-blue-500 hover:underline"
                    >
                      What Are Cookies?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#cookie-types"
                      className="text-blue-500 hover:underline"
                    >
                      Types of Cookies We Use
                    </a>
                  </li>
                  <li>
                    <a
                      href="#essential-cookies"
                      className="text-blue-500 hover:underline"
                    >
                      Essential Cookies
                    </a>
                  </li>
                  <li>
                    <a
                      href="#analytics-cookies"
                      className="text-blue-500 hover:underline"
                    >
                      Analytics Cookies
                    </a>
                  </li>
                </ol>
                <ol
                  className="list-decimal pl-6 space-y-2 text-foreground text-sm"
                  start={6}
                >
                  <li>
                    <a
                      href="#third-party-cookies"
                      className="text-blue-500 hover:underline"
                    >
                      Third-Party Cookies
                    </a>
                  </li>
                  <li>
                    <a
                      href="#cookie-management"
                      className="text-blue-500 hover:underline"
                    >
                      Cookie Management
                    </a>
                  </li>
                  <li>
                    <a
                      href="#your-choices"
                      className="text-blue-500 hover:underline"
                    >
                      Your Choices
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-blue-500 hover:underline"
                    >
                      Contact Us
                    </a>
                  </li>
                </ol>
              </div>
            </section>

            {/* 1. Introduction */}
            <section id="introduction" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                1. Introduction
              </h2>
              <p className="text-foreground leading-relaxed">
                This Cookie Policy explains how LeetFeedback ("we," "us," "our,"
                or "Platform") uses cookies and similar technologies when you
                access and use our website and applications. We are committed to
                transparency about how we collect and use information.
              </p>
              <p className="text-foreground leading-relaxed">
                By continuing to use LeetFeedback, you consent to our use of
                cookies as described in this Policy. If you do not agree with
                our cookie practices, you can disable cookies through your
                browser settings.
              </p>
            </section>

            {/* 2. What Are Cookies */}
            <section id="what-are-cookies" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                2. What Are Cookies?
              </h2>
              <p className="text-foreground leading-relaxed">
                Cookies are small text files that are stored on your device
                (computer, tablet, or mobile phone) when you visit a website.
                They contain information about your visit and are sent back to
                the website each time you return.
              </p>
              <p className="text-foreground leading-relaxed">
                Similar technologies include web beacons, pixel tags, and local
                storage, which work in similar ways to cookies. These
                technologies help us remember your preferences, analyze how you
                use our Platform, and enhance your user experience.
              </p>
            </section>

            {/* 3. Types of Cookies We Use */}
            <section id="cookie-types" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                3. Types of Cookies We Use
              </h2>
              <p className="text-foreground leading-relaxed">
                We use the following categories of cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li>
                  <strong>Essential Cookies:</strong> Required for basic
                  platform functionality
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how
                  users interact with the Platform
                </li>
                <li>
                  <strong>Third-Party Cookies:</strong> Set by external partners
                  for specific purposes
                </li>
              </ul>
            </section>

            {/* 4. Essential Cookies */}
            <section id="essential-cookies" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                4. Essential Cookies
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    4.1 Purpose
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Essential cookies are necessary for the basic functionality
                    of LeetFeedback. These cookies enable you to navigate the
                    Platform, use core features, and maintain your session.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    4.2 Examples
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    <li>
                      <strong>Session Cookies:</strong> Track your session ID
                      and keep you logged in
                    </li>
                    <li>
                      <strong>Authentication Cookies:</strong> Verify your
                      identity and ensure secure access
                    </li>
                    <li>
                      <strong>CSRF Protection Cookies:</strong> Prevent
                      cross-site request forgery attacks
                    </li>
                    <li>
                      <strong>Preference Cookies:</strong> Remember your
                      language and theme settings
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    4.3 User Control
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Essential cookies cannot be disabled because they are
                    necessary for the Platform to function. If you refuse these
                    cookies, you will not be able to use certain features of
                    LeetFeedback.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Analytics Cookies */}
            <section id="analytics-cookies" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                5. Analytics Cookies
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    5.1 Purpose
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Analytics cookies help us understand how users interact with
                    our Platform. We use this information to improve features,
                    optimize performance, and enhance user experience.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    5.2 Google Analytics
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    We use Google Analytics to track platform usage, page views,
                    and user behavior. Google Analytics is GDPR-compliant and
                    anonymizes IP addresses. Your data is processed according to
                    Google's privacy policy.
                  </p>
                  <p className="text-foreground leading-relaxed mt-3">
                    <strong>Cookie Name:</strong> _ga, _gat, _gid
                    <br />
                    <strong>Expiry:</strong> 24 months (varies by cookie)
                    <br />
                    <strong>Purpose:</strong> Unique user identification and
                    session tracking
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    5.3 User Control
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    You can disable analytics cookies at any time through your
                    cookie preferences or by opting out of analytics. This will
                    not affect your ability to use essential Platform features.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Third-Party Cookies */}
            <section id="third-party-cookies" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                6. Third-Party Cookies
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    6.1 What Are Third-Party Cookies?
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Third-party cookies are set by external partners and service
                    providers. These cookies may track your behavior across
                    multiple websites for advertising, social media, or
                    analytics purposes.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    6.2 Our Commitment
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    <strong>
                      We DO NOT use third-party cookies for advertising or
                      cross-site tracking without your explicit consent.
                    </strong>{" "}
                    Third-party cookies are only used for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    <li>Authentication (OAuth with LeetCode, GitHub, etc.)</li>
                    <li>Analytics (only when explicitly enabled)</li>
                    <li>
                      Essential integrations that require third-party services
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    6.3 Third-Party Services
                  </h3>
                  <div className="space-y-2 text-foreground">
                    <p>
                      <strong>LeetCode Integration:</strong> May set cookies for
                      authentication (only public data shared)
                    </p>
                    <p>
                      <strong>GitHub Integration:</strong> Uses OAuth cookies
                      (only with your explicit permission)
                    </p>
                    <p>
                      <strong>GeeksforGeeks Integration:</strong> May set
                      cookies for data retrieval (only public data shared)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. Cookie Management */}
            <section id="cookie-management" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                7. Cookie Management
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    7.1 Browser Settings
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Most web browsers allow you to control cookies through your
                    browser settings. You can:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    <li>View all cookies stored on your device</li>
                    <li>Delete specific cookies</li>
                    <li>Block cookies from specific websites</li>
                    <li>
                      Set your browser to block all cookies (not recommended)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    7.2 Cookie Preferences in LeetFeedback
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    You can manage your cookie preferences directly in your
                    LeetFeedback account settings:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    <li>Accept/reject analytics cookies</li>
                    <li>Accept/reject third-party service integrations</li>
                    <li>View a detailed cookie inventory</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    7.3 Do Not Track
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Some browsers include a "Do Not Track" feature. We respect
                    Do Not Track signals and will not use analytics cookies for
                    users with Do Not Track enabled.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Your Choices */}
            <section id="your-choices" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                8. Your Choices
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    8.1 Cookie Consent
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    When you first visit LeetFeedback, we display a cookie
                    consent banner. You can:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    <li>
                      <strong>Accept All:</strong> Accept all cookies
                    </li>
                    <li>
                      <strong>Reject Non-Essential:</strong> Accept only
                      essential cookies
                    </li>
                    <li>
                      <strong>Customize:</strong> Choose which cookie categories
                      to enable
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    8.2 Changing Your Preferences
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    You can change your cookie preferences at any time by:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    <li>
                      Visiting your account Settings → Privacy → Cookie
                      Preferences
                    </li>
                    <li>Clearing cookies through your browser settings</li>
                    <li>Contacting us with your privacy request</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    8.3 GDPR Compliance
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    For users in the EU/EEA, we comply with GDPR requirements:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    <li>
                      <strong>Opt-In Consent:</strong> We ask for consent before
                      using analytics/third-party cookies
                    </li>
                    <li>
                      <strong>Right to Withdraw:</strong> You can withdraw
                      consent at any time
                    </li>
                    <li>
                      <strong>Legitimate Interest:</strong> Essential cookies
                      are used based on legitimate interest (no consent
                      required)
                    </li>
                    <li>
                      <strong>Data Portability:</strong> You can request your
                      data in portable format
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 9. Contact Us */}
            <section id="contact" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                9. Contact Us
              </h2>
              <p className="text-foreground leading-relaxed">
                If you have questions about our cookie practices or this Cookie
                Policy, please contact us:
              </p>
              <div className="p-6 bg-muted/10 rounded-lg border border-border space-y-3">
                <p className="text-foreground">
                  <strong>Email:</strong> privacy@leetfeedback.com
                </p>
                <p className="text-foreground">
                  <strong>Support:</strong> support@leetfeedback.com
                </p>
                <p className="text-foreground">
                  <strong>Response Time:</strong> We aim to respond within 30
                  days
                </p>
              </div>

              <div className="mt-6 p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-foreground">
                  <strong>📝 Additional Resources:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground mt-3">
                  <li>
                    <a
                      href="/privacy"
                      className="text-blue-500 hover:underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    - Complete privacy practices
                  </li>
                  <li>
                    <a href="/terms" className="text-blue-500 hover:underline">
                      Terms of Service
                    </a>{" "}
                    - Platform usage terms
                  </li>
                  <li>
                    <strong>Browser Cookie Guides:</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>
                        <a
                          href="https://support.google.com/chrome/answer/95647"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Chrome Cookie Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://support.apple.com/en-us/HT201265"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Safari Cookie Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Firefox Cookie Settings
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CookiePolicyPage;

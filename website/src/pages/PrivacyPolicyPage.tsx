import React from "react";
import Footer from "../components/Footer";
import { PolicyNavbar } from "../components/PolicyNavbar";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "what-we-collect", title: "What We Collect" },
  { id: "how-we-use", title: "How We Use" },
  { id: "student-data-priority", title: "Student Data Protection" },
  { id: "no-personal-sale", title: "Non-Disclosure" },
  { id: "recruiter-platform", title: "Recruiter Platform" },
  { id: "ai-integrity", title: "AI Integrity" },
  { id: "data-retention", title: "Data Retention" },
  { id: "user-rights", title: "Your Rights" },
  { id: "security", title: "Security" },
  { id: "cookies", title: "Cookies" },
  { id: "third-party-services", title: "Third-Party" },
  { id: "children", title: "Children" },
  { id: "international", title: "International" },
  { id: "policy-changes", title: "Changes" },
  { id: "contact-us", title: "Contact" },
];

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <PolicyNavbar sections={sections} />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-8 lg:pl-80 py-16 max-w-6xl">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold mb-4 text-foreground">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Effective Date: January 1, 2025
              </p>
              <p className="text-muted-foreground">
                Last Updated: October 17, 2025
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:pl-80 pb-16 max-w-6xl">
          <div className="space-y-8">
            {/* 1. Introduction */}
            <section id="introduction" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                1. Introduction
              </h2>
              <p className="text-foreground leading-relaxed">
                Welcome to LeetFeedback ("we," "us," "our," or "Company"). We
                are committed to protecting your privacy and ensuring you have a
                positive experience on our platform. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you use our website and services.
              </p>
              <p className="text-foreground leading-relaxed">
                LeetFeedback is a comprehensive coding practice and progress
                tracking platform designed to help students improve their
                competitive programming and software engineering skills. Our
                mission is to provide transparent, ethical data practices while
                maintaining the highest standards of student privacy and
                security.
              </p>
            </section>

            {/* 2. What Information We Collect */}
            <section id="what-we-collect" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                2. What Information We Collect
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    2.1 Account Information
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    When you create an account, we collect: username, email
                    address, and authentication credentials. We do NOT require
                    or store personally identifiable information such as your
                    real name, phone number, address, or date of birth unless
                    you explicitly choose to provide them.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    2.2 Progress and Activity Data
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    We collect information about your use of the platform
                    including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    <li>Problems attempted, solved, and skipped</li>
                    <li>Time spent on problems and total platform usage</li>
                    <li>Problem categories and difficulty levels</li>
                    <li>Success/failure metrics and performance trends</li>
                    <li>
                      Code submission metadata (not the actual code content)
                    </li>
                    <li>
                      Integration data from connected platforms (LeetCode,
                      GeeksforGeeks, CodeChef)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    2.3 Device and Technical Data
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    We automatically collect: IP address, browser type,
                    operating system, device type, pages visited, time spent,
                    and referral source. This helps us understand usage patterns
                    and improve our platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    2.4 Integrity Monitoring Data
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    For AI-based detection of unfair means, we analyze:
                    submission patterns, code similarities, timing anomalies,
                    and tool usage behavior. This data is used solely for
                    platform integrity purposes and is never shared for any
                    other purpose.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    2.5 Communication Data
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    If you contact us for support or feedback, we keep records
                    of your communications. You can choose to provide additional
                    information, but it is entirely optional.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. How We Use Your Information */}
            <section id="how-we-use" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                3. How We Use Your Information
              </h2>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <p className="text-foreground">
                    Provide and improve platform services and features
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <p className="text-foreground">
                    Track your progress and generate personalized learning
                    insights
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <p className="text-foreground">
                    Detect and prevent unfair means using AI analysis
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <p className="text-foreground">
                    Send platform notifications, updates, and security alerts
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <p className="text-foreground">
                    Respond to your support requests and inquiries
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <p className="text-foreground">
                    Maintain platform security and prevent fraud
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <p className="text-foreground">
                    Generate aggregate, anonymized analytics to improve the
                    platform
                  </p>
                </div>
              </div>
              <p className="text-foreground leading-relaxed mt-4 p-4 bg-muted/10 rounded-lg">
                <strong>Critical Note:</strong> We DO NOT use your personal data
                for any advertising purposes. We DO NOT sell or share your
                personally identifiable information with third parties for
                marketing or advertising. Your privacy is paramount.
              </p>
            </section>

            {/* 4. Student Data Protection & Privacy */}
            <section id="student-data-priority" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                4. Student Data Protection & Privacy (Utmost Priority)
              </h2>

              <p className="text-foreground leading-relaxed p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
                <strong>
                  Student data is of utmost priority at LeetFeedback.
                </strong>{" "}
                We have implemented comprehensive safeguards to protect student
                information and ensure compliance with privacy regulations.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    4.1 Data Minimization
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    We collect only the minimum data necessary to provide our
                    services. We do not ask for or store sensitive personal
                    information unless explicitly required and consented to by
                    the user.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    4.2 No Parental or Guardian Data Collection
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    If a user is a minor, we do not collect information about
                    their parents or guardians. We comply with COPPA (Children's
                    Online Privacy Protection Act) and applicable regulations.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    4.3 Anonymous Progress Tracking
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Your learning progress is tracked and associated with your
                    account. However, you retain full control over your data and
                    can request deletion at any time.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    4.4 No Behavioral Profiling for Advertising
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    We absolutely do not create behavioral profiles of students
                    for advertising or third-party marketing purposes. Your
                    learning behavior is yours alone.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    4.5 Code Privacy
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    We do not store or analyze the actual code content you
                    submit. We only analyze metadata such as submission timing,
                    success rates, and patterns for integrity purposes.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Personal Data Non-Disclosure */}
            <section id="no-personal-sale" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                5. Personal Data Non-Disclosure Policy
              </h2>

              <div className="p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg space-y-3">
                <p className="text-foreground leading-relaxed">
                  <strong>We categorically DO NOT:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  <li>
                    Sell personally identifiable information (name, email,
                    phone, etc.)
                  </li>
                  <li>
                    Share personal data with data brokers or marketing companies
                  </li>
                  <li>Use personal data for targeted advertising</li>
                  <li>
                    Share personal data with third parties for commercial
                    purposes
                  </li>
                  <li>Create persistent cross-site tracking profiles</li>
                  <li>
                    Combine your data with external databases for identification
                    purposes
                  </li>
                </ul>
              </div>

              <p className="text-foreground leading-relaxed mt-4">
                The only exception is when legally required by valid court
                orders, government requests, or to comply with applicable laws.
                In such cases, we will notify the user unless legally prohibited
                from doing so.
              </p>
            </section>

            {/* 6. Recruiter Analytics Platform */}
            <section id="recruiter-platform" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                6. Recruiter Analytics Platform
              </h2>

              <p className="text-foreground leading-relaxed">
                LeetFeedback offers a B2B recruiter analytics platform that
                allows companies to analyze aggregate student progress data and
                identify top-performing candidates.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    6.1 What Recruiters Can See
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Recruiters can access:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    <li>Anonymized aggregate performance metrics</li>
                    <li>Problem-solving statistics and trends</li>
                    <li>Performance distribution across difficulty levels</li>
                    <li>Learning progress trajectories (anonymized)</li>
                    <li>
                      Skill category proficiency (without identifying
                      individuals)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    6.2 What Recruiters CANNOT See
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    <li>
                      Any personally identifiable information (names, emails,
                      IDs)
                    </li>
                    <li>Individual submission codes or technical solutions</li>
                    <li>Personal contact information</li>
                    <li>Real-world identity or identifying characteristics</li>
                    <li>Cross-platform data linking</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    6.3 Opt-Out Options
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Users can opt-out of the recruiter analytics platform at any
                    time in their account settings. When opted-out, your
                    anonymized progress data will not be included in recruiter
                    analytics, even in aggregated form.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    6.4 Anonymous Opt-In for Direct Opportunities
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    If you opt-in, top-performing students may be contacted by
                    recruiters through our platform with opportunities. All
                    communications are handled anonymously unless you choose to
                    reveal your identity.
                  </p>
                </div>
              </div>
            </section>

            {/* 7. AI-Based Integrity Monitoring */}
            <section id="ai-integrity" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                7. AI-Based Integrity Monitoring
              </h2>

              <p className="text-foreground leading-relaxed">
                To maintain platform integrity, we use AI and machine learning
                to detect unfair means including plagiarism, automated
                solutions, and cheating patterns.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    7.1 What We Analyze
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    <li>Solution submission patterns and timing</li>
                    <li>Code structural similarities with other submissions</li>
                    <li>Abnormal behavioral patterns</li>
                    <li>Tool usage and browser extensions</li>
                    <li>Submission velocity and accuracy inconsistencies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    7.2 Data Usage
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Integrity monitoring data is used exclusively for platform
                    integrity purposes. It is not shared with recruiters, third
                    parties, or used for any other purpose. Findings are
                    confidential and handled according to our Terms of Service.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    7.3 User Rights
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    If our AI system flags suspicious activity, you will be
                    notified. You have the right to appeal, provide context, or
                    request human review. We aim to be fair and transparent in
                    our integrity enforcement.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Data Retention & Deletion */}
            <section id="data-retention" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                8. Data Retention & Deletion
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    8.1 Retention Period
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    We retain your data for as long as your account is active.
                    Once you delete your account, we begin immediate deletion of
                    your personal data within 30 days, except where required by
                    law.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    8.2 Right to Deletion
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    You can request complete data deletion at any time. Upon
                    deletion, all personally identifiable information associated
                    with your account will be permanently removed from our
                    systems. However, aggregate anonymized data may be retained
                    for analytics purposes.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    8.3 Backup and Recovery
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Deleted data may exist in backup systems for up to 90 days.
                    These backups are securely stored and inaccessible to normal
                    operations. After 90 days, all backup copies are permanently
                    purged.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    8.4 Legal Holds
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    If we receive a legal request or are involved in litigation,
                    we may retain data as required by law. We will notify you of
                    such retention unless legally prohibited.
                  </p>
                </div>
              </div>
            </section>

            {/* 9. Your Rights and Choices */}
            <section id="user-rights" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                9. Your Rights and Choices
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    9.1 Right to Access
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    You can download a copy of all your personal data that we
                    hold in a machine-readable format at any time through your
                    account settings.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    9.2 Right to Correction
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    You can update, correct, or modify your account information
                    at any time. If you need assistance, contact our support
                    team.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    9.3 Right to Deletion
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    You have the right to request deletion of your account and
                    all associated personal data. This is permanent and cannot
                    be reversed.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    9.4 Right to Opt-Out
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    You can opt-out of the recruiter analytics platform, email
                    communications, and non-essential tracking through your
                    account preferences.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    9.5 Right to Data Portability
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    You can export your progress data, achievements, and
                    insights in standard formats to use with other platforms.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    9.6 Right to Lodge a Complaint
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    If you believe your privacy rights have been violated, you
                    can file a complaint with your local data protection
                    authority or contact us directly.
                  </p>
                </div>
              </div>
            </section>

            {/* 10. Security & Encryption */}
            <section id="security" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                10. Security & Encryption
              </h2>

              <p className="text-foreground leading-relaxed">
                We employ industry-leading security measures to protect your
                data:
              </p>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-green-500">🔒</span>
                  <p className="text-foreground">
                    <strong>End-to-End Encryption:</strong> All data in transit
                    is encrypted using TLS 1.3
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-green-500">🔒</span>
                  <p className="text-foreground">
                    <strong>Database Encryption:</strong> Data at rest is
                    encrypted using AES-256
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-green-500">🔒</span>
                  <p className="text-foreground">
                    <strong>Password Hashing:</strong> All passwords are hashed
                    with bcrypt and salted
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-green-500">🔒</span>
                  <p className="text-foreground">
                    <strong>Multi-Factor Authentication:</strong> Available to
                    all users for enhanced security
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-green-500">🔒</span>
                  <p className="text-foreground">
                    <strong>Regular Security Audits:</strong> Third-party
                    penetration testing and vulnerability assessments
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-green-500">🔒</span>
                  <p className="text-foreground">
                    <strong>Access Controls:</strong> Strict role-based access
                    control (RBAC) for employee data access
                  </p>
                </div>
              </div>

              <p className="text-foreground leading-relaxed mt-4">
                While we implement comprehensive security measures, no system is
                completely immune to attacks. In the event of a data breach, we
                will notify affected users within 72 hours as required by law.
              </p>
            </section>

            {/* 11. Cookies & Tracking Technologies */}
            <section id="cookies" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                11. Cookies & Tracking Technologies
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    11.1 Essential Cookies
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    We use essential cookies for authentication and session
                    management. These cookies are necessary for the platform to
                    function and cannot be disabled.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    11.2 Analytics Cookies
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    We use Google Analytics (GDPR-compliant) to understand how
                    users interact with our platform. You can opt-out through
                    your cookie preferences or browser settings.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    11.3 Cookie Management
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Most browsers allow you to refuse cookies or alert you when
                    cookies are being sent. You can also clear cookies from your
                    browser settings. However, disabling essential cookies may
                    affect platform functionality.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    11.4 Third-Party Cookies
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    We do not allow third parties to place tracking cookies on
                    your device without consent. Any third-party integrations
                    follow their own cookie policies.
                  </p>
                </div>
              </div>
            </section>

            {/* 12. Third-Party Services */}
            <section id="third-party-services" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                12. Third-Party Services
              </h2>

              <p className="text-foreground leading-relaxed">
                We integrate with third-party platforms to enhance your
                experience:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    12.1 Integration Platforms
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    <li>
                      <strong>LeetCode, GeeksforGeeks, CodeChef:</strong> We
                      only sync your publicly available progress data
                    </li>
                    <li>
                      <strong>GitHub:</strong> For solution repository
                      integration (with explicit permission)
                    </li>
                    <li>
                      <strong>Notion:</strong> For workspace integration (with
                      explicit permission)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    12.2 Analytics Providers
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    We use Google Analytics (GDPR compliant) for aggregate usage
                    statistics. You can opt-out through your browser settings or
                    our analytics opt-out link.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    12.3 Data Sharing with Third Parties
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Third-party services have their own privacy policies. We are
                    not responsible for their data practices. We recommend
                    reviewing their policies before connecting your account.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    12.4 Service Providers
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    We use service providers (hosting, analytics, support) who
                    are bound by strict data protection agreements. We only
                    share data necessary for them to provide services.
                  </p>
                </div>
              </div>
            </section>

            {/* 13. Children's Privacy */}
            <section id="children" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                13. Children's Privacy
              </h2>

              <p className="text-foreground leading-relaxed">
                LeetFeedback is designed for students and professionals, which
                may include minors. We comply with COPPA (Children's Online
                Privacy Protection Act) and applicable international child
                privacy regulations.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    13.1 Minors Under 13
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    We do not intentionally collect personally identifiable
                    information from children under 13. Parents/guardians who
                    believe their child created an account can contact us for
                    immediate account deletion.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    13.2 Minors 13-18
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    For minors between 13-18, we collect minimal personal
                    information and apply enhanced privacy protections. We do
                    not share their data with recruiters without explicit opt-in
                    consent at age 18 or older.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    13.3 Parental Controls
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Parents can request information about their child's account
                    data or request deletion by contacting our support team with
                    proof of guardianship.
                  </p>
                </div>
              </div>
            </section>

            {/* 14. International Data Transfers */}
            <section id="international" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                14. International Data Transfers
              </h2>

              <p className="text-foreground leading-relaxed">
                Our servers are located globally. If you access LeetFeedback
                from outside your local jurisdiction, your data may be
                transferred internationally. By using our platform, you consent
                to such transfers, which are protected by standard contractual
                clauses and data protection agreements.
              </p>

              <p className="text-foreground leading-relaxed">
                For EU/EEA residents, we comply with GDPR requirements for
                international data transfers.
              </p>
            </section>

            {/* 15. Changes to Privacy Policy */}
            <section id="policy-changes" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                15. Changes to This Privacy Policy
              </h2>

              <p className="text-foreground leading-relaxed">
                We may update this Privacy Policy to reflect changes in our
                practices, technology, or applicable laws. We will notify you of
                material changes via email or prominent website notification.
                Your continued use of LeetFeedback after changes constitutes
                acceptance of the updated Privacy Policy.
              </p>
            </section>

            {/* 16. Contact Us */}
            <section id="contact-us" className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                16. Contact Us
              </h2>

              <p className="text-foreground leading-relaxed">
                If you have questions about this Privacy Policy, our privacy
                practices, or want to exercise any of your rights, please
                contact us:
              </p>

              <div className="p-6 bg-muted/10 rounded-lg border border-border space-y-3">
                <p className="text-foreground">
                  <strong>Email:</strong> privacy@leetfeedback.com
                </p>
                <p className="text-foreground">
                  <strong>Support:</strong> support@leetfeedback.com
                </p>
              </div>

              <p className="text-foreground leading-relaxed mt-4">
                We aim to respond to all privacy requests within 30 days. For
                urgent matters, please mark your email as "URGENT: PRIVACY
                REQUEST."
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;

import Link from "next/link"
import { NavBar } from "@/components/navbar"
import Footer from "@/components/footer"
import { montserrat } from "@/lib/fonts/fonts"

export default function PrivacyPolicyPage() {
  return (
    <div className={`min-h-screen bg-gray-50 ${montserrat.className}`}>
      <NavBar
        logoText="PolicyPeer"
        navLinks={[
          { label: "Companies", href: "/companies" },
          { label: "Privacy", href: "/privacy" },
          { label: "Support", href: "/support" },
          { label: "Dictionary", href: "/dictionary" },
        ]}
        signInHref="/login"
      />

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        <div className="max-w-3xl mx-auto space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>
            Welcome to <strong>PolicyPeer</strong>. We value your trust and are
            committed to safeguarding your personal data. This Privacy Policy
            explains how we collect, use, and protect information you share on
            our platform.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">1. Introduction</h2>
          <p>
            PolicyPeer (“we,” “us,” or “our”) helps users submit and compare
            real insurance policies and claims. By accessing our services, you
            consent to the data practices described in this policy.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">2. Information We Collect</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Account Data:</strong> If you sign up or log in, we collect
              your email address, password, and any optional profile information
              (like your name) to create your account.
            </li>
            <li>
              <strong>Policy & Claims Submissions:</strong> We store the details
              you provide for each policy or claim (e.g., insurer, coverage
              type, claim amount, description). If you’re logged in, these may
              be linked to your user account.
            </li>
            <li>
              <strong>Device & Usage Data:</strong> We may automatically collect
              technical information (IP addresses, browser type, site usage),
              primarily to improve site performance and troubleshoot issues.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-2">
            3. Use of Your Data
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Site Functionality:</strong> We process your submitted
              claims/policies to provide comparative insights and build our
              crowdsourced insurance database.
            </li>
            <li>
              <strong>Account Management:</strong> We may use your information
              to manage your account, authenticate logins, and personalize your
              experience.
            </li>
            <li>
              <strong>Analytics & Improvements:</strong> Aggregate or
              anonymized data helps us analyze site usage, improve features, and
              develop new tools to combat insurance fraud or pricing
              inconsistencies.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-2">
            4. Data Security & Integrity
          </h2>
          <p>
            We store user data using <strong>Supabase</strong> for
            authentication and a <strong>PostgreSQL</strong> database. We employ
            row-level security (RLS) to ensure only authorized users can access
            their own claims or policies. Sensitive fields are protected via
            encryption at rest and in transit (HTTPS). We also maintain strict
            access controls for our internal systems.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">
            5. Data Retention
          </h2>
          <p>
            We retain your data only as long as it remains relevant for
            processing insurance claims and maintaining a reliable user
            database. You may request deletion of your personal information by
            contacting us directly.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">
            6. Anonymity & Sharing
          </h2>
          <p>
            By default, we anonymize or aggregate claim and policy data before
            displaying it publicly. Personal identifiers (such as name or email)
            are never shared with other users. We may share de-identified
            datasets with partners or conduct statistical analyses to expose
            potential fraudulent practices, but no personal information is
            disclosed without explicit consent.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">7. Cookies & Tracking</h2>
          <p>
            PolicyPeer uses small text files (“cookies”) to remember your
            preferences, maintain your logged-in session, and understand site
            usage patterns. You can control cookies through your browser
            settings, but disabling them may affect site functionality.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">8. Children’s Privacy</h2>
          <p>
            Our services are not directed to individuals under 16. We do not
            knowingly collect personal data from children. If you believe a
            child has provided us with personal information, please contact us
            to have the account removed.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">9. Changes to This Policy</h2>
          <p>
            We may update this policy periodically to reflect changes in our
            practices. We will notify you of any significant modifications via
            email or a prominent notice on our site.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">10. Contact Us</h2>
          <p>
            If you have questions or requests regarding this Privacy Policy,
            please reach out at:
          </p>
          <address className="not-italic text-sm">
            PolicyPeer<br />
            <Link href="mailto:support@policypeer.com" className="underline text-blue-600">
              support@policypeer.com
            </Link>
          </address>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

import './FooterPage.css';

export default function Privacy() {
  return (
    <div className="fp-page">
      <div className="fp-hero">
        <div className="fp-hero-inner">
          <p className="fp-eyebrow">Legal</p>
          <h1>Privacy policy</h1>
          <p>How we collect, use, and protect your personal information.</p>
        </div>
      </div>
      <div className="fp-body">
        <p className="fp-last-updated">Last updated: March 1, 2025</p>
        <div className="fp-section fp-policy">
          <h2>Information we collect</h2>
          <p>When you use StayEase, we collect information you provide directly — such as your name, email address, and payment details — as well as information collected automatically such as your IP address, device type, and browsing behaviour on our platform.</p>
          <ul>
            <li>Account information: name, email address, password (hashed — never stored in plain text)</li>
            <li>Booking information: dates, hotel selection, guest details, and special requests</li>
            <li>Payment information: handled by our payment processors — we never store card numbers</li>
            <li>Usage data: pages visited, search queries, and interactions with our platform</li>
          </ul>
        </div>
        <hr className="fp-divider" />
        <div className="fp-section fp-policy">
          <h2>How we use your information</h2>
          <ul>
            <li>To process and confirm your bookings</li>
            <li>To send booking confirmations and important updates about your reservation</li>
            <li>To improve our platform based on how people use it</li>
            <li>To prevent fraud and keep the platform secure</li>
            <li>To send marketing emails — only if you opt in. You can unsubscribe at any time.</li>
          </ul>
        </div>
        <hr className="fp-divider" />
        <div className="fp-section fp-policy">
          <h2>Your rights</h2>
          <p>You have the right to access, correct, or delete your personal data at any time. You can do this from your account settings or by emailing privacy@stayease.com. We will respond within 30 days.</p>
          <ul>
            <li>Access: request a copy of all data we hold about you</li>
            <li>Correction: update any incorrect information</li>
            <li>Deletion: request that we delete your account and associated data</li>
            <li>Portability: receive your data in a machine-readable format</li>
          </ul>
        </div>
        <hr className="fp-divider" />
        <div className="fp-section fp-policy">
          <h2>Cookies</h2>
          <p>We use essential cookies to keep you logged in and process bookings. We also use analytics cookies (with your consent) to understand how the platform is used. You can manage cookie preferences at any time from the cookie settings link in the footer.</p>
        </div>
        <hr className="fp-divider" />
        <div className="fp-section fp-policy">
          <h2>Contact</h2>
          <p>For any privacy-related questions, contact our Data Protection Officer at <strong style={{ color: 'var(--terra)' }}>privacy@stayease.com</strong>.</p>
        </div>
      </div>
    </div>
  );
}
import './FooterPage.css';

export default function Terms() {
  return (
    <div className="fp-page">
      <div className="fp-hero">
        <div className="fp-hero-inner">
          <p className="fp-eyebrow">Legal</p>
          <h1>Terms of service</h1>
          <p>By using StayEase, you agree to these terms. Please read them carefully.</p>
        </div>
      </div>
      <div className="fp-body">
        <p className="fp-last-updated">Last updated: March 1, 2025</p>
        <div className="fp-section fp-policy">
          <h2>1. Acceptance of terms</h2>
          <p>By accessing or using the StayEase platform — including our website and any related services — you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>
        </div>
        <hr className="fp-divider" />
        <div className="fp-section fp-policy">
          <h2>2. Your account</h2>
          <ul>
            <li>You must be 18 years or older to create a StayEase account</li>
            <li>You are responsible for keeping your password secure and for all activity under your account</li>
            <li>You must provide accurate information when creating your account</li>
            <li>We reserve the right to suspend accounts that violate these terms</li>
          </ul>
        </div>
        <hr className="fp-divider" />
        <div className="fp-section fp-policy">
          <h2>3. Bookings and payments</h2>
          <p>When you make a booking through StayEase, you enter into a direct agreement with the property. StayEase acts as an intermediary platform — we are not a party to the accommodation contract between you and the hotel.</p>
          <ul>
            <li>All prices are displayed in Nigerian Naira (₦) and include applicable taxes unless stated otherwise</li>
            <li>A booking is confirmed only once you receive a confirmation email from StayEase</li>
            <li>Cancellation terms are set by individual properties and displayed before checkout</li>
          </ul>
        </div>
        <hr className="fp-divider" />
        <div className="fp-section fp-policy">
          <h2>4. Prohibited conduct</h2>
          <ul>
            <li>Making fraudulent bookings or providing false information</li>
            <li>Using the platform to harass or harm other users or hotel staff</li>
            <li>Scraping, copying, or redistributing our content without permission</li>
            <li>Attempting to circumvent our security or access systems unauthorised</li>
          </ul>
        </div>
        <hr className="fp-divider" />
        <div className="fp-section fp-policy">
          <h2>5. Limitation of liability</h2>
          <p>StayEase is a booking platform and is not responsible for the quality, safety, or legality of properties listed. We make every effort to verify listings but cannot guarantee the accuracy of all information provided by hotels.</p>
          <p>Our total liability to you for any claim shall not exceed the total amount paid for the booking in question.</p>
        </div>
        <hr className="fp-divider" />
        <div className="fp-section fp-policy">
          <h2>6. Contact</h2>
          <p>For legal enquiries, contact <strong style={{ color: 'var(--terra)' }}>legal@stayease.com</strong> or write to us at 14 Ozumba Mbadiwe Ave, Victoria Island, Lagos, Nigeria.</p>
        </div>
      </div>
    </div>
  );
}
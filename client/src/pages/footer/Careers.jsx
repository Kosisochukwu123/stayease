import { useState } from 'react';
import './FooterPage.css';

const JOBS = [
  { title: 'Senior Frontend Engineer', dept: 'Engineering', type: 'Full-time', location: 'Lagos / Remote', open: true },
  { title: 'Backend Engineer (Node.js)', dept: 'Engineering', type: 'Full-time', location: 'Lagos / Remote', open: true },
  { title: 'Product Designer (UI/UX)', dept: 'Design', type: 'Full-time', location: 'Remote', open: true },
  { title: 'Hotel Partnerships Manager', dept: 'Business', type: 'Full-time', location: 'Abuja', open: true },
  { title: 'Customer Support Lead', dept: 'Operations', type: 'Full-time', location: 'Lagos', open: true },
  { title: 'Content & SEO Specialist', dept: 'Marketing', type: 'Contract', location: 'Remote', open: false },
];

export default function Careers() {
  const [selected, setSelected] = useState('All');
  const depts = ['All', ...new Set(JOBS.map(j => j.dept))];
  const filtered = selected === 'All' ? JOBS : JOBS.filter(j => j.dept === selected);

  return (
    <div className="fp-page">
      <div className="fp-hero">
        <div className="fp-hero-inner">
          <p className="fp-eyebrow">Join the team</p>
          <h1>Help us redefine travel across Africa</h1>
          <p>We're a small, fast-moving team building something meaningful. If you care about Africa, technology, and great hospitality — we'd love to meet you.</p>
        </div>
      </div>

      <div className="fp-body">
        <div className="fp-section">
          <h2>Why work at StayEase?</h2>
          <div className="fp-cards">
            {[
              { icon: '🌍', title: 'Meaningful mission', desc: 'You\'re directly helping millions of African travellers find better accommodation.' },
              { icon: '🏠', title: 'Remote-first', desc: 'Work from anywhere in Africa. We care about output, not where you sit.' },
              { icon: '📈', title: 'Equity for everyone', desc: 'Every full-time employee gets stock options. We win together.' },
              { icon: '🎓', title: 'Learning budget', desc: '₦200,000 annual learning budget for courses, books, and conferences.' },
            ].map(c => (
              <div key={c.title} className="fp-card">
                <span className="fp-card-icon">{c.icon}</span>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <hr className="fp-divider" />

        <div className="fp-section">
          <h2>Open positions</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
            {depts.map(d => (
              <button
                key={d}
                onClick={() => setSelected(d)}
                style={{
                  padding: '7px 18px', borderRadius: 50, border: '1.5px solid',
                  borderColor: selected === d ? 'var(--terra)' : 'rgba(61,43,31,0.18)',
                  background: selected === d ? 'var(--terra)' : 'transparent',
                  color: selected === d ? 'white' : 'var(--muted)',
                  fontSize: '0.84rem', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >{d}</button>
            ))}
          </div>
          <div className="fp-jobs">
            {filtered.map(j => (
              <div key={j.title} className="fp-job">
                <div className="fp-job-info">
                  <h4>{j.title}</h4>
                  <div className="fp-job-meta">
                    <span className="fp-job-tag">{j.dept}</span>
                    <span className="fp-job-tag">{j.type}</span>
                    <span className="fp-job-tag">📍 {j.location}</span>
                    <span className={`fp-job-tag ${j.open ? 'open' : ''}`}>{j.open ? '● Hiring now' : '● Applications closed'}</span>
                  </div>
                </div>
                {j.open && <button className="fp-job-apply">Apply Now</button>}
              </div>
            ))}
          </div>
        </div>

        <hr className="fp-divider" />

        <div className="fp-section">
          <h2>Don't see your role?</h2>
          <p>We're always open to exceptional people. Send your CV and a short note about how you'd contribute to <strong style={{ color: 'var(--terra)' }}>careers@stayease.com</strong> and we'll be in touch.</p>
        </div>
      </div>
    </div>
  );
}
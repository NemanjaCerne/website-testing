import { Link } from 'react-router-dom'
import banner from '/banner.jpg'
import './Home.css'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ backgroundImage: `url(${banner})` }}>
        <div className="hero__orb hero__orb--blue" />
        <div className="hero__orb hero__orb--pink" />
        <div className="container hero__content">
          <p className="section-label">Sydney's Premium Vending</p>
          <h1 className="hero__heading">
            Vending,<br />
            <span className="neon-gradient">Elevated.</span>
          </h1>
          <p className="hero__sub">
            Hustle Vending brings premium, curated vending machines to the best spots
            across Sydney — stocked with what you actually want.
          </p>
          <div className="hero__actions">
            <Link to="/request" className="btn-primary">Request an Item</Link>
            <Link to="/locations" className="btn-outline">Find a Machine</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section features">
        <div className="container">
          <p className="section-label">Why Hustle</p>
          <h2 className="section-title">Built different.</h2>
          <div className="features__grid">
            {[
              { icon: '⚡', title: 'Always Stocked', desc: 'Real-time inventory monitoring means our machines are restocked before you notice they\'re low.' },
              { icon: '🎯', title: 'Curated Selection', desc: 'We don\'t fill shelves with anything. Every product is chosen for quality, taste, and demand.' },
              { icon: '📍', title: 'Prime Locations', desc: 'Gyms, offices, universities and lifestyle hubs — we\'re exactly where you need us.' },
              { icon: '💬', title: 'You Choose', desc: 'Our Request an Item feature means the community shapes what goes on the shelf.' },
            ].map(f => (
              <div key={f.title} className="card feature-card">
                <span className="feature-card__icon">{f.icon}</span>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2 className="cta-banner__heading">Want something stocked near you?</h2>
            <p className="cta-banner__sub">Tell us what you want and where — we listen.</p>
          </div>
          <Link to="/request" className="btn-primary">Make a Request</Link>
        </div>
      </section>
    </>
  )
}

import { Link } from 'react-router-dom'
import banner from '/banner.jpg'
import logo from '/hustle_logo.jpg'
import { useFadeIn, useFadeInChildren } from '../hooks/useFadeIn'
import './Home.css'

export default function Home() {
  const heroRef = useFadeIn()
  const featuresRef = useFadeInChildren('[data-animate]', 100)
  const ctaRef = useFadeIn()

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="hero" style={{ backgroundImage: `url(${banner})` }}>
        <div className="hero__orb hero__orb--blue" />
        <div className="hero__orb hero__orb--pink" />
        <div className="container hero__content fade-up is-visible" ref={heroRef}>
          <div className="hero__logo-ring">
            <div className="hero__ring hero__ring--outer" />
            <div className="hero__ring hero__ring--inner" />
            <img src={logo} alt="Hustle Vending" className="hero__ring-logo" />
          </div>
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
          <div className="features__grid" ref={featuresRef}>
            {[
              { icon: '⚡', title: 'Always Stocked', desc: 'Real-time inventory monitoring means our machines are restocked before you notice they\'re low.' },
              { icon: '🎯', title: 'Curated Selection', desc: 'We don\'t fill shelves with anything. Every product is chosen for quality, taste, and demand.' },
              { icon: '📍', title: 'Prime Locations', desc: 'Gyms, offices, universities and lifestyle hubs — we\'re exactly where you need us.' },
              { icon: '💬', title: 'You Choose', desc: 'Our Request an Item feature means the community shapes what goes on the shelf.' },
            ].map(f => (
              <div key={f.title} className="card feature-card fade-up" data-animate>
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
        <div className="container cta-banner__inner fade-up" ref={ctaRef}>
          <div>
            <h2 className="cta-banner__heading">Want something stocked near you?</h2>
            <p className="cta-banner__sub">Tell us what you want and where — we listen.</p>
          </div>
          <Link to="/request" className="btn-primary">Make a Request</Link>
        </div>
      </section>
    </div>
  )
}

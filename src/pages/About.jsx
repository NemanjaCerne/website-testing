import './About.css'

export default function About() {
  return (
    <>
      <section className="page-hero section">
        <div className="container">
          <p className="section-label">Our Story</p>
          <h1 className="section-title">
            We saw the gap.<br />
            <span className="neon-gradient">We filled it.</span>
          </h1>
          <p className="section-subtitle">
            Hustle Vending was born out of frustration with vending machines that were
            stale, overpriced, and stocked with the same five things everyone's sick of.
            Sydney deserved better.
          </p>
        </div>
      </section>

      <div className="divider" />

      <section className="section">
        <div className="container about-grid">
          <div className="about-grid__text">
            <p className="section-label">Mission</p>
            <h2 className="section-title">Premium products.<br />Accessible everywhere.</h2>
            <p className="about-text">
              We believe that what you grab on the go should feel like a choice you're proud of.
              Whether it's a cold brew before your morning workout or a premium snack between
              meetings — Hustle Vending makes sure you never have to settle.
            </p>
            <p className="about-text">
              Our machines are placed in high-traffic, lifestyle-focused locations across Sydney.
              We partner with gyms, co-working spaces, universities, and retail precincts to bring
              the vending experience into the 21st century.
            </p>
          </div>
          <div className="about-grid__stats">
            {[
              { value: '20+', label: 'Locations across Sydney' },
              { value: '150+', label: 'Products curated' },
              { value: '24/7', label: 'Always available' },
              { value: '100%', label: 'Community driven' },
            ].map(s => (
              <div key={s.label} className="stat-card card">
                <span className="stat-card__value neon-gradient">{s.value}</span>
                <span className="stat-card__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section values">
        <div className="container">
          <p className="section-label">Values</p>
          <h2 className="section-title">What drives us.</h2>
          <div className="values__grid">
            {[
              { title: 'Quality First', desc: 'We\'d rather carry 50 great products than 200 average ones. Every item in our machines earns its spot.' },
              { title: 'Community Led', desc: 'Our Request an Item feature isn\'t a gimmick — product requests directly shape our restocking decisions.' },
              { title: 'Transparency', desc: 'Fair pricing, no hidden markups. You know what you\'re paying and why.' },
              { title: 'Consistency', desc: 'A machine that\'s always empty isn\'t a vending machine — it\'s a disappointment. We don\'t do empty.' },
            ].map(v => (
              <div key={v.title} className="card value-card">
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

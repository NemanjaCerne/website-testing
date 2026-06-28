import { useFadeIn, useFadeInChildren } from '../hooks/useFadeIn'
import { useCountUp } from '../hooks/useCountUp'
import './About.css'

const stats = [
  { num: 20, suffix: '+', label: 'Locations across Sydney' },
  { num: 150, suffix: '+', label: 'Products curated' },
  { num: 24, suffix: '/7', label: 'Always available' },
  { num: 100, suffix: '%', label: 'Community driven' },
]

function StatCard({ num, suffix, label }) {
  const { value, ref } = useCountUp(num)
  return (
    <div ref={ref} className="stat-card card fade-up" data-animate>
      <span className="stat-card__value neon-gradient">{value}{suffix}</span>
      <span className="stat-card__label">{label}</span>
    </div>
  )
}

export default function About() {
  const heroRef = useFadeIn()
  const missionRef = useFadeIn()
  const statsRef = useFadeInChildren('[data-animate]', 100)
  const valuesRef = useFadeInChildren('[data-animate]', 100)

  return (
    <div className="page-transition">
      <section className="page-hero section">
        <div className="container fade-up" ref={heroRef}>
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
          <div className="about-grid__text fade-up" ref={missionRef}>
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
          <div className="about-grid__stats" ref={statsRef}>
            {stats.map(s => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section values">
        <div className="container">
          <p className="section-label">Values</p>
          <h2 className="section-title">What drives us.</h2>
          <div className="values__grid" ref={valuesRef}>
            {[
              { title: 'Quality First', desc: 'We\'d rather carry 50 great products than 200 average ones. Every item in our machines earns its spot.' },
              { title: 'Community Led', desc: 'Our Request an Item feature isn\'t a gimmick — product requests directly shape our restocking decisions.' },
              { title: 'Transparency', desc: 'Fair pricing, no hidden markups. You know what you\'re paying and why.' },
              { title: 'Consistency', desc: 'A machine that\'s always empty isn\'t a vending machine — it\'s a disappointment. We don\'t do empty.' },
            ].map(v => (
              <div key={v.title} className="card value-card fade-up" data-animate>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

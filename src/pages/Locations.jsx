import './Locations.css'

const locations = [
  { name: 'Sydney CBD', address: '1 Martin Place, Sydney NSW 2000', type: 'Office Tower', hours: '24/7', products: 'Snacks, drinks, coffee' },
  { name: 'Bondi Beach', address: 'Campbell Parade, Bondi Beach NSW 2026', type: 'Lifestyle Hub', hours: '6am – 10pm', products: 'Health snacks, hydration, supplements' },
  { name: 'USYD Campus', address: 'Eastern Ave, Camperdown NSW 2006', type: 'University', hours: '7am – 11pm', products: 'Snacks, energy drinks, meals' },
  { name: 'Surry Hills', address: '80 Campbell St, Surry Hills NSW 2010', type: 'Co-Working Space', hours: '7am – 9pm', products: 'Coffee, snacks, wellness' },
  { name: 'Chatswood Chase', address: '345 Victoria Ave, Chatswood NSW 2067', type: 'Retail Precinct', hours: '9am – 9pm', products: 'Premium snacks, beverages' },
  { name: 'Pyrmont Bay', address: 'Pirrama Rd, Pyrmont NSW 2009', type: 'Gym', hours: '5am – 11pm', products: 'Protein, hydration, bars' },
]

export default function Locations() {
  return (
    <>
      <section className="page-hero section">
        <div className="container">
          <p className="section-label">Find Us</p>
          <h1 className="section-title">
            Our machines.<br />
            <span className="neon-gradient">Your city.</span>
          </h1>
          <p className="section-subtitle">
            Hustle Vending machines are placed at Sydney's best lifestyle, fitness,
            and work locations. Find one near you.
          </p>
        </div>
      </section>

      <div className="divider" />

      <section className="section">
        <div className="container">
          <div className="locations__grid">
            {locations.map(loc => (
              <div key={loc.name} className="card location-card">
                <div className="location-card__header">
                  <span className="location-card__type">{loc.type}</span>
                  <span className="location-card__sample">Sample</span>
                </div>
                <h3 className="location-card__name">{loc.name}</h3>
                <p className="location-card__address">{loc.address}</p>
                <div className="location-card__meta">
                  <div className="location-card__meta-item">
                    <span className="meta-label">Hours</span>
                    <span className="meta-value">{loc.hours}</span>
                  </div>
                  <div className="location-card__meta-item">
                    <span className="meta-label">Stocked with</span>
                    <span className="meta-value">{loc.products}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="locations__cta">
            <p>Don't see your area?</p>
            <a href="/contact" className="btn-outline">Get in Touch</a>
          </div>
        </div>
      </section>
    </>
  )
}

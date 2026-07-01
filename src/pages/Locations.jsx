import { useState, useRef, useEffect } from 'react'
import MapView from '../components/MapView'
import { supabase } from '../lib/supabase'
import './Locations.css'

export default function Locations() {
  const [locations, setLocations] = useState([])
  const [activeIndex, setActiveIndex] = useState(null)
  const cardRefs = useRef([])

  useEffect(() => {
    supabase
      .from('locations')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: true })
      .then(({ data }) => setLocations(
        (data ?? []).map(loc => ({ ...loc, coords: [loc.lat, loc.lng] }))
      ))
  }, [])

  const handleSelect = (i) => {
    setActiveIndex(i)
    cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  return (
    <div className="page-transition">
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

      <section className="section locations-section">
        <div className="locations-layout">
          <div className="locations-map">
            <MapView
              locations={locations}
              activeIndex={activeIndex}
              onSelect={handleSelect}
            />
          </div>

          <div className="locations-list">
            {locations.map((loc, i) => (
              <div
                key={loc.name}
                ref={el => cardRefs.current[i] = el}
                className={`card location-card ${activeIndex === i ? 'location-card--active' : ''}`}
                onClick={() => handleSelect(i)}
              >
                <div className="location-card__header">
                  <span className="location-card__type">{loc.type}</span>
                </div>
                <h3 className="location-card__name">{loc.name}</h3>
                <p className="location-card__address">{loc.address}</p>
                <div className="location-card__meta">
                  <div className="location-card__meta-item">
                    <span className="meta-label">Hours</span>
                    <span className="meta-value">{loc.hours}</span>
                  </div>
                </div>
                {loc.products && (
                  <div className="location-card__tags">
                    {loc.products.split(',').map(p => p.trim()).filter(Boolean).map(tag => (
                      <span key={tag} className="product-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="locations__cta">
              <p>Don't see your area?</p>
              <a href="/contact" className="btn-outline">Get in Touch</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

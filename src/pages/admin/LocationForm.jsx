import { useState } from 'react'

const LOCATION_TYPES = ['Office Tower', 'Gym', 'University', 'Co-Working Space', 'Retail Precinct', 'Lifestyle Hub', 'Other']
const PRODUCT_OPTIONS = ['Drinks', 'Snacks', 'Proper Meals', 'Coffee', 'Protein & Supplements', 'Healthy Options']

const empty = { name: '', address: '', type: 'Office Tower', hours: '', products: '', active: true }

async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
  const res = await fetch(url, { headers: { 'Accept-Language': 'en' } })
  const data = await res.json()
  if (!data.length) return null
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
}

export default function LocationForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ?? empty)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const coords = await geocodeAddress(form.address)
    if (!coords) {
      setError('Could not find coordinates for that address. Try a more specific address.')
      setLoading(false)
      return
    }

    await onSave({ ...form, lat: coords.lat, lng: coords.lng })
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-field">
        <label>Location name *</label>
        <input value={form.name} onChange={set('name')} required placeholder="e.g. Bondi Beach" />
      </div>
      <div className="admin-field">
        <label>Address *</label>
        <input value={form.address} onChange={set('address')} required placeholder="e.g. Campbell Parade, Bondi Beach NSW 2026" />
      </div>
      <div className="admin-field">
        <label>Type</label>
        <select value={form.type} onChange={set('type')}>
          {LOCATION_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="admin-field">
        <label>Hours</label>
        <input value={form.hours} onChange={set('hours')} placeholder="e.g. 6am – 10pm" />
      </div>
      <div className="admin-field">
        <label>Stocked with (select all that apply)</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
          {PRODUCT_OPTIONS.map(opt => {
            const selected = form.products.split(',').map(s => s.trim()).filter(Boolean).includes(opt)
            const toggle = () => {
              const current = form.products.split(',').map(s => s.trim()).filter(Boolean)
              const next = selected ? current.filter(p => p !== opt) : [...current, opt]
              setForm(f => ({ ...f, products: next.join(', ') }))
            }
            return (
              <button
                key={opt}
                type="button"
                onClick={toggle}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                  border: `1.5px solid ${selected ? '#111' : '#ccc'}`,
                  background: selected ? '#111' : '#fff',
                  color: selected ? '#fff' : '#444',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>
      <label className="admin-toggle">
        <input
          type="checkbox"
          checked={form.active}
          onChange={e => setForm(f => ({ ...f, active: e.target.checked }))}
        />
        Visible on public site
      </label>
      {error && <p className="admin-error">{error}</p>}
      <div className="admin-modal__footer">
        <button type="button" className="admin-btn admin-btn--ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="admin-btn admin-btn--primary" disabled={loading}>
          {loading ? 'Saving…' : 'Save location'}
        </button>
      </div>
    </form>
  )
}

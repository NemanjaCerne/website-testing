import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './Request.css'

export default function Request() {
  const [locations, setLocations] = useState([])
  const [form, setForm] = useState({ location: '', item: '', reason: '', name: '', email: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    supabase
      .from('locations')
      .select('name, address')
      .eq('active', true)
      .order('created_at', { ascending: true })
      .then(({ data }) => setLocations(data ?? []))
  }, [])

  const validate = () => {
    const e = {}
    if (!form.location) e.location = 'Please select a location.'
    if (!form.item.trim()) e.item = 'Please enter an item name.'
    return e
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(er => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    const { error } = await supabase.from('requests').insert([{
      location: form.location,
      item: form.item.trim(),
      reason: form.reason.trim() || null,
      name: form.name.trim() || null,
      email: form.email.trim() || null,
    }])
    setSubmitting(false)
    if (!error) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="page-transition"><section className="page-hero section">
        <div className="container request-success">
          <div className="success-icon">✓</div>
          <h1 className="section-title">Request received.</h1>
          <p className="section-subtitle">
            Thanks for the suggestion! We review all requests and use them to
            shape what goes in our machines. Keep an eye out next time you visit.
          </p>
          <button className="btn-outline" onClick={() => { setSubmitted(false); setForm({ location: '', item: '', reason: '', name: '', email: '' }) }}>
            Submit another
          </button>
        </div>
      </section></div>
    )
  }

  return (
    <div className="page-transition">
      <section className="page-hero section">
        <div className="container">
          <p className="section-label">Have Your Say</p>
          <h1 className="section-title">
            Request an<br />
            <span className="neon-gradient">Item.</span>
          </h1>
          <p className="section-subtitle">
            Tell us what you want to see in your nearest Hustle Vending machine.
            We read every submission.
          </p>
        </div>
      </section>

      <div className="divider" />

      <section className="section">
        <div className="container request-layout">
          <form className="request-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="location">Vending Location <span className="required">*</span></label>
              <select
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                className={errors.location ? 'error' : ''}
              >
                <option value="">Select a location…</option>
                {locations.map(l => (
                  <option key={l.name} value={`${l.name} — ${l.address}`}>
                    {l.name} — {l.address}
                  </option>
                ))}
                <option value="Other / Not listed">Other / Not listed</option>
              </select>
              {errors.location && <span className="form-error">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="item">Requested Item <span className="required">*</span></label>
              <input
                type="text"
                id="item"
                name="item"
                placeholder="e.g. Remedy Kombucha, Quest Bar, Celsius"
                value={form.item}
                onChange={handleChange}
                className={errors.item ? 'error' : ''}
              />
              {errors.item && <span className="form-error">{errors.item}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="reason">Why do you want it? <span className="optional">(optional)</span></label>
              <textarea
                id="reason"
                name="reason"
                rows={4}
                placeholder="Tell us more about why this product would be great…"
                value={form.reason}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name <span className="optional">(optional)</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email <span className="optional">(optional)</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary request-submit" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit Request'}
            </button>
          </form>

          <aside className="request-aside">
            <div className="card aside-card">
              <h3>How it works</h3>
              <ol className="aside-steps">
                <li><span className="step-num">01</span><p>Fill in your vending location and the item you'd like to see stocked.</p></li>
                <li><span className="step-num">02</span><p>Our team reviews all submissions weekly.</p></li>
                <li><span className="step-num">03</span><p>Popular and interesting requests get added to our next restock order.</p></li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

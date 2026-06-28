import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="page-transition">
      <section className="page-hero section">
        <div className="container">
          <p className="section-label">Get in Touch</p>
          <h1 className="section-title">
            Let's talk<br />
            <span className="neon-gradient">vending.</span>
          </h1>
          <p className="section-subtitle">
            Partnership enquiries, location suggestions, press, or just saying hi —
            we're always happy to hear from you.
          </p>
        </div>
      </section>

      <div className="divider" />

      <section className="section">
        <div className="container contact-layout">

          <div className="contact-info">
            {[
              { label: 'Email', value: 'hello@hustlevending.com.au' },
              { label: 'Location', value: 'Sydney, NSW, Australia' },
              { label: 'Instagram', value: '@hustlevending' },
            ].map(item => (
              <div key={item.label} className="contact-info__item">
                <span className="contact-info__label">{item.label}</span>
                <span className="contact-info__value">{item.value}</span>
              </div>
            ))}
          </div>

          {submitted ? (
            <div className="contact-success">
              <div className="success-icon">✓</div>
              <h2>Message sent.</h2>
              <p>We'll get back to you within 1–2 business days.</p>
              <button className="btn-outline" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}>
                Send another
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="c-name">Name <span className="required">*</span></label>
                  <input type="text" id="c-name" name="name" required placeholder="Jane Smith" value={form.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="c-email">Email <span className="required">*</span></label>
                  <input type="email" id="c-email" name="email" required placeholder="jane@example.com" value={form.email} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="c-subject">Subject</label>
                <input type="text" id="c-subject" name="subject" placeholder="Partnership, press, general…" value={form.subject} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="c-message">Message <span className="required">*</span></label>
                <textarea id="c-message" name="message" rows={6} required placeholder="Tell us what's on your mind…" value={form.message} onChange={handleChange} />
              </div>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import banner from '/banner.jpg'
import logo from '/hustle_logo.jpg'
import VendingMachine from '../components/VendingMachine'
import { useFadeIn, useFadeInChildren } from '../hooks/useFadeIn'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

const NAV_SLOTS = [
  { to: '/locations', icon: '📍', label: 'Locations' },
  { to: '/request',   icon: '🛒', label: 'Request an Item' },
  { to: '/about',     icon: 'ℹ️',  label: 'About' },
  { to: '/contact',   icon: '✉️',  label: 'Contact' },
]

export default function Home() {
  const sceneRef    = useRef(null)
  const machineRef  = useRef(null)
  const slotsRef    = useRef([])
  const ctaTextRef  = useRef(null)
  const featuresRef = useFadeInChildren('[data-animate]', 100)
  const ctaBannerRef = useFadeIn()

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set([machineRef.current, ...slotsRef.current, ctaTextRef.current], { opacity: 1, x: 0, scale: 1 })
      gsap.set(['#vm-glass-glow', '#vm-glass-glow2'], { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // Machine slides in from right on load
      tl.fromTo(machineRef.current,
        { x: '55vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
      )

      // Glass lights up
      tl.to(['#vm-glass-glow', '#vm-glass-glow2'],
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      )
      tl.to('#vm-glass',
        { attr: { stroke: '#00d4ff' }, duration: 0.4 },
        '<'
      )

      // Product slots stagger in
      tl.fromTo(slotsRef.current,
        { opacity: 0, scale: 0.75, y: 8 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.15, duration: 0.4, ease: 'back.out(1.4)' }
      )

      // CTA text
      tl.fromTo(ctaTextRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35 },
        '-=0.1'
      )

      // Scroll-linked exit: parallax first, then machine slides back out to the right
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
      exitTl
        .to(machineRef.current, { yPercent: -8, ease: 'none', duration: 0.55 })
        .to(machineRef.current, { x: '60vw', opacity: 0, ease: 'power2.in', duration: 0.45 })
    }, sceneRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="page-transition">
      {/* ── Scroll scene (pinned hero) ── */}
      <section
        className="scroll-scene"
        ref={sceneRef}
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="hero__orb hero__orb--blue" />
        <div className="hero__orb hero__orb--pink" />

        <div className="scroll-scene__inner container">
          {/* Left: text */}
          <div className="scroll-scene__text">
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

          {/* Right: vending machine */}
          <div className="scroll-scene__machine" ref={machineRef}>
            <div className="vm-wrapper">
              <VendingMachine />

              {/* Nav links overlaid on glass slots */}
              <div className="vm-slots">
                {NAV_SLOTS.map((slot, i) => (
                  <Link
                    key={slot.to}
                    to={slot.to}
                    className="vm-slot"
                    ref={el => slotsRef.current[i] = el}
                    style={{
                      left:   i % 2 === 0 ? '9.3%'  : '52.7%',
                      top:    i < 2       ? '17.7%' : '46.5%',
                      width:  '38%',
                      height: '25%',
                    }}
                  >
                    <span className="vm-slot__icon">{slot.icon}</span>
                    <span className="vm-slot__label">{slot.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <p className="vm-cta-text" ref={ctaTextRef}>
              Pick something. We've stocked it for you.
            </p>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
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

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <div className="container cta-banner__inner fade-up" ref={ctaBannerRef}>
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
